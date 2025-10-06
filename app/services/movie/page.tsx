import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { SITE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "動画制作サービス | 愛知県碧南市の動画制作はLEXIA",
  description:
    "企画から撮影・編集までワンストップで対応します。",
  alternates: {
    canonical: `${SITE_URL.replace(/\/$/, "")}/services/movie`,
  },
  openGraph: {
  title: "動画制作サービス | 愛知県碧南市の動画制作はLEXIA",
    description:
      "企画から撮影・編集までワンストップで対応します。",
    type: "website",
    url: `${SITE_URL.replace(/\/$/, "")}/services/movie`,
  },
  twitter: {
    card: "summary_large_image",
  title: "動画制作サービス | 愛知県碧南市の動画制作はLEXIA",
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
        <div className="container mx-auto px-4 py-20 md:py-28 max-w-6xl">
          {/* Top meta */}
          <div className="mb-3 text-center md:text-left">
            <Link href="/services" className="text-sm text-neutral-600 dark:text-neutral-400 hover:underline">
              サービス一覧に戻る
            </Link>
          </div>
          <Breadcrumbs />

          {/* Hero */}
          <section className="mt-6 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
              <div className="p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                  伝わる物語で、成果につながる動画を。
                </h1>
                <p className="mt-3 text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
                  Rfilmとの提携により、企画から撮影・編集・書き出しまでワンストップ対応。用途に合わせた最適な構成で、採用・会社紹介・店舗PR・SNSショートまで幅広く制作します。
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/contact" className="inline-flex items-center justify-center rounded-md bg-neutral-900 text-white px-5 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors">
                    無料相談する
                  </Link>
                  <Link href="https://lexia-hp.com/pricing" className="inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 px-5 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                    料金を見る
                  </Link>
                </div>
              </div>
              <div className="relative aspect-[4/3] w-full bg-neutral-100 dark:bg-neutral-800">
                <Image
                  src="/images/lexia-services-hero.webp"
                  alt="動画制作のイメージ"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </section>

          {/* Layout with sticky TOC */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
            <aside className="sticky top-24 self-start hidden lg:block">
              <nav className="text-sm text-neutral-700 dark:text-neutral-300">
                <ul className="space-y-2">
                  <li><a href="#showcase" className="hover:underline">制作実績</a></li>
                  <li><a href="#plans" className="hover:underline">プラン</a></li>
                  <li><a href="#flow" className="hover:underline">制作フロー</a></li>
                  <li><a href="#options" className="hover:underline">オプション</a></li>
                  <li><a href="#faq" className="hover:underline">FAQ</a></li>
                </ul>
              </nav>
            </aside>

            <div>
              {/* Showcase */}
              <section id="showcase" aria-labelledby="showcase-title" className="scroll-mt-24">
                <h2 id="showcase-title" className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-4">制作実績（一部）</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { src: "/images/lexia-services-hero.webp", title: "会社紹介ダイジェスト", meta: "約90秒 / 企画・撮影・編集" },
                    { src: "/images/services-web-hero-new.jpg", title: "採用向けブランドムービー", meta: "約120秒 / 企画・撮影・編集" },
                    { src: "/images/sandy_beach_lexia.webp", title: "店舗PR・SNSショート", meta: "15〜30秒 / 企画・編集" },
                  ].map((item, idx) => (
                    <article key={idx} className="group rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                      <div className="relative aspect-video">
                        <Image src={item.src} alt={`${item.title} のサムネイル`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" aria-hidden />
                      </div>
                      <div className="p-4">
                        <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100">{item.title}</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">{item.meta}</p>
                        <div className="mt-3">
                          <Link href="/projects" className="text-sm underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-600">実績をもっと見る</Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* Plans */}
              <section id="plans" aria-labelledby="plans-title" className="mt-12 scroll-mt-24">
                <h2 id="plans-title" className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-4">用途に合わせたプラン</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { name: "採用・会社紹介", pts: ["メッセージ設計", "インタビュー撮影", "字幕/テロップ" ] },
                    { name: "店舗/サービスPR", pts: ["商品/店舗撮影", "BGM/SE調整", "サムネ作成"] },
                    { name: "SNSショート", pts: ["縦型最適化", "キャプション対応", "高速編集"] },
                  ].map((p) => (
                    <div key={p.name} className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-5">
                      <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">{p.name}</h3>
                      <ul className="mt-3 space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
                        {p.pts.map((x) => (<li key={x}>・{x}</li>))}
                      </ul>
                      <div className="mt-4">
                        <Link href="/contact" className="inline-flex items-center justify-center rounded-md bg-neutral-900 text-white px-4 py-2 text-sm font-medium hover:bg-neutral-800 transition-colors">見積もり相談</Link>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
                  価格の目安や詳細は <Link href="https://lexia-hp.com/pricing" className="underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-600">料金ページ</Link> をご覧ください。
                </p>
              </section>

              {/* Flow */}
              <section id="flow" aria-labelledby="flow-title" className="mt-12 scroll-mt-24">
                <h2 id="flow-title" className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-4">制作フロー</h2>
                <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2">
                  {[
                    { n: 1, t: "ヒアリング", d: "目的・媒体・スケジュール共有" },
                    { n: 2, t: "企画/構成", d: "台本/コンテ作成" },
                    { n: 3, t: "撮影", d: "機材最適化で高品質" },
                    { n: 4, t: "編集", d: "テロップ/色味/音調整" },
                    { n: 5, t: "初稿レビュー", d: "オンラインで確認" },
                    { n: 6, t: "納品", d: "媒体別書き出し" },
                  ].map((s) => (
                    <div key={s.n} className="min-w-[220px] rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
                      <div className="text-xs text-neutral-500">STEP {s.n}</div>
                      <div className="font-medium text-neutral-900 dark:text-neutral-100">{s.t}</div>
                      <div className="text-sm text-neutral-700 dark:text-neutral-300">{s.d}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Options */}
              <section id="options" aria-labelledby="options-title" className="mt-12 scroll-mt-24">
                <h2 id="options-title" className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-4">オプション</h2>
                <div className="flex flex-wrap gap-2">
                  {["ドローン撮影", "プロナレーション", "字幕/キャプション", "縦型/リール", "英語版", "モーショングラフィックス"].map((tag) => (
                    <span key={tag} className="rounded-full border border-neutral-200 dark:border-neutral-800 px-3 py-1 text-sm text-neutral-800 dark:text-neutral-200">{tag}</span>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              <section id="faq" aria-labelledby="faq-title" className="mt-12 scroll-mt-24">
                <h2 id="faq-title" className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-4">FAQ</h2>
                <div className="space-y-4">
                  {faqs.map((item, idx) => (
                    <div key={idx} className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
                      <p className="font-medium text-neutral-900 dark:text-neutral-100">{item.q}</p>
                      <p className="text-neutral-700 dark:text-neutral-300">{item.a}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Global CTA */}
              <section className="mt-16 text-center">
                <div className="inline-flex flex-wrap gap-3 justify-center">
                  <Link href="/contact" className="inline-flex items-center justify-center rounded-md bg-neutral-900 text-white px-5 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors">無料相談する</Link>
                  <Link href="https://lexia-hp.com/pricing" className="inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 px-5 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">料金を見る</Link>
                  <Link href="/projects" className="inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 px-5 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">実績を見る</Link>
                </div>
              </section>
            </div>
          </div>

          {/* Sticky mobile CTA */}
          <div className="fixed bottom-4 inset-x-0 px-4 lg:hidden">
            <div className="mx-auto max-w-md rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-900/60 shadow-sm flex overflow-hidden">
              <Link href="/contact" className="flex-1 text-center py-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800">無料相談</Link>
              <Link href="https://lexia-hp.com/pricing" className="flex-1 text-center py-2 text-sm font-medium text-neutral-900 dark:text-neutral-100">料金</Link>
            </div>
          </div>
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
