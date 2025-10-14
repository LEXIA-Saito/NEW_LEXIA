import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'ph9ufk4r',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: process.env.SANITY_API_VERSION || '2025-10-01',
  useCdn: true,
})

export type SanityImage = {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
}

export type SanityBlogSection = {
  _type: 'section'
  heading?: string
  body?: string[]
  image?: string
  imageAlt?: string
  list?: string[]
  table?: {
    headers: string[]
    rows: Array<{ cells: string[] }>
  }
}

export type SanityBlogPost = {
  _id: string
  slug: string
  title: string
  description: string
  genre: 'tech' | 'trends' | 'ideas'
  tags: string[]
  date: string
  heroImage?: string
  heroImageAlt?: string
  sections?: SanityBlogSection[]
  contentHtml?: string
}

export const blogPostProjection = `{
  _id,
  'slug': slug.current,
  title,
  description,
  genre,
  tags,
  date,
  heroImage,
  heroImageAlt,
  sections,
  contentHtml,
}`

export const fetchSanityBlogPosts = async (): Promise<SanityBlogPost[]> => {
  const query = `*[_type == "blogPost" && defined(slug.current)] | order(date desc) ${blogPostProjection}`
  return sanityClient.fetch(query)
}

export const fetchSanityBlogPost = async (slug: string): Promise<SanityBlogPost | null> => {
  const query = `*[_type == "blogPost" && slug.current == $slug][0] ${blogPostProjection}`
  return sanityClient.fetch(query, { slug })
}
