import About from "@/components/sections/about"
import Process from "@/components/sections/process"
import Work from "@/components/sections/OurWork"
import Contact from "@/components/sections/contact"
import Blog from "@/components/sections/blog"
import Team from "@/components/sections/team"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Hero from "@/components/sections/hero"

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

      <section id="process" className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-800">
        <OurProcess />
      </section>

      <section id="work" className="py-24 md:py-32">
        <Work />
      </section>

      <section id="team" className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-800">
        <Team />
      </section>

      <section id="blog" className="py-24 md:py-32">
        <Blog />
      </section>

      <section id="contact" className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-800">
        <Contact />
      </section>

      <Footer />
    </main>
  )
}
