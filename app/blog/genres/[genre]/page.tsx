import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import BreadcrumbsLite from "@/components/breadcrumbs-lite"
import { fetchBlogPosts, getBlogGenreLabel, type BlogGenre, getBlogGenreDescription } from "@/lib/blog-posts"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import LinkifyText from "@/components/LinkifyText"
// 収益最大化: 自動広告用スペース
import AdSenseAutoPlaceholder from "@/components/ads/AdSenseAutoPlaceholder"

const PLACEHOLDER_IMG = "/images/blog-placeholder.svg"

type Params = { genre: BlogGenre }

export async function generateStaticParams() {
  const genres: BlogGenre[] = ["AI", "Frontend", "Backend", "Update", "Full-stack", "Security"]
  return genres.map((g) => ({ genre: g }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const label = getBlogGenreLabel(params.genre)
  const description = getBlogGenreDescription(params.genre) || `${label} に関する記事一覧`
  return {
    title: `${label} の記事一覧 | LEXIA BLOG`,
    description,
  }
}

import { formatJapaneseDate } from "@/lib/utils"

export const revalidate = 60

export default async function GenreListPage({ params }: { params: Params }) {
  const all = await fetchBlogPosts()
  const posts = all
    .filter((p) => p.genre === params.genre)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const breadcrumbs = [
    { href: "/", label: "ホーム" },
    { href: "/blog", label: "LEXIA BLOG" },
    { href: `/blog/genres/${params.genre}`, label: getBlogGenreLabel(params.genre) },
  ] as const

  const genreLabel = getBlogGenreLabel(params.genre)
  const genreDescription = getBlogGenreDescription(params.genre)

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto max-w-6xl px-4 py-28 md:py-36">
          <BreadcrumbsLite trail={breadcrumbs} />
          
          {/* カテゴリヘッダー */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100">
              {genreLabel} の記事一覧
            </h1>
            {genreDescription && (
              <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
                {genreDescription}
              </p>
            )}
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              {posts.length}件の記事があります
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-3xl border border-neutral-200 bg-white/80 p-12 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-900/70">
              <p className="text-neutral-600 dark:text-neutral-300">該当する記事はありません。</p>
              <Link
                href="/blog"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:underline"
              >
                ← すべての記事を見る
              </Link>
            </div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2">
                {posts.map((post, index) => (
                  <>
                    <article
                      key={post.slug}
                      className="flex h-full flex-col rounded-3xl border border-neutral-200 bg-white/90 p-0 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900/70"
                    >
                      <div className="relative h-48 w-full overflow-hidden rounded-t-3xl border-b border-neutral-200 dark:border-neutral-800">
                        <Image
                          src={post.heroImage || PLACEHOLDER_IMG}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(min-width: 768px) 50vw, 100vw"
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center justify-between text-xs font-medium text-neutral-500 dark:text-neutral-400">
                          <span>{post.readingTime}</span>
                          <div className="flex flex-col gap-1 text-right">
                            <span>公開: {formatJapaneseDate(post.date)}</span>
                            {post.latest_update && post.latest_update !== post.date && (
                              <span>更新: {formatJapaneseDate(post.latest_update)}</span>
                            )}
                          </div>
                        </div>
                        <h2 className="mt-3 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {post.title}
                          </Link>
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 flex-1">
                          <LinkifyText text={post.description} />
                        </p>
                        {post.tags && post.tags.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Link
                                key={tag}
                                href={`/blog/tags/${encodeURIComponent(tag)}`}
                                className="inline-flex items-center rounded-full border border-neutral-200 px-2.5 py-1 text-[11px] font-medium text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400"
                              >
                                #{tag}
                              </Link>
                            ))}
                          </div>
                        )}
                        <Link
                          href={`/blog/${post.slug}`}
                          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          aria-label={`${post.title}を読む`}
                        >
                          記事を読む <span aria-hidden>→</span>
                        </Link>
                      </div>
                    </article>

                    {/* 3番目と6番目の記事の後に自動広告用スペースを挿入 */}
                    {(index === 2 || index === 5) && posts.length > index + 1 && (
                      <div key={`infeed-ad-${index}`} className="md:col-span-2">
                        <AdSenseAutoPlaceholder 
                          position="infeed" 
                          minHeight={200}
                          className="rounded-3xl border border-neutral-200 dark:border-neutral-800 p-4"
                        />
                      </div>
                    )}
                  </>
                ))}
              </div>

              {/* ページ下部の自動広告用スペース */}
              {posts.length >= 3 && (
                <div className="mt-12">
                  <AdSenseAutoPlaceholder
                    position="sidebar"
                    minHeight={150}
                  />
                </div>
              )}
            </>
          )}

          {/* ブログトップへ戻る */}
          <div className="mt-16 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
            >
              <span>←</span>
              <span>記事一覧に戻る</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
