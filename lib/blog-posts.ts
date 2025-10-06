import "server-only"

import { cache } from "react"

import { fallbackBlogPosts } from "./blog-posts-fallback"
import type { BlogPost, BlogPostSection, BlogGenre } from "./blog-posts.types"
import { microcmsFetch, MicroCMSApiError, type MicroCMSListResponse } from "./microcms"

const blogEndpoint = process.env.MICROCMS_BLOG_ENDPOINT || "blog"
const isConfigured = Boolean(
  process.env.MICROCMS_SERVICE_DOMAIN && process.env.MICROCMS_API_KEY,
)

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

function normalizeGenre(value?: string | null): BlogGenre {
  if (!value) {
    return "ideas"
  }

  const normalized = value.trim().toLowerCase()

  if (normalized.includes("tech") || normalized.includes("技術")) {
    return "tech"
  }

  return "ideas"
}

type MicroCMSTagField = string | { name?: string | null }

function extractTagName(tag: MicroCMSTagField): string | undefined {
  if (typeof tag === "string") {
    return tag.trim()
  }

  if (typeof tag === "object" && tag?.name) {
    return tag.name.trim()
  }

  return undefined
}

function normalizeTags(tags?: MicroCMSTagField[] | null): string[] {
  if (!tags || !Array.isArray(tags)) {
    return []
  }

  const normalized = tags
    .map(extractTagName)
    .filter((tag): tag is string => Boolean(tag && tag.length > 0))

  return Array.from(new Set(normalized)).slice(0, 3)
}

type MicroCMSImageField = {
  url: string
}

type MicroCMSBlogContent = {
  id: string
  slug?: string
  title: string
  description?: string
  category?: string
  genre?: string
  tags?: MicroCMSTagField[]
  readingTime?: string
  heroImage?: MicroCMSImageField | string
  sections?: BlogPostSection[]
  content?: string
  contentHtml?: string
  body?: string
  publishedAt?: string
  revisedAt?: string
  createdAt?: string
  updatedAt?: string
}

function mapMicroCMSBlog(post: MicroCMSBlogContent): BlogPost {
  const heroImage = typeof post.heroImage === "string" ? post.heroImage : post.heroImage?.url
  const firstDate = post.publishedAt || post.revisedAt || post.updatedAt || post.createdAt
  const genre = normalizeGenre(post.genre || post.category)
  const tags = normalizeTags(post.tags)

  return {
    slug: post.slug || post.id,
    title: post.title,
    description: post.description || "",
    genre,
    tags,
    date: firstDate || new Date().toISOString(),
    readingTime: post.readingTime || "約5分",
    heroImage,
    sections: post.sections && post.sections.length > 0 ? post.sections : undefined,
    contentHtml: post.contentHtml || post.content || post.body || undefined,
  }
}

async function fetchMicroCMSBlogPosts(): Promise<BlogPost[]> {
  if (!isConfigured) {
    return fallbackBlogPosts
  }

  try {
    const { contents } = await microcmsFetch<MicroCMSListResponse<MicroCMSBlogContent>>(blogEndpoint, {
      orders: "-publishedAt",
      limit: 100,
    })

    return contents.map(mapMicroCMSBlog)
  } catch (error) {
    console.error("[microcms] Failed to fetch blog posts", error)
    return fallbackBlogPosts
  }
}

async function fetchMicroCMSBlogPost(slug: string): Promise<BlogPost | undefined> {
  if (!isConfigured) {
    return fallbackBlogPosts.find((post) => post.slug === slug)
  }

  try {
    const result = await microcmsFetch<MicroCMSBlogContent>(`${blogEndpoint}/${slug}`)
    return mapMicroCMSBlog(result)
  } catch (error) {
    if (error instanceof MicroCMSApiError && error.status === 404) {
      try {
        const { contents } = await microcmsFetch<MicroCMSListResponse<MicroCMSBlogContent>>(blogEndpoint, {
          filters: `slug[equals]${slug}`,
          limit: 1,
        })
        const hit = contents[0]
        if (hit) {
          return mapMicroCMSBlog(hit)
        }
      } catch (nestedError) {
        console.error(`[microcms] Failed to fetch blog post by slug filter (${slug})`, nestedError)
      }
    } else {
      console.error(`[microcms] Failed to fetch blog post (${slug})`, error)
    }

    return fallbackBlogPosts.find((post) => post.slug === slug)
  }
}

export const fetchBlogPosts = cache(fetchMicroCMSBlogPosts)

export const fetchBlogPost = cache(fetchMicroCMSBlogPost)

export { fallbackBlogPosts as blogPosts }
export const BLOG_GENRES = BLOG_GENRE_LIST

export function getBlogGenreLabel(genre: BlogGenre): string {
  return GENRE_METADATA[genre].label
}

export function getBlogGenreDescription(genre: BlogGenre): string {
  return GENRE_METADATA[genre].description
}

export type { BlogPost, BlogPostSection, BlogGenre }
