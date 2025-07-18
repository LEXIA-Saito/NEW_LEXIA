"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowUpRight, BookOpen, Search } from "lucide-react"
import { Chip } from "@/components/ui/chip"
import { Input } from "@/components/ui/input"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ReadingTime } from "@/components/reading-time"
import { getSeriesPosts } from "@/lib/blog-utils"
import { usePosts } from "@/hooks/use-posts"
import { seriesData } from "@/lib/blog-data"

export default function SeriesPage({ params }: { params: { seriesId: string } }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const blogPosts = usePosts()

  // Get series info
  const seriesId = params.seriesId
  const series = seriesData.find((s) => s.id === seriesId) || {
    id: seriesId,
    title: seriesId
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    description: "A collection of related articles",
    image: "/blog/series-default.png",
  }

  // Get posts in this series
  const seriesPosts = getSeriesPosts(seriesId, blogPosts)

  // Filter posts by search query
  const filteredPosts = seriesPosts.filter(
    (post) =>
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return null // Prevent flash of unstyled content
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="mb-8">
            <Link
              href="/series"
              className="inline-flex items-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              シリーズ一覧へ戻る
            </Link>
          </div>

          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Chip>Series</Chip>
              <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mt-4 mb-6">
                {series.title}
              </h1>
              <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">{series.description}</p>
              <div className="flex items-center justify-center mt-4 text-neutral-500 dark:text-neutral-400">
                <BookOpen className="h-5 w-5 mr-2" />
                <span>
                  {seriesPosts.length} {seriesPosts.length === 1 ? "Article" : "Articles"} in this series
                </span>
              </div>
            </motion.div>
          </div>

          <div className="relative aspect-[21/9] rounded-lg overflow-hidden mb-16">
            <Image src={series.image || "/placeholder.svg"} alt={series.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 dark:text-neutral-400 h-5 w-5" />
              <Input
                placeholder={`${series.title}の記事を検索...`}
                className="pl-10 py-6 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-500 dark:text-neutral-400">条件に一致する記事は見つかりませんでした。</p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm"
                >
                  <div className="p-1">
                    <div className="flex items-center mb-2 px-4 pt-4">
                      <div className="bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-sm px-3 py-1 rounded-full">
                        Part {post.series?.order || index + 1}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
                      <div className="md:col-span-1">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm mb-2">
                          <span>{post.date}</span>
                          <span className="mx-2">•</span>
                          <span>{post.author}</span>
                          <span className="mx-2">•</span>
                          <ReadingTime minutes={post.readingTime} />
                        </div>
                        <Link href={`/blog/${post.slug}`}>
                          <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-3 hover:underline">
                            {post.title}
                          </h2>
                        </Link>
                        <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-4">{post.excerpt}</p>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center text-neutral-900 dark:text-neutral-100 text-sm hover:underline group"
                        >
                          記事を読む
                          <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
