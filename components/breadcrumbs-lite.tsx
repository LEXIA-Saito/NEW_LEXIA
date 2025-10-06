import Link from "next/link"

import { SITE_URL } from "@/lib/config"

type Crumb = {
  href: string
  label: string
}

type BreadcrumbsLiteProps = {
  trail: readonly Crumb[]
}

export default function BreadcrumbsLite({ trail }: BreadcrumbsLiteProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: new URL(crumb.href, SITE_URL).toString(),
    })),
  }

  return (
    <div className="mb-4 text-sm text-neutral-500">
      <nav aria-label="breadcrumb">
        <ol className="flex flex-wrap items-center gap-2">
          {trail.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {index < trail.length - 1 ? (
                <Link href={crumb.href} className="hover:text-neutral-900 dark:hover:text-neutral-100">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-neutral-700 dark:text-neutral-300">{crumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  )
}
