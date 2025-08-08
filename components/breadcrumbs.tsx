'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SITE_URL } from '@/lib/config'
import { projectsData } from '@/lib/projects-data'

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
}

function segmentToLabel(seg: string): string {
  if (nameMap[seg]) return nameMap[seg]
  const project = projectsData.find((p) => p.slug === seg)
  if (project) return project.title
  return decodeURIComponent(seg)
}

export default function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const crumbs = segments.map((seg, idx) => {
    const href = '/' + segments.slice(0, idx + 1).join('/')
    return {
      href,
      label: segmentToLabel(seg),
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
