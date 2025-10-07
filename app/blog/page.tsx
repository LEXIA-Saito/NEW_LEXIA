import NavigationLite from "@/components/navigation-lite"
import FooterLite from "@/components/footer-lite"
import BreadcrumbsLite from "@/components/breadcrumbs-lite"
import {
  BLOG_GENRES,
  fetchBlogPosts,
  getBlogGenreDescription,
  getBlogGenreLabel,
} from "@/lib/blog-posts"
import type { BlogGenre } from "@/lib/blog-posts"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"
import Link from "next/link"
import LinkifyText from "@/components/LinkifyText"
import Image from "next/image"
import GenreFilterList from "@/components/blog/GenreFilterList"

const PLACEHOLDER_IMG = "/images/blog-placeholder.svg"

const siteBase = SITE_URL.replace(/\/$/, "")

export const metadata: Metadata = {
  title: "LEXIA BLOG | 愛知県碧南市のWEB制作・マーケティング情報",
  description:
    "WEB制作事業LEXIAがWEB制作技術やITの最新トレンドを発信します。",
  alternates: {
    canonical: `${siteBase}/blog`,
  },
  openGraph: {
    title: "LEXIA BLOG | 愛知県碧南市のWEB制作・マーケティング情報",
    description:
      "WEB制作事業LEXIAがWEB制作技術やITの最新トレンドを発信します。",
    type: "website",
    url: `${siteBase}/blog`,
  },
  twitter: {
    card: "summary_large_image",
    title: "LEXIA BLOG | 愛知県碧南市のWEB制作・マーケティング情報",
    description:
      "WEB制作事業LEXIAがWEB制作技術やITの最新トレンドを発信します。",
  },
}

export const revalidate = 60

function formatJapaneseDate(date: string) {
  return new Date(date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function createGenreAnchor(genre: BlogGenre) {
  return `genre-${genre}`
}

type PageProps = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BlogIndexPage(props: PageProps) {
  const sp = (await props.searchParams) || {}
  const initialGenre = (typeof sp.genre === "string" ? sp.genre : undefined) as BlogGenre | undefined
  const posts = (await fetchBlogPosts()).slice().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  const latestPost = posts[0]
  const remainingPosts = posts.slice(1)
  const latestList = remainingPosts.slice(0, 4)

  const postsByGenre = BLOG_GENRES.map((genre) => ({
    ...genre,
    posts: posts.filter((post) => post.genre === genre.id),
  })).filter((group) => group.posts.length > 0)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "LEXIA BLOG",
    description:
      "WEB制作事業LEXIAがWEB制作技術やITの最新トレンドを発信します。",
    url: `${siteBase}/blog`,
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: "齋藤雅人",
      },
      url: `${siteBase}/blog/${post.slug}`,
    })),
  }

  const breadcrumbs = [
    { href: "/", label: "ホーム" },
    { href: "/blog", label: "LEXIA BLOG" },
  ] as const

  return (
    <>
      <NavigationLite />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-6xl">
          <BreadcrumbsLite trail={breadcrumbs} />
          <div className="mb-12 max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-light text-neutral-900 dark:text-neutral-100">
              記事一覧
            </h1>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href={`/blog?genre=tech#genre-filter`}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-xs font-medium tracking-wide text-neutral-700 transition hover:border-neutral-500 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-500 dark:hover:text-neutral-50"
              >
                技術（Tech）
              </Link>
              <Link
                href={`/blog?genre=ideas#genre-filter`}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-xs font-medium tracking-wide text-neutral-700 transition hover:border-neutral-500 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-500 dark:hover:text-neutral-50"
              >
                アイデア（Ideas）
              </Link>
            </div>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-3xl border border-neutral-200 bg-white/80 p-12 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-900/70">
              <p className="text-neutral-600 dark:text-neutral-300">
                現在、公開中の記事はありません。更新をお待ちください。
              </p>
            </div>
          ) : (
            <>
              {latestPost && (
                <section className="relative overflow-hidden rounded-[2.5rem] border border-neutral-200 bg-neutral-950 text-neutral-50 shadow-2xl dark:border-neutral-800">
                  <Image
                    src={latestPost.heroImage || PLACEHOLDER_IMG}
                    alt={latestPost.title}
                    fill
                    priority
                    className="absolute inset-0 h-full w-full object-cover opacity-60"
                    sizes="(min-width: 1024px) 60vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-950/80 via-neutral-950/70 to-neutral-900/50" aria-hidden />
                  <div className="relative grid gap-10 px-10 py-14 md:px-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                      <div className="space-y-6">
                      <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-neutral-200">
                        最新記事
                      </span>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                        {latestPost.title}
                      </h2>
                      <p className="text-base md:text-lg text-neutral-200/90">
                        <LinkifyText text={latestPost.description} />
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-300/90">
                        <Link
                          href={`/blog?genre=${latestPost.genre}#genre-filter`}
                          className="inline-flex items-center rounded-full border border-white/20 px-3 py-1 hover:bg-white/10"
                          aria-label={`${getBlogGenreLabel(latestPost.genre)} の記事一覧`}
                        >
                          {getBlogGenreLabel(latestPost.genre)}
                        </Link>
                        <span>{latestPost.readingTime}</span>
                        <span>{formatJapaneseDate(latestPost.date)} 公開</span>
                      </div>
                      {latestPost.tags.length > 0 ? (
                        <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-neutral-200/90">
                          {latestPost.tags.slice(0, 3).map((tag) => (
                            <Link
                              key={tag}
                              href={`/blog/tags/${encodeURIComponent(tag)}`}
                              className="inline-flex items-center rounded-full border border-white/30 px-3 py-1 hover:bg-white/10"
                            >
                              #{tag}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                      <Link
                        href={`/blog/${latestPost.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                        aria-label={`${latestPost.title}を読む`}
                      >
                        記事を読む
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                    <div className="relative hidden h-full min-h-[320px] overflow-hidden rounded-[2rem] border border-white/20 bg-neutral-900/40 shadow-xl lg:block">
                      <Image
                        src={latestPost.heroImage || PLACEHOLDER_IMG}
                        alt={latestPost.title}
                        fill
                        className="h-full w-full object-cover"
                        sizes="(min-width: 1280px) 40vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-neutral-900/30 to-transparent" aria-hidden />
                    </div>
                  </div>
                </section>
              )}

          {latestList.length > 0 && (
            <section className="mt-20">
                  <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                        新着トピックス
                      </h2>
                      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                        最新記事からダイジェストでチェック。気になるテーマから読み進めましょう。
                      </p>
                    </div>
                    <Link
                      href="#genres"
                      className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-100"
                    >
                      ジャンル一覧を見る
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                  <div className="mt-8 grid gap-8 md:grid-cols-2">
                    {latestList.map((post) => (
                      <article
                        key={post.slug}
                        className="flex h-full flex-col justify-between rounded-3xl border border-neutral-200 bg-white/90 p-0 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900/70"
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
                        <div className="p-8">
                          <div className="flex items-center justify-between text-xs font-medium text-neutral-500 dark:text-neutral-400">
                            <Link
                              href={`/blog?genre=${post.genre}#genre-filter`}
                              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 hover:underline"
                              aria-label={`${getBlogGenreLabel(post.genre)} の記事一覧`}
                            >
                              {getBlogGenreLabel(post.genre)}
                            </Link>
                            <span>{post.readingTime}</span>
                          </div>
                          <h3 className="mt-4 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                            <Link
                              href={`/blog/${post.slug}`}
                              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:focus-visible:ring-neutral-100 dark:focus-visible:ring-offset-neutral-900"
                            >
                              {post.title}
                            </Link>
                          </h3>
                          <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                            <LinkifyText text={post.description} />
                          </p>
                          {post.tags.length > 0 ? (
                            <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                              {post.tags.slice(0, 3).map((tag) => (
                                <Link
                                  key={tag}
                                  href={`/blog/tags/${encodeURIComponent(tag)}`}
                                  className="inline-flex items-center rounded-full border border-neutral-200 px-2.5 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:border-neutral-700"
                                >
                                  #{tag}
                                </Link>
                              ))}
                            </div>
                          ) : null}
                        </div>
                        <div className="px-8 pb-8 pt-2 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                          <span>{formatJapaneseDate(post.date)}</span>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-1 font-medium text-neutral-900 dark:text-neutral-100"
                            aria-label={`${post.title}を読む`}
                          >
                            続きを読む
                            <span aria-hidden>→</span>
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
            </section>
          )}

          {/* Category filter list: Tech / Ideas */}
          <GenreFilterList
            posts={posts}
            genres={BLOG_GENRES.map((g) => ({ id: g.id, label: g.label }))}
            initialGenre={initialGenre}
          />

              <section id="genres" className="mt-24">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                      ジャンルで探す
                    </h2>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                      テーマ別に記事をピックアップ。必要な知識を体系的にキャッチアップできます。
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {postsByGenre.map(({ id, label }) => (
                      <Link
                        key={id}
                        href={`#${createGenreAnchor(id)}`}
                        className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-xs font-medium tracking-wide text-neutral-700 transition hover:border-neutral-500 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-500 dark:hover:text-neutral-50"
                      >
                        #{label}
                      </Link>
                    ))}
                  </div>
                </div>

                {postsByGenre.map(({ id, label, posts: genrePosts }) => (
                  <section
                    key={id}
                    id={createGenreAnchor(id)}
                    className="mt-16 scroll-mt-24"
                    aria-labelledby={`${createGenreAnchor(id)}-label`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3
                          id={`${createGenreAnchor(id)}-label`}
                          className="text-xl font-semibold text-neutral-900 dark:text-neutral-100"
                        >
                          {label}
                        </h3>
                        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                          {getBlogGenreDescription(id)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                      {genrePosts.slice(0, 4).map((post) => (
                        <article
                          key={post.slug}
                          className="flex h-full flex-col rounded-3xl border border-neutral-200 bg-white/90 p-0 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/70"
                        >
                          <div className="relative h-44 w-full overflow-hidden rounded-t-3xl border-b border-neutral-200 dark:border-neutral-800">
                            <Image
                              src={post.heroImage || PLACEHOLDER_IMG}
                              alt={post.title}
                              fill
                              className="object-cover"
                              sizes="(min-width: 768px) 50vw, 100vw"
                            />
                          </div>
                          <div className="p-6">
                            <div className="flex items-center justify-between text-xs font-medium text-neutral-500 dark:text-neutral-400">
                              <span>{post.readingTime}</span>
                              <span>{formatJapaneseDate(post.date)}</span>
                            </div>
                            <h4 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                              <Link
                                href={`/blog/${post.slug}`}
                                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:focus-visible:ring-neutral-100 dark:focus-visible:ring-offset-neutral-900"
                              >
                                {post.title}
                              </Link>
                            </h4>
                            <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                              <LinkifyText text={post.description} />
                            </p>
                            {post.tags.length > 0 ? (
                              <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                                {post.tags.slice(0, 3).map((tag) => (
                                  <Link
                                    key={tag}
                                    href={`/blog/tags/${encodeURIComponent(tag)}`}
                                    className="inline-flex items-center rounded-full border border-neutral-200 px-2.5 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:border-neutral-700"
                                  >
                                    #{tag}
                                  </Link>
                                ))}
                              </div>
                            ) : null}
                            <Link
                              href={`/blog/${post.slug}`}
                              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-neutral-100"
                              aria-label={`${post.title}を読む`}
                            >
                              記事を読む
                              <span aria-hidden>→</span>
                            </Link>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
              </section>
            </>
          )}
        </div>
      </main>
      <FooterLite />
      <script
        id="blog-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
