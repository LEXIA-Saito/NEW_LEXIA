import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "PC教室 | 碧南のパソコンレッスンはLEXIA",
  description:
    "初心者からビジネス活用まで目的に合わせたレッスンを提供します。",
  alternates: {
    canonical: `${SITE_URL.replace(/\/$/, "")}/services/pc`,
  },
  openGraph: {
    title: "PC教室 | 碧南のパソコンレッスンはLEXIA",
    description:
      "初心者からビジネス活用まで目的に合わせたレッスンを提供します。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PC教室 | 碧南のパソコンレッスンはLEXIA",
    description:
      "初心者からビジネス活用まで目的に合わせたレッスンを提供します。",
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

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-4 text-center">PC教室</h1>
          <Breadcrumbs />
          <p className="text-neutral-700 dark:text-neutral-300">
            初心者向けからビジネス活用まで、目的に合わせたレッスンを提供します。
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
