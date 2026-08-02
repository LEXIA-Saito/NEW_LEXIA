"use client"

import { useEffect, useRef } from "react"
import { ExternalLink } from "lucide-react"
import { trackEvent } from "@/lib/analytics"
import Image from "next/image"
import Link from "next/link"

interface LexiaToolsProps {
  id?: string
  className?: string
}

export default function LexiaTools({ id = "lexia-tools", className = "" }: LexiaToolsProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          trackEvent("lexia_tools_impression", { section_id: id })
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [id])

  const tools = [

    {
      name: "LEXIA TOOLS",
      subtitle: "WEB制作支援ツール集",
      description: "画像変換・リサイズ、ファイルリネーム、ZIP圧縮など、制作現場で必要な機能をブラウザで完結。",
      url: "https://tools.lexia-hp.com/",
      image: "/images/create-an-open-graph-protocol-image-with-an-aspect-1765943437748.png",
      // 個別ツールページへの直リンク。フッター以外の導線を増やし、
      // クロール頻度の高いトップページから各ツールページへ到達できるようにする。
      features: [
        { name: "画像形式変換", href: "https://tools.lexia-hp.com/image-converter" },
        { name: "一括リサイズ", href: "https://tools.lexia-hp.com/image-resizer" },
        { name: "ZIP圧縮・解凍", href: "https://tools.lexia-hp.com/zip-tool" },
        { name: "ファイルリネーム", href: "https://tools.lexia-hp.com/file-renamer" },
      ],
    },
  ]

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      ref={sectionRef}
      className={`container mx-auto px-4 py-24 md:py-32 ${className}`}
    >
      <div className="text-center mb-16">
        <h2 id={`${id}-title`} className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-4">
          自社開発ツール
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          日々の業務効率化のために開発した自社ツールを無料で公開しています
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-1 max-w-3xl mx-auto">
        {tools.map((tool) => (
          <article
            key={tool.name}
            className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <Link
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("lexia_tool_click", { tool_name: tool.name })}
              className="block"
            >
              <div className="relative aspect-[1200/630] bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                <Image
                  src={tool.image || "/placeholder.svg"}
                  alt={`${tool.name}のバナー画像`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">{tool.name}</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{tool.subtitle}</p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-neutral-400 group-hover:text-accent transition-colors flex-shrink-0 mt-1" />
                </div>

                <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">{tool.description}</p>

                <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                  <span>ツールを使う</span>
                  <ExternalLink className="h-4 w-4" />
                </div>
              </div>
            </Link>

            {/* 個別ツールへの導線。<Link> の入れ子を避けるためカード本体の外に出している */}
            <div className="px-6 pb-6 flex flex-wrap gap-2">
              {tool.features.map((feature) => (
                <Link
                  key={feature.name}
                  href={feature.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("lexia_tool_click", { tool_name: feature.name })}
                  className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-1 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                >
                  {feature.name}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
