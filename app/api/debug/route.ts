import { NextResponse } from 'next/server'

export async function GET() {
  const envVars = {
    // microCMS関連
    LEXIA_MICROCMS_DOMAIN: process.env.LEXIA_MICROCMS_DOMAIN ? '✓ Set' : '✗ Missing',
    LEXIA_MICROCMS_API_KEY: process.env.LEXIA_MICROCMS_API_KEY ? '✓ Set' : '✗ Missing',
    NEXT_PUBLIC_MICROCMS_DOMAIN: process.env.NEXT_PUBLIC_MICROCMS_DOMAIN ? '✓ Set' : '✗ Missing',
    MICROCMS_API_KEY: process.env.MICROCMS_API_KEY ? '✓ Set' : '✗ Missing',
    
    // その他の環境変数
    RESEND_API_KEY: process.env.RESEND_API_KEY ? '✓ Set' : '✗ Missing',
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID ? '✓ Set' : '✗ Missing',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ? '✓ Set' : '✗ Missing',
    
    // Node.js環境情報
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL ? '✓ Running on Vercel' : '✗ Not on Vercel'
  }

  // microCMS接続テスト
  let microCMSTest = 'Not tested'
  const domain = process.env.LEXIA_MICROCMS_DOMAIN || process.env.NEXT_PUBLIC_MICROCMS_DOMAIN
  const apiKey = process.env.LEXIA_MICROCMS_API_KEY || process.env.MICROCMS_API_KEY

  if (domain && apiKey) {
    try {
      const testUrl = `https://${domain}.microcms.io/api/v1/projects`
      const response = await fetch(testUrl, {
        headers: {
          'X-MICROCMS-API-KEY': apiKey
        }
      })
      
      if (response.ok) {
        microCMSTest = '✓ Connection successful'
      } else {
        microCMSTest = `✗ HTTP ${response.status}: ${response.statusText}`
      }
    } catch (error) {
      microCMSTest = `✗ Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  } else {
    microCMSTest = '✗ Missing domain or API key'
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: envVars,
    microCMSTest,
    recommendations: [
      domain ? null : 'Set LEXIA_MICROCMS_DOMAIN environment variable',
      apiKey ? null : 'Set LEXIA_MICROCMS_API_KEY environment variable',
      'Verify microCMS service has "projects" endpoint configured',
      'Check API key permissions in microCMS dashboard'
    ].filter(Boolean)
  })
}
