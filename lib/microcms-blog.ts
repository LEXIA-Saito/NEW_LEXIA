import "server-only"

import { microcmsFetch, type MicroCMSListResponse } from "./microcms"
import type { BlogPost, BlogGenre } from "./blog-posts.types"
import { withComputedReadingTime } from "./reading-time"

/**
 * microCMSから取得するブログ記事の型定義
 * microCMSのAPIスキーマに合わせて調整してください
 */
export type MicroCMSBlogPost = {
  id: string
  slug: string
  title: string
  description: string
  genre: BlogGenre
  tags: string[]
  date: string
  heroImage?: string
  sections: {
    heading?: string
    body?: string[]
    list?: string[]
    image?: string
  }[]
  publishedAt?: string
  updatedAt?: string
}

/**
 * microCMSの記事データをアプリケーション内部の型に変換
 */
function convertMicroCMSPost(post: MicroCMSBlogPost): BlogPost & { readingTime: string } {
  const blogPost: BlogPost = {
    slug: post.slug,
    title: post.title,
    description: post.description,
    genre: post.genre,
    tags: post.tags,
    date: post.date,
    heroImage: post.heroImage,
    sections: post.sections,
    // readingTimeはフォールバックとして設定（後で自動計算される）
    readingTime: "5分",
  }

  return withComputedReadingTime(blogPost)
}

/**
 * microCMSから全ブログ記事を取得
 * @param limit 取得する記事数（デフォルト: 100）
 */
export async function fetchMicroCMSBlogPosts(
  limit = 100,
): Promise<(BlogPost & { readingTime: string })[]> {
  try {
    const response = await microcmsFetch<MicroCMSListResponse<MicroCMSBlogPost>>(
      "blog", // microCMSのエンドポイント名（適宜変更してください）
      {
        limit,
        orders: "-date", // 日付の降順でソート
      },
      {
        next: {
          revalidate: 60, // 60秒ごとに再検証
          tags: ["microcms-blog"],
        },
      },
    )

    return response.contents.map(convertMicroCMSPost)
  } catch (error) {
    console.error("Failed to fetch blog posts from microCMS:", error)
    throw error
  }
}

/**
 * microCMSから特定のスラッグの記事を取得
 * @param slug 記事のスラッグ
 */
export async function fetchMicroCMSBlogPost(
  slug: string,
): Promise<(BlogPost & { readingTime: string }) | null> {
  try {
    const response = await microcmsFetch<MicroCMSListResponse<MicroCMSBlogPost>>(
      "blog",
      {
        filters: `slug[equals]${slug}`,
        limit: 1,
      },
      {
        next: {
          revalidate: 60,
          tags: [`microcms-blog-${slug}`],
        },
      },
    )

    if (response.contents.length === 0) {
      return null
    }

    return convertMicroCMSPost(response.contents[0])
  } catch (error) {
    console.error(`Failed to fetch blog post "${slug}" from microCMS:`, error)
    throw error
  }
}
