import { getPost } from "@/lib/microcms"
import { NextResponse } from "next/server"

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await getPost(params.slug)
    const response = {
      ...post,
      date: post.publishedAt ?? (post as any).date,
    }
    console.log('取得した記事データ:', {
      title: response.title,
    })
    return NextResponse.json(response)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "not found" }, { status: 404 })
  }
}
