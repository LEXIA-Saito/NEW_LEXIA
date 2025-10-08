"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp } from "lucide-react"
import type { BlogPostSection } from "@/lib/blog-posts.types"

type TableOfContentsProps = {
  sections: BlogPostSection[]
}

/**
 * セクション見出しをURLフラグメント（アンカーID）に変換
 */
function generateId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // 特殊文字を削除
    .replace(/\s+/g, "-") // スペースをハイフンに
    .replace(/--+/g, "-") // 連続ハイフンを1つに
    .trim()
}

export default function TableOfContents({ sections }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>("")

  // 見出しがあるセクションのみ抽出
  const tocItems = sections
    .filter((section) => section.heading)
    .map((section) => ({
      heading: section.heading!,
      id: generateId(section.heading!),
    }))

  // 目次がない場合（見出しが2つ未満）は何も表示しない
  if (tocItems.length < 2) return null

  // スクロール位置に応じてアクティブセクションをハイライト
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-20% 0px -80% 0px",
      }
    )

    tocItems.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [tocItems])

  return (
    <nav
      className="mb-8 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 p-6"
      aria-label="目次"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={isOpen}
      >
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          📑 目次
        </h2>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-neutral-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-neutral-500" />
        )}
      </button>

      {isOpen && (
        <ol className="mt-4 space-y-2 text-sm">
          {tocItems.map((item, index) => (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                className={`block py-1 transition-colors duration-200 hover:text-neutral-900 dark:hover:text-neutral-100 ${
                  activeId === item.id
                    ? "font-semibold text-neutral-900 dark:text-neutral-100"
                    : "text-neutral-600 dark:text-neutral-400"
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(item.id)
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                    // URLを更新（履歴には残さない）
                    window.history.replaceState(null, "", `#${item.id}`)
                  }
                }}
              >
                {index + 1}. {item.heading}
              </Link>
            </li>
          ))}
        </ol>
      )}
    </nav>
  )
}

/**
 * セクション見出しにIDを付与するためのヘルパー関数
 * この関数はpage.tsxで使用します
 */
export { generateId }
