"use client"

import { useEffect } from "react"

const ADSENSE_SRC =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8789901212664644"

/**
 * Google AdSenseのスクリプトをクライアント側で動的に読み込む。
 * Next.jsのScriptコンポーネントが付与する `data-nscript` 属性による警告を避けるため、
 * 直接scriptタグを生成して挿入する。
 */
export function AdSenseLoader() {
  useEffect(() => {
    const scriptId = "google-adsense-script"
    if (document.getElementById(scriptId)) return

    const script = document.createElement("script")
    script.id = scriptId
    script.async = true
    script.src = ADSENSE_SRC
    script.crossOrigin = "anonymous"
    // Googleが認める設定で、画面を大きく覆う折りたたみ式アンカー広告を避ける。
    // Auto ads側でアンカーを有効にしている場合も、通常サイズの下部広告だけに限定する。
    script.dataset.overlays = "collapsed-bottom"
    document.head.appendChild(script)
  }, [])

  return null
}

export default AdSenseLoader
