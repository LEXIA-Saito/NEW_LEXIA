import { getPosts } from "@/lib/microcms"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const posts = await getPosts()
    return NextResponse.json(posts)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "failed" }, { status: 500 })
  }
}
