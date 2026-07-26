'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * AdSenseレスポンシブ広告コンポーネント
 * 
 * 収益最大化のためのベストプラクティスを実装:
 * - スマホでの表示を最優先
 * - CSSで非表示にならない構造
 * - レイアウトシフト防止
 * - 適切なmin-heightでスペース確保
 */

// パブリッシャーID（環境変数から取得も可能）
const ADSENSE_CLIENT_ID = 'ca-pub-8789901212664644'

// 広告スロットID（AdSense管理画面で取得し、Vercelの環境変数に設定）
export const AD_SLOTS = {
  ARTICLE_TOP: process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_TOP_SLOT ?? '',
  ARTICLE_MID: process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_MID_SLOT ?? '',
  ARTICLE_BOTTOM_MAIN: process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_BOTTOM_MAIN_SLOT ?? '',
  ARTICLE_BOTTOM_SUB: process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_BOTTOM_SUB_SLOT ?? '',
  INFEED: process.env.NEXT_PUBLIC_ADSENSE_INFEED_SLOT ?? '',
  SIDEBAR: process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT ?? '',
} as const

const LEGACY_PLACEHOLDER_SLOTS = new Set([
  '1234567890',
  '2345678901',
  '3456789012',
  '4567890123',
  '5678901234',
  '6789012345',
])

export function isAdSlotConfigured(slot: string) {
  return /^\d{10,20}$/.test(slot) && !LEGACY_PLACEHOLDER_SLOTS.has(slot)
}

interface AdSenseResponsiveProps {
  /** 広告スロットID */
  slot: string
  /** 広告フォーマット */
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical' | 'fluid'
  /** フルワイドレスポンシブ */
  fullWidthResponsive?: boolean
  /** 追加のCSSクラス */
  className?: string
  /** 配置位置（デバッグ用） */
  position?: string
  /** 最小高さ（px） */
  minHeight?: number
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export default function AdSenseResponsive({
  slot,
  format = 'auto',
  fullWidthResponsive = true,
  className = '',
  position = '',
  minHeight = 100,
}: AdSenseResponsiveProps) {
  const adRef = useRef<HTMLModElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const hasConfiguredSlot = isAdSlotConfigured(slot)

  useEffect(() => {
    if (!hasConfiguredSlot) return

    // 既に読み込み済みの場合はスキップ
    if (isLoaded) return

    // AdSenseスクリプトが読み込まれているか確認
    const initAd = () => {
      if (typeof window !== 'undefined') {
        try {
          // adsbygoogleが存在しない場合は初期化
          window.adsbygoogle = window.adsbygoogle || []
          window.adsbygoogle.push({})
          setIsLoaded(true)
        } catch (e) {
          console.error(`[AdSense] Error at ${position}:`, e)
          setHasError(true)
        }
      }
    }

    // 少し遅延させて広告を初期化（DOMが完全に準備されてから）
    const timer = setTimeout(initAd, 100)

    return () => clearTimeout(timer)
  }, [hasConfiguredSlot, isLoaded, position])

  // ダミーまたは未設定の広告IDでは空白枠を作らない。
  if (!hasConfiguredSlot) return null

  // エラー時はプレースホルダーを表示（広告枠は維持）
  if (hasError) {
    return (
      <div 
        className={`adsense-placeholder ${className}`}
        style={{ 
          minHeight: `${minHeight}px`,
          display: 'block',
          width: '100%',
        }}
        aria-hidden="true"
      />
    )
  }

  return (
    <div 
      className={`adsense-container ${className}`}
      data-ad-position={position}
      aria-label="広告"
      style={{
        // 広告読み込み前のスペース確保でCLS防止
        minHeight: `${minHeight}px`,
        display: 'block',
        width: '100%',
        // 背景色を設定しない（透明）
        overflow: 'visible',
        // スマホで左右いっぱいに広げる
        margin: '24px 0',
      }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          minHeight: `${minHeight}px`,
        }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  )
}
