"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

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

// HTMLタグを除去し、テキストを指定文字数で切り取る関数
const stripHtmlAndTruncate = (html: string, maxLength = 100): string => {
  if (!html) return ""

  // HTMLタグを除去
  const text = html.replace(/<[^>]*>/g, "")
  // エンティティをデコード
  const decoded = text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim()

  // 指定文字数で切り取り
  if (decoded.length <= maxLength) return decoded
  return decoded.substring(0, maxLength) + "..."
}

export default function OurWork() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        setError(null)

        console.log("Fetching projects from API...")

        // API Routeからデータを取得
        const response = await fetch("/api/projects", {
          cache: "no-store",
        })

        console.log("API Response status:", response.status)

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          console.error("API Error:", errorData)
          throw new Error(`API request failed: ${response.status} ${response.statusText}`)
        }

        const projectsData = await response.json()
        console.log("Received projects data:", projectsData)

        if (!Array.isArray(projectsData)) {
          console.error("Invalid data format received:", projectsData)
          throw new Error("Invalid data format received from API")
        }

        if (projectsData.length === 0) {
          setError("プロジェクトデータが見つかりません。microCMSにプロジェクトを追加してください。")
        } else {
          // 注目プロジェクトを優先し、最大6件まで表示
          const sortedProjects = projectsData
            .sort((a: Project, b: Project) => {
              if (a.featured && !b.featured) return -1
              if (!a.featured && b.featured) return 1
              return 0
            })
            .slice(0, 6)
          setProjects(sortedProjects)
          console.log(`Displaying ${sortedProjects.length} projects`)
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error)
        setError(`プロジェクトデータの取得に失敗しました: ${error instanceof Error ? error.message : "不明なエラー"}`)
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900 dark:text-neutral-100 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              実績ハイライト
            </motion.h2>
            <motion.p
              className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              私たちが手がけた代表的なプロジェクトをご紹介します
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-neutral-200 dark:bg-neutral-700 aspect-video rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-full"></div>
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900 dark:text-neutral-100 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              実績ハイライト
            </motion.h2>
            <motion.p
              className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              私たちが手がけた代表的なプロジェクトをご紹介します
            </motion.p>
          </div>

          <div className="text-center py-20">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-6 max-w-2xl mx-auto">
              <p className="text-yellow-800 dark:text-yellow-200 mb-4">{error}</p>
              <div className="text-sm text-yellow-700 dark:text-yellow-300">
                <p className="mb-2">解決方法:</p>
                <ul className="text-left space-y-1">
                  <li>• microCMSで「projects」エンドポイントが作成されているか確認</li>
                  <li>• 環境変数が正しく設定されているか確認</li>
                  <li>• microCMSにプロジェクトデータが登録されているか確認</li>
                </ul>
              </div>
            </div>
            <Link href="/projects">
              <Button variant="outline">プロジェクトページを見る</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900 dark:text-neutral-100 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            実績ハイライト
          </motion.h2>
          <motion.p
            className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            私たちが手がけた代表的なプロジェクトをご紹介します
          </motion.p>
        </div>

        {projects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/projects/${project.slug}`}>
                    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-white dark:bg-neutral-800">
                      <div className="aspect-video relative overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.jpg"}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
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
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4">
                          {stripHtmlAndTruncate(project.description, 100)}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {(project.categories || []).slice(0, 3).map((category) => (
                            <Badge key={category} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                          {(project.categories || []).length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{(project.categories || []).length - 3}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/projects">
                <Button
                  variant="outline"
                  className="group px-8 py-3 text-base border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 bg-transparent"
                >
                  すべてのプロジェクトを見る
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">プロジェクトデータがありません。</p>
            <Link href="/projects">
              <Button variant="outline">プロジェクトページを見る</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
