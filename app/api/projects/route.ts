import { NextResponse } from "next/server"
import { getProjects } from "@/lib/microcms"

export async function GET() {
  try {
    console.log("API Route: Fetching projects...")
    const projects = await getProjects()
    console.log(`API Route: Retrieved ${projects.length} projects`)

    return NextResponse.json(projects, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    })
  } catch (error) {
    console.error("API Route Error:", error)
    return NextResponse.json(
      { error: "Failed to fetch projects", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
