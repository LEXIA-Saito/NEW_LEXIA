import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import BreadcrumbsLite from "@/components/breadcrumbs-lite"
import { fetchBlogPosts, getBlogGenreLabel, type BlogGenre } from "@/lib/blog-posts"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import LinkifyText from "@/components/LinkifyText"

const PLACEHOLDER_IMG = "/images/blog-placeholder.svg"

type Params = { genre: BlogGenre }

export async function generateStaticParams() {
  const genres: BlogGenre[] = ["tech", "ideas"]
  return genres.map((g) => ({ genre: g }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const label = getBlogGenreLabel(params.genre)
  return {
    title: `${label} の記事一覧 | LEXIA BLOG`,
    description: `${label} に関する記事一覧`,
  }
}

function formatJapaneseDate(date: string) {
  return new Date(date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

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

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto max-w-6xl px-4 py-28 md:py-36">
          <BreadcrumbsLite trail={breadcrumbs} />
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100">
              {getBlogGenreLabel(params.genre)} の記事一覧
            </h1>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-3xl border border-neutral-200 bg-white/80 p-12 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-900/70">
              <p className="text-neutral-600 dark:text-neutral-300">該当する記事はありません。</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {posts.map((post) => (
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
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs font-medium text-neutral-500 dark:text-neutral-400">
                      <span>{post.readingTime}</span>
                      <span>{formatJapaneseDate(post.date)}</span>
                    </div>
                    <h2 className="mt-3 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                      <LinkifyText text={post.description} />
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-neutral-100"
                      aria-label={`${post.title}を読む`}
                    >
                      記事を読む <span aria-hidden>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

