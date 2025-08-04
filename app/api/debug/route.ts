import { NextResponse } from "next/server"
import { getProjects } from "@/lib/microcms"

export async function GET() {
  try {
    // 環境変数の確認
    const envCheck = {
      LEXIA_MICROCMS_DOMAIN: process.env.LEXIA_MICROCMS_DOMAIN ? "✓ Set" : "✗ Missing",
      LEXIA_MICROCMS_API_KEY: process.env.LEXIA_MICROCMS_API_KEY ? "✓ Set" : "✗ Missing",
      NODE_ENV: process.env.NODE_ENV,
    }

    console.log("Environment variables check:", envCheck)

    // microCMSからのデータ取得テスト
    let projectsData = []
    let microCMSError = null

    try {
      projectsData = await getProjects()
      console.log(`Successfully fetched ${projectsData.length} projects from microCMS`)
    } catch (error: any) {
      microCMSError = error.message
      console.error("microCMS fetch error:", error)
    }

    return NextResponse.json({
      success: true,
      environment: envCheck,
      microCMS: {
        connected: !microCMSError,
        error: microCMSError,
        projectsCount: projectsData.length,
        projects: projectsData.slice(0, 3), // 最初の3つのプロジェクトのみ表示
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Debug API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
