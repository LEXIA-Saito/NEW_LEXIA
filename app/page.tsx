import About from "@/components/sections/about"
import Work from "@/components/sections/OurWork"
import Contact from "@/components/sections/contact"
import Team from "@/components/sections/team"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Hero from "@/components/sections/hero"
import PricingCTA from "@/components/sections/pricing-cta"
import ServicesCTA from "@/components/sections/services-cta"
import Features from "@/components/Features"
import BlogPreview from "@/components/sections/blog-preview"
import type { Metadata } from "next"
import Script from "next/script"
import { SITE_URL, LOGO_URL } from "@/lib/config"

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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": `${SITE_URL}/#organization`,
        name: "LEXIA",
        url: SITE_URL,
        logo: LOGO_URL,
        description: "愛知県碧南市のWEB制作・システム開発。要件整理からUI実装、運用改善まで一貫対応。",
        telephone: "090-1742-3456",
        email: "lexia0web@gmail.com",
        address: {
          "@type": "PostalAddress",
          addressCountry: "JP",
          addressRegion: "愛知県",
          addressLocality: "碧南市",
          streetAddress: "川端町1-45",
          postalCode: "447-0876",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 34.867852,
          longitude: 136.99312,
        },
        areaServed: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: 34.867852,
            longitude: 136.99312,
          },
          geoRadius: "50000",
        },
        priceRange: "¥¥",
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        sameAs: ["https://www.instagram.com/lexia_web", "https://x.com/lexia_web"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "LEXIA",
        description: "愛知県碧南市のホームページ制作・WEB制作事業",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "ja",
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "愛知県碧南市のホームページ制作・WEB制作事業 | LEXIA",
        description:
          "愛知県碧南市を中心に小規模企業向けのモバイル最適化サイトを制作。愛知県でホームページ作成ならLEXIAのWEB制作事業にお任せください。",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "ja",
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
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
    <main className="min-h-screen bg-white dark:bg-neutral-900">
      <Navigation />

      <section id="hero">
        <Hero />
      </section>

      <BlogPreview />

      <section id="services" className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-800 below-fold">
        <ServicesCTA />
      </section>

      <Features className="below-fold" />

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

      <Footer />
      <Script
        id="home-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  )
}
