import { getProjects } from "@/lib/microcms"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const projects = await getProjects()
    return NextResponse.json(projects)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "failed" }, { status: 500 })
  }
}
