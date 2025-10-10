import { cache } from "react"

import { fallbackBlogPosts } from "./blog-posts-fallback"
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
// NOTE: We auto-calculate reading time instead of using the static field in data.
// Heuristic: Count "words" where a word is either an alphanumeric sequence or a single CJK character.
// Then: minutes = ceil(words / 400). Minimum 1 minute.
// This keeps implementation simple and deterministic server-side.
const WORDS_PER_MINUTE = 400

function countWordsFromText(text: string): number {
  if (!text) return 0
  const matches = text.match(/[A-Za-z0-9]+|[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uF900-\uFAFF]/g)
  return matches ? matches.length : 0
}

function computeReadingTime(post: BlogPost): string {
  let totalWords = 0
  if (post.sections) {
    for (const section of post.sections) {
      if (section.heading) totalWords += countWordsFromText(section.heading)
      if (section.body) totalWords += section.body.reduce((sum, p) => sum + countWordsFromText(p), 0)
      if (section.list) totalWords += section.list.reduce((sum, li) => sum + countWordsFromText(li), 0)
      if (section.table) {
        totalWords += section.table.headers.reduce((sum, h) => sum + countWordsFromText(h), 0)
        for (const row of section.table.rows) {
          totalWords += row.reduce((sum, cell) => sum + countWordsFromText(cell), 0)
        }
      }
    }
  }
  // Fallback: if no sections, optionally inspect contentHtml (plain strip tags) but we skip for now.
  const minutes = Math.max(1, Math.ceil(totalWords / WORDS_PER_MINUTE))
  return `${minutes}分`
}

function withComputedReadingTime(post: BlogPost): BlogPost {
  return { ...post, readingTime: computeReadingTime(post) }
}

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
