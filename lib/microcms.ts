import { createClient } from 'microcms-js-sdk'

export const microcmsClient = createClient({
  // Vercel 環境変数との互換性を考慮して複数の名称を参照
  serviceDomain:
    process.env.LEXIA_MICROCMS_SERVICE_DOMAIN ||
    process.env.NEXT_PUBLIC_MICROCMS_DOMAIN ||
    '',
  apiKey:
    process.env.LEXIA_MICROCMS_API_KEY ||
    process.env.MICROCMS_API_KEY ||
    '',
})

export const getPosts = async () => {
  const res = await microcmsClient.get({ endpoint: 'posts' })
  return res.contents as any[]
}

export const getPost = async (slug: string) => {
  return microcmsClient.get({ endpoint: 'posts', contentId: slug })
}

export const getCategories = async () => {
  const res = await microcmsClient.get({ endpoint: 'categories' })
  return res.contents as any[]
}

export const getAuthors = async () => {
  const res = await microcmsClient.get({ endpoint: 'authors' })
  return res.contents as any[]
}

export const getProjects = async () => {
  const res = await microcmsClient.get({ endpoint: 'projects' })
  return res.contents as any[]
}

export const getProject = async (slug: string) => {
  return microcmsClient.get({ endpoint: 'projects', contentId: slug })
}
