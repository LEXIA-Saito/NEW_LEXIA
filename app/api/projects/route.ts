import { NextResponse } from "next/server"
import { getProjects, getFallbackProjects } from "@/lib/microcms"

export async function GET() {
  try {
    console.log("API Route: Fetching projects...")
    const projects = await getProjects()
    
    // microCMSからデータが取得できない場合はフォールバックデータを使用
    if (projects.length === 0) {
      console.log("API Route: No projects from microCMS, using fallback data")
      const fallbackProjects = getFallbackProjects()
      
      return NextResponse.json(fallbackProjects, {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          "X-Data-Source": "fallback",
        },
      })
    }
    
    console.log(`API Route: Retrieved ${projects.length} projects from microCMS`)

    return NextResponse.json(projects, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        "X-Data-Source": "microcms",
      },
    })
  } catch (error) {
    console.error("API Route Error:", error)
    
    // エラーが発生した場合もフォールバックデータを返す
    console.log("API Route: Error occurred, using fallback data")
    const fallbackProjects = getFallbackProjects()
    
    return NextResponse.json(fallbackProjects, {
      status: 200, // エラーではなく成功として返す
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        "X-Data-Source": "fallback-error",
        "X-Error-Message": error instanceof Error ? error.message : "Unknown error",
      },
    })
  }
}
