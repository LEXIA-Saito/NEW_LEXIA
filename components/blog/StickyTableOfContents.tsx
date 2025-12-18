"use client"

import React, { useState, useEffect } from "react"
import { BookOpen } from "lucide-react"

type Heading = {
  id: string
  text: string
  level: number
}

type StickyTableOfContentsProps = {
  contentHtml: string
}

export default function StickyTableOfContents({ contentHtml }: StickyTableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    try {
      // HTMLから見出しを抽出
      const parser = new DOMParser()
      const doc = parser.parseFromString(contentHtml, "text/html")
      
      // パースエラーチェック
      const parserError = doc.querySelector('parsererror')
      if (parserError) {
        console.warn("⚠️ StickyTableOfContents: HTML parsing error", parserError.textContent)
      }
      
      const headingElements = doc.querySelectorAll("h1, h2, h3, h4, h5, h6")

    const extractedHeadings: Heading[] = []
    headingElements.forEach((element, index) => {
      const level = parseInt(element.tagName.substring(1))
      const text = element.textContent || ""

      // IDが既にある場合はそれを使用、なければ生成
      let id = element.id
      if (!id) {
        id = `heading-${index}-${text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .substring(0, 50)}`
      }

      extractedHeadings.push({ id, text, level })
    })

    setHeadings(extractedHeadings)
    } catch (error) {
      console.error("❌ StickyTableOfContents: Error parsing HTML", error)
      setHeadings([])
    }
  }, [contentHtml])

  useEffect(() => {
    // スクロール位置に応じてアクティブな見出しを更新
    const handleScroll = () => {
      const headingElements = headings.map((h) => ({
        id: h.id,
        element: document.getElementById(h.id),
      }))

      // 現在の表示位置から一番近い見出しを探す
      const viewportTop = window.scrollY + 100 // ヘッダーの高さを考慮

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const heading = headingElements[i]
        if (heading.element) {
          const rect = heading.element.getBoundingClientRect()
          const absoluteTop = rect.top + window.scrollY

          if (absoluteTop <= viewportTop) {
            setActiveId(heading.id)
            return
          }
        }
      }

      // どれにも該当しない場合は最初の見出し
      if (headingElements.length > 0 && headingElements[0].element) {
        setActiveId(headingElements[0].id)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // 初回実行

    return () => window.removeEventListener("scroll", handleScroll)
  }, [headings])

  if (headings.length === 0) {
    return null
  }

  return (
    <aside 
      className="hidden lg:block w-64 shrink-0 sticky top-24 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto"
    >
      <nav
        className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-4"
        aria-label="目次"
      >
        <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
          <BookOpen className="h-4 w-4" />
          目次
        </h2>
        <ol className="space-y-1 text-sm">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{
                paddingLeft: `${(heading.level - 2) * 0.75}rem`,
              }}
            >
              <a
                href={`#${heading.id}`}
                className={`block py-1.5 px-2 rounded transition-colors ${
                  activeId === heading.id
                    ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-medium"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-800"
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(heading.id)
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" })
                    window.history.pushState(null, "", `#${heading.id}`)
                  }
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  )
}
