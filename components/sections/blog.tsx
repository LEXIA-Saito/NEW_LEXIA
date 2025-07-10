"use client"

import { motion } from "framer-motion"
import { Chip } from "@/components/ui/chip"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Sustainable Architecture: Building for the Future",
    excerpt:
      "Exploring how sustainable design practices can create environmentally responsible and resource-efficient buildings.",
    image: "/blog/blog-1.png",
    date: "May 15, 2023",
    author: "Rafly Kurnia",
    slug: "sustainable-architecture",
    category: "Sustainability",
  },
  {
    id: 2,
    title: "The Psychology of Space: How Architecture Affects Mood",
    excerpt: "Understanding the profound impact that spatial design has on human psychology and emotional wellbeing.",
    image: "/blog/blog-2.png",
    date: "April 3, 2023",
    author: "Maya Wijaya",
    slug: "psychology-of-space",
    category: "Design Theory",
  },
  {
    id: 3,
    title: "Blending Traditional and Modern: A Case Study",
    excerpt:
      "How we integrated traditional Indonesian architectural elements with contemporary design in a recent project.",
    image: "/blog/blog-3.png",
    date: "March 12, 2023",
    author: "Rafly Kurnia",
    slug: "blending-traditional-modern",
    category: "Case Study",
  },
]

export default function Blog() {
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
          <Chip>Insights</Chip>
          <h2 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mt-4 mb-6">
            Architecture Journal
          </h2>
          <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
            Thoughts, insights, and explorations on architecture, design, and the built environment.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <span className="mx-2">•</span>
                <span>{post.author}</span>
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
                Read More
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
              View All Articles
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </motion.div>
        </Link>
      </div>
    </div>
  )
}
