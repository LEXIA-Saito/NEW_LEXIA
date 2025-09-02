"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ExternalLink, Building, Code, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ImageSlideshow } from "@/components/ui/image-slideshow"
import { projectsData } from "@/lib/projects-data"

const filterOptions = {
  category: ["website", "system", "design"],
  year: ["2025", "2024", "2023", "2022"],
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6,
    },
  },
}

export default function OurWork() {
  const [activeFilter, setActiveFilter] = useState<string>("all")

  // 選択中のフィルターに応じて表示するプロジェクトを計算
  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projectsData
    return projectsData.filter(
      (project) => project.categories.includes(activeFilter) || project.year === activeFilter,
    )
  }, [activeFilter])

  return (
    <section className="py-20 bg-white dark:bg-neutral-900">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-neutral-900 dark:text-neutral-100 mb-4">
            Works
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">制作実績</p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Button
            variant={activeFilter === "all" ? "default" : "outline"}
            type="button"
            onClick={() => setActiveFilter("all")}
            className="rounded-full px-6 transition-all duration-300"
          >
            すべて
          </Button>
          <Button
            variant={activeFilter === "website" ? "default" : "outline"}
            type="button"
            onClick={() => setActiveFilter("website")}
            className="rounded-full px-6 transition-all duration-300"
          >
            <Building className="w-4 h-4 mr-2" />
            Webサイト
          </Button>
          <Button
            variant={activeFilter === "system" ? "default" : "outline"}
            type="button"
            onClick={() => setActiveFilter("system")}
            className="rounded-full px-6 transition-all duration-300"
          >
            <Code className="w-4 h-4 mr-2" />
            システム
          </Button>
          <Button
            variant={activeFilter === "design" ? "default" : "outline"}
            type="button"
            onClick={() => setActiveFilter("design")}
            className="rounded-full px-6 transition-all duration-300"
          >
            デザイン
          </Button>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-16"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div key={project.id} variants={cardVariants}>
                {project.isComingSoon ? (
                  <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-white dark:bg-neutral-800 cursor-not-allowed">
                    <div className="relative overflow-hidden aspect-video">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover grayscale opacity-60"
                      />
                      <div className="absolute inset-0 bg-black/60" />
                      <Badge className="absolute top-4 left-4 bg-blue-600 text-white">
                        <Clock className="w-3 h-3 mr-1" />
                        Coming Soon
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        {project.year && (
                          <Badge variant="outline" className="text-xs">
                            {project.year}
                          </Badge>
                        )}
                        {project.location && (
                          <Badge variant="outline" className="text-xs">
                            {project.location}
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-3 line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 4).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.tags.length - 4}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Link href={project.url || `/projects/${project.slug}`} target={project.url ? "_blank" : "_self"}>
                    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-white dark:bg-neutral-800">
                      <div className="relative overflow-hidden aspect-video">
                        {project.images && project.images.length > 1 ? (
                          <ImageSlideshow
                            images={project.images}
                            alt={project.title}
                            className="group-hover:scale-110 transition-transform duration-500"
                            interval={4000}
                          />
                        ) : (
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={project.featured}
                            fetchPriority={project.featured ? "high" : undefined}
                          />
                        )}
                        {project.featured && (
                          <Badge className="absolute top-4 left-4 bg-yellow-500 text-yellow-900 hover:bg-yellow-500">
                            注目
                          </Badge>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white dark:bg-neutral-800 rounded-full p-2">
                            <ExternalLink className="h-4 w-4 text-neutral-900 dark:text-neutral-100" />
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          {project.year && (
                            <Badge variant="outline" className="text-xs">
                              {project.year}
                            </Badge>
                          )}
                          {project.location && (
                            <Badge variant="outline" className="text-xs">
                              {project.location}
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                          {project.title}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {project.tags.slice(0, 4).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {project.tags.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                              +{project.tags.length - 4}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl md:text-3xl font-light text-neutral-900 dark:text-neutral-100 mb-6">
            あなたのプロジェクトも、
            <br />
            ここに並べませんか？
          </h3>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
            LEXIAと一緒に、あなたのビジネスを次のレベルへ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="px-8 py-4 text-lg rounded-full">
                プロジェクトを相談する
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg rounded-full bg-transparent">
                すべての実績を見る
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
