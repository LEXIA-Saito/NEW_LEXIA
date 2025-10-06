import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import {
  fetchBlogPost,
  fetchBlogPosts,
  getBlogGenreLabel,
} from "@/lib/blog-posts"
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

export async function generateStaticParams() {
  const posts = await fetchBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const post = await fetchBlogPost(params.slug)
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
      images: post.heroImage
        ? [
            {
              url: post.heroImage,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | LEXIA BLOG`,
      description: post.description,
      images: post.heroImage ? [post.heroImage] : undefined,
    },
    keywords: post.tags.length > 0 ? post.tags : undefined,
  }
}

export const revalidate = 60

function formatJapaneseDate(date: string) {
  return new Date(date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const post = await fetchBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    articleSection: getBlogGenreLabel(post.genre),
    author: {
      "@type": "Person",
      name: "齋藤雅人",
    },
    publisher: {
      "@type": "Organization",
      name: "LEXIA",
    },
    url: `${SITE_URL.replace(/\/$/, "")}/blog/${post.slug}`,
    image: post.heroImage,
    keywords: post.tags.length > 0 ? post.tags.join(", ") : undefined,
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-3xl">
          <Breadcrumbs dynamicLabels={{ [post.slug]: post.title }} />
          <article>
            <header className="mb-12">
              <span className="inline-flex items-center rounded-full bg-neutral-900 px-4 py-1 text-xs font-medium tracking-wide text-white dark:bg-neutral-100 dark:text-neutral-900">
                {getBlogGenreLabel(post.genre)}
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
              {post.tags.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border border-neutral-300 px-3 py-1 dark:border-neutral-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </header>

            <div className="space-y-12 text-neutral-800 dark:text-neutral-200">
              {post.sections?.map((section, index) => (
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

              {post.contentHtml ? (
                <section className="prose prose-neutral max-w-none dark:prose-invert">
                  <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
                </section>
              ) : null}
            </div>

            <footer className="mt-16 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-300">
              <p>
                LEXIA BLOGでは、愛知県碧南市を中心に活動する制作会社LEXIAの視点で、WEB制作やマーケティングのヒントをお届けしています。お問い合わせやご相談はいつでも歓迎です。
              </p>
              <p className="mt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2 text-white dark:bg-neutral-100 dark:text-neutral-900"
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
