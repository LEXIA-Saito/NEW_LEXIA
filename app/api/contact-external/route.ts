import { NextResponse } from "next/server"
import { Resend } from "resend"
import { getExternalConfig } from "@/lib/external-config"

export async function POST(req: Request) {
  let externalConfig
  
  try {
    externalConfig = await getExternalConfig()
  } catch (error) {
    console.error("Failed to load external configuration:", error)
    return NextResponse.json({ 
      error: "設定の読み込みに失敗しました" 
    }, { status: 500 })
  }

  const resend = new Resend(externalConfig.resendApiKey)
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

  console.log("📧 Sending contact form submission (external-config):", {
    name,
    email,
    inquiryType,
    services: services.join(', ') + (otherService ? ` (${otherService})` : ''),
    timestamp: new Date().toISOString(),
    configSource: 'external-service'
  })

  try {
    // Send notification email to LEXIA
    await resend.emails.send({
      from: externalConfig.emailSettings.from,
      to: [externalConfig.emailSettings.to],
      reply_to: email,
      subject: "新しいお問い合わせ (External Config)",
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
      from: externalConfig.emailSettings.from,
      to: [email],
      subject: "お問い合わせありがとうございます",
      text: "お問い合わせありがとうございます。内容を確認し、担当者よりご連絡いたします。",
    })

    console.log("✅ Emails sent successfully (external-config)")
  } catch (e) {
    console.error("❌ Email sending failed (external-config):", e)
    return NextResponse.json({ error: "メール送信に失敗しました" }, { status: 500 })
  }

  return NextResponse.json({ success: true, version: "external-config", source: "external-service" })
}