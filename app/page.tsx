import About from "@/components/sections/about"
import Work from "@/components/sections/OurWork"
import Contact from "@/components/sections/contact"
import Team from "@/components/sections/team"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Hero from "@/components/sections/hero"
import PricingCTA from "@/components/sections/pricing-cta"
import type { Metadata } from "next"
import Script from "next/script"
import { SITE_URL, LOGO_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "碧南のホームページ制作・Web制作会社 | LEXIA",
  description:
    "碧南市を中心に小規模企業向けのモバイル最適化サイトを制作。愛知県でホームページ作成ならLEXIAにお任せください。",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "碧南のホームページ制作・Web制作会社 | LEXIA",
    description:
      "碧南市を中心に小規模企業向けのモバイル最適化サイトを制作。愛知県でホームページ作成ならLEXIAにお任せください。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "碧南のホームページ制作・Web制作会社 | LEXIA",
    description:
      "碧南市を中心に小規模企業向けのモバイル最適化サイトを制作。愛知県でホームページ作成ならLEXIAにお任せください。",
    images: [`${SITE_URL.replace(/\/$/, "")}/og/og-image.png`],
  },
}

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: "LEXIA",
    url: SITE_URL,
    logo: LOGO_URL,
    description:
      "愛知県碧南市のWEB制作・システム開発。要件整理からUI実装、運用改善まで一貫対応。",
    telephone: "090-1742-3456",
    email: "lexia0web@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "JP",
      addressRegion: "愛知県",
      addressLocality: "碧南市",
      streetAddress: "川端町1-45",
    },
    areaServed: ["Japan"],
    sameAs: [
      "https://www.instagram.com/lexia_web",
      "https://x.com/lexia_web",
    ],
  }

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-900">
      <Navigation />

      <section id="hero">
        <Hero />
      </section>

      <section id="about" className="py-24 md:py-32">
        <About />
      </section>

      <section id="pricing" className="py-24 md:py-32">
        <PricingCTA />
      </section>

      <section id="work" className="py-24 md:py-32">
        <Work />
      </section>

      <section id="team" className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-800">
        <Team />
      </section>


      <section id="contact" className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-800">
        <Contact />
      </section>
      <Footer />
      <Script
        id="home-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  )
}
