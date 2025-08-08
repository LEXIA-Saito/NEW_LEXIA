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
import Script from "next/script"
import { Lightbulb, Zap, RefreshCcw, ListChecks, Code, LineChart, ChevronDown } from "lucide-react"
import { projectsData } from "@/lib/projects-data"
import { useState, type ReactNode } from "react"

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

export default function CompanyPage() {
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
        <Button variant="outline" className="w-full sm:w-auto">
          制作実績一覧を見る
        </Button>
      </Link>
      <Link href="/pricing">
        <Button variant="outline" className="w-full sm:w-auto">
          料金を確認する
        </Button>
      </Link>
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

  const strengths = [
    {
      icon: ListChecks,
      title: "要件整理",
      description: "ヒアリングから情報設計まで一気通貫で支援。",
      tech: "Notion / Figma",
      metric: "要件定義期間を最短2週",
      link: { href: "/services/web", label: "Web制作サービスを見る" },
    },
    {
      icon: Code,
      title: "高速実装",
      description: "Next.jsとTailwindで高速なUIを実装。",
      tech: "Next.js / Tailwind CSS",
      metric: "LCP 2s以内",
      link: { href: "/services/web", label: "実装サービスの詳細" },
    },
    {
      icon: LineChart,
      title: "運用改善",
      description: "計測とABテストで継続的に最適化。",
      tech: "Google Analytics / A/B Testing",
      metric: "CVR +20%実績",
      link: { href: "/services/system", label: "運用改善サービス" },
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
          規模や機能に応じてお見積もりします。<Link href="/pricing" className="text-primary underline">料金ページで詳細を確認する</Link>をご覧ください。
        </>
      ),
    },
    {
      q: "進め方は？",
      a: (
        <>
          要件整理→設計→開発→検証→公開の流れで進行します。<Link href="/services/web" className="text-primary underline">制作工程の流れを見る</Link>で詳しく解説しています。
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
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-label="scroll down">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-6-6m6 6l6-6" />
            </svg>
          </div>
        </section>

        {/* Summary */}
        <section className="container mx-auto px-4 py-24 space-y-8" data-testid="company-summary" id="summary">
          <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-4">会社概要</h1>
          <Breadcrumbs />
          <div className="space-y-2 text-neutral-700 dark:text-neutral-300">
            <p>LEXIAは愛知県碧南市の制作＆システム開発チーム。</p>
            <p>中小〜中堅企業の課題を“伝わる設計と実装”で解決。</p>
            <p>要件整理からUI実装、運用改善までワンストップ対応。</p>
            <p>Next.jsとTailwindで素早く美しいフロントを実現。</p>
            <p>5年の制作実績と迅速な改善が評価されています。</p>
            <p>
              <Link href="/services/web#process" className="underline">
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
              価値を“伝わるカタチ”に。事業の目的をユーザー体験へ翻訳し、成果につなげます。
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
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">{value.title}</h3>
                      <p className="text-neutral-700 dark:text-neutral-300 text-sm">{value.description}</p>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Company Data */}
        <section className="container mx-auto px-4 py-24 space-y-8" data-testid="company-data" id="data">
          <h2 className="text-3xl font-light text-neutral-900 dark:text-neutral-100">会社データ</h2>
          <div className="grid md:grid-cols-2 gap-4 text-neutral-700 dark:text-neutral-300">
            <div className="font-medium">事業名</div>
            <div>LEXIA</div>
            <div className="font-medium">設立</div>
            <div>2022年3月26日</div>
            <div className="font-medium">代表</div>
            <div>齋藤雅人</div>
            <div className="font-medium">所在地</div>
            <div>愛知県碧南市川端町1-45</div>
            <div className="font-medium">連絡先</div>
            <div>090-1742-3456 / lexia0web@gmail.com</div>
            <div className="font-medium">事業内容</div>
            <div>WEB制作・システム開発・デザイン</div>
          </div>
        </section>

        {/* Strengths */}
        <section className="py-24 bg-neutral-50 dark:bg-neutral-800" data-testid="strengths" id="strengths">
          <div className="container mx-auto px-4 space-y-12">
            <h2 className="text-3xl font-light text-neutral-900 dark:text-neutral-100">LEXIAの強み</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {strengths.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    variants={fadeIn}
                  >
                    <Card className="p-6 h-full">
                      <Icon className="w-8 h-8 text-neutral-900 dark:text-neutral-100 mb-4" />
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">{item.title}</h3>
                      <p className="text-neutral-700 dark:text-neutral-300 mb-4 text-sm">{item.description}</p>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-1">対応技術: {item.tech}</p>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-1">成果指標: {item.metric}</p>
                      <Link href={item.link.href} className="text-primary underline text-sm">
                        {item.link.label}
                      </Link>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
            <CTAButtons />
          </div>
        </section>

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
                        <Image src={project.image} alt={project.title} fill className="object-cover" />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">{project.title}</h3>
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
            <iframe
              title="LEXIA所在地"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3242.397843751322!2d136.994!3d34.881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6004d05cd901!2z44CSNDc2LTAwMTMg5oSb55-l55yM5a6d5biC6ZW35bed5Yy65bed5pys55S677yR77yR77yS!5e0!3m2!1sja!2sjp!4v1710000000000!5m2!1sja!2sjp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>
      <Footer />
      <Script id="company-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
