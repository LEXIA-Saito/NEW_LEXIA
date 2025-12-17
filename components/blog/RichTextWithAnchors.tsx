"use client"

import React, { useEffect, useRef } from "react"
import { Link as LinkIcon } from "lucide-react"

type RichTextWithAnchorsProps = {
  html: string
  className?: string
}

export default function RichTextWithAnchors({ html, className = "" }: RichTextWithAnchorsProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    // すべての見出しを取得してIDとアンカーリンクを追加
    const headings = contentRef.current.querySelectorAll("h1, h2, h3, h4, h5, h6")

    headings.forEach((heading, index) => {
      const text = heading.textContent || ""
      
      // IDがまだない場合は生成
      if (!heading.id) {
        const id = `heading-${index}-${text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .substring(0, 50)}`
        heading.id = id
      }

      // アンカーリンクボタンを追加（すでにある場合はスキップ）
      if (!heading.querySelector(".heading-anchor")) {
        heading.classList.add("group", "relative", "scroll-mt-24")
        
        const anchorLink = document.createElement("a")
        anchorLink.href = `#${heading.id}`
        anchorLink.className =
          "heading-anchor absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-neutral-400 hover:text-neutral-600 dark:text-neutral-600 dark:hover:text-neutral-400"
        anchorLink.setAttribute("aria-label", `${text}へのリンク`)
        anchorLink.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`
        
        // クリック時の動作
        anchorLink.addEventListener("click", (e) => {
          e.preventDefault()
          heading.scrollIntoView({ behavior: "smooth", block: "start" })
          // URLを更新
          window.history.pushState(null, "", `#${heading.id}`)
          // 一時的にハイライト
          heading.classList.add("bg-yellow-100", "dark:bg-yellow-900/20")
          setTimeout(() => {
            heading.classList.remove("bg-yellow-100", "dark:bg-yellow-900/20")
          }, 2000)
        })

        heading.insertBefore(anchorLink, heading.firstChild)
      }
    })

    // ページロード時にハッシュがある場合はスクロール
    if (window.location.hash) {
      const id = window.location.hash.substring(1)
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 100)
      }
    }
  }, [html])

  return (
    <div
      ref={contentRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
