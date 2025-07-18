import { createClient } from 'microcms-js-sdk'

export const microcmsClient = createClient({
  // 対応するサービスドメインを環境変数から取得
  // 以前は `LEXIA_MICROCMS_SERVICE_DOMAIN` を参照していましたが
  // 誤解を招くため `LEXIA_MICROCMS_DOMAIN` に統一しました
  serviceDomain:
    process.env.LEXIA_MICROCMS_DOMAIN ||
    process.env.NEXT_PUBLIC_MICROCMS_DOMAIN ||
    '',
  apiKey:
    process.env.LEXIA_MICROCMS_API_KEY ||
    process.env.MICROCMS_API_KEY ||
    '',
})

export const getPosts = async () => {
  const res = await microcmsClient.get({ endpoint: 'posts' })
  return (res.contents as any[]).map((post) => ({
    ...post,
    category:
      typeof post.category === 'object' && post.category?.name
        ? post.category.name
        : post.category ?? '',
    author:
      typeof post.author === 'object' && post.author?.name
        ? post.author.name
        : post.author ?? '',
    image: post.image?.url ?? post.image ?? '',
  }))
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
