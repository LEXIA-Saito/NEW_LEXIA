import { cache } from "react"

import { fallbackBlogPosts } from "./blog-posts-fallback"
import { withComputedReadingTime } from "./reading-time"
import { fetchMicroCMSBlogPosts, fetchMicroCMSBlogPost } from "./microcms-blog"
import type { BlogPost, BlogPostSection, BlogGenre } from "./blog-posts.types"

// Static genre metadata kept for compatibility with UI components
const GENRE_METADATA: Record<BlogGenre, { label: string; description: string }> = {
  tech: {
    label: "技術・実装（Tech / Implementation）",
    description: "コード解説、ライブラリ紹介、API使い方、フレームワーク分析など。開発者・技術担当者向け。",
  },
  trends: {
    label: "トレンド・先端（Trends / Innovation）",
    description: "新技術動向、AI／Web界隈の最新潮流、業界の変化予測。今何が来ているかを素早く把握。",
  },
  ideas: {
    label: "戦略・構想（Strategy / Ideas）",
    description: "Web制作戦略、コンセプト設計、UX思想、プロセス論など。技術以外の視点で深掘り。",
  },
}

const BLOG_GENRE_LIST = (Object.keys(GENRE_METADATA) as BlogGenre[]).map((id) => ({
  id,
  ...GENRE_METADATA[id],
}))

// --- microCMS Integration ------------------------------------------------
// Blog posts are fetched from microCMS.
// If microCMS is unavailable, fallback to local data in blog-posts-fallback.ts

// --- Reading Time Calculation ------------------------------------------------
// NOTE: Reading time calculation logic has been moved to lib/reading-time.ts
// for better reusability across the application.

async function fetchAllBlogPosts(): Promise<(BlogPost & { readingTime: string })[]> {
  try {
    // microCMSから記事を取得
    const microCMSPosts = await fetchMicroCMSBlogPosts()
    
    // fallbackBlogPostsも含める
    const fallbackPostsWithReadingTime = fallbackBlogPosts.map(withComputedReadingTime)
    
    // 重複を避けるため、microCMSにあるスラッグはfallbackから除外
    const microCMSPostSlugs = new Set(microCMSPosts.map(post => post.slug))
    const uniqueFallbackPosts = fallbackPostsWithReadingTime.filter(
      post => !microCMSPostSlugs.has(post.slug)
    )
    
    // microCMS記事とfallback記事を結合
    const allPosts = [...microCMSPosts, ...uniqueFallbackPosts]
    
    // 日付順でソート
    return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.warn('microCMS fetch failed, using fallback posts only:', error)
    // microCMSが利用できない場合はfallbackBlogPostsのみを使用
    return fallbackBlogPosts.map(withComputedReadingTime)
  }
}

async function fetchSingleBlogPost(slug: string): Promise<(BlogPost & { readingTime: string }) | undefined> {
  try {
    // まずmicroCMSから取得を試行
    const microCMSPost = await fetchMicroCMSBlogPost(slug)
    if (microCMSPost) {
      return microCMSPost
    }
  } catch (error) {
    console.warn(`microCMS fetch failed for slug ${slug}, trying fallback:`, error)
  }
  
  // microCMSにない場合はfallbackBlogPostsから取得
  const fallbackPost = fallbackBlogPosts.find((post) => post.slug === slug)
  return fallbackPost ? withComputedReadingTime(fallbackPost) : undefined
}

export const fetchBlogPosts = cache(fetchAllBlogPosts)

export const fetchBlogPost = cache(fetchSingleBlogPost)

export { fallbackBlogPosts as blogPosts }
export const BLOG_GENRES = BLOG_GENRE_LIST

export function getBlogGenreLabel(genre: BlogGenre): string {
  return GENRE_METADATA[genre].label
}

export function getBlogGenreDescription(genre: BlogGenre): string {
  return GENRE_METADATA[genre].description
}

export type { BlogPost, BlogPostSection, BlogGenre }
