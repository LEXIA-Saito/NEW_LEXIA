import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import { fetchBlogPosts } from "@/lib/blog-posts"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"
import Link from "next/link"
import Script from "next/script"

export const metadata: Metadata = {
  title: "LEXIA BLOG | 碧南のWEB制作・マーケティング情報",
  description:
    "LEXIAが提供するWEB制作・マーケティング・ローカルSEOの知見をお届けします。碧南市から発信する実践的なノウハウと事例を紹介。",
  alternates: {
    canonical: `${SITE_URL.replace(/\/$/, "")}/blog`,
  },
  openGraph: {
    title: "LEXIA BLOG | 碧南のWEB制作・マーケティング情報",
    description:
      "LEXIAが提供するWEB制作・マーケティング・ローカルSEOの知見をお届けします。碧南市から発信する実践的なノウハウと事例を紹介。",
    type: "website",
    url: `${SITE_URL.replace(/\/$/, "")}/blog`,
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

export default async function BlogIndexPage() {
  const posts = (await fetchBlogPosts()).slice().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "LEXIA BLOG",
    description:
      "WEB制作会社LEXIAが、制作の裏側やローカルビジネス支援のノウハウを発信する公式ブログ。",
    url: `${SITE_URL.replace(/\/$/, "")}/blog`,
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: "齋藤雅人",
      },
      url: `${SITE_URL.replace(/\/$/, "")}/blog/${post.slug}`,
    })),
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-6xl">
          <Breadcrumbs />
          <div className="mb-12 max-w-3xl">
            <span className="text-sm uppercase tracking-[0.3em] text-neutral-400">LEXIA BLOG</span>
            <h1 className="mt-3 text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100">
              碧南から届ける制作ノウハウと集客アイデア
            </h1>
            <p className="mt-4 text-neutral-600 dark:text-neutral-300">
              LEXIAが日々のプロジェクトで培った知識を共有し、地域ビジネスの成長を後押しするためのブログです。制作プロセスの工夫、マーケティング施策、ローカルSEOの最新情報などを定期的にお届けします。
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {posts.length === 0 ? (
              <p className="text-neutral-600 dark:text-neutral-300">
                現在、公開中の記事はありません。更新をお待ちください。
              </p>
            ) : (
              posts.map((post) => (
                <article
                  key={post.slug}
                  className="group flex h-full flex-col rounded-3xl border border-neutral-200 bg-white/80 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-900 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900/70 dark:hover:border-neutral-100"
                >
                  <div className="flex items-center justify-between text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    <span>{post.category}</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold text-neutral-900 transition-colors group-hover:text-neutral-600 dark:text-neutral-100 dark:group-hover:text-neutral-300">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:focus-visible:ring-neutral-100 dark:focus-visible:ring-offset-neutral-900"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {post.description}
                  </p>
                  <div className="mt-6 text-sm text-neutral-500 dark:text-neutral-400">
                    {formatJapaneseDate(post.date)} に公開
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-900 transition-colors hover:gap-3 dark:text-neutral-100"
                    aria-label={`${post.title}を読む`}
                  >
                    記事を読む
                    <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
      <Script
        id="blog-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
