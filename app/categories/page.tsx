"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { Chip } from "@/components/ui/chip"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { CategoriesIndexSchema } from "@/components/schema/categories-index-schema"
import { categoryData } from "@/lib/category-data"
import { blogPosts } from "@/lib/blog-data"

export default function CategoriesPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  // Count posts per category
  const categoryCounts = categoryData.map((category) => {
    const count = blogPosts.filter((post) => post.category.toLowerCase() === category.id).length
    return { ...category, count }
  })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return null // Prevent flash of unstyled content
  }

  return (
    <>
      <CategoriesIndexSchema categories={categoryCounts} />
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              ブログに戻る
            </Link>
          </div>

          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Chip>Browse</Chip>
              <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mt-4 mb-6">
                Article Categories
              </h1>
              <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
                Explore our articles by topic to find insights and inspiration in your area of interest.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryCounts.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm"
              >
                <Link href={`/categories/${category.id}`}>
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                      <div className="p-6">
                        <h2 className="text-white text-2xl font-medium">{category.name}</h2>
                        <p className="text-white/80 text-sm">
                          {category.count} {category.count === 1 ? "Article" : "Articles"}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="p-6">
                  <p className="text-neutral-700 dark:text-neutral-300 mb-4">{category.description}</p>
                  <Link
                    href={`/categories/${category.id}`}
                    className="inline-flex items-center text-neutral-900 dark:text-neutral-100 hover:underline group"
                  >
                    Browse Articles
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
