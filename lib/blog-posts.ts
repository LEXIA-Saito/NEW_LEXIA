import { cache } from "react"

import { fallbackBlogPosts } from "./blog-posts-fallback"
import { withComputedReadingTime } from "./reading-time"
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

// IMPORTANT: Blog microCMS integration removed.
// The blog now uses the local `fallbackBlogPosts` data only.

// --- Reading Time Calculation ------------------------------------------------
// NOTE: Reading time calculation logic has been moved to lib/reading-time.ts
// for better reusability across the application.

async function fetchLocalBlogPosts(): Promise<BlogPost[]> {
  return fallbackBlogPosts.map(withComputedReadingTime)
}

async function fetchLocalBlogPost(slug: string): Promise<BlogPost | undefined> {
  const found = fallbackBlogPosts.find((post) => post.slug === slug)
  return found ? withComputedReadingTime(found) : undefined
}

export const fetchBlogPosts = cache(fetchLocalBlogPosts)

export const fetchBlogPost = cache(fetchLocalBlogPost)

export { fallbackBlogPosts as blogPosts }
export const BLOG_GENRES = BLOG_GENRE_LIST

export function getBlogGenreLabel(genre: BlogGenre): string {
  return GENRE_METADATA[genre].label
}

export function getBlogGenreDescription(genre: BlogGenre): string {
  return GENRE_METADATA[genre].description
}

export type { BlogPost, BlogPostSection, BlogGenre }
