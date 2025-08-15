import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import type { Metadata } from "next"
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

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-4 text-center">動画制作</h1>
          <Breadcrumbs />
          <p className="text-neutral-700 dark:text-neutral-300">
            Rfilmと提携し、企画から撮影・編集までワンストップで対応します。
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  )
}
