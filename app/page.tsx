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
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"
import { jsonLdString } from "@/lib/json-ld"

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
        mainEntity: [
          {
            "@type": "Question",
            name: "ホームページ制作の料金はいくらですか？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "LEXIAでは小規模サイトで15万円〜、コーポレートサイトで30万円〜承っております。詳細は料金ページをご覧ください。",
            },
          },
          {
            "@type": "Question",
            name: "制作期間はどれくらいですか？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "一般的なコーポレートサイトで約1〜2ヶ月を想定しています。規模や要件により変動します。",
            },
          },
          {
            "@type": "Question",
            name: "愛知県外からの依頼も可能ですか？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "はい、オンラインでのお打ち合わせに対応しておりますので、全国からご依頼いただけます。",
            },
          },
          {
            "@type": "Question",
            name: "保守・運用サポートはありますか？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "はい。公開後の保守・改善も継続的にサポートします。月額プランをご用意しております。",
            },
          },
        ],
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

        <BlogPreview />

        <section id="services" className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-800 below-fold">
          <ServicesCTA />
        </section>

        <section id="lexia-tools" className="below-fold">
          <LexiaTools />
        </section>

        <section id="pricing" className="py-24 md:py-32 below-fold">
          <PricingCTA />
        </section>

        <section id="work" className="py-24 md:py-32 below-fold">
          <Work />
        </section>

        <section id="team" className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-800 below-fold">
          <Team />
        </section>

        <section id="about" className="py-24 md:py-32 below-fold">
          <About />
        </section>

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
