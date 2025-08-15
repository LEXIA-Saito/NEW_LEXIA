"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { trackEvent } from "@/lib/analytics"
import { t } from "@/lib/i18n"

export default function ServicesCTA() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const services = [
    { href: "/services/web", label: "WEB制作" },
    { href: "/services/system", label: "システム開発" },
    { href: "/services/movie", label: "動画制作" },
    { href: "/services/pc", label: "PC教室" },
    { href: "/services/design", label: "デザイン各種" },
  ]

  return (
    <div className="container mx-auto px-4">
      <motion.div
        className="text-center mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        variants={fadeIn}
      >
        <h2 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100">サービス</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">主要サービスから目的に合ったメニューをお選びください</p>
      </motion.div>

      {/* Moved video + text from About section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          variants={fadeIn}
          className="relative aspect-[4/3] rounded-lg overflow-hidden order-1 md:order-2"
        >
          <video
            src="https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/movie/lexia_movie_visual.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          variants={fadeIn}
          className="order-2 md:order-1"
        >
          <h3 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-4">{t("about.ideas.title")}</h3>
          <p className="text-neutral-700 dark:text-neutral-300 mb-6">{t("about.ideas.body")}</p>
          <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 mb-6 list-disc pl-5">
            <li>{t("about.services.web")}</li>
            <li>{t("about.services.system")}</li>
            <li>{t("about.services.movie")}</li>
            <li>{t("about.services.pc")}</li>
            <li>{t("about.services.design")}</li>
          </ul>
        </motion.div>
      </div>

      <motion.div
        className="flex flex-wrap gap-3 justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        variants={fadeIn}
      >
        {services.map((s) => (
          <Link key={s.href} href={s.href}>
            <Button
              className="rounded-full px-6 py-4 text-base bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 group"
              onClick={() => trackEvent("cta_click", { location: "home_services_section", label: s.href })}
            >
              {s.label}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        ))}
        <Link href="/services">
          <Button
            variant="outline"
            className="rounded-full px-6 py-4 text-base border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800"
            onClick={() => trackEvent("cta_click", { location: "home_services_section", label: "/services" })}
          >
            サービス一覧
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
