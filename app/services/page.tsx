"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Monitor, Smartphone, Camera, Mail, FileText, ShoppingCart, Globe, MousePointerClick, Palette, Settings, Film, Smile } from "lucide-react"
import OurProcess from "@/components/sections/OurProcess"
import Script from "next/script"
import { SITE_URL } from "@/lib/config"

// Service tab definitions
const SERVICE_TABS = [
  { id: "web", label: "WEB制作", Icon: Globe },
  { id: "movie", label: "動画制作", Icon: Film },
  { id: "design", label: "デザイン制作", Icon: Palette },
  { id: "system", label: "システム開発", Icon: Settings },
  { id: "pc", label: "PC教室", Icon: Monitor },
] as const

type ServiceId = (typeof SERVICE_TABS)[number]["id"]

const servicesSchemaData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        "@id": `${SITE_URL}/services#web`,
        name: "WEB制作",
        description: "ホームページ制作、コーポレート、EC、ランディング、ポートフォリオ等をトータルでサポートします。",
        provider: {
          "@type": "Organization",
          name: "LEXIA",
        },
        areaServed: "愛知県",
        serviceType: "Web Development",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        "@id": `${SITE_URL}/services#design`,
        name: "デザイン制作",
        description: "名刺デザインやチラシデザインなど、各種印刷物の制作も承ります。",
        provider: {
          "@type": "Organization",
          name: "LEXIA",
        },
        areaServed: "愛知県",
        serviceType: "Graphic Design",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        "@id": `${SITE_URL}/services#system`,
        name: "システム開発",
        description: "予約システム、顧客管理システム、財務管理システム等の開発を行います。",
        provider: {
          "@type": "Organization",
          name: "LEXIA",
        },
        areaServed: "愛知県",
        serviceType: "Software Development",
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Service",
        "@id": `${SITE_URL}/services#movie`,
        name: "動画制作",
        description:
          "企画から撮影・編集・書き出しまでワンストップ対応。採用・会社紹介・店舗PR・SNSショートまで幅広く制作します。",
        provider: {
          "@type": "Organization",
          name: "LEXIA",
        },
        areaServed: "愛知県",
        serviceType: "Video Production",
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "Service",
        "@id": `${SITE_URL}/services#pc`,
        name: "PC教室",
        description: "パソコン初心者やシニアの方が、生活に役立つ使い方を楽しく学べる教室です。",
        provider: {
          "@type": "Organization",
          name: "LEXIA",
        },
        areaServed: "碧南市",
        serviceType: "Computer Training",
      },
    },
  ],
}

const faqSchemaData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    // WEB制作 FAQ
    {
      "@type": "Question",
      name: "Webサイト制作の納期はどれくらいですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "一般的には1〜2ヶ月程度ですが、規模や要件によって異なります。",
      },
    },
    {
      "@type": "Question",
      name: "既存サイトのリニューアルにも対応できますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい。現在の課題をヒアリングし、より効果的なサイトへ改善します。",
      },
    },
    {
      "@type": "Question",
      name: "CMSの導入は可能ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WordPressやヘッドレスCMSなど、ご要望に合わせて構築いたします。",
      },
    },
    // デザイン FAQ
    {
      "@type": "Question",
      name: "ロゴや名刺など複数のデザインをまとめて依頼できますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい。ブランド全体のトーンを統一した形で一括制作が可能です。",
      },
    },
    {
      "@type": "Question",
      name: "デザインの修正は何回まで対応してもらえますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "基本的に2回まで無料で対応し、それ以上はご相談の上進めます。",
      },
    },
    // システム開発 FAQ
    {
      "@type": "Question",
      name: "どのような開発言語やフレームワークに対応していますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Next.jsやLaravelなどのモダンなWeb技術を中心に対応しています。",
      },
    },
    {
      "@type": "Question",
      name: "開発後の保守・運用サポートはありますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい。運用フェーズの改善提案や機能追加にも継続的に対応します。",
      },
    },
    // 動画制作 FAQ
    {
      "@type": "Question",
      name: "どのくらいの尺の動画まで制作できますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "数十秒のショート動画から10分程度のPR動画まで対応しています。",
      },
    },
    {
      "@type": "Question",
      name: "撮影のみ、編集のみの依頼は可能ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい。必要な工程だけを切り出してご依頼いただけます。",
      },
    },
    // PC教室 FAQ
    {
      "@type": "Question",
      name: "レッスンは個別指導ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "基本はマンツーマン形式で、受講者のペースに合わせて進めます。",
      },
    },
    {
      "@type": "Question",
      name: "オンラインでの受講は可能ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい。Zoomなどを使ったオンラインレッスンにも対応しています。",
      },
    },
  ],
}

function ServicesContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tabParam = searchParams.get("tab") as ServiceId | null
  const [activeTab, setActiveTab] = useState<ServiceId>(
    tabParam && SERVICE_TABS.some((t) => t.id === tabParam) ? tabParam : "web",
  )

  useEffect(() => {
    if (tabParam && SERVICE_TABS.some((t) => t.id === tabParam)) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  const handleTabChange = (tabId: ServiceId) => {
    setActiveTab(tabId)
    router.push(`/services?tab=${tabId}`, { scroll: false })
  }

  return (
    <>
      <Script
        id="services-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchemaData) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-4 text-center">
            サービス一覧
          </h1>
          <Breadcrumbs />
          <p className="text-center text-neutral-700 dark:text-neutral-300 mb-8">
            LEXIAが提供する各種サービスをご紹介します。
          </p>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            {SERVICE_TABS.map((tab) => {
              const IconComponent = tab.Icon
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                  }`}
                  aria-pressed={activeTab === tab.id}
                >
                  <IconComponent className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {activeTab === "web" && <WebServiceContent />}
            {activeTab === "design" && <DesignServiceContent />}
            {activeTab === "system" && <SystemServiceContent />}
            {activeTab === "movie" && <MovieServiceContent />}
            {activeTab === "pc" && <PcServiceContent />}
          </div>

          {/* Global CTA */}
          <section className="mt-16 text-center border-t border-neutral-200 dark:border-neutral-800 pt-12">
            <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-4">お気軽にご相談ください</h2>
            <div className="inline-flex flex-wrap gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-neutral-900 text-white px-5 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                無料相談する
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 px-5 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                料金を見る
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 px-5 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                実績を見る
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

// ============ WEB制作 ============
function WebServiceContent() {
  const faqs = [
    { q: "Webサイト制作の納期はどれくらいですか？", a: "一般的には1〜2ヶ月程度ですが、規模や要件によって異なります。" },
    {
      q: "既存サイトのリニューアルにも対応できますか？",
      a: "はい。現在の課題をヒアリングし、より効果的なサイトへ改善します。",
    },
    { q: "CMSの導入は可能ですか？", a: "WordPressやヘッドレスCMSなど、ご要望に合わせて構築いたします。" },
  ]

  return (
    <div className="space-y-12">
      {/* Hero Image */}
      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl">
        <Image
          src="/images/services-web-hero-new.jpg"
          alt="Web制作サービスのイメージ"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">WEB制作</h2>
          <p className="text-white/90 mt-2">コーポレート、LP、ECまで。成果につながるサイトを構築。</p>
        </div>
      </div>

      <p className="text-neutral-700 dark:text-neutral-300 text-lg">
        ホームページ制作、コーポレート、EC、オンデマンド、ランディング、ポートフォリオ等をトータルでサポートします。
      </p>

      {/* 制作工程 */}
      <section>
        <OurProcess />
      </section>

      {/* 制作実績CTA */}
      <section className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-8 text-center">
        <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-4">制作実績をご覧ください</h3>
        <p className="text-neutral-700 dark:text-neutral-300 mb-6">
          これまでに手がけたWebサイトの制作事例をご紹介しています。
        </p>
        <Link
          href="/projects"
          className="inline-flex items-center justify-center px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
        >
          制作実績を見る
        </Link>
      </section>

      {/* FAQ */}
      <section>
        <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-4">FAQ</h3>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item, idx) => (
            <AccordionItem key={idx} value={`web-faq-${idx}`}>
              <AccordionTrigger className="text-left font-medium text-neutral-900 dark:text-neutral-100">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-700 dark:text-neutral-300">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  )
}

// ============ デザイン制作 ============
function DesignServiceContent() {
  const faqs = [
    {
      q: "ロゴや名刺など複数のデザインをまとめて依頼できますか？",
      a: "はい。ブランド全体のトーンを統一した形で一括制作が可能です。",
    },
    {
      q: "デザインの修正は何回まで対応してもらえますか？",
      a: "基本的に2回まで無料で対応し、それ以上はご相談の上進めます。",
    },
    { q: "印刷までお願いできますか？", a: "データ納品に加えて、提携印刷会社への手配も承ります。" },
  ]

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-neutral-100">デザイン制作</h2>
        <p className="text-neutral-700 dark:text-neutral-300 mt-4 max-w-2xl mx-auto">
          名刺デザインやチラシデザインなど、各種印刷物の制作も承ります。ブランド全体のトーンを統一した形で一括制作が可能です。
        </p>
      </div>

      {/* サービス内容 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "ロゴデザイン", desc: "企業やサービスの顔となるロゴを制作" },
          { title: "名刺・チラシ", desc: "印刷物のデザインから入稿データまで" },
          { title: "バナー・SNS素材", desc: "Web広告やSNS用のビジュアル制作" },
        ].map((item) => (
          <div key={item.title} className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">{item.title}</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mt-2 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <section>
        <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-4">FAQ</h3>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item, idx) => (
            <AccordionItem key={idx} value={`design-faq-${idx}`}>
              <AccordionTrigger className="text-left font-medium text-neutral-900 dark:text-neutral-100">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-700 dark:text-neutral-300">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  )
}

// ============ システム開発 ============
function SystemServiceContent() {
  const faqs = [
    {
      q: "どのような開発言語やフレームワークに対応していますか？",
      a: "Next.jsやLaravelなどのモダンなWeb技術を中心に対応しています。",
    },
    {
      q: "開発後の保守・運用サポートはありますか？",
      a: "はい。運用フェーズの改善提案や機能追加にも継続的に対応します。",
    },
    {
      q: "小規模なツール開発も依頼できますか？",
      a: "もちろんです。自動化スクリプトなどの小規模案件もお気軽にご相談ください。",
    },
  ]

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-neutral-100">システム開発</h2>
        <p className="text-neutral-700 dark:text-neutral-300 mt-4 max-w-2xl mx-auto">
          予約システム、顧客管理システム、財務管理システム等の開発を行います。業務効率化やDX推進をサポートします。
        </p>
      </div>

      {/* サービス内容 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "予約システム", desc: "オンライン予約・スケジュール管理" },
          { title: "顧客管理システム", desc: "CRM構築・データ分析基盤" },
          { title: "業務効率化ツール", desc: "自動化・ワークフロー改善" },
        ].map((item) => (
          <div key={item.title} className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">{item.title}</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mt-2 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <section>
        <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-4">FAQ</h3>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item, idx) => (
            <AccordionItem key={idx} value={`system-faq-${idx}`}>
              <AccordionTrigger className="text-left font-medium text-neutral-900 dark:text-neutral-100">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-700 dark:text-neutral-300">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  )
}

// ============ 動画制作 ============
function MovieServiceContent() {
  const faqs = [
    {
      q: "どのくらいの尺の動画まで制作できますか？",
      a: "数十秒のショート動画から10分程度のPR動画まで対応しています。",
    },
    { q: "撮影のみ、編集のみの依頼は可能ですか？", a: "はい。必要な工程だけを切り出してご依頼いただけます。" },
    {
      q: "ナレーションやBGMの追加にも対応していますか？",
      a: "プロのナレーター手配や著作権フリーBGMの選定・挿入も可能です。",
    },
    {
      q: "納期の目安はどれくらいですか？",
      a: "撮影ありの場合は2〜4週間、編集のみの場合は素材量により3〜10営業日が目安です。",
    },
    {
      q: "修正回数はどれくらい対応可能ですか？",
      a: "初稿提出後、通常2回までの修正を基本料金内で承ります。（大幅な構成変更は別途）",
    },
    {
      q: "著作権や素材の取り扱いはどうなりますか？",
      a: "楽曲・フォント・写真素材はライセンス遵守で運用します。完成動画の著作権は契約に準じます。",
    },
  ]

  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
              伝わる物語で、成果につながる動画を。
            </h2>
            <p className="mt-3 text-neutral-700 dark:text-neutral-300">
              Rfilmとの提携により、企画から撮影・編集・書き出しまでワンストップ対応。用途に合わせた最適な構成で、採用・会社紹介・店舗PR・SNSショートまで幅広く制作します。
            </p>
          </div>
          <div className="relative aspect-[4/3] w-full bg-neutral-100 dark:bg-neutral-800">
            <Image
              src="/images/lexia-services-hero.webp"
              alt="動画制作のイメージ"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* プラン */}
      <section>
        <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-4">用途に合わせたプラン</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "採用・会社紹介", pts: ["メッセージ設計", "インタビュー撮影", "字幕/テロップ"] },
            { name: "店舗/サービスPR", pts: ["商品/店舗撮影", "BGM/SE調整", "サムネ作成"] },
            { name: "SNSショート", pts: ["縦型最適化", "キャプション対応", "高速編集"] },
          ].map((p) => (
            <div key={p.name} className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-5">
              <h4 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">{p.name}</h4>
              <ul className="mt-3 space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
                {p.pts.map((x) => (
                  <li key={x}>・{x}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 制作フロー */}
      <section>
        <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-4">制作フロー</h3>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[
            { n: 1, t: "ヒアリング", d: "目的・媒体・スケジュール共有" },
            { n: 2, t: "企画/構成", d: "台本/コンテ作成" },
            { n: 3, t: "撮影", d: "機材最適化で高品質" },
            { n: 4, t: "編集", d: "テロップ/色味/音調整" },
            { n: 5, t: "初稿レビュー", d: "オンラインで確認" },
            { n: 6, t: "納品", d: "媒体別書き出し" },
          ].map((s) => (
            <div
              key={s.n}
              className="min-w-[180px] rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 flex-shrink-0"
            >
              <div className="text-xs text-neutral-500">STEP {s.n}</div>
              <div className="font-medium text-neutral-900 dark:text-neutral-100">{s.t}</div>
              <div className="text-sm text-neutral-700 dark:text-neutral-300">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* オプション */}
      <section>
        <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-4">オプション</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "ドローン撮影",
            "プロナレーション",
            "字幕/キャプション",
            "縦型/リール",
            "英語版",
            "モーショングラフィックス",
          ].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-neutral-200 dark:border-neutral-800 px-3 py-1 text-sm text-neutral-800 dark:text-neutral-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-4">FAQ</h3>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item, idx) => (
            <AccordionItem key={idx} value={`movie-faq-${idx}`}>
              <AccordionTrigger className="text-left font-medium text-neutral-900 dark:text-neutral-100">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-700 dark:text-neutral-300">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  )
}

// ============ PC教室 ============
function PcServiceContent() {
  const faqs = [
    { q: "レッスンは個別指導ですか？", a: "基本はマンツーマン形式で、受講者のペースに合わせて進めます。" },
    { q: "オンラインでの受講は可能ですか？", a: "はい。Zoomなどを使ったオンラインレッスンにも対応しています。" },
    { q: "支払い方法には何がありますか？", a: "現金のほか、各種クレジットカードや銀行振込に対応しています。" },
  ]

  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="grid gap-6 md:grid-cols-2 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-neutral-100">LEXIA PC教室</h2>
          <p className="mt-3 text-neutral-700 dark:text-neutral-300">
            パソコン初心者やシニアの方が、生活に役立つ使い方を楽しく学べる教室です。
          </p>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg ring-1 ring-neutral-200 dark:ring-neutral-800">
          <Image
            src="/images/hero_cover.jpg"
            alt="PC教室のイメージ"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* 対象者 */}
      <section>
        <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-4">対象者</h3>
        <ul className="space-y-3 text-neutral-800 dark:text-neutral-200">
          <li className="flex items-start gap-3">
            <Monitor className="mt-1 h-5 w-5 text-neutral-500" />
            パソコン初心者の方
          </li>
          <li className="flex items-start gap-3">
            <Smartphone className="mt-1 h-5 w-5 text-neutral-500" />
            スマホは使えるけどパソコンは苦手な方
          </li>
          <li className="flex items-start gap-3">
            <Smile className="mt-1 h-5 w-5 text-neutral-500" />
            趣味や生活に役立てたいシニアの方
          </li>
        </ul>
      </section>

      {/* 学べる内容 */}
      <section>
        <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-4">学べる内容</h3>
        <div className="grid gap-3">
          {[
            {
              icon: <MousePointerClick className="h-5 w-5" />,
              text: "パソコンの基本操作（電源の入れ方、文字入力、マウス操作）",
            },
            { icon: <Globe className="h-5 w-5" />, text: "インターネット活用（検索・地図・YouTubeなど）" },
            { icon: <Camera className="h-5 w-5" />, text: "写真の整理と印刷（スマホやデジカメの写真管理）" },
            { icon: <Mail className="h-5 w-5" />, text: "メールの使い方（写真添付、孫や友人とのやり取り）" },
            { icon: <FileText className="h-5 w-5" />, text: "文書作成（お知らせ・会報・年賀状など）" },
            {
              icon: <ShoppingCart className="h-5 w-5" />,
              text: "日常に役立つ便利ワザ（ネットショッピング、旅行予約など）",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 rounded-lg border border-neutral-200 dark:border-neutral-800 p-3"
            >
              <div className="mt-0.5 text-neutral-500">{item.icon}</div>
              <p className="text-neutral-800 dark:text-neutral-200">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 特徴 */}
      <section>
        <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-4">特徴</h3>
        <ul className="space-y-3 text-neutral-800 dark:text-neutral-200">
          {[
            "ゆっくり丁寧に、何度でも質問できる安心の環境",
            "一人ひとりに合わせた学習内容（趣味・生活に直結）",
            "実際に一緒に操作しながら学べる実践形式",
            "少人数制（1〜3名）でアットホームな雰囲気",
            "Zoomを使ったオンラインレッスンにも対応",
          ].map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="mt-1.5 inline-block h-2 w-2 rounded-full bg-neutral-400" />
              {feature}
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section>
        <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-4">FAQ</h3>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item, idx) => (
            <AccordionItem key={idx} value={`pc-faq-${idx}`}>
              <AccordionTrigger className="text-left font-medium text-neutral-900 dark:text-neutral-100">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-700 dark:text-neutral-300">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">読み込み中...</div>}>
      <ServicesContent />
    </Suspense>
  )
}
