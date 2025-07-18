"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react"
import { getSeriesNavigation, getSeriesPosts } from "@/lib/blog-utils"
import { usePosts } from "@/hooks/use-posts"

interface SeriesNavigationProps {
  currentPost: any
}

export function SeriesNavigation({ currentPost }: SeriesNavigationProps) {
  if (!currentPost.series) {
    return null
  }

  const blogPosts = usePosts()

  const { next, previous } = getSeriesNavigation(currentPost, blogPosts)
  const seriesPosts = getSeriesPosts(currentPost.series.id, blogPosts)
  const currentIndex = seriesPosts.findIndex((post) => post.id === currentPost.id)
  const progress = ((currentIndex + 1) / seriesPosts.length) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6 mb-12"
    >
      <div className="flex items-center mb-4">
        <BookOpen className="h-5 w-5 text-neutral-500 dark:text-neutral-400 mr-2" />
        <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
          Part of series: {currentPost.series.title}
        </h3>
      </div>

      <p className="text-neutral-700 dark:text-neutral-300 mb-4">{currentPost.series.description}</p>

      <div className="mb-6">
        <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-neutral-900 dark:bg-neutral-100 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          {currentIndex + 1} of {seriesPosts.length} in this series
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {previous && (
          <Link href={`/blog/${previous.slug}`} className="group">
            <div className="flex items-start p-3 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
              <ArrowLeft className="h-5 w-5 mt-1 mr-3 text-neutral-500 dark:text-neutral-400 flex-shrink-0 transition-transform duration-300 group-hover:-translate-x-1" />
              <div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Previous in series</div>
                <div className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:underline">
                  {previous.title}
                </div>
              </div>
            </div>
          </Link>
        )}

        {next && (
          <Link href={`/blog/${next.slug}`} className="group">
            <div className="flex items-start p-3 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
              <div className="flex-1">
                <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Next in series</div>
                <div className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:underline">
                  {next.title}
                </div>
              </div>
              <ArrowRight className="h-5 w-5 mt-1 ml-3 text-neutral-500 dark:text-neutral-400 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </Link>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <Link
          href={`/series/${currentPost.series.id}`}
          className="text-neutral-900 dark:text-neutral-100 hover:underline text-sm"
        >
          View all articles in this series
        </Link>
      </div>
    </motion.div>
  )
}
