'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * AdSenseインフィード広告コンポーネント
 * 
 * 記事一覧内に自然に溶け込む広告フォーマット
 * - 記事カードのデザインに近いスタイル
 * - fluid フォーマットを使用
 */

const ADSENSE_CLIENT_ID = 'ca-pub-8789901212664644'

interface AdSenseInfeedProps {
  /** 広告スロットID */
  slot: string
  /** レイアウトキー（AdSenseで生成） */
  layoutKey?: string
  /** 追加のCSSクラス */
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export default function AdSenseInfeed({
  slot,
  layoutKey = '-fb+5w+4e-db+86',
  className = '',
}: AdSenseInfeedProps) {
  const adRef = useRef<HTMLModElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (isLoaded) return

    const initAd = () => {
      if (typeof window !== 'undefined') {
        try {
          window.adsbygoogle = window.adsbygoogle || []
          window.adsbygoogle.push({})
          setIsLoaded(true)
        } catch (e) {
          console.error('[AdSense Infeed] Error:', e)
        }
      }
    }

    const timer = setTimeout(initAd, 100)
    return () => clearTimeout(timer)
  }, [isLoaded])

  return (
    <div 
      className={`adsense-infeed-container ${className}`}
      aria-label="広告"
      style={{
        display: 'block',
        width: '100%',
        minHeight: '150px',
      }}
    >
      {/* 広告ラベル（必要に応じて表示） */}
      <span 
        className="block text-[10px] text-neutral-400 mb-1 text-center"
        aria-hidden="true"
      >
        広告
      </span>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
        }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="fluid"
        data-ad-layout-key={layoutKey}
      />
    </div>
  )
}
