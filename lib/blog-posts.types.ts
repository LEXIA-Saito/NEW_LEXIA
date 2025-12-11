/**
 * Blog post types for LEXIA blog
 */

/** Section within a blog post */
export interface BlogPostSection {
  heading?: string
  body?: string[]
  richtext?: string
  image?: string
  imageAlt?: string
  list?: string[]
  table?: {
    headers: string[]
    rows: string[][]
  }
}

/** Available blog genres */
export type BlogGenre = "AI" | "Frontend" | "Backend" | "Update" | "Full-stack" | "Security" | "Api" | "tech"

/** Heading extracted from blog content */
export interface BlogHeading {
  text: string
  level: 2 | 3 | 4 | 5 | 6
}

/** Custom content block for new microCMS schema */
export interface BlogCustomBlock {
  body_text?: string
  body_img?: string
  others_cta?: {
    id: string
    slug?: string
    title?: string
  }
}

/** Main blog post type */
export interface BlogPost {
  slug: string
  title: string
  description: string
  genre: BlogGenre
  tags?: string[]
  date: string
  latest_update?: string
  readingTime?: string
  heroImage?: string
  heroImageAlt?: string
  sections?: BlogPostSection[]
  contentHtml?: string
  headings?: BlogHeading[]
  custom?: BlogCustomBlock[]
}
