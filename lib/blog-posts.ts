import { cache } from "react"

import { fallbackBlogPosts } from "./blog-posts-fallback"
import { withComputedReadingTime } from "./reading-time"
import { fetchMicroCMSBlogPosts, fetchMicroCMSBlogPost } from "./microcms-blog"
import type { BlogPost, BlogPostSection, BlogGenre } from "./blog-posts.types"

// Static genre metadata kept for compatibility with UI components
const GENRE_METADATA: Record<BlogGenre, { label: string; description: string }> = {
  AI: {
    label: "AI",
    description: "AI、機械学習、LLM、ChatGPT、Copilotなど最新AI技術の活用事例や実装ガイド。",
  },
  Frontend: {
    label: "フロントエンド",
    description: "React、Next.js、Vue.js、TypeScriptなどフロントエンド技術の解説とベストプラクティス。",
  },
  Backend: {
    label: "バックエンド",
    description: "サーバーサイド開発、API設計、データベース、インフラ構築など。",
  },
  Update: {
    label: "アップデート",
    description: "技術トレンド、新機能リリース、フレームワークアップデート情報。",
  },
  "Full-stack": {
    label: "フルスタック",
    description: "フロントエンドからバックエンドまで、フルスタック開発の総合的な解説。",
  },
  Security: {
    label: "セキュリティ",
    description: "Webセキュリティ、脆弱性対策、認証・認可、HTTPS、CSPなど。",
  },
  Api: {
    label: "API",
    description: "REST API、GraphQL、API設計、マイクロサービス、API統合など。",
  },
}

const BLOG_GENRE_LIST = (Object.keys(GENRE_METADATA) as BlogGenre[]).map((id) => ({
  id,
  ...GENRE_METADATA[id],
}))

// --- microCMS Integration ------------------------------------------------
// Blog posts are fetched from microCMS.
// If microCMS is unavailable, fallback to local data in blog-posts-fallback.ts

// Temporary: Exclude problematic slugs from microCMS
const EXCLUDED_SLUGS: string[] = []

// --- Reading Time Calculation ------------------------------------------------
// NOTE: Reading time calculation logic has been moved to lib/reading-time.ts
// for better reusability across the application.

async function fetchAllBlogPosts(): Promise<(BlogPost & { readingTime: string })[]> {
  try {
    // microCMSから記事を取得
    const microCMSPosts = await fetchMicroCMSBlogPosts()
    console.log(`[fetchAllBlogPosts] Fetched ${microCMSPosts.length} posts from microCMS`)
    if (microCMSPosts.length > 0) {
      console.log(`[fetchAllBlogPosts] microCMS slugs:`, microCMSPosts.map(p => p.slug))
    }
    
    // 除外対象のスラッグをフィルタリング
    const filteredMicroCMSPosts = microCMSPosts.filter(
      post => !EXCLUDED_SLUGS.includes(post.slug)
    )
    if (filteredMicroCMSPosts.length !== microCMSPosts.length) {
      console.warn(`[fetchAllBlogPosts] Excluded ${microCMSPosts.length - filteredMicroCMSPosts.length} problematic posts`)
    }
    
    // fallbackBlogPostsも含める
    const fallbackPostsWithReadingTime = fallbackBlogPosts.map(withComputedReadingTime)
    
    // 重複を避けるため、microCMSにあるスラッグはfallbackから除外
    const microCMSPostSlugs = new Set(filteredMicroCMSPosts.map(post => post.slug))
    const uniqueFallbackPosts = fallbackPostsWithReadingTime.filter(
      post => !microCMSPostSlugs.has(post.slug)
    )
    
    // microCMS記事とfallback記事を結合
    const allPosts = [...filteredMicroCMSPosts, ...uniqueFallbackPosts]
    console.log(`[fetchAllBlogPosts] Total posts: ${allPosts.length} (microCMS: ${filteredMicroCMSPosts.length}, fallback: ${uniqueFallbackPosts.length})`)
    
    // 日付順でソート
    return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.warn('[fetchAllBlogPosts] microCMS fetch failed, using fallback posts only:', error)
    // microCMSが利用できない場合はfallbackBlogPostsのみを使用
    return fallbackBlogPosts.map(withComputedReadingTime)
  }
}

async function fetchSingleBlogPost(slug: string): Promise<(BlogPost & { readingTime: string }) | undefined> {
  console.log(`[fetchSingleBlogPost] Fetching post with slug: ${slug}`)
  
  // 除外対象のスラッグは即座にundefinedを返す
  if (EXCLUDED_SLUGS.includes(slug)) {
    console.warn(`[fetchSingleBlogPost] Slug is in exclusion list: ${slug}`)
    return undefined
  }
  
  try {
    // まずmicroCMSから取得を試行
    const microCMSPost = await fetchMicroCMSBlogPost(slug)
    if (microCMSPost) {
      console.log(`[fetchSingleBlogPost] Found in microCMS: ${slug}`)
      return microCMSPost
    }
    console.log(`[fetchSingleBlogPost] Not found in microCMS: ${slug}`)
  } catch (error) {
    console.warn(`[fetchSingleBlogPost] microCMS fetch failed for slug ${slug}, trying fallback:`, error)
  }
  
  // microCMSにない場合はfallbackBlogPostsから取得
  const fallbackPost = fallbackBlogPosts.find((post) => post.slug === slug)
  if (fallbackPost) {
    console.log(`[fetchSingleBlogPost] Found in fallback: ${slug}`)
  } else {
    console.warn(`[fetchSingleBlogPost] Not found anywhere: ${slug}`)
  }
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
