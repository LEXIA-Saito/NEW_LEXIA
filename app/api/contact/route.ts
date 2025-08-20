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
    console.error("❌ Failed to load secure configuration:", error)
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

  const text = `名前: ${name}
会社名: ${company}
メール: ${email}
電話番号: ${phone}
種別: ${inquiryType}
制作内容: ${services.join(', ')} ${otherService ? '(' + otherService + ')' : ''}
予算感: ${budget}
希望納期: ${due}
URL: ${url}
詳細: ${details}
希望連絡方法: ${preferredContact ? preferredContact.join(', ') : ''}`

  console.log("📧 Sending contact form submission (runtime-config):", {
    name,
    email,
    inquiryType,
    services: services.join(', ') + (otherService ? ` (${otherService})` : ''),
    timestamp: new Date().toISOString(),
    configSource: 'runtime-config'
  })

  try {
    // Send notification email to LEXIA
    await resend.emails.send({
      from: config.resend.from,
      to: [config.resend.to],
      replyTo: email,
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
      text: `${name} 様

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
    console.error("❌ Email sending failed (runtime-config):", e)
    return NextResponse.json({ error: "メール送信に失敗しました" }, { status: 500 })
  }

  return NextResponse.json({ 
    success: true, 
    source: "secure-config-v1",
    remaining: rateLimitResult.remaining
  })
}
