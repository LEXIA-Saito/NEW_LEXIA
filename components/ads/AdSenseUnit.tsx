"use client"

import { useEffect, useRef } from "react"

interface AdSenseUnitProps {
  /**
   * Google AdSense広告スロットID
   * 例: "1234567890"
   */
  adSlot: string
  /**
   * 広告フォーマット
   * - "auto": レスポンシブ広告（推奨）
   * - "fluid": フルード広告
   * - "rectangle": 矩形広告
   */
  adFormat?: "auto" | "fluid" | "rectangle"
  /**
   * 広告の表示方式
   * - "display": ディスプレイ広告
   * - "in-article": 記事内広告
   * - "multiplex": Multiplex広告
   */
  adLayout?: string
  /**
   * フルワイド・レスポンシブ設定
   */
  fullWidthResponsive?: boolean
  /**
   * カスタムスタイル
   */
  style?: React.CSSProperties
  /**
   * カスタムクラス名
   */
  className?: string
  /**
   * テスト用モード（実際の広告を表示しない）
   */
  testMode?: boolean
}

/**
 * Google AdSense広告ユニットコンポーネント
 * 
 * 使用例:
 * ```tsx
 * <AdSenseUnit
 *   adSlot="1234567890"
 *   adFormat="auto"
 *   fullWidthResponsive={true}
 * />
 * ```
 * 
 * @note 事前に AdSenseLoader コンポーネントで AdSense スクリプトを読み込む必要があります
 * @see components/ads/AdSenseLoader.tsx
 */
export function AdSenseUnit({
  adSlot,
  adFormat = "auto",
  adLayout,
  fullWidthResponsive = true,
  style = { display: "block" },
  className = "",
  testMode = false,
}: AdSenseUnitProps) {
  const adRef = useRef<HTMLElement>(null)
  const hasInitialized = useRef(false)

  useEffect(() => {
    // テストモードでは何もしない
    if (testMode) {
      console.log("[AdSenseUnit] Test mode - ad not pushed")
      return
    }

    // 既に初期化済みの場合はスキップ
    if (hasInitialized.current) {
      return
    }

    try {
      // window.adsbygoogle が利用可能になるまで待機
      const pushAd = () => {
        if (typeof window !== "undefined" && window.adsbygoogle && adRef.current) {
          console.log("[AdSenseUnit] Pushing ad to adsbygoogle queue", { adSlot })
          ;(window.adsbygoogle = window.adsbygoogle || []).push({})
          hasInitialized.current = true
        }
      }

      // スクリプトが既に読み込まれている場合は即座に実行
      if (typeof window !== "undefined" && window.adsbygoogle) {
        pushAd()
      } else {
        // スクリプトが読み込まれるのを待つ（最大5秒）
        let attempts = 0
        const maxAttempts = 50 // 5秒 (50 * 100ms)
        const interval = setInterval(() => {
          attempts++
          if (typeof window !== "undefined" && window.adsbygoogle) {
            clearInterval(interval)
            pushAd()
          } else if (attempts >= maxAttempts) {
            clearInterval(interval)
            console.warn("[AdSenseUnit] AdSense script not loaded after 5 seconds")
          }
        }, 100)

        return () => clearInterval(interval)
      }
    } catch (error) {
      console.error("[AdSenseUnit] Error initializing ad:", error)
    }
  }, [adSlot, testMode])

  // テストモード用のプレースホルダー
  if (testMode) {
    return (
      <div
        className={`border-2 border-dashed border-neutral-300 bg-neutral-100 p-8 text-center ${className}`}
        style={style}
      >
        <p className="text-sm text-neutral-500">
          Google AdSense 広告プレースホルダー
          <br />
          <span className="text-xs">Slot ID: {adSlot}</span>
        </p>
      </div>
    )
  }

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client="ca-pub-8789901212664644" // Publisher ID - matches AdSenseLoader.tsx
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-ad-layout={adLayout}
      data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
    />
  )
}

// TypeScript declaration for window.adsbygoogle
declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>
  }
}

export default AdSenseUnit
