"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Zap, ListChecks, LineChart } from "lucide-react"
import { trackEvent } from "@/lib/analytics"
import type { JSX } from "react/jsx-runtime"

interface Feature {
  icon: JSX.Element
  title: string
  summary: string
  points: string[]
  kpi: string
}

interface FeaturesProps {
  id?: string
  title?: string
  className?: string
}

export default function Features({
  id = "features",
  title = "LEXIAが選ばれる3つの理由",
  className = "",
}: FeaturesProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          trackEvent("features_impression", { section_id: id })
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [id])

  const features: Feature[] = [
    {
      icon: <Zap className="h-6 w-6" aria-hidden="true" />,
      title: "高速実装",
      summary: "AIで加速、プロの微調整で仕上げる。",
      points: [
        "AI自動化で下準備・コーディングを時短",
        "認定保持エンジニアがレビュー＆微調整",
        "設計から運用を見据えた実装でムダを削減",
      ],
      kpi: "LCP 2.5s以下目標",
    },
    {
      icon: <ListChecks className="h-6 w-6" aria-hidden="true" />,
      title: "迷いのない要件整理",
      summary: "聞く→整理→言語化がブレない。",
      points: [
        "認定資格に基づくヒアリング手法",
        "分析→ドキュメント化→アーキテクチャ把握まで一気通貫",
        "要件定義を短期で確定し、仕様変更の揺れを最小化",
      ],
      kpi: "要件定義最短3日",
    },
    {
      icon: <LineChart className="h-6 w-6" aria-hidden="true" />,
      title: "継続的な運用改善",
      summary: "公開後こそ本番。数字で育てるサイト運用。",
      points: ["Google アナリティクスで行動計測", "ボトルネック特定→UI/導線のAB検証", "CVR改善を継続的に実施"],
      kpi: "CVR +15%継続改善",
    },
  ]

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id={id} aria-labelledby={`${id}-title`} ref={sectionRef} className={`py-24 md:py-32 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeInUp}
        >
          <span className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block">Why Choose Us</span>
          <h2 id={`${id}-title`} className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            {title}
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {features.map((f, index) => (
            <motion.article
              key={f.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={fadeInUp}
              className="group relative bg-card rounded-2xl border border-border p-8 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
            >
              {/* Number indicator */}
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg shadow-lg">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                {f.icon}
              </div>

              <h3 className="text-xl font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-accent font-medium mb-4">{f.summary}</p>

              <ul className="space-y-2 text-muted-foreground mb-6">
                {f.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span className="text-sm">{p}</span>
                  </li>
                ))}
              </ul>

              {/* KPI badge */}
              <div className="pt-4 border-t border-border">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  {f.kpi}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
