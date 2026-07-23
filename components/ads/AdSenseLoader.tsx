"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

const ADSENSE_SRC =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8789901212664644"

/**
 * Google AdSenseのスクリプトをクライアント側で動的に読み込む。
 * Next.jsのScriptコンポーネントが付与する `data-nscript` 属性による警告を避けるため、
 * 直接scriptタグを生成して挿入する。
 *
 * 広告枠はブログ記事にしか存在しないため、/blog 配下でのみスクリプトを読み込み、
 * 広告のないトップページ等での不要なサードパーティ読み込みを避ける。
 */
export function AdSenseLoader() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname?.startsWith("/blog")) return

    const scriptId = "google-adsense-script"
    if (document.getElementById(scriptId)) return

    const script = document.createElement("script")
    script.id = scriptId
    script.async = true
    script.src = ADSENSE_SRC
    script.crossOrigin = "anonymous"
    document.head.appendChild(script)
  }, [pathname])

  return null
}

export default AdSenseLoader
