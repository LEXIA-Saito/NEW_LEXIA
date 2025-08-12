import About from "@/components/sections/about"
import Work from "@/components/sections/OurWork"
import Contact from "@/components/sections/contact"
import Team from "@/components/sections/team"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Hero from "@/components/sections/hero"
import PricingCTA from "@/components/sections/pricing-cta"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "碧南のホームページ制作・Web制作会社 | LEXIA",
  description:
    "碧南市を中心に小規模企業向けのモバイル最適化サイトを制作。愛知県でホームページ作成ならLEXIAにお任せください。",
  keywords:
    "碧南 ホームページ制作, 碧南 Web制作会社, 愛知県 ホームページ作成, 小規模企業 ホームページ制作, モバイル最適化 Web制作",
  openGraph: {
    title: "碧南のホームページ制作・Web制作会社 | LEXIA",
    description:
      "碧南市を中心に小規模企業向けのモバイル最適化サイトを制作。愛知県でホームページ作成ならLEXIAにお任せください。",
    type: "website",
  },
}

export default function Home() {
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
    </main>
  )
}
