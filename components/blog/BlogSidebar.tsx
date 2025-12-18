"use client"

import React from "react"
import Link from "next/link"
import { Home, List, Tag, Calendar, TrendingUp } from "lucide-react"

type BlogSidebarProps = {
  currentGenre?: string
  currentTag?: string
}

export default function BlogSidebar({ currentGenre, currentTag }: BlogSidebarProps) {
  const genres = [
    { id: "tech", label: "技術・開発" },
    { id: "business", label: "ビジネス" },
    { id: "design", label: "デザイン" },
    { id: "marketing", label: "マーケティング" },
    { id: "other", label: "その他" },
  ]

  return (
    <aside className="hidden lg:block w-64 shrink-0 sticky top-24 h-fit space-y-6">
      {/* ブログホーム */}
      <nav className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
          <Home className="h-4 w-4" />
          ナビゲーション
        </h3>
        <ul className="space-y-2 text-sm">
          <li>
            <Link
              href="/blog"
              className="flex items-center gap-2 py-2 px-3 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <List className="h-4 w-4" />
              記事一覧
            </Link>
          </li>
          <li>
            <Link
              href="/blog#popular"
              className="flex items-center gap-2 py-2 px-3 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <TrendingUp className="h-4 w-4" />
              人気記事
            </Link>
          </li>
          <li>
            <Link
              href="/blog#latest"
              className="flex items-center gap-2 py-2 px-3 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <Calendar className="h-4 w-4" />
              新着記事
            </Link>
          </li>
        </ul>
      </nav>

      {/* ジャンル一覧 */}
      <nav className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
          <Tag className="h-4 w-4" />
          ジャンル
        </h3>
        <ul className="space-y-1 text-sm">
          {genres.map((genre) => (
            <li key={genre.id}>
              <Link
                href={`/blog?genre=${genre.id}#genre-filter`}
                className={`block py-2 px-3 rounded-lg transition-colors ${
                  currentGenre === genre.id
                    ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-800"
                }`}
              >
                {genre.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* タグクラウド */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
          <Tag className="h-4 w-4" />
          人気タグ
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Next.js",
            "React",
            "TypeScript",
            "デザイン",
            "SEO",
            "Web制作",
            "UI/UX",
            "マーケティング",
          ].map((tag) => (
            <Link
              key={tag}
              href={`/blog/tags/${encodeURIComponent(tag)}`}
              className={`inline-flex items-center text-xs px-2 py-1 rounded-full transition-colors ${
                currentTag === tag
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              }`}
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}
