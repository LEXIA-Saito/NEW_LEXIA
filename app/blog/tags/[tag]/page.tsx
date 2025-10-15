import NavigationLite from "@/components/navigation-lite"
import FooterLite from "@/components/footer-lite"
import BreadcrumbsLite from "@/components/breadcrumbs-lite"
import { fetchBlogPosts, getBlogGenreLabel } from "@/lib/blog-posts"
import type { Metadata } from "next"
import Link from "next/link"
import LinkifyText from "@/components/LinkifyText"

export const revalidate = 60

type Params = {
  params: {
    tag: string
  }
}

export async function generateStaticParams() {
  const posts = await fetchBlogPosts()
  const tagSet = new Set<string>()
  for (const p of posts) {
    if (p.tags) {
      for (const t of p.tags) tagSet.add(t)
    }
  }
  return Array.from(tagSet).map((tag) => ({ tag }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const tag = params.tag
  const title = `#${tag} の記事一覧 | LEXIA BLOG`
  const description = `タグ「${tag}」に関連する記事一覧です。`
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

function formatJapaneseDate(date: string) {
  return new Date(date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function TagIndexPage({ params }: Params) {
  const tag = params.tag
  const posts = (await fetchBlogPosts())
    .filter((p) => p.tags?.includes(tag))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const breadcrumbs = [
    { href: "/", label: "ホーム" },
    { href: "/blog", label: "LEXIA BLOG" },
    { href: `/blog/tags/${encodeURIComponent(tag)}`, label: `#${tag}` },
  ] as const

  return (
    <>
      <NavigationLite />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-6xl">
          <BreadcrumbsLite trail={breadcrumbs} />

          <header className="mb-10">
            <span className="text-sm uppercase tracking-[0.3em] text-neutral-400">TAG</span>
            <h1 className="mt-3 text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100">
              タグ「{tag}」の記事一覧
            </h1>
            <p className="mt-3 text-neutral-600 dark:text-neutral-300 text-sm">
              該当件数：{posts.length}件
            </p>
          </header>

          {posts.length === 0 ? (
            <div className="rounded-3xl border border-neutral-200 bg-white/80 p-12 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-900/70">
              <p className="text-neutral-600 dark:text-neutral-300">
                このタグに一致する記事は見つかりませんでした。
              </p>
              <p className="mt-4">
                <Link href="/blog" className="underline underline-offset-4">ブログ一覧へ戻る</Link>
              </p>
            </div>
          ) : (
            <section className="grid gap-8 md:grid-cols-2">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="flex h-full flex-col justify-between rounded-3xl border border-neutral-200 bg-white/90 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900/70"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-medium text-neutral-500 dark:text-neutral-400">
                      <span className="inline-flex items-center gap-1">
                        {getBlogGenreLabel(post.genre)}
                      </span>
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
                    {post.tags && post.tags.length > 0 ? (
                      <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                        {post.tags.slice(0, 3).map((t) => (
                          <Link
                            key={t}
                            href={`/blog/tags/${encodeURIComponent(t)}`}
                            className="inline-flex items-center rounded-full border border-neutral-200 px-2.5 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:border-neutral-700"
                          >
                            #{t}
                          </Link>
                        ))}
                      </div>
                    ) : null}
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
            </section>
          )}
        </div>
      </main>
      <FooterLite />
    </>
  )
}
