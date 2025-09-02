"use client"

import { useEffect, useRef } from "react"
import { Zap, ListChecks, LineChart } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

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
  title = "LEXIAが選ばれる“3つの理由”",
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
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const features: Feature[] = [
    {
      icon: <Zap className="h-8 w-8" aria-hidden="true" />,
      title: "高速実装",
      summary: "AIで加速、プロの微調整で仕上げる。",
      points: [
        "AI自動化で下準備・コーディングを時短",
        "AIを活用したパフォーマンス広告などの認定保持エンジニアがレビュー＆微調整",
        "設計から運用を見据えた実装でムダを削減",
      ],
      kpi: "LCP 2.5s以下目標",
    },
    {
      icon: <ListChecks className="h-8 w-8" aria-hidden="true" />, 
      title: "迷いのない要件整理",
      summary: "聞く→整理→言語化がブレない。",
      points: [
        "フリクションレスセールス／インバウンド／ソーシャル／CV最適化などの認定",
        "ヒアリング→分析→ドキュメント化→全体アーキテクチャ把握まで一気通貫",
        "要件定義を短期で確定し、仕様変更の揺れを最小化",
      ],
      kpi: "要件定義最短3日",
    },
    {
      icon: <LineChart className="h-8 w-8" aria-hidden="true" />, 
      title: "継続的な運用改善",
      summary: "公開“後”こそ本番。数字で育てるサイト運用。",
      points: [
        "Google アナリティクスで行動計測",
        "ボトルネック特定→UI/導線のAB検証",
        "CVR改善を継続的に実施",
      ],
      kpi: "CVR +15%継続改善",
    },
  ]

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      ref={sectionRef}
      className={`container mx-auto px-4 py-24 md:py-32 ${className}`}
    >
      <h2
        id={`${id}-title`}
        className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 text-center"
      >
        {title}
      </h2>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {features.map((f) => (
          <article
            key={f.title}
            className="rounded-2xl border p-6 shadow-sm hover:shadow-md transition bg-white dark:bg-neutral-900"
          >
            {f.icon}
            <h3 className="mt-4 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              {f.title}
            </h3>
            <p className="mt-2 font-bold text-lg text-neutral-900 dark:text-neutral-100">
              {f.summary}
            </p>
            <ul className="mt-3 space-y-1 text-neutral-700 dark:text-neutral-300 list-disc pl-5">
              {f.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
            <div className="mt-4">
              <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-neutral-700 dark:text-neutral-300">
                {f.kpi}
              </span>
            </div>
            {/* 詳しく見る CTA removed as per request */}
          </article>
        ))}
      </div>
    </section>
  )
}

