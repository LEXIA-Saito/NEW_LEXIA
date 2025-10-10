export type BlogPostSection = {
  heading?: string
  body?: string[]
  image?: string
  imageAlt?: string
  list?: string[]
  table?: {
    headers: string[]
    rows: string[][]
  }
}

export type BlogGenre = "tech" | "trends" | "ideas"

export type BlogPost = {
  slug: string
  title: string
  description: string
  genre: BlogGenre
  tags: string[]
  date: string
  readingTime: string
  heroImage?: string
  heroImageAlt?: string
  sections?: BlogPostSection[]
  contentHtml?: string
}
