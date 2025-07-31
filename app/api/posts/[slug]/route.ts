import { getPost } from "@/lib/microcms"
import { NextResponse } from "next/server"

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await getPost(params.slug)
    console.log('取得した記事データ:', {
      title: post.title,
      authorType: typeof post.author,
      authorValue: post.author,
    })
    return NextResponse.json(post)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "not found" }, { status: 404 })
  }
}
