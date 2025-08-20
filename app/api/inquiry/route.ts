import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY ?? "")
  const data = await req.json()
  const {
    name,
    nameKana,
    company,
    position,
    email,
    phone,
    existingWebsite,
    purposes,
    purposeDetails,
    targetAudience,
    currentChallenges,
    contents,
    otherContent,
    designImage,
    referencesite1,
    referencesite1Details,
    referencesite2,
    referencesite2Details,
    referencesite3,
    referencesite3Details,
    budget,
    serverDomain,
    materials,
    additionalRequests,
  } = data

  // Format purposes object to array
  const purposesArray = purposes ? Object.keys(purposes).filter(key => purposes[key]) : []
  
  // Format contents object to array  
  const contentsArray = contents ? Object.keys(contents).filter(key => contents[key]) : []
  
  // Reference sites formatting
  const referenceSites = [
    referencesite1 && `参考サイト1: ${referencesite1}${referencesite1Details ? ` - ${referencesite1Details}` : ''}`,
    referencesite2 && `参考サイト2: ${referencesite2}${referencesite2Details ? ` - ${referencesite2Details}` : ''}`,
    referencesite3 && `参考サイト3: ${referencesite3}${referencesite3Details ? ` - ${referencesite3Details}` : ''}`,
  ].filter(Boolean).join('\n')

  const text = `【LEXIA ホームページ制作ヒヤリングシート】

■ お客様情報
お名前: ${name}
ふりがな: ${nameKana}
会社名・団体名: ${company || '未記入'}
役職・部署名: ${position || '未記入'}
メールアドレス: ${email}
電話番号: ${phone}
既存のウェブサイト: ${existingWebsite || '未記入'}

■ ホームページについて
【目的・ゴール】
選択項目: ${purposesArray.join(', ')}
詳細: ${purposeDetails || '未記入'}

【ターゲット層】
${targetAudience || '未記入'}

【現在の課題やお悩み】
${currentChallenges || '未記入'}

【掲載したい主な内容・必要な機能】
選択項目: ${contentsArray.join(', ')}
${otherContent ? `その他詳細: ${otherContent}` : ''}

【デザインのイメージ・雰囲気】
${designImage || '未記入'}

【参考サイト】
${referenceSites || '未記入'}

【ご予算感】
${budget || '未記入'}

【サーバー・ドメインの準備状況】
${serverDomain || '未記入'}

【ロゴや写真素材の準備状況】
${materials || '未記入'}

【その他ご要望・ご質問など】
${additionalRequests || '未記入'}`

  try {
    // Send email to LEXIA
    await resend.emails.send({
      from: "LEXIA <noreply@lexia.com>",
      to: ["lexia0web@gmail.com"],
      replyTo: email,
      subject: "【ヒヤリングシート】新しいホームページ制作のご相談",
      text,
    })

    // Send confirmation email to customer
    await resend.emails.send({
      from: "LEXIA <noreply@lexia.com>",
      to: [email],
      subject: "ヒヤリングシートのご送信ありがとうございます",
      text: `${name} 様

この度は、LEXIAのホームページ制作ヒヤリングシートにご記入いただき、誠にありがとうございます。

いただいた内容を確認し、担当者よりご連絡いたします。
通常、2営業日以内にご連絡いたしますので、今しばらくお待ちください。

ご不明な点がございましたら、お気軽にお問い合わせください。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LEXIA
Email: lexia0web@gmail.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "failed" }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}