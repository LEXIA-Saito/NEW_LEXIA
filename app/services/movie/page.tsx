import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { SITE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "動画制作サービス | 碧南の動画制作はLEXIA",
  description:
    "企画から撮影・編集までワンストップで対応します。",
  alternates: {
    canonical: `${SITE_URL.replace(/\/$/, "")}/services/movie`,
  },
  openGraph: {
    title: "動画制作サービス | 碧南の動画制作はLEXIA",
    description:
      "企画から撮影・編集までワンストップで対応します。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "動画制作サービス | 碧南の動画制作はLEXIA",
    description:
      "企画から撮影・編集までワンストップで対応します。",
    images: [`${SITE_URL.replace(/\/$/, "")}/og/og-image.png`],
  },
}

export default function MovieServicePage() {
  const faqs = [
    {
      q: "どのくらいの尺の動画まで制作できますか？",
      a: "数十秒のショート動画から10分程度のPR動画まで対応しています。",
    },
    {
      q: "撮影のみ、編集のみの依頼は可能ですか？",
      a: "はい。必要な工程だけを切り出してご依頼いただけます。",
    },
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "動画制作",
    serviceType: "VideoProduction",
    url: `${SITE_URL.replace(/\/$/, "")}/services/movie`,
    areaServed: "JP",
    provider: {
      "@type": "Organization",
      name: "LEXIA",
      url: SITE_URL,
    },
    brand: { "@type": "Brand", name: "LEXIA" },
    offers: {
      "@type": "Offer",
      priceCurrency: "JPY",
      url: `https://lexia-hp.com/pricing`,
      availability: "https://schema.org/InStock",
    },
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-4 text-center">動画制作</h1>
          <div className="mb-2 text-center md:text-left">
            <Link href="/services" className="text-sm text-neutral-600 dark:text-neutral-400 hover:underline">
              サービス一覧に戻る
            </Link>
          </div>
          <Breadcrumbs />
          <p className="text-neutral-700 dark:text-neutral-300">
            Rfilmと提携し、企画から撮影・編集までワンストップで対応します。
          </p>

          {/* Showcase */}
          <section className="mt-10">
            <h2 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-4 text-center">制作実績（一部）</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  src: "/images/lexia-services-hero.webp",
                  title: "会社紹介ダイジェスト",
                  meta: "約90秒 / 企画・撮影・編集",
                },
                {
                  src: "/images/services-web-hero-new.jpg",
                  title: "採用向けブランドムービー",
                  meta: "約120秒 / 企画・撮影・編集",
                },
                {
                  src: "/images/sandy_beach_lexia.webp",
                  title: "店舗PR・SNSショート",
                  meta: "15〜30秒 / 企画・編集",
                },
              ].map((item, idx) => (
                <div key={idx} className="rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                  <div className="relative aspect-video bg-neutral-100 dark:bg-neutral-800">
                    <Image
                      src={item.src}
                      alt={`${item.title} のサムネイル`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100">{item.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{item.meta}</p>
                    <div className="mt-3">
                      <Link href="/projects" className="text-sm underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-600">
                        実績をもっと見る
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Production Flow */}
          <section className="mt-12">
            <h2 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-4 text-center">制作フロー</h2>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { n: 1, t: "ヒアリング", d: "目的・ターゲット・活用媒体を確認" },
                { n: 2, t: "企画/構成", d: "台本・絵コンテ・スケジュール作成" },
                { n: 3, t: "撮影", d: "カメラ・音声・照明を最適化" },
                { n: 4, t: "編集", d: "テロップ/色味/効果音/BGM調整" },
                { n: 5, t: "初稿レビュー", d: "コメント共有、修正のすり合わせ" },
                { n: 6, t: "納品", d: "媒体別書き出し（横/縦/字幕付）" },
              ].map((s) => (
                <li key={s.n} className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
                  <div className="text-sm text-neutral-500">STEP {s.n}</div>
                  <div className="font-medium text-neutral-900 dark:text-neutral-100">{s.t}</div>
                  <div className="text-sm text-neutral-700 dark:text-neutral-300">{s.d}</div>
                </li>
              ))}
            </ol>
          </section>

          {/* Options */}
          <section className="mt-12">
            <h2 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-4 text-center">オプション</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {["ドローン撮影", "プロナレーション", "字幕/キャプション", "縦型/リール書き出し", "英語版対応", "アニメ/モーショングラフィックス"].map((tag) => (
                <span key={tag} className="rounded-full border border-neutral-200 dark:border-neutral-800 px-3 py-1 text-sm text-neutral-800 dark:text-neutral-200">
                  {tag}
                </span>
              ))}
            </div>
          </section>
          <section id="faq" className="mt-16">
            <h2 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-4 text-center">
              FAQ
            </h2>
            <div className="space-y-4">
              {faqs.map((item, idx) => (
                <div key={idx}>
                  <p className="font-medium text-neutral-900 dark:text-neutral-100">{item.q}</p>
                  <p className="text-neutral-700 dark:text-neutral-300">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Global CTA: drive to contact/pricing/projects/services */}
          <section className="mt-16 text-center">
            <div className="inline-flex flex-wrap gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-neutral-900 text-white px-5 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors"
              >
                無料相談する
              </Link>
              <Link
                href="https://lexia-hp.com/pricing"
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
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:underline"
              >
                サービス一覧へ
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  )
}
