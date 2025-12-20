"use client"

import { useEffect, useRef } from "react"

interface EmbedContentProps {
  html: string
  className?: string
}

/**
 * MicroCMSのリッチエディタで埋め込まれたiframeコンテンツを安全に表示
 * Twitter/X, YouTube, Instagram, Facebook等の埋め込みに対応
 */
export default function EmbedContent({ html, className = "" }: EmbedContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !html) return

    // Twitter埋め込みの処理
    const twitterScriptId = "twitter-widgets-script"
    if (html.includes("platform.twitter.com") || html.includes("twitter-timeline")) {
      if (!document.getElementById(twitterScriptId)) {
        const script = document.createElement("script")
        script.id = twitterScriptId
        script.async = true
        script.src = "https://platform.twitter.com/widgets.js"
        script.charset = "utf-8"
        document.head.appendChild(script)
      } else {
        // スクリプトが既に読み込まれている場合は再初期化
        if (window.twttr?.widgets) {
          window.twttr.widgets.load(containerRef.current)
        }
      }
    }

    // Instagram埋め込みの処理
    const instagramScriptId = "instagram-embed-script"
    if (html.includes("instagram.com/embed")) {
      if (!document.getElementById(instagramScriptId)) {
        const script = document.createElement("script")
        script.id = instagramScriptId
        script.async = true
        script.src = "https://www.instagram.com/embed.js"
        document.head.appendChild(script)
      } else {
        // スクリプトが既に読み込まれている場合は再初期化
        if (window.instgrm?.Embeds) {
          window.instgrm.Embeds.process()
        }
      }
    }

    // Facebook埋め込みの処理
    const facebookScriptId = "facebook-jssdk"
    if (html.includes("facebook.com/plugins")) {
      if (!document.getElementById(facebookScriptId)) {
        const script = document.createElement("script")
        script.id = facebookScriptId
        script.async = true
        script.defer = true
        script.crossOrigin = "anonymous"
        script.src = "https://connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v12.0"
        document.head.appendChild(script)
      } else {
        // スクリプトが既に読み込まれている場合は再初期化
        if (window.FB?.XFBML) {
          window.FB.XFBML.parse(containerRef.current)
        }
      }
    }
  }, [html])

  if (!html) return null

  return (
    <div
      ref={containerRef}
      className={`embed-content my-6 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

// グローバル型定義の拡張
declare global {
  interface Window {
    twttr?: {
      widgets?: {
        load: (element?: HTMLElement) => void
      }
    }
    instgrm?: {
      Embeds?: {
        process: () => void
      }
    }
    FB?: {
      XFBML?: {
        parse: (element?: HTMLElement) => void
      }
    }
  }
}
