import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Script from "next/script"
import { SITE_URL } from "@/lib/config"
import { Monitor, Smartphone, Camera, Mail, FileText, ShoppingCart, Globe, MousePointerClick } from "lucide-react"

export const metadata: Metadata = {
  title: "🖥️ LEXIA PC教室 | やさしく学べるパソコン教室",
  description:
    "パソコン初心者やシニアの方に、日常に役立つ使い方をやさしく学べるPC教室です。安心して学べる環境で、料金ページへの導線もご用意。",
  alternates: {
    canonical: `${SITE_URL.replace(/\/$/, "")}/services/pc`,
  },
  openGraph: {
    title: "LEXIA PC教室 | やさしく学べるパソコン教室",
    description:
      "パソコン初心者やシニアの方向けに、日常で役立つ使い方を楽しく学べます。",
    type: "website",
    url: `${SITE_URL.replace(/\/$/, "")}/services/pc`,
  },
  twitter: {
    card: "summary_large_image",
    title: "LEXIA PC教室 | やさしく学べる",
    description:
      "初心者・シニアの方に向けた安心の学習環境をご提供します。",
    images: [`${SITE_URL.replace(/\/$/, "")}/og/og-image.png`],
  },
}

export default function PcServicePage() {
  const faqs = [
    {
      q: "レッスンは個別指導ですか？",
      a: "基本はマンツーマン形式で、受講者のペースに合わせて進めます。",
    },
    {
      q: "オンラインでの受講は可能ですか？",
      a: "はい。Zoomなどを使ったオンラインレッスンにも対応しています。",
    },
    {
      q: "支払い方法には何がありますか？",
      a: "現金のほか、各種クレジットカードや銀行振込に対応しています。",
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
    name: "PC教室",
    serviceType: "ComputerTraining",
    url: `${SITE_URL.replace(/\/$/, "")}/services/pc`,
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
      price: "5000",
      url: `https://lexia-hp.com/pricing`,
      availability: "https://schema.org/InStock",
    },
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
          <div className="mb-3 text-center md:text-left">
            <Link href="/services" className="text-sm text-neutral-600 dark:text-neutral-400 hover:underline">
              サービス一覧に戻る
            </Link>
          </div>
          <Breadcrumbs />

          {/* Title + Sub copy */}
          <header className="mt-6 grid gap-6 md:grid-cols-[1.2fr_1fr] items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                🖥️ LEXIA PC教室 サービス内容
              </h1>
              <p className="mt-3 text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
                パソコン初心者やシニアの方が、生活に役立つ使い方を楽しく学べる教室です。
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg ring-1 ring-neutral-200 dark:ring-neutral-800">
              <Image
                src="/images/hero_cover.jpg"
                alt="笑顔でパソコンを操作するシニアの方のイメージ"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                priority
              />
            </div>
          </header>

          {/* Target audience */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">対象者</h2>
            <ul className="mt-4 space-y-3 text-neutral-800 dark:text-neutral-200">
              <li className="flex items-start gap-3"><Monitor className="mt-1 h-5 w-5 text-neutral-500" aria-hidden />パソコン初心者の方</li>
              <li className="flex items-start gap-3"><Smartphone className="mt-1 h-5 w-5 text-neutral-500" aria-hidden />スマホは使えるけどパソコンは苦手な方</li>
              <li className="flex items-start gap-3"><SmileIcon />趣味や生活に役立てたいシニアの方</li>
            </ul>
          </section>

          {/* Learnable contents */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">学べる内容</h2>
            <div className="mt-4 grid gap-3">
              <Item icon={<MousePointerClick className="h-5 w-5" aria-hidden />} text="パソコンの基本操作（電源の入れ方、文字入力、マウス操作）" />
              <Item icon={<Globe className="h-5 w-5" aria-hidden />} text="インターネット活用（検索・地図・YouTubeなど）" />
              <Item icon={<Camera className="h-5 w-5" aria-hidden />} text="写真の整理と印刷（スマホやデジカメの写真管理）" />
              <Item icon={<Mail className="h-5 w-5" aria-hidden />} text="メールの使い方（写真添付、孫や友人とのやり取り）" />
              <Item icon={<FileText className="h-5 w-5" aria-hidden />} text="文書作成（お知らせ・会報・年賀状など）" />
              <Item icon={<ShoppingCart className="h-5 w-5" aria-hidden />} text="日常に役立つ便利ワザ（ネットショッピング、旅行予約など）" />
            </div>
          </section>

          {/* Features */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">特徴</h2>
            <ul className="mt-4 space-y-3 text-neutral-800 dark:text-neutral-200">
              <li className="flex items-start gap-3"><span className="sr-only">特徴</span><span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-neutral-400" aria-hidden />ゆっくり丁寧に、何度でも質問できる安心の環境</li>
              <li className="flex items-start gap-3"><span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-neutral-400" aria-hidden />一人ひとりに合わせた学習内容（趣味・生活に直結）</li>
              <li className="flex items-start gap-3"><span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-neutral-400" aria-hidden />実際に一緒に操作しながら学べる実践形式</li>
              <li className="flex items-start gap-3"><span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-neutral-400" aria-hidden />少人数制（1〜3名）でアットホームな雰囲気</li>
              <li className="flex items-start gap-3"><span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-neutral-400" aria-hidden />Zoomを使ったオンラインレッスンにも対応</li>
            </ul>
          </section>

          {/* Pricing CTA */}
          <section className="mt-14">
            <h2 className="sr-only">料金のご案内</h2>
            <p className="text-neutral-800 dark:text-neutral-200 leading-relaxed">
              料金プランについては
              <Link href="https://lexia-hp.com/pricing" className="mx-1 underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-600">
                こちらのページ
              </Link>
              にてご案内しています。
            </p>
            <div className="mt-4">
              <Link
                href="https://lexia-hp.com/pricing"
                className="inline-flex items-center justify-center rounded-md bg-neutral-900 text-white px-5 py-3 text-sm md:text-base font-medium hover:bg-neutral-800 transition-colors"
                aria-label="料金ページを見る"
              >
                料金を見る
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mt-16">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">FAQ</h2>
            <div className="mt-4 space-y-4">
              {faqs.map((item, idx) => (
                <div key={idx} className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
                  <p className="font-medium text-neutral-900 dark:text-neutral-100">{item.q}</p>
                  <p className="text-neutral-700 dark:text-neutral-300 mt-1">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <Script
        id="service-pc-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Script
        id="service-pc-faq-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  )
}

// Small presentational helpers
function Item({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-neutral-200 dark:border-neutral-800 p-3">
      <div className="mt-0.5 text-neutral-500" aria-hidden>
        {icon}
      </div>
      <p className="text-neutral-800 dark:text-neutral-200 leading-relaxed">{text}</p>
    </div>
  )
}

function SmileIcon() {
  return (
    <svg
      className="mt-1 h-5 w-5 text-neutral-500"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 14c1.2 1.333 2.8 2 4 2s2.8-.667 4-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="10" r=".75" fill="currentColor" />
      <circle cx="15" cy="10" r=".75" fill="currentColor" />
    </svg>
  )
}

