"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp } from "lucide-react"
import type { BlogPostSection } from "@/lib/blog-posts.types"
import { generateHeadingId } from "@/lib/heading-id"

type TableOfContentsProps = {
  sections: Array<BlogPostSection & { headingId?: string }>
}


export default function TableOfContents({ sections }: TableOfContentsProps) {
  // デフォルト展開へ仕様変更
  const [isOpen, setIsOpen] = useState(true)
  const [activeId, setActiveId] = useState<string>("")

  // 見出しがあるセクションのみ抽出
  const tocItems = sections
    .filter((section) => section.heading)
    .map((section) => ({
      heading: section.heading!,
      id: section.headingId ?? generateHeadingId(section.heading!),
    }))

  // 仕様変更: 見出し数に関わらず表示（空の場合はメッセージ表示）。

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
        tocItems.length > 0 ? (
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
                >
                  {index + 1}. {item.heading}
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">この投稿には見出しがありません。</p>
        )
      )}
    </nav>
  )
}

/**
 * セクション見出しにIDを付与するためのヘルパー関数
 * この関数はpage.tsxで使用します
 */
// generateId was moved to a server-safe util (lib/heading-id.ts)
// and is now imported where needed.
