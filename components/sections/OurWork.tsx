"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"
import SectionIcon from "@/components/section-icon"
import { t } from "@/lib/i18n"

// Project categories
const categories = [
  { id: "all", name: t("categories.all") },
  { id: "ecommerce", name: t("categories.ecommerce") },
  { id: "corporate", name: t("categories.corporate") },
  { id: "webapp", name: t("categories.webapp") },
  { id: "branding", name: t("categories.branding") },
  { id: "seo", name: t("categories.seo") },
]

interface Project {
  id: string
  slug: string
  title: string
  description: string
  image: string
  categories: string[]
  featured: boolean
  year: string
  tags: string[]
  location: string
}

export default function Work() {
  const [projects, setProjects] = useState<Project[]>([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch("/api/projects")

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        // データが配列であることを確認
        if (Array.isArray(data)) {
          setProjects(data)
        } else if (data && Array.isArray(data.contents)) {
          setProjects(data.contents)
        } else {
          console.warn("Received data is not an array:", data)
          setProjects([])
        }
      } catch (error: any) {
        console.error("Failed to fetch projects:", error)
        setError(error.message)
        setProjects([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Filter projects based on active category and filters
  const filteredProjects = Array.isArray(projects)
    ? projects.filter((project) => {
        const matchesCategory =
          activeCategory === "all" || (project.categories && project.categories.includes(activeCategory))

        // If no filters are active, just check category
        if (activeFilters.length === 0) return matchesCategory

        // Check if project matches any active filter
        const matchesFilter = activeFilters.some((filter) => {
          if (filter === "recent" && project.year === "2023") return true
          if (filter === "japanesemarket" && project.location && project.location.toLowerCase().includes("japan"))
            return true
          return false
        })

        return matchesCategory && matchesFilter
      })
    : []

  // Featured projects for the showcase
  const featuredProjects = Array.isArray(projects) ? projects.filter((project) => project.featured) : []

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  if (error) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-center py-16">
          <p className="text-red-500 mb-4">プロジェクトの読み込みに失敗しました: {error}</p>
          <Button onClick={() => window.location.reload()}>再試行</Button>
        </div>
      </div>
    )
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
          <Chip>{t("ourWork.title")}</Chip>
          <div className="flex flex-col items-center mt-4 mb-6">
            <SectionIcon index={2} className="mb-4" />
            <h2 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100">
              {t("ourWork.subtitle")}
            </h2>
          </div>
        </motion.div>
      </div>

      {/* Featured Projects Showcase */}
      <div className="mb-24">
        {isLoading ? (
          <div className="text-center py-16">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4">プロジェクトを読み込み中...</p>
          </div>
        ) : featuredProjects.length === 0 ? (
          <p className="text-center text-neutral-500 mb-8">注目プロジェクトがありません</p>
        ) : (
          featuredProjects.slice(0, 2).map((project, index) => (
            <motion.div
              key={project.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-8 md:gap-12 items-center mb-24`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              variants={fadeIn}
            >
              <div className="w-full md:w-1/2">
                <Link href={`/projects/${project.slug}`}>
                  <motion.div
                    className="relative aspect-[4/3] overflow-hidden rounded-lg group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={project.image || "/placeholder.svg?height=400&width=600"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                  </motion.div>
                </Link>
              </div>
              <div className="w-full md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100 mb-3">{project.title}</h3>
                  <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {(project.tags && project.tags.length ? project.tags : project.categories || []).map(
                      (tag: string) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ),
                    )}
                  </div>

                  <Link href={`/projects/${project.slug}`}>
                    <Button className="rounded-full bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 group">
                      <span>{t("project.viewProject")}</span>
                      <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Portfolio Gallery */}
      <div>
        <div className="text-center mb-12">
          <motion.h3
            className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeIn}
          >
            {t("ourWork.explorePortfolio")}
          </motion.h3>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeCategory === category.id
                    ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* Additional filters */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="rounded-full flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filters {activeFilters.length > 0 && `(${activeFilters.length})`}</span>
              </Button>

              {showFilterMenu && (
                <motion.div
                  className="absolute top-full mt-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-3 z-10 min-w-[200px]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="filter-recent"
                        checked={activeFilters.includes("recent")}
                        onChange={() => toggleFilter("recent")}
                        className="rounded text-neutral-900 dark:text-neutral-100"
                      />
                      <label htmlFor="filter-recent" className="text-sm">
                        {t("ourWork.filter.recent")}
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="filter-japanesemarket"
                        checked={activeFilters.includes("japanesemarket")}
                        onChange={() => toggleFilter("japanesemarket")}
                        className="rounded text-neutral-900 dark:text-neutral-100"
                      />
                      <label htmlFor="filter-japanesemarket" className="text-sm">
                        {t("ourWork.filter.japan")}
                      </label>
                    </div>
                    <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700 mt-2">
                      <Button variant="ghost" size="sm" onClick={() => setActiveFilters([])} className="w-full text-xs">
                        {t("ourWork.clearFilters")}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
          >
            {isLoading ? (
              <div className="col-span-3 text-center py-8">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-4">プロジェクトを読み込み中...</p>
              </div>
            ) : filteredProjects.length === 0 ? (
              <p className="col-span-3 text-center text-neutral-500">該当するプロジェクトがありません</p>
            ) : (
              filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  className="relative aspect-[3/4] overflow-hidden group rounded-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Link href={`/projects/${project.slug}`}>
                    <div className="relative w-full h-full">
                      <Image
                        src={project.image || "/placeholder.svg?height=400&width=300"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />

                      <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 flex items-center">
                            {project.title}
                            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </h3>
                          <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {(project.categories || []).map((category) => (
                              <span
                                key={category}
                                className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-full"
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
