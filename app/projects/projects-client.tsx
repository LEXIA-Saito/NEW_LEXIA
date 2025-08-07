"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Grid, List, ExternalLink, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { projectsData } from "@/lib/projects-data"

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
const stripHtmlAndTruncate = (html: string, maxLength = 150): string => {
  if (!html) return ""

  const text = html.replace(/<[^>]*>/g, "")
  const decoded = text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim()

  if (decoded.length <= maxLength) return decoded
  return decoded.substring(0, maxLength) + "..."
}

const categories = [
  { id: "all", name: "すべて" },
  { id: "website", name: "WEBサイト制作" },
  { id: "ecommerce", name: "ECサイト" },
  { id: "system", name: "システム開発" },
  { id: "design", name: "デザイン制作" },
  { id: "branding", name: "ブランディング" },
  { id: "seo", name: "SEO対策" },
]

export default function ProjectsClient() {
  const [projects] = useState<Project[]>(projectsData)
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projectsData)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // フィルタリング処理
  useEffect(() => {
    let filtered = projects

    // カテゴリフィルター
    if (selectedCategory !== "all") {
      filtered = filtered.filter((project) => project.categories.includes(selectedCategory))
    }

    // 年フィルター
    if (selectedYear !== "all") {
      filtered = filtered.filter((project) => project.year === selectedYear)
    }

    // 検索フィルター
    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.categories.some((cat) => cat.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    setFilteredProjects(filtered)
  }, [projects, selectedCategory, selectedYear, searchQuery])

  // 利用可能な年を取得
  const availableYears = Array.from(new Set(projects.map((p) => p.year).filter(Boolean)))
    .sort()
    .reverse()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Back to Top Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 group transition-colors duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            トップページに戻る
          </Link>
        </div>

        {/* ヘッダー */}
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-5xl font-light tracking-tight text-neutral-900 dark:text-neutral-100 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            プロジェクト実績
          </motion.h1>
          <motion.p
            className="text-lg text-neutral-700 dark:text-neutral-300 max-w-3xl mx-auto mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            LEXIAが手がけたWEBサイト制作、システム開発、デザイン制作の実績をご紹介します
          </motion.p>
          <motion.p
            className="text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            企業サイトからECサイト、ブランディングまで、お客様のビジネス成長を支援する多様なプロジェクトをご覧ください
          </motion.p>
        </div>

        {/* フィルターとコントロール */}
        <motion.div
          className="mb-8 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* 検索バー */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="プロジェクトを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* フィルターとビューモード */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {/* カテゴリフィルター */}
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="text-xs"
                >
                  {category.name}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* 年フィルター */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-1 border border-neutral-300 dark:border-neutral-700 rounded-md text-sm bg-white dark:bg-neutral-800"
              >
                <option value="all">すべての年</option>
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}年
                  </option>
                ))}
              </select>

              {/* ビューモード切り替え */}
              <div className="flex border border-neutral-300 dark:border-neutral-700 rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* プロジェクト数表示 */}
        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-neutral-600 dark:text-neutral-400">
            {filteredProjects.length}件のプロジェクトが見つかりました
          </p>
        </motion.div>

        {/* プロジェクト一覧 */}
        <AnimatePresence>
          {filteredProjects.length > 0 ? (
            <motion.div
              className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  layout
                >
                  <Link href={`/projects/${project.slug}`}>
                    <Card
                      className={`group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-white dark:bg-neutral-800 ${
                        viewMode === "list" ? "flex" : ""
                      }`}
                    >
                      <div
                        className={`relative overflow-hidden ${
                          viewMode === "list" ? "w-1/3 aspect-video" : "aspect-video"
                        }`}
                      >
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
                      <CardContent className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
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
                          {stripHtmlAndTruncate(project.description, viewMode === "list" ? 200 : 100)}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {(project.categories || []).slice(0, 4).map((category) => (
                            <Badge key={category} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                          {(project.categories || []).length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                              +{(project.categories || []).length - 4}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                検索条件に一致するプロジェクトが見つかりませんでした。
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                  setSelectedYear("all")
                }}
              >
                フィルターをリセット
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-20"
        >
          <h2 className="text-2xl md:text-3xl font-light text-neutral-900 dark:text-neutral-100 mb-6">
            あなたのプロジェクトも、<br />
            ここに並べませんか？
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
            LEXIAと一緒に、あなたのビジネスを次のレベルへ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="px-8 py-4 text-lg rounded-full bg-neutral-900 hover:bg-neutral-800 text-white">
                プロジェクトを相談する
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg rounded-full border-2 border-neutral-300 hover:border-neutral-400">
                トップページに戻る
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
