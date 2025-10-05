'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SITE_URL } from '@/lib/config'
import { projectsData } from '@/lib/projects-data'
import { fallbackBlogPosts } from '@/lib/blog-posts-fallback'

const nameMap: Record<string, string> = {
  services: 'サービス',
  web: 'WEB制作',
  system: 'システム開発',
  movie: '動画制作',
  pc: 'PC教室',
  design: 'デザイン各種',
  projects: 'プロジェクト実績',
  company: '事業概要',
  process: '制作工程',
  pricing: '料金',
  contact: 'お問い合わせ',
  team: 'チーム',
  'masato-saito': '齋藤雅人',
  'riho-saito': '齋藤李保',
  assistant: 'アシスタント',
  blog: 'LEXIA BLOG',
}

const fallbackBlogTitleMap = Object.fromEntries(
  fallbackBlogPosts.map((post) => [post.slug, post.title] as const),
)

function segmentToLabel(seg: string, dynamicLabels?: Record<string, string>): string {
  if (dynamicLabels?.[seg]) return dynamicLabels[seg]
  if (nameMap[seg]) return nameMap[seg]
  const project = projectsData.find((p) => p.slug === seg)
  if (project) return project.title
  if (fallbackBlogTitleMap[seg]) return fallbackBlogTitleMap[seg]
  return decodeURIComponent(seg)
}

type BreadcrumbsProps = {
  dynamicLabels?: Record<string, string>
}

export default function Breadcrumbs({ dynamicLabels }: BreadcrumbsProps = {}) {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const crumbs = segments.map((seg, idx) => {
    const href = '/' + segments.slice(0, idx + 1).join('/')
    return {
      href,
      label: segmentToLabel(seg, dynamicLabels),
    }
  })
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: SITE_URL,
      },
      ...crumbs.map((c, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: c.label,
        item: `${SITE_URL}${c.href}`,
      })),
    ],
  }
  return (
    <>
      <nav aria-label="breadcrumb" className="text-sm text-neutral-500 mb-4">
        <ol className="flex flex-wrap">
          <li>
            <Link href="/" className="hover:underline">
              ホーム
            </Link>
          </li>
          {crumbs.map((c, i) => (
            <li key={c.href} className="flex items-center">
              <span className="mx-2">/</span>
              {i < crumbs.length - 1 ? (
                <Link href={c.href} className="hover:underline">
                  {c.label}
                </Link>
              ) : (
                <span>{c.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
