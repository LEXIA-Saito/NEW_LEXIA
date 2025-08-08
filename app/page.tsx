import About from "@/components/sections/about"
import Work from "@/components/sections/OurWork"
import Contact from "@/components/sections/contact"
import Team from "@/components/sections/team"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Hero from "@/components/sections/hero"
import PricingCTA from "@/components/sections/pricing-cta"

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
