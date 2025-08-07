"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ExternalLink, Calendar, Building, Code, TrendingUp, Clock } from 'lucide-react'
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
  url?: string
  categories: string[]
  featured: boolean
  year: string
  tags: string[]
  location: string
  client?: string
  industry?: string
  services?: string[]
  isComingSoon?: boolean
  kpi?: {
    metric: string
    value: string
    improvement: string
  }[]
}

const projectsData: Project[] = [
  {
    id: "1",
    slug: "asaoka-pack",
    title: "有限会社朝岡パック様",
    description: "清潔感と女性目線を重視した食品包装会社のコーポレートサイト。ブランドイメージの向上と信頼性の構築を実現。",
    image: "/placeholder.svg?height=400&width=640&text=朝岡パック",
    url: "https://asaoka-pack.com/",
    categories: ["website"],
    featured: true,
    year: "2024",
    tags: ["コーポレート", "ロゴ"],
    location: "愛知県",
    client: "有限会社朝岡パック様",
    industry: "食品包装",
    services: ["コーポレートサイト", "ロゴデザイン"],
    kpi: [
      { metric: "PV増加", value: "+150%", improvement: "月間ページビュー向上" },
      { metric: "問い合わせ", value: "+60件/月", improvement: "コンバージョン向上" }
    ]
  },
  {
    id: "2",
    slug: "jalife",
    title: "株式会社JA.life様",
    description: "地域密着型不動産会社の物件検索サイト。2秒以内の高速表示と直感的な検索機能を実現。",
    image: "/placeholder.svg?height=400&width=640&text=JA.life",
    url: "https://jalife-aichi.com/",
    categories: ["system"],
    featured: true,
    year: "2024",
    tags: ["物件検索サイト"],
    location: "愛知県",
    client: "株式会社JA.life様",
    industry: "不動産",
    services: ["物件検索システム", "高速化対応"],
    kpi: [
      { metric: "検索速度", value: "2秒以内", improvement: "検索レスポンス向上" },
      { metric: "成約率", value: "+45%", improvement: "物件成約率向上" }
    ]
  },
  {
    id: "3",
    slug: "chubu-kaihatsu",
    title: "中部開発株式会社様",
    description: "人材派遣事業の導線設計に特化したコーポレートサイト。求職者と企業双方のニーズに対応。",
    image: "/placeholder.svg?height=400&width=640&text=中部開発",
    url: "https://chubu-kaihatsu.com/",
    categories: ["website"],
    featured: false,
    year: "2023",
    tags: ["コーポレート", "ロゴ", "パンフ"],
    location: "愛知県",
    client: "中部開発株式会社様",
    industry: "人材派遣",
    services: ["コーポレートサイト", "ロゴデザイン", "パンフレット制作"],
    kpi: [
      { metric: "応募数", value: "+200%", improvement: "求人応募数向上" },
      { metric: "資料請求", value: "+120%", improvement: "資料請求増加" }
    ]
  },
  {
    id: "4",
    slug: "minoken",
    title: "みの建築様",
    description: "伝統的な手刻み技術とモダンデザインを融合したブランドサイト。職人技術の価値を現代に伝える。",
    image: "/placeholder.svg?height=400&width=640&text=みの建築",
    url: "https://minoken.vercel.app/",
    categories: ["website"],
    featured: true,
    year: "2025",
    tags: ["ブランドサイト"],
    location: "愛知県",
    client: "みの建築様",
    industry: "建築・リフォーム",
    services: ["ブランドサイト", "3D表現"],
    kpi: [
      { metric: "問い合わせ", value: "+250%", improvement: "設計相談増加" },
      { metric: "滞在時間", value: "+400%", improvement: "サイト滞在時間延長" }
    ]
  },
  {
    id: "5",
    slug: "namix",
    title: "Namix Lure Works様",
    description: "ハンドメイドルアーブランドのパッケージデザイン。職人の技術と製品の魅力を表現。",
    image: "/placeholder.svg?height=400&width=640&text=Namix+Lure",
    categories: ["design"],
    featured: false,
    year: "2023",
    tags: ["パッケージデザイン"],
    location: "愛知県",
    client: "Namix Lure Works様",
    industry: "釣具・ハンドメイド",
    services: ["パッケージデザイン", "ブランディング"]
  },
  {
    id: "6",
    slug: "cotnas",
    title: "COTNAS様（保険）",
    description: "西尾市を拠点とする保険会社のWebサイトリニューアル。信頼性と親しみやすさを両立。",
    image: "/placeholder.svg?height=400&width=640&text=COTNAS",
    categories: ["website"],
    featured: false,
    year: "2025",
    tags: ["Webリニューアル"],
    location: "愛知県西尾市",
    client: "COTNAS様",
    industry: "保険",
    services: ["Webリニューアル"],
    isComingSoon: true
  }
]

const filterOptions = {
  category: ["website", "system", "design"],
  year: ["2025", "2024", "2023", "2022"]
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
}

const imageVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const overlayVariants = {
  hidden: { opacity: 0 },
  hover: { 
    opacity: 1,
    transition: { duration: 0.3 }
  }
}

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
}

export default function OurWork() {
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const filteredProjects = activeFilter === "all" 
    ? projectsData
    : projectsData.filter(project => 
        project.categories.includes(activeFilter) || 
        project.year === activeFilter
      )

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
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            制作実績
          </p>
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
            onClick={() => setActiveFilter("all")}
            className="rounded-full px-6 transition-all duration-300"
          >
            すべて
          </Button>
          <Button
            variant={activeFilter === "website" ? "default" : "outline"}
            onClick={() => setActiveFilter("website")}
            className="rounded-full px-6 transition-all duration-300"
          >
            <Building className="w-4 h-4 mr-2" />
            Webサイト
          </Button>
          <Button
            variant={activeFilter === "system" ? "default" : "outline"}
            onClick={() => setActiveFilter("system")}
            className="rounded-full px-6 transition-all duration-300"
          >
            <Code className="w-4 h-4 mr-2" />
            システム
          </Button>
          <Button
            variant={activeFilter === "design" ? "default" : "outline"}
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
              <motion.div
                key={project.id}
                variants={cardVariants}
                whileHover="hover"
                onHoverStart={() => setHoveredCard(project.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group"
              >
                {project.isComingSoon ? (
                  <Card className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-default aspect-[16/10]">
                    {/* Coming Soon Badge */}
                    <motion.div
                      variants={badgeVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="absolute top-3 right-3 z-10"
                    >
                      <Badge className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                        <Clock className="w-3 h-3 mr-1" />
                        Coming Soon
                      </Badge>
                    </motion.div>

                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover opacity-60"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-neutral-900/40" />
                    </div>

                    <CardContent className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs border-white/30 text-white">
                          {project.year}
                        </Badge>
                        <span className="text-xs opacity-80">{project.location}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                      <p className="text-sm opacity-90 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 bg-white/20 rounded text-white">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Link href={project.url || `/projects/${project.slug}`} target={project.url ? "_blank" : "_self"}>
                    <Card className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 aspect-[16/10]">
                      {/* Featured Badge */}
                      {project.featured && (
                        <motion.div
                          variants={badgeVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          className="absolute top-3 left-3 z-10"
                        >
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-3 py-1">
                            注目
                          </Badge>
                        </motion.div>
                      )}

                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <motion.div variants={imageVariants}>
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </motion.div>

                        {/* Gradient Overlay - 常に表示 */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                        {/* External Link Icon */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ 
                            opacity: hoveredCard === project.id ? 1 : 0,
                            scale: hoveredCard === project.id ? 1 : 0.8
                          }}
                          transition={{ duration: 0.2 }}
                          className="absolute bottom-4 right-4"
                        >
                          <div className="bg-white dark:bg-neutral-800 rounded-full p-3 shadow-lg">
                            <ExternalLink className="h-4 w-4 text-neutral-900 dark:text-neutral-100" />
                          </div>
                        </motion.div>
                      </div>

                      {/* Card Content - オーバーレイ表示 */}
                      <CardContent className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs border-white/30 text-white">
                            {project.year}
                          </Badge>
                          <span className="text-xs opacity-80">{project.location}</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                        <p className="text-sm opacity-90 line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {project.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-xs px-2 py-1 bg-white/20 rounded text-white">
                              {tag}
                            </span>
                          ))}
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
            あなたのプロジェクトも、<br />
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
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg rounded-full">
                すべての実績を見る
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
