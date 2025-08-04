"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Chip } from "@/components/ui/chip"

// Project categories
const categories = [
  { id: "all", name: "All" },
  { id: "residential", name: "Residential" },
  { id: "commercial", name: "Commercial" },
  { id: "interior", name: "Interior" },
  { id: "exterior", name: "Exterior" },
]

interface Project {
  id: string
  title: string
  description: string
  image: string
  slug: string
  categories: string[]
}

// Fetch projects from microCMS API
const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects")
        if (!res.ok) throw new Error("Failed to load projects")
        const data = await res.json()
        setProjects(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchProjects()
  }, [])

  return projects
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const projects = useProjects()

  // Filter projects based on active category
  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.categories?.includes(activeCategory))

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Chip>Gallery</Chip>
          <h2 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mt-4 mb-6">
            Our Portfolio
          </h2>
          <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
            Everycorner has its own story
          </p>
        </motion.div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              activeCategory === category.id
                ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <AnimatePresence>
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              key={project.id}
              className="relative aspect-[3/4] overflow-hidden group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link href={`/projects/${project.slug}`}>
                <div className="relative w-full h-full">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />

                  <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 flex items-center">
                        {project.title}
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </h3>
                      <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">{project.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
