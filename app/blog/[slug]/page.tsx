"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { Chip } from "@/components/ui/chip"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { BlogSchema } from "@/components/schema/blog-schema"
import { Button } from "@/components/ui/button"
import { blogPosts } from "@/lib/blog-data"
import { NewsletterSubscription } from "@/components/newsletter-subscription"
import { ReadingTime } from "@/components/reading-time"
import { SeriesNavigation } from "@/components/series-navigation"
import { SocialShare } from "@/components/social-share"
import { AuthorProfile } from "@/components/author-profile"
import { useTranslations } from "@/lib/i18n"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const t = useTranslations()
  const [isLoaded, setIsLoaded] = useState(false)

  // Find the blog post by slug
  const post = blogPosts.find((post) => post.slug === params.slug)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!post && isLoaded) {
    return (
      <>
        <Navigation />
        <div className="container mx-auto px-4 py-24 md:py-32 text-center">
          <h1 className="text-3xl font-light mb-6">{t("blog.notFound.title")}</h1>
          <p className="mb-8">{t("blog.notFound.message")}</p>
          <Link href="/blog">
            <Button>{t("blog.notFound.returnLink")}</Button>
          </Link>
        </div>
        <Footer />
      </>
    )
  }

  if (!isLoaded || !post) {
    return null // Prevent flash of unstyled content
  }

  // Find related posts (same category, excluding current post)
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.category.slug === post.category.slug)
    .slice(0, 3)

  // Find next and previous posts
  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug)
  const prevPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null

  return (
    <>
      <BlogSchema post={post} />
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              {t("blog.returnToBlog")}
            </Link>
          </div>

          <article className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Link href={`/categories/${post.category.slug}`}>
                <Chip className="mb-4">{t(post.category.nameKey)}</Chip>
              </Link>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 dark:text-neutral-100 mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center text-neutral-500 dark:text-neutral-400 text-sm mb-8 gap-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <time dateTime={new Date(post.date).toISOString()}>{post.date}</time>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <Link
                    href={`/authors/${post.authorInfo.slug}`}
                    className="hover:text-neutral-900 dark:hover:text-neutral-100 hover:underline"
                  >
                    {t(post.authorInfo.nameKey)}
                  </Link>
                </div>
                <ReadingTime minutes={post.readingTime} />

                <div className="relative ml-auto">
                  <SocialShare
                    title={post.title}
                    url={typeof window !== "undefined" ? window.location.href : ""}
                    description={post.excerpt}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-8">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
              </div>

              {/* Fixed position social share buttons (desktop only) */}
              <div className="fixed left-8 top-1/2 transform -translate-y-1/2 hidden xl:block">
                <SocialShare
                  title={post.title}
                  url={typeof window !== "undefined" ? window.location.href : ""}
                  description={post.excerpt}
                  vertical={true}
                />
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                {post.content.map((paragraph, index) => (
                  <p key={index} className="mb-6 text-neutral-700 dark:text-neutral-300">
                    {paragraph}
                  </p>
                ))}

                {post.sections?.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mt-12">
                    <h2 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-4">{section.title}</h2>
                    {section.content.map((paragraph, paraIndex) => (
                      <p key={paraIndex} className="mb-6 text-neutral-700 dark:text-neutral-300">
                        {paragraph}
                      </p>
                    ))}
                    {section.image && (
                      <div className="relative aspect-[16/9] rounded-lg overflow-hidden my-8">
                        <Image
                          src={section.image || "/placeholder.svg"}
                          alt={section.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Series navigation (if part of a series) */}
            {post.series && <SeriesNavigation currentPost={post} />}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="border-t border-neutral-200 dark:border-neutral-800 pt-8 mb-12"
            >
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags?.map((tagInfo) => (
                  <Link key={`${params.slug}-${tagInfo.slug}`} href={`/tags/${tagInfo.slug}`}>
                    <span className="inline-block px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-sm hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                      #{t(tagInfo.nameKey)}
                    </span>
                  </Link>
                ))}
              </div>

              <AuthorProfile authorSlug={post.authorInfo.slug} />
            </motion.div>

            {relatedPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-12"
              >
                <h3 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-6">{t("blog.relatedArticles")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                      <div className="group">
                        <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
                          <Image
                            src={relatedPost.image || "/placeholder.svg"}
                            alt={relatedPost.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <h4 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 group-hover:underline mb-2">
                          {relatedPost.title}
                        </h4>
                        <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm">
                          <span>{relatedPost.date}</span>
                          <span className="mx-2">•</span>
                          <ReadingTime minutes={relatedPost.readingTime} />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Add the newsletter section here */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-16"
            >
              <NewsletterSubscription />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-between border-t border-neutral-200 dark:border-neutral-800 pt-8"
            >
              {prevPost && (
                <Link href={`/blog/${prevPost.slug}`} className="mb-4 sm:mb-0 group">
                  <span className="block text-sm text-neutral-500 dark:text-neutral-400 mb-1">{t("blog.nav.previousArticle")}</span>
                  <span className="text-neutral-900 dark:text-neutral-100 group-hover:underline flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                    {prevPost.title}
                  </span>
                </Link>
              )}

              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`} className="text-right group">
                  <span className="block text-sm text-neutral-500 dark:text-neutral-400 mb-1">{t("blog.nav.nextArticle")}</span>
                  <span className="text-neutral-900 dark:text-neutral-100 group-hover:underline flex items-center justify-end">
                    {nextPost.title}
                    <ArrowLeft className="ml-2 h-4 w-4 rotate-180 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              )}
            </motion.div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
