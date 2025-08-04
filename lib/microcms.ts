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

export const getProjects = async () => {
  const res = await microcmsClient.get({ endpoint: 'projects' })
  return (res.contents as any[]).map((project) => ({
    id: project.id,
    slug: project.slug || project.id,
    title: project.title,
    description: project.description,
    image: project.image?.url ?? project.image ?? '',
    categories: project.categories || [],
    featured: project.featured ?? false,
    year: project.year ?? '',
    tags: project.tags || [],
    location: project.location ?? '',
  }))
}

export const getProject = async (slug: string) => {
  const raw = await microcmsClient.get({ endpoint: 'projects', contentId: slug })
  return {
    ...raw,
    image: (raw as any).image?.url ?? (raw as any).image ?? '',
  }
}
