import { NextResponse } from "next/server"
import { Resend } from "resend"
import { config, validateConfig } from "@/lib/config"

export async function POST(req: Request) {
  // Validate configuration
  const configValidation = validateConfig()
  if (!configValidation.isValid) {
    console.error("Configuration validation failed:", configValidation.issues)
    return NextResponse.json({ 
      error: "サーバー設定エラー",
      details: process.env.NODE_ENV === 'development' ? configValidation.issues : undefined
    }, { status: 500 })
  }

  const resend = new Resend(config.resend.apiKey)
  const data = await req.json()
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

  console.log("📧 Sending contact form submission (v2):", {
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
      subject: "新しいお問い合わせ (v2)",
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
      subject: "お問い合わせありがとうございます",
      text: "お問い合わせありがとうございます。内容を確認し、担当者よりご連絡いたします。",
    })

    console.log("✅ Emails sent successfully (v2)")
  } catch (e) {
    console.error("❌ Email sending failed (v2):", e)
    return NextResponse.json({ error: "メール送信に失敗しました" }, { status: 500 })
  }

  return NextResponse.json({ success: true, version: "v2", source: "runtime-config" })
}