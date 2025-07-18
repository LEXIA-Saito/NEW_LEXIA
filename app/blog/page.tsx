"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowUpRight, Search, Calendar, Filter, X, BookOpen } from "lucide-react"
import { Chip } from "@/components/ui/chip"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { BlogListSchema } from "@/components/schema/blog-list-schema"
import { blogPosts as staticBlogPosts } from "@/lib/blog-data"
import { categoryData } from "@/lib/category-data"
import { NewsletterSubscription } from "@/components/newsletter-subscription"
import { ReadingTime } from "@/components/reading-time"
import { getAllSeries } from "@/lib/blog-utils"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeYear, setActiveYear] = useState<string | null>(null)
  const [activeAuthor, setActiveAuthor] = useState<string | null>(null)
  const [activeSeries, setActiveSeries] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [blogPosts, setBlogPosts] = useState<any[]>(staticBlogPosts)

  // Extract unique years and authors for filtering
  const years = Array.from(new Set(blogPosts.map((post) => new Date(post.date).getFullYear().toString()))).sort(
    (a, b) => Number.parseInt(b) - Number.parseInt(a),
  )

  const authors = Array.from(new Set(blogPosts.map((post) => post.author))).sort()

  // Get all series
  const allSeries = getAllSeries(blogPosts)

  // Filter blog posts based on search query, active category, year, author, and series
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "All" || post.category === activeCategory

    const matchesYear = activeYear === null || new Date(post.date).getFullYear().toString() === activeYear

    const matchesAuthor = activeAuthor === null || post.author === activeAuthor

    const matchesSeries = activeSeries === null || (post.series && post.series.id === activeSeries)

    return matchesSearch && matchesCategory && matchesYear && matchesAuthor && matchesSeries
  })

  // Get featured posts (most recent 3 posts)
  const featuredPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setBlogPosts(data))
      .catch((e) => console.error(e))
      .finally(() => setIsLoaded(true))
  }, [])

  const clearFilters = () => {
    setActiveCategory("All")
    setActiveYear(null)
    setActiveAuthor(null)
    setActiveSeries(null)
    setSearchQuery("")
  }

  if (!isLoaded) {
    return null // Prevent flash of unstyled content
  }

  return (
    <>
      <BlogListSchema posts={filteredPosts} />
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="mb-8">
            <Link
              href="/#blog"
              className="inline-flex items-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              ホームへ戻る
            </Link>
          </div>

          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Chip>最新情報</Chip>
              <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mt-4 mb-6">
                WEB制作コラム
              </h1>
              <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
                ウェブ制作やデザインに関する情報をお届けします。
              </p>
              <div className="flex justify-center mt-6">
                <Link href="/series">
                  <Button variant="outline" className="rounded-full">
                    <BookOpen className="mr-2 h-4 w-4" />
                    記事シリーズを見る
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Featured Posts */}
          <div className="mb-20">
            <h2 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-8">注目記事</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm ${
                    index === 0 ? "lg:col-span-3 lg:grid lg:grid-cols-2 lg:gap-6" : ""
                  }`}
                >
                  <Link href={`/blog/${post.slug}`} className={index === 0 ? "lg:h-full" : ""}>
                    <div
                      className={`relative ${index === 0 ? "aspect-[16/9] lg:h-full" : "aspect-[16/9]"} overflow-hidden`}
                    >
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 px-3 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </div>

                      {post.series && (
                        <div className="absolute top-4 right-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                          <BookOpen className="h-3 w-3 mr-1" />
                          Series
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.author}</span>
                      <span className="mx-2">•</span>
                      <ReadingTime minutes={post.readingTime} />
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <h3
                        className={`${index === 0 ? "text-2xl" : "text-xl"} font-medium text-neutral-900 dark:text-neutral-100 mb-3 hover:underline`}
                      >
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-4">{post.excerpt}</p>

                    {post.series && (
                      <div className="mb-4 bg-neutral-100 dark:bg-neutral-700 p-2 rounded-md">
                        <Link href={`/series/${post.series.id}`} className="flex items-center text-sm hover:underline">
                          <BookOpen className="h-4 w-4 mr-2 text-neutral-500 dark:text-neutral-400" />
                          <span>Part of: {post.series.title}</span>
                        </Link>
                      </div>
                    )}

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
          </div>

          {/* Search and Filters */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
              <div className="relative w-full md:w-auto md:flex-1 max-w-3xl">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 dark:text-neutral-400 h-5 w-5" />
                <Input
                  placeholder="記事を検索..."
                  className="pl-10 py-6 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 rounded-full"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                  {(activeCategory !== "All" ||
                    activeYear !== null ||
                    activeAuthor !== null ||
                    activeSeries !== null) && (
                    <span className="ml-1 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {(activeCategory !== "All" ? 1 : 0) +
                        (activeYear !== null ? 1 : 0) +
                        (activeAuthor !== null ? 1 : 0) +
                        (activeSeries !== null ? 1 : 0)}
                    </span>
                  )}
                </Button>
                {(activeCategory !== "All" ||
                  activeYear !== null ||
                  activeAuthor !== null ||
                  activeSeries !== null) && (
                  <Button variant="ghost" onClick={clearFilters} className="flex items-center gap-2 rounded-full">
                    <X className="h-4 w-4" />
                    <span>Clear</span>
                  </Button>
                )}
              </div>
            </div>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg mb-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Categories</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setActiveCategory("All")}
                        className={`block w-full text-left px-3 py-2 rounded-md ${
                          activeCategory === "All"
                            ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                            : "hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                        }`}
                      >
                        All Categories
                      </button>
                      {categoryData.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setActiveCategory(category.name)}
                          className={`block w-full text-left px-3 py-2 rounded-md ${
                            activeCategory === category.name
                              ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                              : "hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3">Year</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setActiveYear(null)}
                        className={`block w-full text-left px-3 py-2 rounded-md ${
                          activeYear === null
                            ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                            : "hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                        }`}
                      >
                        All Years
                      </button>
                      {years.map((year) => (
                        <button
                          key={year}
                          onClick={() => setActiveYear(year)}
                          className={`block w-full text-left px-3 py-2 rounded-md ${
                            activeYear === year
                              ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                              : "hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3">Author</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setActiveAuthor(null)}
                        className={`block w-full text-left px-3 py-2 rounded-md ${
                          activeAuthor === null
                            ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                            : "hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                        }`}
                      >
                        All Authors
                      </button>
                      {authors.map((author) => (
                        <button
                          key={author}
                          onClick={() => setActiveAuthor(author)}
                          className={`block w-full text-left px-3 py-2 rounded-md ${
                            activeAuthor === author
                              ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                              : "hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                          }`}
                        >
                          {author}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3">Series</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setActiveSeries(null)}
                        className={`block w-full text-left px-3 py-2 rounded-md ${
                          activeSeries === null
                            ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                            : "hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                        }`}
                      >
                        All Articles
                      </button>
                      {allSeries.map((series) => (
                        <button
                          key={series.id}
                          onClick={() => setActiveSeries(series.id)}
                          className={`block w-full text-left px-3 py-2 rounded-md ${
                            activeSeries === series.id
                              ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                              : "hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                          }`}
                        >
                          {series.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Category quick filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <button
                onClick={() => setActiveCategory("All")}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeCategory === "All"
                    ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
              >
                All
              </button>
              {categoryData.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.name)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    activeCategory === category.name
                      ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium"
                      : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-500 dark:text-neutral-400 mb-4">条件に一致する記事は見つかりませんでした。</p>
              <Button onClick={clearFilters} variant="outline">
                フィルターをリセット
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-light text-neutral-900 dark:text-neutral-100">
                  {filteredPosts.length} {filteredPosts.length === 1 ? "Article" : "Articles"} Found
                </h2>
              </div>
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

                        {post.series && (
                          <div className="absolute top-4 right-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                            <BookOpen className="h-3 w-3 mr-1" />
                            Series
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="p-6">
                      <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm mb-3">
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

                      {post.series && (
                        <div className="mb-4 bg-neutral-100 dark:bg-neutral-700 p-2 rounded-md">
                          <Link
                            href={`/series/${post.series.id}`}
                            className="flex items-center text-sm hover:underline"
                          >
                            <BookOpen className="h-4 w-4 mr-2 text-neutral-500 dark:text-neutral-400" />
                            <span>Part of: {post.series.title}</span>
                          </Link>
                        </div>
                      )}

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
            </>
          )}
        </div>

        {/* Add the newsletter section here */}
        <div className="max-w-3xl mx-auto px-4 mt-20 mb-20">
          <NewsletterSubscription />
        </div>
      </main>
      <Footer />
    </>
  )
}
