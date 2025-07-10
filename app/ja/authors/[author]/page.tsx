"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowUpRight, Search, Mail, Linkedin } from "lucide-react"
import { Chip } from "@/components/ui/chip"
import { Input } from "@/components/ui/input"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { AuthorSchema } from "@/components/schema/author-schema"
import { blogPosts } from "@/lib/blog-data"
import { authorData } from "@/lib/author-data"

export default function AuthorPage({ params }: { params: { author: string } }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  // Get author info
  const authorSlug = decodeURIComponent(params.author).toLowerCase().replace(/\s+/g, "-")
  const author = authorData.find((a) => a.slug === authorSlug) || {
    name: decodeURIComponent(params.author)
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    role: "Author",
    bio: "Articles by this author",
    image: "/team/person-1.png",
    slug: authorSlug,
  }

  // Filter blog posts by author and search query
  const filteredPosts = blogPosts.filter(
    (post) =>
      post.author.toLowerCase().replace(/\s+/g, "-") === authorSlug &&
      (searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return null // Prevent flash of unstyled content
  }

  return (
    <>
      <AuthorSchema author={author} postCount={filteredPosts.length} />
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

          <div className="max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row gap-8 items-center text-center md:text-left"
            >
              <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                <Image src={author.image || "/placeholder.svg"} alt={author.name} fill className="object-cover" />
              </div>
              <div>
                <Chip className="mb-4">Author</Chip>
                <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-4">
                  {author.name}
                </h1>
                <p className="text-neutral-500 dark:text-neutral-400 mb-4">{author.role}</p>
                <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6">{author.bio}</p>
                <div className="flex gap-4 justify-center md:justify-start">
                  {author.email && (
                    <Link
                      href={`mailto:${author.email}`}
                      className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                      aria-label={`Email ${author.name}`}
                    >
                      <Mail className="h-5 w-5" />
                    </Link>
                  )}
                  {author.linkedin && (
                    <Link
                      href={author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                      aria-label={`${author.name}'s LinkedIn profile`}
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 dark:text-neutral-400 h-5 w-5" />
              <Input
                placeholder={`Search articles by ${author.name}...`}
                className="pl-10 py-6 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-500 dark:text-neutral-400">No articles found matching your criteria.</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-light text-neutral-900 dark:text-neutral-100">
                  {filteredPosts.length} {filteredPosts.length === 1 ? "Article" : "Articles"} by {author.name}
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
                        Read More
                        <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
