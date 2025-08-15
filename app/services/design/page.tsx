import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import type { Metadata } from "next"
import Link from "next/link"
import { SITE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "デザイン制作サービス | 碧南の各種デザインはLEXIA",
  description:
    "名刺・チラシなどの印刷物やロゴデザインを碧南で提供します。",
  alternates: {
    canonical: `${SITE_URL.replace(/\/$/, "")}/services/design`,
  },
  openGraph: {
    title: "デザイン制作サービス | 碧南の各種デザインはLEXIA",
    description:
      "名刺・チラシなどの印刷物やロゴデザインを碧南で提供します。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "デザイン制作サービス | 碧南の各種デザインはLEXIA",
    description:
      "名刺・チラシなどの印刷物やロゴデザインを碧南で提供します。",
    images: [`${SITE_URL.replace(/\/$/, "")}/og/og-image.png`],
  },
}

export default function DesignServicePage() {
  const faqs = [
    {
      q: "ロゴや名刺など複数のデザインをまとめて依頼できますか？",
      a: "はい。ブランド全体のトーンを統一した形で一括制作が可能です。",
    },
    {
      q: "デザインの修正は何回まで対応してもらえますか？",
      a: "基本的に2回まで無料で対応し、それ以上はご相談の上進めます。",
    },
    {
      q: "印刷までお願いできますか？",
      a: "データ納品に加えて、提携印刷会社への手配も承ります。",
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
    name: "デザイン制作",
    serviceType: "GraphicDesign",
    url: `${SITE_URL.replace(/\/$/, "")}/services/design`,
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
      url: `${SITE_URL.replace(/\/$/, "")}/pricing`,
      availability: "https://schema.org/InStock",
    },
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-4 text-center">デザイン各種</h1>
          <div className="mb-2 text-center md:text-left">
            <Link href="/services" className="text-sm text-neutral-600 dark:text-neutral-400 hover:underline">
              サービス一覧に戻る
            </Link>
          </div>
          <Breadcrumbs />
          <p className="text-neutral-700 dark:text-neutral-300">
            名刺デザインやチラシデザインなど、各種印刷物の制作も承ります。
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
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-neutral-900 text-white px-5 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors"
              >
                無料相談する
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 px-5 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                料金を見る
              </a>
              <a
                href="/projects"
                className="inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 px-5 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                実績を見る
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:underline"
              >
                サービス一覧へ
              </a>
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
