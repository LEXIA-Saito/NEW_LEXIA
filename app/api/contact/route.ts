import { NextResponse } from "next/server"
import { Resend } from "resend"
import { getSecureConfig, validateSecureConfig } from "@/lib/secure-config"
import { contactRateLimiter, getClientIdentifier, validateContactData } from "@/lib/rate-limiter"

export async function POST(req: Request) {
  // Security: Rate limiting
  const clientId = getClientIdentifier(req)
  const rateLimitResult = contactRateLimiter.isAllowed(clientId)
  
  if (!rateLimitResult.allowed) {
    return NextResponse.json({ 
      error: "送信回数の制限に達しました。しばらく時間をおいてから再度お試しください。" 
    }, { status: 429 })
  }

  // Use secure configuration instead of basic config
  let config
  try {
    config = getSecureConfig()
    const validation = validateSecureConfig(config)
    if (!validation.isValid) {
      console.error("❌ Secure configuration validation failed:", validation.issues)
      return NextResponse.json({ 
        error: "サーバー設定エラー"
      }, { status: 500 })
    }
  } catch (error) {
    console.error("❌ Failed to load secure configuration:", error instanceof Error ? error.message : "unknown error")
    return NextResponse.json({
      error: "設定の読み込みに失敗しました"
    }, { status: 500 })
  }

  const resend = new Resend(config.resend.apiKey)
  let data
  try {
    data = await req.json()
  } catch (error) {
    return NextResponse.json({
      error: "リクエストデータの形式が正しくありません"
    }, { status: 400 })
  }

  // Security: Honeypot bot trap. Real users never see or fill the hidden `website` field.
  // If it is populated, silently accept (so bots don't retry) without sending any email.
  if (typeof data?.website === "string" && data.website.trim() !== "") {
    return NextResponse.json({ success: true, source: "secure-config-v1" })
  }

  // Security: Validate contact form data
  const dataValidation = validateContactData(data)
  if (!dataValidation.valid) {
    return NextResponse.json({ 
      error: "入力データに問題があります",
      details: dataValidation.errors
    }, { status: 400 })
  }

  const {
    name,
    company,
    email,
    phone,
    inquiryType,
    services,
    otherService,
    budget,
    due,
    url,
    details,
    attachment,
    preferredContact,
  } = data

  // Sanitize before interpolating into the email body: collapse CR/LF in single-line
  // fields (prevents body/pseudo-header injection) and cap lengths.
  const line = (v: unknown, max = 200) =>
    String(v ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max)
  const block = (v: unknown, max = 2000) => String(v ?? "").trim().slice(0, max)
  const list = (v: unknown, max = 300) =>
    (Array.isArray(v) ? v.map((x) => String(x)).join(", ") : String(v ?? "")).slice(0, max)

  const text = `名前: ${line(name, 100)}
会社名: ${line(company, 100)}
メール: ${line(email, 254)}
電話番号: ${line(phone, 50)}
種別: ${line(inquiryType, 50)}
制作内容: ${list(services)} ${otherService ? '(' + line(otherService, 100) + ')' : ''}
予算感: ${line(budget, 50)}
希望納期: ${line(due, 100)}
URL: ${line(url, 300)}
詳細: ${block(details)}
希望連絡方法: ${list(preferredContact)}`

  const safeName = line(name, 100)

  console.log("📧 Sending contact form submission (runtime-config):", {
    name: safeName,
    email: line(email, 254),
    inquiryType: line(inquiryType, 50),
    services: list(services) + (otherService ? ` (${line(otherService, 100)})` : ''),
    timestamp: new Date().toISOString(),
    configSource: 'runtime-config'
  })

  try {
    // Send notification email to LEXIA
    await resend.emails.send({
      from: config.resend.from,
      to: [config.resend.to],
      reply_to: email,
      subject: "新しいお問い合わせ",
      text,
      attachments: attachment ? [
        {
          filename: attachment.name,
          content: attachment.content,
        },
      ] : [],
    })

    // Send confirmation email to user
    await resend.emails.send({
      from: config.resend.from,
      to: [email],
      subject: "お問い合わせありがとうございます - LEXIA",
      text: `${safeName} 様

この度は、LEXIAにお問い合わせいただき、誠にありがとうございます。

お送りいただいた内容を確認いたしました。
担当者より、2営業日以内にご連絡させていただきます。

今後ともLEXIAをよろしくお願いいたします。

---
LEXIA チーム
Email: lexia0web@gmail.com`,
    })

    console.log("✅ Emails sent successfully (runtime-config)")
  } catch (e) {
    // Log only a message, never the full error object (may contain keys/PII).
    console.error("❌ Email sending failed (runtime-config):", e instanceof Error ? e.message : "unknown error")
    return NextResponse.json({ error: "メール送信に失敗しました" }, { status: 500 })
  }

  return NextResponse.json({ 
    success: true, 
    source: "secure-config-v1",
    remaining: rateLimitResult.remaining
  })
}
