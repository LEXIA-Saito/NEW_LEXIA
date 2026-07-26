'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

interface ArticleEngagementTrackerProps {
  articleSlug: string
}

const AFFILIATE_HOSTS = new Set(['amzn.to', 'px.a8.net'])
const AFFILIATE_FUNNEL_HOSTS = new Set(['og.lexia-hp.com'])

function isAffiliateLink(anchor: HTMLAnchorElement, url: URL) {
  const relValues = new Set(anchor.rel.split(/\s+/).filter(Boolean))

  return (
    relValues.has('sponsored') ||
    AFFILIATE_HOSTS.has(url.hostname) ||
    url.pathname.includes('/ref/') ||
    url.searchParams.has('affiliate') ||
    url.searchParams.has('aff')
  )
}

export default function ArticleEngagementTracker({
  articleSlug,
}: ArticleEngagementTrackerProps) {
  useEffect(() => {
    const article = document.getElementById('blog-article')
    if (!article) return

    const handleClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return

      const anchor = target.closest('a')
      if (!(anchor instanceof HTMLAnchorElement) || !anchor.href) return

      const url = new URL(anchor.href, window.location.href)

      if (isAffiliateLink(anchor, url)) {
        trackEvent('affiliate_click', {
          article_slug: articleSlug,
          link_domain: url.hostname,
          link_url: url.href,
          affiliate_program: anchor.dataset.affiliateProgram || undefined,
        })
        return
      }

      if (AFFILIATE_FUNNEL_HOSTS.has(url.hostname)) {
        trackEvent('affiliate_funnel_click', {
          article_slug: articleSlug,
          link_domain: url.hostname,
          link_path: url.pathname,
          funnel: anchor.dataset.affiliateFunnel || 'affiliate-content',
        })
      }
    }

    article.addEventListener('click', handleClick)
    return () => article.removeEventListener('click', handleClick)
  }, [articleSlug])

  return null
}
