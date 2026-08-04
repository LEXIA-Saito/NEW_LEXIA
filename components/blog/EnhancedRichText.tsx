"use client"

import { useEffect, useRef } from "react"

type EnhancedRichTextProps = {
  /**
   * lib/blog/transform-article-html.ts で加工済みのHTML。
   * 見出しID・シンタックスハイライト・リンクカード・表のラッパーは
   * すべてサーバー側で適用済みなので、ここでは触らない。
   */
  html: string
  className?: string
}

/**
 * 記事本文のうち、ブラウザでしか実現できない部分だけを担当する。
 *
 * 見た目の生成はサーバー側に移した。ここに残すのは
 * 「クリックできる」「外部スクリプトを読む」といった対話的な振る舞いのみ。
 */
export default function EnhancedRichText({ html, className = "" }: EnhancedRichTextProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = contentRef.current
    if (!container) return

    try {
      addHeadingAnchors(container)
      addCopyButtons(container)
      loadEmbedScripts(container, html)
      scrollToHash()
    } catch (error) {
      console.error("EnhancedRichText: 拡張の適用に失敗しました", error)
    }
  }, [html])

  return <div ref={contentRef} className={className} dangerouslySetInnerHTML={{ __html: html }} />
}

/** 見出しにホバーで出るアンカーリンクを付ける。IDはサーバー側で振られている前提 */
function addHeadingAnchors(container: HTMLElement): void {
  container.querySelectorAll<HTMLElement>("h1, h2, h3, h4, h5, h6").forEach((heading) => {
    if (!heading.id) return
    if (heading.querySelector(".heading-anchor")) return

    heading.classList.add("group", "relative")

    const anchor = document.createElement("a")
    anchor.href = `#${heading.id}`
    anchor.className =
      "heading-anchor absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200 text-neutral-400 hover:text-neutral-600 dark:text-neutral-600 dark:hover:text-neutral-400 no-underline"
    anchor.setAttribute("aria-label", `${heading.textContent?.trim() ?? ""}へのリンク`)
    anchor.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>'

    anchor.addEventListener("click", (event) => {
      event.preventDefault()
      heading.scrollIntoView({ behavior: "smooth", block: "start" })
      window.history.pushState(null, "", `#${heading.id}`)
    })

    heading.insertBefore(anchor, heading.firstChild)
  })
}

const COPY_ICON =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>'

const CHECK_ICON =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>'

/** サーバー側で組んだコードブロックのヘッダーにコピーボタンを差し込む */
function addCopyButtons(container: HTMLElement): void {
  container.querySelectorAll<HTMLElement>('[data-code-block="true"]').forEach((block) => {
    const header = block.firstElementChild
    if (!header || header.querySelector(".copy-button")) return

    const codeText = block.querySelector("code")?.textContent ?? ""
    if (!codeText.trim()) return

    const button = document.createElement("button")
    button.type = "button"
    button.className =
      "copy-button inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-neutral-500 opacity-0 transition-all duration-200 hover:bg-neutral-200 hover:text-neutral-900 focus:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 group-hover:opacity-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
    button.setAttribute("aria-label", "コードをコピー")
    button.innerHTML = COPY_ICON

    let resetTimer: ReturnType<typeof setTimeout> | undefined

    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(codeText)
        button.innerHTML = `${CHECK_ICON}<span class="text-xs">コピーしました</span>`
        button.classList.add("text-green-600", "dark:text-green-400")
      } catch {
        button.innerHTML = '<span class="text-xs">コピーできませんでした</span>'
      }

      clearTimeout(resetTimer)
      resetTimer = setTimeout(() => {
        button.innerHTML = COPY_ICON
        button.classList.remove("text-green-600", "dark:text-green-400")
      }, 2000)
    })

    header.appendChild(button)
  })
}

/** 埋め込み用の外部スクリプトを必要なときだけ読み込む */
function loadEmbedScripts(container: HTMLElement, html: string): void {
  const ensureScript = (id: string, src: string, extra?: (el: HTMLScriptElement) => void) => {
    if (document.getElementById(id)) return false
    const script = document.createElement("script")
    script.id = id
    script.async = true
    script.src = src
    extra?.(script)
    document.head.appendChild(script)
    return true
  }

  if (html.includes("platform.twitter.com") || html.includes("twitter-timeline")) {
    const created = ensureScript("twitter-widgets-script", "https://platform.twitter.com/widgets.js")
    if (!created) window.twttr?.widgets?.load(container)
  }

  if (html.includes("instagram.com/embed")) {
    const created = ensureScript("instagram-embed-script", "https://www.instagram.com/embed.js")
    if (!created) window.instgrm?.Embeds?.process()
  }

  if (html.includes("facebook.com/plugins")) {
    const created = ensureScript(
      "facebook-jssdk",
      "https://connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v12.0",
      (el) => {
        el.defer = true
        el.crossOrigin = "anonymous"
      },
    )
    if (!created) window.FB?.XFBML?.parse(container)
  }
}

/** ページ直リンクで #見出し が付いていたらそこまで送る */
function scrollToHash(): void {
  if (!window.location.hash) return
  const target = document.getElementById(window.location.hash.substring(1))
  if (!target) return
  setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 100)
}

declare global {
  interface Window {
    twttr?: { widgets?: { load: (element?: HTMLElement) => void } }
    instgrm?: { Embeds?: { process: () => void } }
    FB?: { XFBML?: { parse: (element?: HTMLElement) => void } }
  }
}
