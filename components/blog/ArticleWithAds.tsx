'use client'

import { useEffect, useRef } from 'react'
import { AD_SLOTS, isAdSlotConfigured } from '@/components/ads/AdSenseResponsive'

/**
 * 記事本文に広告を自動挿入するコンポーネント
 * 
 * H2見出しの後に広告を挿入
 * - 最初のH2の後: 広告なし（読者の離脱防止）
 * - 2番目のH2の後: 記事中広告を挿入
 * - 3つ以上のH2がある場合: 追加広告は挿入しない（広告過多防止）
 */

interface ArticleWithAdsProps {
  /** 記事本文HTML */
  html: string
  /** 追加のCSSクラス */
  className?: string
}

export default function ArticleWithAds({ html, className = '' }: ArticleWithAdsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const adInsertedRef = useRef(false)

  useEffect(() => {
    if (!containerRef.current || adInsertedRef.current) return
    if (!isAdSlotConfigured(AD_SLOTS.ARTICLE_MID)) return

    const container = containerRef.current
    const h2Elements = container.querySelectorAll('h2')

    // H2が2つ以上ある場合のみ広告を挿入
    if (h2Elements.length >= 2) {
      // 2番目のH2の後に広告を挿入
      const targetH2 = h2Elements[1]
      const adContainer = document.createElement('div')
      adContainer.className = 'article-mid-ad my-8'
      adContainer.setAttribute('aria-label', '広告')
      
      // 広告スペースのプレースホルダー
      adContainer.innerHTML = `
        <div class="adsense-mid-container" style="min-height: 150px; display: block; width: 100%;">
          <ins class="adsbygoogle"
            style="display:block; min-height: 150px;"
            data-ad-client="ca-pub-8789901212664644"
            data-ad-slot="${AD_SLOTS.ARTICLE_MID}"
            data-ad-format="auto"
            data-full-width-responsive="true">
          </ins>
        </div>
      `

      // H2の次の要素の前に挿入
      if (targetH2.nextSibling) {
        targetH2.parentNode?.insertBefore(adContainer, targetH2.nextSibling)
      } else {
        targetH2.parentNode?.appendChild(adContainer)
      }

      // AdSenseを初期化
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({})
        } catch (e) {
          console.error('[ArticleWithAds] AdSense init error:', e)
        }
      }

      adInsertedRef.current = true
    }
  }, [html])

  return (
    <div 
      ref={containerRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
