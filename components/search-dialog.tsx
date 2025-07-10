"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { t } from "@/lib/i18n"
import { motion, AnimatePresence } from "framer-motion"

// Sample project data for search
const allProjects = [
  {
    id: 1,
    title: "Minimalist Villa",
    description: "A contemporary villa with clean lines and natural materials",
    image: "/portfolio/house-1.png",
    slug: "minimalist-villa",
    categories: ["residential", "exterior"],
  },
  {
    id: 2,
    title: "Urban Apartment",
    description: "Modern apartment renovation in the heart of the city",
    image: "/portfolio/house-2.png",
    slug: "urban-apartment",
    categories: ["residential", "interior"],
  },
  {
    id: 3,
    title: "Coastal Retreat",
    description: "Beachfront home designed to embrace the natural surroundings",
    image: "/portfolio/house-3.png",
    slug: "coastal-retreat",
    categories: ["residential", "exterior"],
  },
  {
    id: 4,
    title: "Office Complex",
    description: "Contemporary office space designed for collaboration",
    image: "/portfolio/house-4.png",
    slug: "office-complex",
    categories: ["commercial", "interior"],
  },
  {
    id: 5,
    title: "Garden House",
    description: "Sustainable home integrated with its garden landscape",
    image: "/portfolio/house-5.png",
    slug: "garden-house",
    categories: ["residential", "exterior"],
  },
  {
    id: 6,
    title: "Retail Space",
    description: "Modern retail environment focused on customer experience",
    image: "/portfolio/house-6.png",
    slug: "retail-space",
    categories: ["commercial", "interior"],
  },
]

// Sample blog posts for search
const allBlogPosts = [
  {
    id: 1,
    title: "Sustainable Architecture: Building for the Future",
    excerpt: "Exploring sustainable design practices for environmentally responsible buildings.",
    image: "/blog/blog-1.png",
    slug: "sustainable-architecture",
    type: "blog",
  },
  {
    id: 2,
    title: "The Psychology of Space",
    excerpt: "Understanding how spatial design impacts human psychology and wellbeing.",
    image: "/blog/blog-2.png",
    slug: "psychology-of-space",
    type: "blog",
  },
]

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Array<any>>([])
  const [activeTab, setActiveTab] = useState<"all" | "projects" | "blog">("all")

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([...allProjects, ...allBlogPosts])
      return
    }

    const query = searchQuery.toLowerCase()

    // Filter projects
    const filteredProjects = allProjects
      .filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.categories.some((category) => category.toLowerCase().includes(query)),
      )
      .map((project) => ({ ...project, type: "project" }))

    // Filter blog posts
    const filteredBlogPosts = allBlogPosts.filter(
      (post) => post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query),
    )

    // Combine results based on active tab
    if (activeTab === "all") {
      setSearchResults([...filteredProjects, ...filteredBlogPosts])
    } else if (activeTab === "projects") {
      setSearchResults(filteredProjects)
    } else {
      setSearchResults(filteredBlogPosts)
    }
  }, [searchQuery, activeTab])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 overflow-hidden">
        <div className="flex items-center border-b border-neutral-200 dark:border-neutral-800 p-4">
          <Search className="h-5 w-5 text-neutral-500 dark:text-neutral-400 mr-2" />
          <Input
            placeholder={t('search.placeholder')}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="flex border-b border-neutral-200 dark:border-neutral-800">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === "all"
                ? "text-neutral-900 dark:text-neutral-100 border-b-2 border-neutral-900 dark:border-neutral-100"
                : "text-neutral-500 dark:text-neutral-400"
            }`}
          >
            {t('search.tab.all')}
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === "projects"
                ? "text-neutral-900 dark:text-neutral-100 border-b-2 border-neutral-900 dark:border-neutral-100"
                : "text-neutral-500 dark:text-neutral-400"
            }`}
          >
            {t('search.tab.projects')}
          </button>
          <button
            onClick={() => setActiveTab("blog")}
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === "blog"
                ? "text-neutral-900 dark:text-neutral-100 border-b-2 border-neutral-900 dark:border-neutral-100"
                : "text-neutral-500 dark:text-neutral-400"
            }`}
          >
            {t('search.tab.blog')}
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-4">
          <AnimatePresence mode="wait">
            {searchResults.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="text-center py-8"
              >
                <p className="text-neutral-500 dark:text-neutral-400">{t('search.noResults')}</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {searchResults.map((item) => (
                  <motion.div
                    key={`${item.type}-${item.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={item.type === "blog" ? `/blog/${item.slug}` : `/projects/${item.slug}`}
                      onClick={() => onOpenChange(false)}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{item.title}</h3>
                          <span className="text-[10px] px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-full">
                            {item.type === "blog" ? t('search.tab.blog') : t('search.tab.projects')}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
                          {item.description || item.excerpt}
                        </p>
                        {item.categories && (
                          <div className="flex gap-1 mt-1">
                            {item.categories.map((category: string) => (
                              <span
                                key={category}
                                className="text-[10px] px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-full"
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
