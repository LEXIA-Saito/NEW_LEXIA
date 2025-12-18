"use client"

import AdSenseUnit from "./AdSenseUnit"

interface AdSenseDisplayAdProps {
  /**
   * 広告スロットID（Google AdSenseダッシュボードから取得）
   * 例: "1234567890"
   */
  adSlot: string
  /**
   * テストモード（開発環境用）
   */
  testMode?: boolean
}

/**
 * Google AdSense ディスプレイ広告（レスポンシブ）
 * ページの任意の場所に配置できる汎用広告
 * 
 * 使用例:
 * ```tsx
 * <AdSenseDisplayAd adSlot="1234567890" />
 * ```
 */
export function AdSenseDisplayAd({ adSlot, testMode = false }: AdSenseDisplayAdProps) {
  return (
    <div className="my-8 flex justify-center" aria-label="広告">
      <AdSenseUnit
        adSlot={adSlot}
        adFormat="auto"
        fullWidthResponsive={true}
        style={{ display: "block", minHeight: "250px" }}
        testMode={testMode}
      />
    </div>
  )
}

/**
 * Google AdSense 記事内広告
 * ブログ記事の本文中に自然に溶け込む広告
 * 
 * 使用例:
 * ```tsx
 * <AdSenseInArticleAd adSlot="1234567890" />
 * ```
 */
export function AdSenseInArticleAd({ adSlot, testMode = false }: AdSenseDisplayAdProps) {
  return (
    <div className="my-12 flex justify-center" aria-label="広告">
      <AdSenseUnit
        adSlot={adSlot}
        adFormat="fluid"
        adLayout="in-article"
        style={{ display: "block", textAlign: "center" }}
        testMode={testMode}
      />
    </div>
  )
}

/**
 * Google AdSense レクタングル広告
 * サイドバーやフッターに適した矩形広告
 * 
 * 使用例:
 * ```tsx
 * <AdSenseRectangleAd adSlot="1234567890" />
 * ```
 */
export function AdSenseRectangleAd({ adSlot, testMode = false }: AdSenseDisplayAdProps) {
  return (
    <div className="my-8 flex justify-center" aria-label="広告">
      <AdSenseUnit
        adSlot={adSlot}
        adFormat="rectangle"
        style={{ display: "inline-block", width: "336px", height: "280px" }}
        testMode={testMode}
      />
    </div>
  )
}

export default AdSenseDisplayAd
