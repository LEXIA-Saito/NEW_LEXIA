"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowUpRight, Search } from "lucide-react"
import { Chip } from "@/components/ui/chip"
import { Input } from "@/components/ui/input"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { TagSchema } from "@/components/schema/tag-schema"
import { blogPosts } from "@/lib/blog-data"

export default function TagPage({ params }: { params: { tag: string } }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  // Get tag info
  const tagSlug = params.tag.toLowerCase()
  const tagName = tagSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Filter blog posts by tag and search query
  const filteredPosts = blogPosts.filter(
    (post) =>
      post.tags?.some((tag) => tag.toLowerCase().replace(/\s+/g, "-") === tagSlug) &&
      (searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return null // Prevent flash of unstyled content
  }

  return (
    <>
      <TagSchema tag={tagName} postCount={filteredPosts.length} />
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              記事一覧へ戻る
            </Link>
          </div>

          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Chip>Tag</Chip>
              <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mt-4 mb-6">
                #{tagName}
              </h1>
              <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
                Articles related to {tagName}
              </p>
            </motion.div>
          </div>

          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 dark:text-neutral-400 h-5 w-5" />
              <Input
                placeholder={`#${tagName}の記事を検索...`}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 px-3 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </div>
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm mb-3">
                      <span>{post.date}</span>
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
                      続きを読む
                      <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
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
