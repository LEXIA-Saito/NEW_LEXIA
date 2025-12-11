"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, Code, Film, Monitor, Palette } from "lucide-react"
import { trackEvent } from "@/lib/analytics"
import { t } from "@/lib/i18n"

export default function ServicesCTA() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const services = [
    { href: "/services/web", label: "WEB制作", icon: Globe },
    { href: "/services/design", label: "デザイン各種", icon: Palette },
    { href: "/services/system", label: "システム開発", icon: Code },
    { href: "/services/movie", label: "動画制作", icon: Film },
    { href: "/services/pc", label: "PC教室", icon: Monitor },
  ]

  return (
    <div className="container mx-auto px-4">
      <motion.div
        className="text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        variants={fadeIn}
      >
        <span className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block">Our Services</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">サービス</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          主要サービスから目的に合ったメニューをお選びください
        </p>
      </motion.div>

      {/* Moved video + text from About section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          variants={fadeIn}
          className="relative aspect-[1024/667] rounded-2xl overflow-hidden order-1 lg:order-2 shadow-2xl"
        >
          <img
            src="/images/lexia-services-hero.webp"
            alt="LEXIAのサービス - 地域のデジタル化を推進する価値を伝えるカタチに"
            className="object-contain w-full h-full"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          variants={fadeIn}
          className="order-2 lg:order-1"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">{t("about.ideas.title")}</h3>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{t("about.ideas.body")}</p>
          <ul className="space-y-3 text-muted-foreground mb-8">
            {[
              t("about.services.web"),
              t("about.services.system"),
              t("about.services.movie"),
              t("about.services.pc"),
              t("about.services.design"),
            ].map((service, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {service}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        variants={fadeIn}
      >
        {services.map((s) => {
          const Icon = s.icon
          return (
            <Link key={s.href} href={s.href} className="group">
              <div
                className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-border bg-card hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all duration-300"
                onClick={() => trackEvent("cta_click", { location: "home_services_section", label: s.href })}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-medium text-foreground text-center">{s.label}</span>
              </div>
            </Link>
          )
        })}
      </motion.div>

      {/* Separator and Service List link */}
      <motion.div
        className="flex flex-col items-center gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        variants={fadeIn}
      >
        <div className="flex items-center gap-4 w-full max-w-md">
          <div className="flex-1 h-px bg-border"></div>
          <span className="text-sm text-muted-foreground">または</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        <Link href="/services">
          <Button
            variant="outline"
            size="lg"
            className="group rounded-full px-8 py-6 text-base border-2 hover:border-accent hover:bg-accent/5 transition-all duration-300 bg-transparent"
            onClick={() => trackEvent("cta_click", { location: "home_services_section", label: "/services" })}
          >
            すべてのサービスを見る
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
