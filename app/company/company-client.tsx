"use client"

import Image from "next/image"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import LexiaLogoParticles from "@/components/lexia-logo-particles"
import LexiaPrinciples from "@/components/sections/lexia-principles"
import CompanyInfoTable from "@/components/company-info-table"
import Script from "next/script"
import { Lightbulb, Zap, RefreshCcw, ChevronDown } from "lucide-react"
import { projectsData } from "@/lib/projects-data"
import { useState, type ReactNode } from "react"
import Features from "@/components/Features"

function FAQItem({ q, a }: { q: string; a: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex justify-between items-center py-4 text-left text-neutral-900 dark:text-neutral-100"
      >
        {q}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="pb-4 text-neutral-700 dark:text-neutral-300 text-sm">{a}</div>}
    </div>
  )
}

export default function CompanyClient() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const CTAButtons = () => (
    <div className="flex flex-col sm:flex-row gap-4 justify-center" data-testid="cta-block">
      <Link href="/contact">
        <Button className="w-full sm:w-auto">お問い合わせ</Button>
      </Link>
      <Link href="/projects">
        <Button variant="outline" className="w-full sm:w-auto bg-transparent">
          制作実績一覧を見る
        </Button>
      </Link>
      <Link href="/pricing">
        <Button variant="outline" className="w-full sm:w-auto bg-transparent">
          料金を確認する
        </Button>
      </Link>
      <Button
        variant="outline"
        className="w-full sm:w-auto bg-transparent"
        asChild
      >
        <Link href="#principles">理念を見る</Link>
      </Button>
    </div>
  )

  const values = [
    {
      icon: Lightbulb,
      title: "課題定義から伴走",
      description: "要件の言語化と優先度設計で迷いをゼロに。",
    },
    {
      icon: Zap,
      title: "速く、美しく、壊れにくく",
      description: "再利用可能なUIとパフォーマンス基準を徹底。",
    },
    {
      icon: RefreshCcw,
      title: "出して終わらせない",
      description: "計測→改善のループで継続的に伸ばす。",
    },
  ]

  const faqs = [
    {
      q: "納期の目安は？",
      a: "一般的なコーポレートサイトで約1〜2ヶ月を想定しています。要件により変動します。",
    },
    {
      q: "費用の考え方は？",
      a: (
        <>
          規模や機能に応じてお見積もりします。
          <Link href="/pricing" className="text-primary underline">
            料金ページで詳細を確認する
          </Link>
          をご覧ください。
        </>
      ),
    },
    {
      q: "進め方は？",
      a: (
        <>
          要件整理→設計→開発→検証→公開の流れで進行します。
          <Link href="/company/process" className="text-primary underline">
            制作工程の流れを見る
          </Link>
          で詳しく解説しています。
        </>
      ),
    },
    {
      q: "権利は？",
      a: "納品後、テキストと画像の権利は原則としてお客様に帰属します。",
    },
    {
      q: "保守は？",
      a: "公開後の保守・改善も継続的にサポートします。内容に応じて保守プランをご提案します。",
    },
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: "LEXIA",
    url: "https://lexia-hp.com/",
    logo: "https://lexia-hp.com/ogp.png",
    description: "愛知県碧南市のWEB制作・システム開発。要件整理からUI実装、運用改善まで一貫対応。",
    telephone: "090-1742-3456",
    email: "lexia0web@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "JP",
      addressRegion: "愛知県",
      addressLocality: "碧南市",
      streetAddress: "川端町1-45",
    },
    areaServed: ["Japan"],
    sameAs: ["https://www.instagram.com/lexia_web", "https://x.com/lexia_web"],
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        {/* Hero */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden" id="hero">
          <div className="absolute inset-0 pointer-events-none select-none">
            <LexiaLogoParticles />
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white animate-bounce">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-label="scroll down"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-6-6m6 6l6-6" />
            </svg>
          </div>
        </section>

        {/* Summary */}
        <section className="container mx-auto px-4 py-24 space-y-8" data-testid="company-summary" id="summary">
          <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-4">事業概要</h1>
          <Breadcrumbs />
          <div className="space-y-2 text-neutral-700 dark:text-neutral-300 text-center">
            <p>
              LEXIAは愛知県碧南市のWEB制作事業です。中小から中堅企業の課題を伝わる設計と実装で解決します。
              要件定義からUI実装、運用改善までワンストップで対応します。最新の技術とAIを駆使した制作を行って、業界最安最速でWEB制作を行います。
            </p>
            <p>
              <Link href="/company/process" className="underline">
                制作工程を見る
              </Link>
            </p>
          </div>
          <CTAButtons />
        </section>

        {/* Mission & Values */}
        <section className="py-24 bg-neutral-50 dark:bg-neutral-800" data-testid="mission" id="mission">
          <div className="container mx-auto px-4 space-y-12">
            <h2 className="text-3xl font-light text-neutral-900 dark:text-neutral-100 mb-4">ミッション＆バリュー</h2>
            <p className="text-neutral-700 dark:text-neutral-300">
              価値を「伝わるカタチ」に。事業の目的をユーザー体験へ翻訳し、成果につなげます。
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <motion.div
                    key={value.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    variants={fadeIn}
                  >
                    <Card className="p-6 h-full">
                      <Icon className="w-8 h-8 text-neutral-900 dark:text-neutral-100 mb-4" />
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        {value.title}
                      </h3>
                      <p className="text-neutral-700 dark:text-neutral-300 text-sm">{value.description}</p>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* LEXIA Principles section */}
        <LexiaPrinciples />

        {/* Business Overview */}
        <section className="container mx-auto px-4 py-24 space-y-8" data-testid="business-overview" id="data">
          <h2 className="text-3xl font-light text-neutral-900 dark:text-neutral-100">事業情報</h2>
          <CompanyInfoTable />
        </section>

        {/* Strengths */}
        <Features id="strengths" title="LEXIAの強み" />

        {/* Representative & Team */}
        <section className="container mx-auto px-4 py-24 space-y-8" data-testid="team" id="team">
          <h2 className="text-3xl font-light text-neutral-900 dark:text-neutral-100">代表＆チーム</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">代表メッセージ</h3>
              <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                齋藤雅人は愛知県碧南市出身のエンジニアです。地域の中小企業がデジタルで成果を出せるよう、伝わる設計と実装にこだわっています。
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden">
              <Image src="/placeholder.svg" alt="代表 齋藤雅人" fill className="object-cover" />
            </div>
          </div>
          <div className="pt-4">
            <Link
              href="/team"
              className="inline-flex items-center justify-center rounded-md bg-neutral-900 text-white px-5 py-2.5 text-sm font-medium hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 transition-colors"
            >
              チーム一覧を見る
            </Link>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-24 bg-neutral-50 dark:bg-neutral-800" data-testid="achievements" id="achievements">
          <div className="container mx-auto px-4 space-y-8">
            <h2 className="text-3xl font-light text-neutral-900 dark:text-neutral-100">実績</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projectsData.slice(0, 3).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  variants={fadeIn}
                >
                  <Link href={`/projects/${project.slug}`} className="block h-full">
                    <Card className="overflow-hidden h-full">
                      <div className="relative w-full aspect-[4/3]">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                          {project.title}
                        </h3>
                        <p className="text-sm text-neutral-700 dark:text-neutral-300">
                          {project.description.substring(0, 40)}…
                        </p>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 py-24 space-y-8" data-testid="faq" id="faq">
          <h2 className="text-3xl font-light text-neutral-900 dark:text-neutral-100">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((item, idx) => (
              <FAQItem key={idx} q={item.q} a={item.a} />
            ))}
          </div>
        </section>

        {/* CTA bottom */}
        <section className="py-24 bg-neutral-50 dark:bg-neutral-800" data-testid="cta-bottom">
          <CTAButtons />
        </section>

        {/* Access */}
        <section className="container mx-auto px-4 py-24 space-y-4" data-testid="access" id="access">
          <h2 className="text-3xl font-light text-neutral-900 dark:text-neutral-100">アクセス</h2>
          <p className="text-neutral-700 dark:text-neutral-300">
            愛知県碧南市川端町1-45
            <br />
            TEL: 090-1742-3456
          </p>
          <div className="w-full h-64 md:h-96">
            {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
              <iframe
                title="LEXIA所在地"
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(
                  '愛知県碧南市川端町1-45',
                )}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <p className="text-neutral-700 dark:text-neutral-300">
                <a
                  href="https://maps.google.com/?q=愛知県碧南市川端町1-45"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Googleマップで場所を開く
                </a>
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <Script
        id="company-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
