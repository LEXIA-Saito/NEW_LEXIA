"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowUpRight, BookOpen } from "lucide-react"
import { Chip } from "@/components/ui/chip"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { getAllSeries } from "@/lib/blog-utils"
import { usePosts } from "@/hooks/use-posts"

export default function SeriesIndexPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const blogPosts = usePosts()
  const allSeries = getAllSeries(blogPosts)

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
              href="/blog"
              className="inline-flex items-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              ブログへ戻る
            </Link>
          </div>

          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Chip>シリーズ</Chip>
              <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mt-4 mb-6">
                記事シリーズ
              </h1>
              <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
                特定テーマを深掘りする連載記事をまとめました。
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {allSeries.map((series, index) => (
              <motion.div
                key={series.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm"
              >
                <Link href={`/series/${series.id}`}>
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={series.image || "/placeholder.svg"}
                      alt={series.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                      <div className="p-6">
                        <div className="flex items-center text-white/80 mb-2">
                          <BookOpen className="h-4 w-4 mr-2" />
                          <span>
                            {series.count} {series.count === 1 ? "Article" : "Articles"}
                          </span>
                        </div>
                        <h2 className="text-white text-2xl font-medium">{series.title}</h2>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="p-6">
                  <p className="text-neutral-700 dark:text-neutral-300 mb-4">{series.description}</p>
                  <Link
                    href={`/series/${series.id}`}
                    className="inline-flex items-center text-neutral-900 dark:text-neutral-100 hover:underline group"
                  >
                    シリーズを見る
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
