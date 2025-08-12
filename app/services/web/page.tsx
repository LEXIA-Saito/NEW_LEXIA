import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import OurProcess from "@/components/sections/OurProcess"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"
import Image from "next/image"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Web制作サービス | 碧南のホームページ作成はLEXIA",
  description: "コーポレートサイトやECサイトなど、Next.jsを活用したWeb制作を碧南で提供します。",
  alternates: {
    canonical: `${SITE_URL.replace(/\/$/, "")}/services/web`,
  },
  openGraph: {
    title: "Web制作サービス | 碧南のホームページ作成はLEXIA",
    description: "コーポレートサイトやECサイトなど、Next.jsを活用したWeb制作を碧南で提供します。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web制作サービス | 碧南のホームページ作成はLEXIA",
    description: "コーポレートサイトやECサイトなど、Next.jsを活用したWeb制作を碧南で提供します。",
    images: [`${SITE_URL.replace(/\/$/, "")}/og/og-image.png`],
  },
}

export default function WebServicePage() {
  const faqs = [
    {
      q: "Webサイト制作の納期はどれくらいですか？",
      a: "一般的には1〜2ヶ月程度ですが、規模や要件によって異なります。",
    },
    {
      q: "既存サイトのリニューアルにも対応できますか？",
      a: "はい。現在の課題をヒアリングし、より効果的なサイトへ改善します。",
    },
    {
      q: "CMSの導入は可能ですか？",
      a: "WordPressやヘッドレスCMSなど、ご要望に合わせて構築いたします。",
    },
  ]

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-4 text-center">
            WEB制作
          </h1>
          <Breadcrumbs />
          <p className="text-neutral-700 dark:text-neutral-300 mb-12">
            ホームページ制作、コーポレート、EC、オンデマンド、ランディング、ポートフォリオ等をトータルでサポートします。
          </p>

          <section className="mb-16">
            <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/web-services-hero.png"
                alt="LEXIA Web制作サービス - レスポンシブデザインでPC、タブレット、スマートフォンに対応"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>
          </section>

          <section id="process" className="mt-16">
            <OurProcess />
          </section>

          <section className="mt-16 text-center">
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-8">
              <h2 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-4">
                制作実績をご覧ください
              </h2>
              <p className="text-neutral-700 dark:text-neutral-300 mb-6">
                これまでに手がけたWebサイトの制作事例をご紹介しています。
              </p>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
              >
                制作実績を見る
              </Link>
            </div>
          </section>

          <section id="faq" className="mt-16">
            <h2 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-6 text-center">FAQ</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="text-left font-medium text-neutral-900 dark:text-neutral-100">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-700 dark:text-neutral-300">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  )
}
