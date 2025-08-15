import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import OurProcess from "@/components/sections/OurProcess"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"
import Image from "next/image"
import Link from "next/link"
import ServicesWebHeroCTA from "@/components/cta/services-web-hero-cta"
import { SITE_URL } from "@/lib/config"
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

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "WEB制作",
    serviceType: "WebDesign",
    url: `${SITE_URL.replace(/\/$/, "")}/services/web`,
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
        {/* Fullscreen Hero */}
        <section className="relative min-h-[100svh] w-full">
          {/* Background image */}
          <Image
            src="/images/web-services-hero.png"
            alt="LEXIAのWeb制作サービス。レスポンシブ対応の美しいサイトを構築"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 dark:from-black/75 dark:via-black/50 dark:to-black/30" />
          {/* Content */}
          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="container mx-auto px-4 w-full pt-20 md:pt-24">
              <div className="mx-auto max-w-3xl text-center rounded-xl bg-black/30 backdrop-blur-sm p-6 md:p-8 ring-1 ring-white/10 shadow-lg">
                <h1 className="text-4xl md:text-6xl font-light tracking-tight text-white mb-4">
                  WEB制作
                </h1>
                <p className="text-neutral-100/95 md:text-xl mb-8">
                  コーポレート、EC、ランディング、採用、キャンペーンまで。Next.jsを活用し、成果につながるサイトをスピーディに構築します。
                </p>
                <ServicesWebHeroCTA />
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
          <div className="mb-2">
            <Link href="/services" className="text-sm text-neutral-600 dark:text-neutral-400 hover:underline">
              サービス一覧に戻る
            </Link>
          </div>
          <Breadcrumbs />
          <p className="text-neutral-700 dark:text-neutral-300 mb-12">
            ホームページ制作、コーポレート、EC、オンデマンド、ランディング、ポートフォリオ等をトータルでサポートします。
          </p>

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  )
}
