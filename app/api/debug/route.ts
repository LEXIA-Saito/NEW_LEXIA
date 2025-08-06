import { NextResponse } from "next/server"

export async function GET() {
  const debugInfo = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    environmentVariables: {
      LEXIA_MICROCMS_DOMAIN: process.env.LEXIA_MICROCMS_DOMAIN ? "✓ Set" : "✗ Missing",
      LEXIA_MICROCMS_API_KEY: process.env.LEXIA_MICROCMS_API_KEY ? "✓ Set" : "✗ Missing",
      NEXT_PUBLIC_MICROCMS_DOMAIN: process.env.NEXT_PUBLIC_MICROCMS_DOMAIN ? "✓ Set" : "✗ Missing",
      MICROCMS_API_KEY: process.env.MICROCMS_API_KEY ? "✓ Set" : "✗ Missing",
    },
    actualValues: {
      LEXIA_MICROCMS_DOMAIN: process.env.LEXIA_MICROCMS_DOMAIN || "undefined",
      LEXIA_MICROCMS_API_KEY: process.env.LEXIA_MICROCMS_API_KEY ? "[REDACTED]" : "undefined",
      NEXT_PUBLIC_MICROCMS_DOMAIN: process.env.NEXT_PUBLIC_MICROCMS_DOMAIN || "undefined",
      MICROCMS_API_KEY: process.env.MICROCMS_API_KEY ? "[REDACTED]" : "undefined",
    },
    constructedUrl: process.env.LEXIA_MICROCMS_DOMAIN 
      ? `https://${process.env.LEXIA_MICROCMS_DOMAIN}.microcms.io/api/v1/projects`
      : "Cannot construct URL - domain missing",
  }

  return NextResponse.json(debugInfo, {
    headers: {
      "Cache-Control": "no-cache",
    },
  })
}
