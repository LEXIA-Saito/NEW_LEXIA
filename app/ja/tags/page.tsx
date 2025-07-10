"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Tag } from "lucide-react"
import { Chip } from "@/components/ui/chip"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { TagsIndexSchema } from "@/components/schema/tags-index-schema"
import { blogPosts } from "@/lib/blog-data"

export default function TagsPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  // Extract all tags and count their occurrences
  const tagCounts: Record<string, number> = {}

  blogPosts.forEach((post) => {
    post.tags?.forEach((tag) => {
      const tagSlug = tag.toLowerCase().replace(/\s+/g, "-")
      tagCounts[tagSlug] = (tagCounts[tagSlug] || 0) + 1
    })
  })

  // Convert to array and sort by count (descending)
  const sortedTags = Object.entries(tagCounts)
    .map(([slug, count]) => ({
      slug,
      name: slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      count,
    }))
    .sort((a, b) => b.count - a.count)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return null // Prevent flash of unstyled content
  }

  return (
    <>
      <TagsIndexSchema tags={sortedTags} />
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Blog
            </Link>
          </div>

          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Chip>Browse</Chip>
              <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mt-4 mb-6">
                Article Tags
              </h1>
              <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
                Explore our articles by specific topics and keywords to find exactly what you're looking for.
              </p>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-4 justify-center">
              {sortedTags.map((tag, index) => (
                <motion.div
                  key={tag.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.03 }}
                  whileHover={{ y: -5 }}
                >
                  <Link href={`/tags/${tag.slug}`}>
                    <div
                      className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-all"
                      style={{
                        fontSize: `${Math.max(0.9, Math.min(1.5, 1 + tag.count / 10))}rem`,
                      }}
                    >
                      <Tag className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                      <span className="text-neutral-900 dark:text-neutral-100">{tag.name}</span>
                      <span className="text-neutral-500 dark:text-neutral-400 text-sm">({tag.count})</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
