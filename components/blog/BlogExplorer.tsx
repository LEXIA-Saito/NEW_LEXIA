"use client"

import { useEffect, useMemo, useState, memo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, X, Tag, LayoutGrid, SlidersHorizontal } from "lucide-react"

import type { BlogPost, BlogGenre } from "@/lib/blog-posts"
import { getBlogGenreLabel } from "@/lib/blog-posts"
import { formatJapaneseDate } from "@/lib/utils"

const PLACEHOLDER_IMG = "/images/blog-placeholder.svg"

type Props = {
  posts: BlogPost[]
  genres: { id: BlogGenre; label: string }[]
  initialGenre?: BlogGenre | "all"
  initialQuery?: string
  /** サイドバーのタグクラウドに最初に表示する件数 */
  initialTagLimit?: number
}

// 記事カード（GenreFilterList と同じ見た目をローカルに保持）
const BlogCardItem = memo(function BlogCardItem({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div className="relative aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <Image
          src={post.heroImage || PLACEHOLDER_IMG}
          alt={post.heroImage ? post.title : "Placeholder"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <div className="mb-2 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="rounded-full bg-neutral-100 px-3 py-1 font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
            {getBlogGenreLabel(post.genre)}
          </span>
          <div className="flex flex-col gap-0.5">
            <span>公開: {formatJapaneseDate(post.date)}</span>
            {post.latest_update && post.latest_update !== post.date && (
              <span>更新: {formatJapaneseDate(post.latest_update)}</span>
            )}
          </div>
        </div>
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">{post.description}</p>
      </div>
    </Link>
  )
})

export default function BlogExplorer({
  posts,
  genres,
  initialGenre = "all",
  initialQuery = "",
  initialTagLimit = 16,
}: Props) {
  const [query, setQuery] = useState(initialQuery)
  const [activeGenre, setActiveGenre] = useState<BlogGenre | "all">(initialGenre)
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [showAllTags, setShowAllTags] = useState(false)

  // 全記事からタグを集計（出現回数の多い順）
  const tags = useMemo(() => {
    const counts = new Map<string, number>()
    for (const post of posts) {
      for (const tag of post.tags ?? []) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1)
      }
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  }, [posts])

  const visibleTags = showAllTags ? tags : tags.slice(0, initialTagLimit)

  const normalizedQuery = query.trim().toLowerCase()

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      if (activeGenre !== "all" && post.genre !== activeGenre) return false
      if (activeTag && !(post.tags ?? []).includes(activeTag)) return false
      if (normalizedQuery) {
        const haystack = [
          post.title,
          post.description,
          getBlogGenreLabel(post.genre),
          (post.tags ?? []).join(" "),
        ]
          .join(" ")
          .toLowerCase()
        if (!haystack.includes(normalizedQuery)) return false
      }
      return true
    })
  }, [posts, activeGenre, activeTag, normalizedQuery])

  // 絞り込み状態を URL に反映（共有・リロード耐性。履歴は汚さない）
  useEffect(() => {
    const url = new URL(window.location.href)
    if (activeGenre === "all") url.searchParams.delete("genre")
    else url.searchParams.set("genre", activeGenre)
    if (normalizedQuery) url.searchParams.set("q", query.trim())
    else url.searchParams.delete("q")
    window.history.replaceState({}, "", url.toString())
  }, [activeGenre, normalizedQuery, query])

  const hasActiveFilter = activeGenre !== "all" || activeTag !== null || normalizedQuery !== ""

  const clearAll = () => {
    setQuery("")
    setActiveGenre("all")
    setActiveTag(null)
  }

  const genrePillBase =
    "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide transition border"
  const genrePillActive =
    "bg-neutral-900 text-white border-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:border-neutral-100"
  const genrePillIdle =
    "border-neutral-300 text-neutral-700 hover:border-neutral-500 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-500 dark:hover:text-neutral-50"

  return (
    <section id="genre-filter" className="mt-20 scroll-mt-24">
      <div className="mb-8">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          <LayoutGrid className="h-5 w-5" />
          記事を探す
        </h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          キーワード検索・カテゴリ・タグから、気になる記事をすばやく見つけられます。
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-10 lg:items-start">
        {/* サイドバー（PCでは sticky、モバイルでは上部に積み上げ） */}
        <aside className="mb-8 lg:mb-0 lg:sticky lg:top-24 lg:h-fit space-y-5">
          {/* 検索ボックス */}
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900/60"
          >
            <label htmlFor="blog-search" className="sr-only">
              記事を検索
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                id="blog-search"
                type="search"
                inputMode="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="キーワードで検索"
                aria-label="記事をキーワードで検索"
                className="w-full rounded-lg border border-neutral-300 bg-white py-2.5 pl-9 pr-9 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:ring-neutral-100/10"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="検索キーワードをクリア"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </form>

          {/* カテゴリ */}
          <nav
            aria-label="カテゴリで絞り込み"
            className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900/60"
          >
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              <SlidersHorizontal className="h-4 w-4" />
              カテゴリ
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveGenre("all")}
                aria-pressed={activeGenre === "all"}
                className={`${genrePillBase} ${activeGenre === "all" ? genrePillActive : genrePillIdle}`}
              >
                すべて
              </button>
              {genres.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setActiveGenre(g.id)}
                  aria-pressed={activeGenre === g.id}
                  className={`${genrePillBase} ${activeGenre === g.id ? genrePillActive : genrePillIdle}`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </nav>

          {/* タグ */}
          {tags.length > 0 && (
            <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900/60">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                <Tag className="h-4 w-4" />
                タグ
              </h3>
              <div className="flex flex-wrap gap-2">
                {visibleTags.map(([tag, count]) => {
                  const isActive = activeTag === tag
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setActiveTag(isActive ? null : tag)}
                      aria-pressed={isActive}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition ${
                        isActive
                          ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                          : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                      }`}
                    >
                      #{tag}
                      <span className={isActive ? "text-neutral-300 dark:text-neutral-500" : "text-neutral-400"}>
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>
              {tags.length > initialTagLimit && (
                <button
                  type="button"
                  onClick={() => setShowAllTags((v) => !v)}
                  className="mt-3 text-xs font-medium text-neutral-500 underline-offset-2 hover:text-neutral-900 hover:underline dark:text-neutral-400 dark:hover:text-neutral-100"
                >
                  {showAllTags ? "タグを折りたたむ" : `すべてのタグを表示（${tags.length}）`}
                </button>
              )}
            </div>
          )}
        </aside>

        {/* 記事一覧 */}
        <div>
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="text-sm text-neutral-600 dark:text-neutral-400" aria-live="polite">
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">{filtered.length}</span> 件の記事
              {activeTag && (
                <span className="ml-2 text-neutral-500">
                  / タグ: <span className="font-medium">#{activeTag}</span>
                </span>
              )}
            </p>
            {hasActiveFilter && (
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1 rounded-full border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-600 transition hover:border-neutral-500 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-50"
              >
                <X className="h-3.5 w-3.5" />
                条件をクリア
              </button>
            )}
          </div>

          {filtered.length > 0 ? (
            <ul className="grid gap-8 md:grid-cols-2">
              {filtered.map((post) => (
                <li key={post.slug}>
                  <BlogCardItem post={post} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-12 text-center dark:border-neutral-700 dark:bg-neutral-900/40">
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                該当する記事が見つかりませんでした。
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="mt-4 inline-flex items-center gap-1 rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                条件をクリアして全記事を表示
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
