import { NextResponse } from "next/server"

export async function GET() {
  const serviceDomain = process.env.LEXIA_MICROCMS_DOMAIN
  const apiKey = process.env.LEXIA_MICROCMS_API_KEY

  return NextResponse.json({
    hasServiceDomain: !!serviceDomain,
    serviceDomain: serviceDomain ? `${serviceDomain.substring(0, 5)}...` : null,
    hasApiKey: !!apiKey,
    apiKeyPrefix: apiKey ? `${apiKey.substring(0, 8)}...` : null,
    nodeEnv: process.env.NODE_ENV,
  })
}
