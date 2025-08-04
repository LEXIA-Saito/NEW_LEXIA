import { NextResponse } from "next/server"
import { getProjects } from "@/lib/microcms"

export async function GET() {
  try {
    console.log("Fetching projects from microCMS...")

    const projects = await getProjects()

    console.log(`Successfully fetched ${projects.length} projects`)

    return NextResponse.json(projects, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    })
  } catch (error: any) {
    console.error("Error in projects API route:", error)

    // エラーの詳細をログに出力
    if (error.response) {
      console.error("Response status:", error.response.status)
      console.error("Response data:", error.response.data)
    }

    return NextResponse.json(
      {
        error: "Failed to fetch projects",
        message: error.message,
        details: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}
