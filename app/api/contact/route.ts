import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY ?? "")
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

  try {
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

    await resend.emails.send({
      from: "LEXIA <noreply@lexia-hp.com>",
      to: [email],
      subject: "お問い合わせありがとうございます",
      text: "お問い合わせありがとうございます。内容を確認し、担当者よりご連絡いたします。",
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "failed" }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
