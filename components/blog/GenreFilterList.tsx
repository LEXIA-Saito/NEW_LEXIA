"use client"

import { useEffect, useMemo, useState, memo } from "react"
import Link from "next/link"
import Image from "next/image"

const PLACEHOLDER_IMG = "/images/blog-placeholder.svg"
import type { BlogPost, BlogGenre } from "@/lib/blog-posts"
import { getBlogGenreLabel } from "@/lib/blog-posts"
import { formatJapaneseDate } from "@/lib/utils"

type Props = {
  posts: BlogPost[]
  genres: { id: BlogGenre; label: string }[]
  initialGenre?: BlogGenre | "all"
}

// Memoized card component for better performance
const BlogCardItem = memo(function BlogCardItem({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div className="relative aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {post.heroImage ? (
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <Image
            src={PLACEHOLDER_IMG}
            alt="Placeholder"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
          />
        )}
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

export default function GenreFilterList({ posts, genres, initialGenre = "all" }: Props) {
  const [active, setActive] = useState<BlogGenre | "all">(initialGenre)

  useEffect(() => {
    const url = new URL(window.location.href)
    if (active === "all") url.searchParams.delete("genre")
    else url.searchParams.set("genre", active)
    window.history.replaceState({}, "", url.toString())
  }, [active])

  const filtered = useMemo(() => {
    if (active === "all") return posts
    return posts.filter((p) => p.genre === active)
  }, [posts, active])

  return (
    <section id="genre-filter" className="mt-20">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">カテゴリで絞り込み</h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            カテゴリをクリックすると一覧が切り替わります。
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActive("all")}
            aria-pressed={active === "all"}
            className={
              `inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-wide transition border ` +
              (active === "all"
                ? "bg-neutral-900 text-white border-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:border-neutral-100"
                : "border-neutral-300 text-neutral-700 hover:border-neutral-500 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-500 dark:hover:text-neutral-50")
            }
          >
            すべて
          </button>
          {genres.map((g) => (
            <button
              key={g.id}
              onClick={() => setActive(g.id)}
              aria-pressed={active === g.id}
              className={
                `inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-wide transition border ` +
                (active === g.id
                  ? "bg-neutral-900 text-white border-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:border-neutral-100"
                  : "border-neutral-300 text-neutral-700 hover:border-neutral-500 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-500 dark:hover:text-neutral-50")
              }
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-8 grid gap-8 md:grid-cols-2">
        {filtered.map((post) => (
          <li key={post.slug}>
            <BlogCardItem post={post} />
          </li>
        ))}
      </ul>
    </section>
  )
}
