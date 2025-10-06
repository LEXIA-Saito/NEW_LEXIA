export type BlogPostSection = {
  heading?: string
  body?: string[]
  list?: string[]
}

export type BlogPost = {
  slug: string
  title: string
  description: string
  category: string
  date: string
  readingTime: string
  heroImage?: string
  sections?: BlogPostSection[]
  contentHtml?: string
}
