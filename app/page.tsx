import About from "@/components/sections/about"
import Work from "@/components/sections/OurWork"
import Contact from "@/components/sections/contact"
import Team from "@/components/sections/team"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Hero from "@/components/sections/hero"
import PricingCTA from "@/components/sections/pricing-cta"
import ServicesCTA from "@/components/sections/services-cta"
import LexiaTools from "@/components/LexiaTools"
import BlogPreview from "@/components/sections/blog-preview"
import Faq from "@/components/sections/faq"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"
import { jsonLdString } from "@/lib/json-ld"
import { homepageFaq } from "@/lib/faq"

export const dynamic = "force-static"
export const revalidate = 3600 // Revalidate every hour

export const metadata: Metadata = {
  title: "愛知県碧南市のホームページ制作・WEB制作事業 | LEXIA",
  description:
    "愛知県碧南市を中心に小規模企業向けのモバイル最適化サイトを制作。愛知県でホームページ作成ならLEXIAのWEB制作事業にお任せください。",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "愛知県碧南市のホームページ制作・WEB制作事業 | LEXIA",
    description:
      "愛知県碧南市を中心に小規模企業向けのモバイル最適化サイトを制作。愛知県でホームページ作成ならLEXIAのWEB制作事業にお任せください。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "愛知県碧南市のホームページ制作・WEB制作事業 | LEXIA",
    description:
      "愛知県碧南市を中心に小規模企業向けのモバイル最適化サイトを制作。愛知県でホームページ作成ならLEXIAのWEB制作事業にお任せください。",
    images: [`${SITE_URL.replace(/\/$/, "")}/og/og-image.png`],
  },
}

export default function Home() {
  // Site-wide Organization / LocalBusiness / WebSite entities live in app/layout.tsx.
  // The homepage only declares page-specific entities and references the shared @ids.
  const base = SITE_URL.replace(/\/$/, "")
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${base}/#webpage`,
        url: SITE_URL,
        name: "愛知県碧南市のホームページ制作・WEB制作事業 | LEXIA",
        description:
          "愛知県碧南市を中心に小規模企業向けのモバイル最適化サイトを制作。愛知県でホームページ作成ならLEXIAのWEB制作事業にお任せください。",
        isPartOf: { "@id": `${base}/#website` },
        about: { "@id": `${base}/#organization` },
        inLanguage: "ja",
      },
      {
        "@type": "FAQPage",
        "@id": `${base}/#faq`,
        // ページ上に表示するFAQ(components/sections/faq.tsx)と同一データ。
        mainEntity: homepageFaq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  }

  return (
    <>
      <Navigation />

      <main id="main-content" className="min-h-screen bg-white dark:bg-neutral-900">
        <section id="hero">
          <Hero />
        </section>

        {/* 受注三点セットをファーストビュー直下に: 何ができる → 実績 → 料金 */}
        <section id="services" className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-800 below-fold">
          <ServicesCTA />
        </section>

        <section id="work" className="py-24 md:py-32 below-fold">
          <Work />
        </section>

        <section id="pricing" className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-800 below-fold">
          <PricingCTA />
        </section>

        <section id="lexia-tools" className="below-fold">
          <LexiaTools />
        </section>

        <section id="faq" className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-800 below-fold">
          <Faq />
        </section>

        <section id="team" className="py-24 md:py-32 below-fold">
          <Team />
        </section>

        <section id="about" className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-800 below-fold">
          <About />
        </section>

        {/* ブログはSEO/権威性目的で後半へ */}
        <BlogPreview />

        <section id="contact" className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-800 below-fold">
          <Contact />
        </section>
      </main>

      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
      />
    </>
  )
}
