import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import type { Metadata } from "next"
import Link from "next/link"
import { SITE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "システム開発サービス | 愛知県碧南市のWebアプリ開発はLEXIA",
  description:
    "愛知県碧南市での予約・顧客管理などのWebシステム開発やDX支援を提供します。",
  alternates: {
    canonical: `${SITE_URL.replace(/\/$/, "")}/services/system`,
  },
  openGraph: {
    title: "システム開発サービス | 愛知県碧南市のWebアプリ開発はLEXIA",
    description:
      "愛知県碧南市での予約・顧客管理などのWebシステム開発やDX支援を提供します。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "システム開発サービス | 愛知県碧南市のWebアプリ開発はLEXIA",
    description:
      "愛知県碧南市での予約・顧客管理などのWebシステム開発やDX支援を提供します。",
    images: [`${SITE_URL.replace(/\/$/, "")}/og/og-image.png`],
  },
}

export default function SystemServicePage() {
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
    name: "システム開発",
    serviceType: "SoftwareDevelopment",
    url: `${SITE_URL.replace(/\/$/, "")}/services/system`,
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
      price: "180000",
      url: `${SITE_URL.replace(/\/$/, "")}/pricing`,
      availability: "https://schema.org/InStock",
    },
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-4 text-center">システム開発</h1>
          <div className="mb-2 text-center md:text-left">
            <Link href="/services" className="text-sm text-neutral-600 dark:text-neutral-400 hover:underline">
              サービス一覧に戻る
            </Link>
          </div>
          <Breadcrumbs />
          <p className="text-neutral-700 dark:text-neutral-300">
            予約システム、顧客管理システム、財務管理システム等の開発を行います。
          </p>
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
