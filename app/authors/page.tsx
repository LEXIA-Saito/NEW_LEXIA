"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowUpRight, Mail, Linkedin } from "lucide-react"
import { Chip } from "@/components/ui/chip"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { AuthorsIndexSchema } from "@/components/schema/authors-index-schema"
import { authorData } from "@/lib/author-data"
import { usePosts } from "@/hooks/use-posts"

export default function AuthorsPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const blogPosts = usePosts()

  // Count posts per author
  const authorCounts = authorData.map((author) => {
    const count = blogPosts.filter((post) => post.author.toLowerCase().replace(/\s+/g, "-") === author.slug).length
    return { ...author, count }
  })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return null // Prevent flash of unstyled content
  }

  return (
    <>
      <AuthorsIndexSchema authors={authorCounts} />
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
              <Chip>チーム</Chip>
              <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mt-4 mb-6">
                著者一覧
              </h1>
              <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
                建築に関する洞察と記事を支える、才能あるチームを紹介します。
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authorCounts.map((author, index) => (
              <motion.div
                key={author.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm"
              >
                <div className="p-6 text-center">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                    <Image src={author.image || "/placeholder.svg"} alt={author.name} fill className="object-cover" />
                  </div>
                  <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-1">{author.name}</h2>
                  <p className="text-neutral-500 dark:text-neutral-400 mb-3">{author.role}</p>
                  <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-4">{author.bio}</p>

                  <div className="flex justify-center gap-4 mb-6">
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

                  <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-4">
                    {author.count}件の記事
                  </p>

                  <Link
                    href={`/authors/${author.slug}`}
                    className="inline-flex items-center text-neutral-900 dark:text-neutral-100 hover:underline group"
                  >
                    記事を見る
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
