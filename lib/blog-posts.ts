import "server-only"

import { cache } from "react"

import { fallbackBlogPosts } from "./blog-posts-fallback"
import type { BlogPost, BlogPostSection } from "./blog-posts.types"
import { microcmsFetch, MicroCMSApiError, type MicroCMSListResponse } from "./microcms"

const blogEndpoint = process.env.MICROCMS_BLOG_ENDPOINT || "blog"
const isConfigured = Boolean(
  process.env.MICROCMS_SERVICE_DOMAIN && process.env.MICROCMS_API_KEY,
)

type MicroCMSImageField = {
  url: string
}

type MicroCMSBlogContent = {
  id: string
  slug?: string
  title: string
  description?: string
  category?: string
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

  return {
    slug: post.slug || post.id,
    title: post.title,
    description: post.description || "",
    category: post.category || "未分類",
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
export type { BlogPost, BlogPostSection }
