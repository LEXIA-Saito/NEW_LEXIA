export type BlogPostSection = {
  heading?: string
  body?: string[]
  image?: string
  list?: string[]
}

export type BlogGenre = "tech" | "ideas"

export type BlogPost = {
  slug: string
  title: string
  description: string
  genre: BlogGenre
  tags: string[]
  date: string
  readingTime: string
  heroImage?: string
  sections?: BlogPostSection[]
  contentHtml?: string
}
