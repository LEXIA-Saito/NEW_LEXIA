"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowUpRight, Search, Filter, X, Grid, List } from "lucide-react"
import { Chip } from "@/components/ui/chip"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ProjectsListSchema } from "@/components/schema/projects-list-schema"
import { projectsData } from "@/lib/projects-data"
import { categoryData } from "@/lib/category-data"

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeYear, setActiveYear] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isLoaded, setIsLoaded] = useState(false)

  // Extract unique years for filtering
  const years = Array.from(new Set(projectsData.map((project) => project.year.toString()))).sort(
    (a, b) => Number.parseInt(b) - Number.parseInt(a),
  )

  // Filter projects based on search query, active category, and year
  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "All" || project.category === activeCategory

    const matchesYear = activeYear === null || project.year.toString() === activeYear

    return matchesSearch && matchesCategory && matchesYear
  })

  // Get featured projects (most recent 3 projects)
  const featuredProjects = [...projectsData].sort((a, b) => b.year - a.year).slice(0, 3)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const clearFilters = () => {
    setActiveCategory("All")
    setActiveYear(null)
    setSearchQuery("")
  }

  if (!isLoaded) {
    return null // Prevent flash of unstyled content
  }

  return (
    <>
      <ProjectsListSchema projects={filteredProjects} />
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="mb-8">
            <Link
              href="/#work"
              className="inline-flex items-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Chip>Portfolio</Chip>
              <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mt-4 mb-6">
                Our Projects
              </h1>
              <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
                Explore our diverse portfolio of architectural projects, from residential homes to commercial spaces.
              </p>
            </motion.div>
          </div>

          {/* Featured Projects */}
          <div className="mb-20">
            <h2 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-8">Featured Projects</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm ${
                    index === 0 ? "lg:col-span-3 lg:grid lg:grid-cols-2 lg:gap-6" : ""
                  }`}
                >
                  <Link href={`/projects/${project.slug}`} className={index === 0 ? "lg:h-full" : ""}>
                    <div
                      className={`relative ${index === 0 ? "aspect-[16/9] lg:h-full" : "aspect-[16/9]"} overflow-hidden`}
                    >
                      <Image
                        src={project.coverImage || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 px-3 py-1 rounded-full text-xs font-medium">
                        {project.category}
                      </div>
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm mb-3">
                      <span>{project.year}</span>
                      <span className="mx-2">•</span>
                      <span>{project.location}</span>
                    </div>
                    <Link href={`/projects/${project.slug}`}>
                      <h3
                        className={`${index === 0 ? "text-2xl" : "text-xl"} font-medium text-neutral-900 dark:text-neutral-100 mb-3 hover:underline`}
                      >
                        {project.title}
                      </h3>
                    </Link>
                    <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-4">{project.description}</p>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center text-neutral-900 dark:text-neutral-100 text-sm hover:underline group"
                    >
                      View Project
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
                  placeholder="Search projects..."
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
                  {(activeCategory !== "All" || activeYear !== null) && (
                    <span className="ml-1 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {(activeCategory !== "All" ? 1 : 0) + (activeYear !== null ? 1 : 0)}
                    </span>
                  )}
                </Button>
                {(activeCategory !== "All" || activeYear !== null) && (
                  <Button variant="ghost" onClick={clearFilters} className="flex items-center gap-2 rounded-full">
                    <X className="h-4 w-4" />
                    <span>Clear</span>
                  </Button>
                )}
                <div className="hidden md:flex border border-neutral-200 dark:border-neutral-700 rounded-full">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-l-full ${viewMode === "grid" ? "bg-neutral-100 dark:bg-neutral-800" : ""}`}
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid view"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-r-full ${viewMode === "list" ? "bg-neutral-100 dark:bg-neutral-800" : ""}`}
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg mb-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          {/* Projects Grid/List */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-500 dark:text-neutral-400 mb-4">No projects found matching your criteria.</p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-light text-neutral-900 dark:text-neutral-100">
                  {filteredProjects.length} {filteredProjects.length === 1 ? "Project" : "Projects"} Found
                </h2>
              </div>

              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm"
                    >
                      <Link href={`/projects/${project.slug}`}>
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <Image
                            src={project.coverImage || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute top-4 left-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 px-3 py-1 rounded-full text-xs font-medium">
                            {project.category}
                          </div>
                        </div>
                      </Link>
                      <div className="p-6">
                        <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm mb-3">
                          <span>{project.year}</span>
                          <span className="mx-2">•</span>
                          <span>{project.location}</span>
                        </div>
                        <Link href={`/projects/${project.slug}`}>
                          <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-3 hover:underline">
                            {project.title}
                          </h2>
                        </Link>
                        <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-4">{project.description}</p>
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center text-neutral-900 dark:text-neutral-100 text-sm hover:underline group"
                        >
                          View Project
                          <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm flex flex-col md:flex-row"
                    >
                      <Link href={`/projects/${project.slug}`} className="md:w-1/3">
                        <div className="relative aspect-[16/9] md:aspect-auto md:h-full overflow-hidden">
                          <Image
                            src={project.coverImage || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute top-4 left-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 px-3 py-1 rounded-full text-xs font-medium">
                            {project.category}
                          </div>
                        </div>
                      </Link>
                      <div className="p-6 md:w-2/3">
                        <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm mb-3">
                          <span>{project.year}</span>
                          <span className="mx-2">•</span>
                          <span>{project.location}</span>
                        </div>
                        <Link href={`/projects/${project.slug}`}>
                          <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-3 hover:underline">
                            {project.title}
                          </h2>
                        </Link>
                        <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-4">{project.description}</p>
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center text-neutral-900 dark:text-neutral-100 text-sm hover:underline group"
                        >
                          View Project
                          <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
