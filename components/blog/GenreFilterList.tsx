"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import type { BlogPost, BlogGenre } from "@/lib/blog-posts"
import { getBlogGenreLabel } from "@/lib/blog-posts"

type Props = {
  posts: BlogPost[]
  genres: { id: BlogGenre; label: string }[]
  initialGenre?: BlogGenre | "all"
}

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
    <section className="mt-20">
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
          <li key={post.slug} className="flex h-full flex-col justify-between rounded-3xl border border-neutral-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/70">
            <div className="flex items-center justify-between text-xs font-medium text-neutral-500 dark:text-neutral-400">
              <span className="inline-flex items-center gap-1">{getBlogGenreLabel(post.genre)}</span>
              <span>{post.readingTime}</span>
            </div>
            <h3 className="mt-3 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>
            {post.heroImage ? (
              <div className="relative mt-3 h-44 w-full overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
                <Image
                  src={post.heroImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            ) : null}
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{post.description}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
              <span>{new Date(post.date).toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" })}</span>
              <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 font-medium text-neutral-900 dark:text-neutral-100">
                記事を読む <span aria-hidden>→</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

