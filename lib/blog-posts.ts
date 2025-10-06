import { cache } from "react"

import { fallbackBlogPosts } from "./blog-posts-fallback"
import type { BlogPost, BlogPostSection, BlogGenre } from "./blog-posts.types"

// Static genre metadata kept for compatibility with UI components
const GENRE_METADATA: Record<BlogGenre, { label: string; description: string }> = {
  tech: {
    label: "技術（Tech）",
    description: "制作現場で活用している技術やツールの知見をまとめています。",
  },
  ideas: {
    label: "アイデア（Ideas）",
    description: "戦略や思考法、取り組みの背景などを深掘りするコラムです。",
  },
}

const BLOG_GENRE_LIST = (Object.keys(GENRE_METADATA) as BlogGenre[]).map((id) => ({
  id,
  ...GENRE_METADATA[id],
}))

// IMPORTANT: Blog microCMS integration removed.
// The blog now uses the local `fallbackBlogPosts` data only.

async function fetchLocalBlogPosts(): Promise<BlogPost[]> {
  return fallbackBlogPosts
}

async function fetchLocalBlogPost(slug: string): Promise<BlogPost | undefined> {
  return fallbackBlogPosts.find((post) => post.slug === slug)
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
