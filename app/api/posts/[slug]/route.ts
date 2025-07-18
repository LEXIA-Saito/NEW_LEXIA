import { getPost } from '@/lib/microcms'
import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const post = await getPost(params.slug)
    return NextResponse.json(post)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}
