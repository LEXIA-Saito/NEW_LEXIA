import { NextResponse } from "next/server"
import { Resend } from "resend"
import { getSecureConfig, validateSecureConfig } from "@/lib/secure-config"
import { contactRateLimiter, getClientIdentifier, validateContactData } from "@/lib/rate-limiter"

export async function POST(req: Request) {
  const startTime = Date.now()
  
  // Security: Rate limiting
  const clientId = getClientIdentifier(req)
  const rateLimitResult = contactRateLimiter.isAllowed(clientId)
  
  if (!rateLimitResult.allowed) {
    console.warn(`🚫 Rate limit exceeded for client: ${clientId}`)
    return NextResponse.json({ 
      error: "送信回数の制限に達しました。しばらく時間をおいてから再度お試しください。",
      retryAfter: rateLimitResult.resetTime 
    }, { 
      status: 429,
      headers: {
        'Retry-After': Math.ceil(((rateLimitResult.resetTime || Date.now()) - Date.now()) / 1000).toString()
      }
    })
  }

  // Security: Get and validate secure configuration
  let config
  try {
    config = getSecureConfig()
    const validation = validateSecureConfig(config)
    if (!validation.isValid) {
      console.error("❌ Secure configuration validation failed:", validation.issues)
      return NextResponse.json({ 
        error: "サーバー設定エラーが発生しました" 
      }, { status: 500 })
    }
  } catch (error) {
    console.error("❌ Failed to load secure configuration:", error)
    return NextResponse.json({ 
      error: "設定の読み込みに失敗しました" 
    }, { status: 500 })
  }

  // Parse and validate request data
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
    console.warn("⚠️ Invalid contact form data:", dataValidation.errors)
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

  // Sanitize data
  const sanitizedData = {
    name: name.trim(),
    company: company?.trim() || '',
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || '',
    inquiryType,
    services: Array.isArray(services) ? services : [],
    otherService: otherService?.trim() || '',
    budget: budget || '',
    due: due?.trim() || '',
    url: url?.trim() || '',
    details: details?.trim() || '',
    preferredContact: Array.isArray(preferredContact) ? preferredContact : []
  }

  const emailText = `名前: ${sanitizedData.name}
会社名: ${sanitizedData.company}
メール: ${sanitizedData.email}
電話番号: ${sanitizedData.phone}
種別: ${sanitizedData.inquiryType}
制作内容: ${sanitizedData.services.join(', ')} ${sanitizedData.otherService ? '(' + sanitizedData.otherService + ')' : ''}
予算感: ${sanitizedData.budget}
希望納期: ${sanitizedData.due}
URL: ${sanitizedData.url}
詳細: ${sanitizedData.details}
希望連絡方法: ${sanitizedData.preferredContact.join(', ')}

---
送信時刻: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
クライアントID: ${clientId}
処理時間: ${Date.now() - startTime}ms`

  console.log("🔒 Secure contact form submission:", {
    name: sanitizedData.name,
    email: sanitizedData.email,
    inquiryType: sanitizedData.inquiryType,
    services: sanitizedData.services.join(', ') + (sanitizedData.otherService ? ` (${sanitizedData.otherService})` : ''),
    timestamp: new Date().toISOString(),
    clientId,
    hasAttachment: !!attachment,
    processingTime: Date.now() - startTime
  })

  const resend = new Resend(config.resend.apiKey)

  try {
    // Send notification email to LEXIA
    const notificationResult = await resend.emails.send({
      from: config.resend.from,
      to: [config.resend.to],
      reply_to: sanitizedData.email,
      subject: `🔒 セキュア問い合わせ - ${sanitizedData.name}様`,
      text: emailText,
      attachments: attachment ? [
        {
          filename: attachment.name,
          content: attachment.content,
        },
      ] : [],
    })

    // Send confirmation email to user
    const confirmationResult = await resend.emails.send({
      from: config.resend.from,
      to: [sanitizedData.email],
      subject: "お問い合わせありがとうございます - LEXIA",
      text: `${sanitizedData.name} 様

この度は、LEXIAにお問い合わせいただき、誠にありがとうございます。

お送りいただいた内容を確認いたしました。
担当者より、2営業日以内にご連絡させていただきます。

お急ぎの場合は、お電話でのお問い合わせも承っております。

今後ともLEXIAをよろしくお願いいたします。

---
LEXIA チーム
Email: lexia0web@gmail.com
Website: https://lexia-hp.com

※このメールは自動送信です。`,
    })

    console.log("✅ Secure emails sent successfully:", {
      notification: notificationResult.data?.id,
      confirmation: confirmationResult.data?.id,
      processingTime: Date.now() - startTime
    })

    return NextResponse.json({ 
      success: true, 
      source: "secure-config",
      emailIds: {
        notification: notificationResult.data?.id,
        confirmation: confirmationResult.data?.id
      },
      remaining: rateLimitResult.remaining
    })

  } catch (error) {
    console.error("❌ Secure email sending failed:", error)
    
    // Don't expose detailed error information to client
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const isResendError = errorMessage.includes('resend') || errorMessage.includes('API')
    
    return NextResponse.json({ 
      error: isResendError 
        ? "メール送信サービスでエラーが発生しました。しばらく時間をおいてから再度お試しください。"
        : "送信中にエラーが発生しました。",
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

// Security: Only allow POST method
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
