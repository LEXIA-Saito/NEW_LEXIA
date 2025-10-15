export type BlogPostSection = {
  heading?: string
  body?: string[]
  richtext?: string  // リッチエディタV2（HTML）
  image?: string
  imageAlt?: string
  list?: string[]
  table?: {
    headers: string[]
    rows: string[][]
  }
}

export type BlogGenre = "AI" | "Frontend" | "Backend" | "Update" | "Full-stack" | "Security" | "Api"

export type BlogPost = {
  slug: string
  title: string
  description: string
  genre: BlogGenre
  tags?: string[] // オプショナルに変更（microCMSスキーマから削除された）
  date: string
  readingTime?: string // オプショナルに変更（計算時に自動設定）
  heroImage?: string
  heroImageAlt?: string
  sections?: BlogPostSection[]
  contentHtml?: string
}
