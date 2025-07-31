"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Chip } from "@/components/ui/chip"
import SectionIcon from "@/components/section-icon"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { t } from "@/lib/i18n"

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setBlogPosts(data))
      .catch((e) => {
        console.error(e)
        setBlogPosts([])
      })
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeIn}
        >
          <Chip>最新情報</Chip>
          <div className="flex flex-col items-center mt-4 mb-6">
            <SectionIcon index={4} className="mb-4" />
            <h2 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100">
              WEB制作コラム
            </h2>
          </div>
          <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
            ウェブ制作やデザインに関する最新情報をお届けします。
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.length === 0 && (
          <p className="col-span-3 text-center text-neutral-500">
            投稿がありません
          </p>
        )}
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            variants={fadeIn}
            whileHover={{ y: -10 }}
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
                <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-3 hover:underline">
                  {post.title}
                </h3>
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

      <div className="text-center mt-12">
        <Link href="/blog">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" className="rounded-full group">
              記事一覧を見る
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </motion.div>
        </Link>
      </div>
    </div>
  )
}
