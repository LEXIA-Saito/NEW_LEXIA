import NavigationLite from "@/components/navigation-lite"
import FooterLite from "@/components/footer-lite"
import BreadcrumbsLite from "@/components/breadcrumbs-lite"
import { fetchBlogPosts } from "@/lib/blog-posts"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"
import Link from "next/link"
import Image from "next/image"

const siteBase = SITE_URL.replace(/\/$/, "")

export const metadata: Metadata = {
  title: "LEXIA BLOG | 碧南のWEB制作・マーケティング情報",
  description:
    "LEXIAが提供するWEB制作・マーケティング・ローカルSEOの知見をお届けします。碧南市から発信する実践的なノウハウと事例を紹介。",
  alternates: {
    canonical: `${siteBase}/blog`,
  },
  openGraph: {
    title: "LEXIA BLOG | 碧南のWEB制作・マーケティング情報",
    description:
      "LEXIAが提供するWEB制作・マーケティング・ローカルSEOの知見をお届けします。碧南市から発信する実践的なノウハウと事例を紹介。",
    type: "website",
    url: `${siteBase}/blog`,
  },
  twitter: {
    card: "summary_large_image",
    title: "LEXIA BLOG | 碧南のWEB制作・マーケティング情報",
    description:
      "LEXIAが提供するWEB制作・マーケティング・ローカルSEOの知見をお届けします。碧南市から発信する実践的なノウハウと事例を紹介。",
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

function createCategoryId(category: string) {
  return `category-${category
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-ぁ-んァ-ヶー一-龠]/g, "") || "uncategorized"}`
}

export default async function BlogIndexPage() {
  const posts = (await fetchBlogPosts()).slice().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  const latestPost = posts[0]
  const remainingPosts = posts.slice(1)
  const latestList = remainingPosts.slice(0, 4)

  const categoryMap = new Map<string, typeof posts>()

  posts.forEach((post) => {
    const category = post.category || "未分類"
    if (!categoryMap.has(category)) {
      categoryMap.set(category, [])
    }
    categoryMap.get(category)?.push(post)
  })

  const categoryEntries = Array.from(categoryMap.entries()).sort((a, b) =>
    a[0].localeCompare(b[0], "ja"),
  )

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "LEXIA BLOG",
    description:
      "WEB制作会社LEXIAが、制作の裏側やローカルビジネス支援のノウハウを発信する公式ブログ。",
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
            <span className="text-sm uppercase tracking-[0.3em] text-neutral-400">LEXIA BLOG</span>
            <h1 className="mt-3 text-3xl md:text-5xl font-light text-neutral-900 dark:text-neutral-100">
              制作とマーケティングの“今”がわかるメインメディア
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
              碧南市を拠点とするWEB制作会社LEXIAが、最新のプロジェクトから得た学びや、地域ビジネスの集客に役立つヒントを発信します。最新記事のダイジェストとカテゴリー別のおすすめ記事から、知りたい情報をすぐにチェックできます。
            </p>
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
                  {latestPost.heroImage ? (
                    <Image
                      src={latestPost.heroImage}
                      alt={latestPost.title}
                      fill
                      priority
                      className="absolute inset-0 h-full w-full object-cover opacity-60"
                      sizes="(min-width: 1024px) 60vw, 100vw"
                    />
                  ) : null}
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
                        {latestPost.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-300/90">
                        <span className="inline-flex items-center rounded-full border border-white/20 px-3 py-1">
                          {latestPost.category}
                        </span>
                        <span>{latestPost.readingTime}</span>
                        <span>{formatJapaneseDate(latestPost.date)} 公開</span>
                      </div>
                      <Link
                        href={`/blog/${latestPost.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                        aria-label={`${latestPost.title}を読む`}
                      >
                        記事を読む
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                    {latestPost.heroImage ? (
                      <div className="relative hidden h-full min-h-[320px] overflow-hidden rounded-[2rem] border border-white/20 bg-neutral-900/40 shadow-xl lg:block">
                        <Image
                          src={latestPost.heroImage}
                          alt={latestPost.title}
                          fill
                          className="h-full w-full object-cover"
                          sizes="(min-width: 1280px) 40vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-neutral-900/30 to-transparent" aria-hidden />
                      </div>
                    ) : null}
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
                      href="#categories"
                      className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-100"
                    >
                      カテゴリー一覧を見る
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                  <div className="mt-8 grid gap-8 md:grid-cols-2">
                    {latestList.map((post) => (
                      <article
                        key={post.slug}
                        className="flex h-full flex-col justify-between rounded-3xl border border-neutral-200 bg-white/90 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900/70"
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs font-medium text-neutral-500 dark:text-neutral-400">
                            <span>{post.category}</span>
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
                            {post.description}
                          </p>
                        </div>
                        <div className="mt-6 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
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

              <section id="categories" className="mt-24">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                      カテゴリーから探す
                    </h2>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                      テーマ別に記事をピックアップ。必要な知識を体系的にキャッチアップできます。
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categoryEntries.map(([category]) => (
                      <Link
                        key={category}
                        href={`#${createCategoryId(category)}`}
                        className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-xs font-medium tracking-wide text-neutral-700 transition hover:border-neutral-500 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-500 dark:hover:text-neutral-50"
                      >
                        #{category}
                      </Link>
                    ))}
                  </div>
                </div>

                {categoryEntries.map(([category, categoryPosts]) => (
                  <section
                    key={category}
                    id={createCategoryId(category)}
                    className="mt-16 scroll-mt-24"
                    aria-labelledby={`${createCategoryId(category)}-label`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3
                          id={`${createCategoryId(category)}-label`}
                          className="text-xl font-semibold text-neutral-900 dark:text-neutral-100"
                        >
                          {category}
                        </h3>
                        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                          {category}に関する最新の実践ノウハウと解説をまとめました。
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                      {categoryPosts.slice(0, 4).map((post) => (
                        <article
                          key={post.slug}
                          className="flex h-full flex-col rounded-3xl border border-neutral-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/70"
                        >
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
                            {post.description}
                          </p>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-neutral-100"
                            aria-label={`${post.title}を読む`}
                          >
                            記事を読む
                            <span aria-hidden>→</span>
                          </Link>
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
