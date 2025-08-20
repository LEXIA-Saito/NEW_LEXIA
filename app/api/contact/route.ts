import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(req: Request) {
  // Check if RESEND_API_KEY is configured
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey || apiKey === "" || apiKey === "test_key_for_development") {
    console.log("⚠️  RESEND_API_KEY not configured. Contact form data received but emails not sent.")
    return NextResponse.json({ 
      success: true, 
      message: "開発環境では実際のメール送信は行われません。本番環境ではRESEND_API_KEYを設定してください。" 
    })
  }

  const resend = new Resend(apiKey)
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

  console.log("📧 Sending contact form submission:", {
    name,
    email,
    inquiryType,
    services: services.join(', ') + (otherService ? ` (${otherService})` : ''),
    timestamp: new Date().toISOString()
  })

  try {
    // Send notification email to LEXIA
    await resend.emails.send({
      from: "LEXIA <noreply@lexia-hp.com>",
      to: ["lexia0web@gmail.com"],
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
      from: "LEXIA <noreply@lexia-hp.com>",
      to: [email],
      subject: "お問い合わせありがとうございます",
      text: "お問い合わせありがとうございます。内容を確認し、担当者よりご連絡いたします。",
    })

    console.log("✅ Emails sent successfully")
  } catch (e) {
    console.error("❌ Email sending failed:", e)
    return NextResponse.json({ error: "メール送信に失敗しました" }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
