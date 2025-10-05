import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import { blogPosts, getBlogPost } from "@/lib/blog-posts"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"
import { notFound } from "next/navigation"
import Script from "next/script"
import Link from "next/link"

interface BlogArticlePageProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: BlogArticlePageProps): Metadata {
  const post = getBlogPost(params.slug)
  if (!post) {
    return {
      title: "記事が見つかりません | LEXIA BLOG",
    }
  }

  const canonical = `${SITE_URL.replace(/\/$/, "")}/blog/${post.slug}`

  return {
    title: `${post.title} | LEXIA BLOG`,
    description: post.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${post.title} | LEXIA BLOG`,
      description: post.description,
      type: "article",
      url: canonical,
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | LEXIA BLOG`,
      description: post.description,
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

export default function BlogArticlePage({ params }: BlogArticlePageProps) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "齋藤雅人",
    },
    publisher: {
      "@type": "Organization",
      name: "LEXIA",
    },
    url: `${SITE_URL.replace(/\/$/, "")}/blog/${post.slug}`,
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-3xl">
          <Breadcrumbs />
          <article>
            <header className="mb-12">
              <span className="inline-flex items-center rounded-full bg-neutral-900 px-4 py-1 text-xs font-medium tracking-wide text-white dark:bg-neutral-100 dark:text-neutral-900">
                {post.category}
              </span>
              <h1 className="mt-6 text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100">
                {post.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
                <span>{formatJapaneseDate(post.date)}</span>
                <span aria-hidden="true">•</span>
                <span>{post.readingTime}</span>
                <span aria-hidden="true">•</span>
                <span>執筆：齋藤雅人</span>
              </div>
            </header>

            <div className="space-y-12 text-neutral-800 dark:text-neutral-200">
              {post.sections.map((section, index) => (
                <section key={section.heading ?? index}>
                  {section.heading ? (
                    <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                      {section.heading}
                    </h2>
                  ) : null}
                  <div className="mt-4 space-y-4">
                    {section.body?.map((paragraph, i) => (
                      <p key={i} className="leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                    {section.list ? (
                      <ul className="list-disc space-y-2 pl-6">
                        {section.list.map((item, i) => (
                          <li key={i} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </section>
              ))}
            </div>

            <footer className="mt-16 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-300">
              <p>
                LEXIA BLOGでは、碧南市を中心に活動する制作会社LEXIAの視点で、WEB制作やマーケティングのヒントをお届けしています。お問い合わせやご相談はいつでも歓迎です。
              </p>
              <p className="mt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2 text-white transition-colors hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
                >
                  制作の相談をする
                  <span aria-hidden="true">→</span>
                </Link>
              </p>
            </footer>
          </article>
        </div>
      </main>
      <Footer />
      <Script
        id={`blog-article-${post.slug}`}
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
