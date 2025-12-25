import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import { fetchBlogPost, fetchBlogPosts, getBlogGenreLabel } from "@/lib/blog-posts"
import { formatJapaneseDate, calculateWordCount } from "@/lib/utils"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"
import { notFound } from "next/navigation"
import Script from "next/script"
import Link from "next/link"
import LinkifyText from "@/components/LinkifyText"
import Image from "next/image"
import EnhancedRichText from "@/components/blog/EnhancedRichText"
import RichTextTableOfContents from "@/components/blog/RichTextTableOfContents"
import { sanitizeBlogHtml } from "@/lib/sanitize-blog-html"
import RevenueZoneAuto from "@/components/blog/RevenueZoneAuto"

interface BlogArticlePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  try {
    const posts = await fetchBlogPosts()
    const validParams = posts
      .filter((post) => post && post.slug && typeof post.slug === "string" && post.slug.trim().length > 0)
      .map((post) => ({ slug: post.slug }))
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[generateStaticParams] Generated ${validParams.length} blog post params`)
    }
    
    return validParams
  } catch (error) {
    console.error("Failed to generate static params for blog posts:", error)
    return []
  }
}

export const dynamicParams = true

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const post = await fetchBlogPost(params.slug)
  if (!post) {
    return {
      title: "記事が見つかりません | LEXIA BLOG",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const canonical = `${SITE_URL.replace(/\/$/, "")}/blog/${post.slug}`
  const imageUrl = post.heroImage || `${SITE_URL}/images/og-default.png`

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
      modifiedTime: post.latest_update || post.date,
      authors: ["齋藤雅人"],
      tags: post.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
          alt: (post as any).heroImageAlt || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | LEXIA BLOG`,
      description: post.description,
      images: [imageUrl],
      creator: "@LEXIA_Tech",
    },
    keywords: post.tags && post.tags.length > 0 ? post.tags.join(", ") : undefined,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
}

export const revalidate = 60

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  try {
    const post = await fetchBlogPost(params.slug)

    if (!post) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`[BlogArticlePage] Post not found: ${params.slug}`)
      }
      notFound()
    }

    if (!post.title || !post.slug || !post.date) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`[BlogArticlePage] Invalid post data for slug: ${params.slug}`, {
          title: post.title,
          slug: post.slug,
          date: post.date,
        })
      }
      notFound()
    }

    const safeContentHtml = post.contentHtml ? sanitizeBlogHtml(post.contentHtml) : undefined

    const allPosts = await fetchBlogPosts()
    
    // 同ジャンルの関連記事
    const sameGenrePosts = allPosts
      .filter((p) => p.slug !== post.slug && p.genre === post.genre)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3)
    
    // 新着記事（関連記事と重複しないもの）
    const latestPosts = allPosts
      .filter((p) => p.slug !== post.slug && !sameGenrePosts.find((s) => s.slug === p.slug))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3)

    // 記事URL（SNSシェア用）
    const articleUrl = `${SITE_URL.replace(/\/$/, "")}/blog/${post.slug}`

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.latest_update || post.date,
      articleSection: getBlogGenreLabel(post.genre),
      wordCount: calculateWordCount(post),
      author: {
        "@type": "Person",
        name: "齋藤雅人",
        url: `${SITE_URL.replace(/\/$/, "")}/team/masato-saito`,
        jobTitle: "Web Developer & Designer",
      },
      publisher: {
        "@type": "Organization",
        name: "LEXIA",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo.png`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": articleUrl,
      },
      url: articleUrl,
      image: post.heroImage ? {
        "@type": "ImageObject",
        url: post.heroImage,
        width: 1200,
        height: 675,
      } : undefined,
      keywords: post.tags && post.tags.length > 0 ? post.tags.join(", ") : undefined,
      inLanguage: "ja-JP",
    }

    return (
      <>
        <main className="min-h-screen bg-white dark:bg-neutral-900">
          <div className="container mx-auto px-4 pt-24 md:pt-32 pb-12 md:pb-16">
            <div className="max-w-3xl mx-auto">
              <Breadcrumbs dynamicLabels={{ [post.slug]: post.title }} />
            </div>

            <article className="max-w-3xl mx-auto">
              {/* ===== 記事ヘッダー ===== */}
              <header className="mb-12">
                <Link
                  href={`/blog?genre=${post.genre}#genre-filter`}
                  className="inline-flex items-center rounded-full bg-neutral-900 px-4 py-1 text-xs font-medium tracking-wide text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
                  aria-label={`${getBlogGenreLabel(post.genre)} の記事一覧`}
                >
                  {getBlogGenreLabel(post.genre)}
                </Link>
                <h1 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 dark:text-neutral-100">
                  {post.title}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
                  <span>公開: {formatJapaneseDate(post.date)}</span>
                  {post.latest_update && post.latest_update !== post.date && (
                    <>
                      <span aria-hidden="true">•</span>
                      <span>更新: {formatJapaneseDate(post.latest_update)}</span>
                    </>
                  )}
                  <span aria-hidden="true">•</span>
                  <span>{post.readingTime}</span>
                  <span aria-hidden="true">•</span>
                  <span>
                    執筆：
                    <Link
                      href="/team/masato-saito"
                      className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100 underline-offset-4 hover:underline transition-colors"
                      aria-label="齋藤雅人のプロフィールを見る"
                    >
                      齋藤雅人
                    </Link>
                  </span>
                </div>
                {post.tags && post.tags.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog/tags/${encodeURIComponent(tag)}`}
                        className="inline-flex items-center rounded-full border border-neutral-300 px-3 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:border-neutral-600"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                ) : null}
                {post.heroImage ? (
                  <div className="mt-8">
                    <Image
                      src={post.heroImage || "/placeholder.svg"}
                      alt={(post as any).heroImageAlt ?? post.title}
                      width={1200}
                      height={675}
                      priority
                      fetchPriority="high"
                      sizes="(min-width: 1024px) 70vw, 100vw"
                      className="w-full rounded-xl object-cover"
                    />
                  </div>
                ) : null}
              </header>

              {/* ===== 目次 ===== */}
              {safeContentHtml && (
                <RichTextTableOfContents contentHtml={safeContentHtml} />
              )}

              {/* ===== 記事本文 ===== */}
              {safeContentHtml ? (
                <EnhancedRichText
                  html={safeContentHtml}
                  className="prose prose-neutral max-w-none dark:prose-invert mt-8"
                />
              ) : post.custom && post.custom.length > 0 ? (
                <div className="space-y-8 md:space-y-12 mt-8">
                  {post.custom.map((block, index) => (
                    <div key={index} className="space-y-6">
                      {block.body_text && (
                        <EnhancedRichText
                          html={block.body_text}
                          className="prose prose-neutral max-w-none dark:prose-invert"
                        />
                      )}
                      {block.body_img && (
                        <div className="mt-6">
                          <Image
                            src={block.body_img || "/placeholder.svg"}
                            alt={`記事画像 ${index + 1}`}
                            width={1200}
                            height={700}
                            className="w-full rounded-lg object-cover"
                          />
                        </div>
                      )}
                      {block.others_cta && (
                        <div className="mt-6 p-6 bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
                          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">関連記事</p>
                          <Link
                            href={`/blog/${block.others_cta.slug || block.others_cta.id}`}
                            className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            {block.others_cta.title || "関連記事を読む"}
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-8 md:space-y-12 text-neutral-800 dark:text-neutral-200 mt-8">
                  {(post.sections ?? []).map((section, index) => (
                    <section key={section.heading ?? index}>
                      {section.heading ? (
                        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
                          <LinkifyText text={section.heading} />
                        </h2>
                      ) : null}
                      {section.image ? (
                        <div className="mt-4">
                          <Image
                            src={section.image || "/placeholder.svg"}
                            alt={section.imageAlt ?? section.heading ?? `${post.title} image ${index + 1}`}
                            width={1200}
                            height={700}
                            className="w-full rounded-lg object-cover"
                          />
                        </div>
                      ) : null}
                      <div className="mt-4 space-y-4">
                        {section.body?.map((paragraph, i) => (
                          <p key={i} className="leading-relaxed">
                            <LinkifyText text={paragraph} />
                          </p>
                        ))}
                        {section.richtext ? (
                          <div
                            className="prose prose-neutral max-w-none dark:prose-invert"
                            dangerouslySetInnerHTML={{ __html: section.richtext }}
                          />
                        ) : null}
                        {section.table ? (
                          <div className="overflow-x-auto mt-4">
                            <table className="min-w-full border-collapse border border-neutral-300 dark:border-neutral-700">
                              <thead className="bg-neutral-100 dark:bg-neutral-800">
                                <tr>
                                  {section.table.headers.map((header, i) => (
                                    <th
                                      key={i}
                                      className="border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-left font-semibold text-neutral-900 dark:text-neutral-100"
                                    >
                                      {header}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {section.table.rows.map((row, i) => (
                                  <tr key={i} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                                    {row.map((cell, j) => (
                                      <td
                                        key={j}
                                        className="border border-neutral-300 dark:border-neutral-700 px-4 py-2"
                                      >
                                        <LinkifyText text={cell} />
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : null}
                        {section.list
                          ? (() => {
                              const visibleItems = section.list.filter((li) => li && li.trim().length > 0)
                              if (visibleItems.length === 0) return null
                              return (
                                <ul className="list-disc space-y-2 pl-6">
                                  {visibleItems.map((item, i) => (
                                    <li key={i} className="leading-relaxed">
                                      <LinkifyText text={item} />
                                    </li>
                                  ))}
                                </ul>
                              )
                            })()
                          : null}
                      </div>

                    </section>
                  ))}
                </div>
              )}

              {/* ===== 収益ゾーン（記事下） ===== */}
              <RevenueZoneAuto
                articleTitle={post.title}
                articleUrl={articleUrl}
                genre={post.genre}
                genreLabel={getBlogGenreLabel(post.genre)}
                relatedPosts={sameGenrePosts.map(p => ({
                  slug: p.slug,
                  title: p.title,
                  description: p.description,
                  heroImage: p.heroImage,
                  date: p.date,
                  readingTime: p.readingTime,
                }))}
                latestPosts={latestPosts.map(p => ({
                  slug: p.slug,
                  title: p.title,
                  description: p.description,
                  heroImage: p.heroImage,
                  date: p.date,
                  readingTime: p.readingTime,
                }))}
              />

            </article>

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
        
        <Script
          id={`blog-article-${post.slug}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </>
    )
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[BlogArticlePage] Error rendering page for slug: ${params.slug}`, error)
    }
    notFound()
  }
}
