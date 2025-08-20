import { NextResponse } from "next/server"

export async function GET() {
  const envInfo = {
    hasResendKey: !!process.env.RESEND_API_KEY,
    keyLength: process.env.RESEND_API_KEY?.length || 0,
    keyPrefix: process.env.RESEND_API_KEY?.substring(0, 3) || 'none',
    nodeEnv: process.env.NODE_ENV || 'undefined',
    vercelEnv: process.env.VERCEL_ENV || 'undefined',
    isVercel: !!process.env.VERCEL,
    timestamp: new Date().toISOString(),
    // Don't expose the actual key for security
    availableEnvVars: Object.keys(process.env).filter(key => 
      key.startsWith('RESEND') || 
      key.startsWith('VERCEL') || 
      key === 'NODE_ENV'
    )
  }

  return NextResponse.json(envInfo)
}

export async function POST() {
  // Test Resend initialization
  try {
    const { Resend } = await import('resend')
    const apiKey = process.env.RESEND_API_KEY
    
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'RESEND_API_KEY not found',
        debug: {
          hasKey: false,
          keyLength: 0
        }
      }, { status: 500 })
    }

    const resend = new Resend(apiKey)
    
    // Try to send a test email to verify the configuration
    await resend.emails.send({
      from: 'LEXIA <noreply@lexia-hp.com>',
      to: ['lexia0web@gmail.com'],
      subject: 'Vercel環境変数テスト',
      text: `環境変数テストが成功しました。\n時刻: ${new Date().toISOString()}\n環境: ${process.env.VERCEL_ENV || 'development'}`
    })

    return NextResponse.json({
      success: true,
      message: 'Resend API test successful',
      debug: {
        hasKey: true,
        keyLength: apiKey.length,
        keyPrefix: apiKey.substring(0, 3)
      }
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Resend API test failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      debug: {
        hasKey: !!process.env.RESEND_API_KEY,
        keyLength: process.env.RESEND_API_KEY?.length || 0
      }
    }, { status: 500 })
  }
}