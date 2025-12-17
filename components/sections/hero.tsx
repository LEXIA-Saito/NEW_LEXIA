"use client"

import Link from "next/link"
import React from "react"
import { motion, useAnimation, useScroll } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, ExternalLink } from "lucide-react"
import ParticlesBackground from "@/components/kokonutui/particles-background"
import { footerIcons, getRandomSpinDuration } from "@/lib/footerIcons"
import { t } from "@/lib/i18n"
import { trackEvent } from "@/lib/analytics"

export default function Hero() {
  const controls = useAnimation()
  const { scrollY } = useScroll()
  const randomDurations = React.useMemo(() => footerIcons.map(() => getRandomSpinDuration()), [])

  React.useEffect(() => {
    return scrollY.on("change", (y) => {
      if (y > 100) {
        controls.start({ y: 100, opacity: 0 })
      } else {
        controls.start({ y: 0, opacity: 1 })
      }
    })
  }, [controls, scrollY])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-white dark:bg-neutral-900">
      <div className="absolute inset-0 opacity-60 pointer-events-none">
        <ParticlesBackground className="absolute inset-0 h-full w-full" title="" subtitle="" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-20 text-center max-w-4xl mx-auto">
        <motion.h1
          className="font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-6 text-neutral-900 dark:text-neutral-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          価値を伝わるカタチに
        </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl mb-12 text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            企業のウェブサイトは「顔」であると同時に、ブランド価値を伝える最重要ポイントです。御社のウェブサイトを「成果を生む資産」へと進化させます。
          </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link href="#work" className="w-full sm:w-auto">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-4 text-lg min-h-[48px] min-w-[200px] border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 w-full sm:w-auto group transition-all duration-200 bg-transparent"
                onClick={() => trackEvent("cta_click", { location: "home_hero", label: "view_work" })}
              >
                {t("hero.viewWork")}
                <ArrowDown className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
              </Button>
            </motion.div>
          </Link>

          <Link href="/contact" className="w-full sm:w-auto">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="rounded-full px-8 py-4 text-lg min-h-[48px] min-w-[200px] bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 w-full sm:w-auto group transition-all duration-200"
                onClick={() => trackEvent("cta_click", { location: "home_hero", label: "contact" })}
              >
                {t("hero.contact")}
                <ExternalLink className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </Button>
            </motion.div>
          </Link>

          <Link href="/services" className="w-full sm:w-auto">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="lg"
                className="rounded-full px-8 py-4 text-lg min-h-[48px] min-w-[200px] text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 w-full sm:w-auto group transition-all duration-200"
                onClick={() => trackEvent("cta_click", { location: "home_hero", label: "services" })}
              >
                サービス一覧
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      >
        <Link
          href="#about"
          aria-label="下にスクロール"
          className="block p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
        >
          <ArrowDown className="h-6 w-6 text-neutral-400 dark:text-neutral-500" />
        </Link>
      </motion.div>

      <motion.div className="absolute bottom-4 right-4 flex space-x-2 z-20" animate={controls}>
        {footerIcons.map((icon, index) => (
          <motion.span
            key={index}
            animate={{ rotate: 360 }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: randomDurations[index],
              ease: "linear",
            }}
            className="block"
          >
            <img
              src={icon.light || "/placeholder.svg"}
              alt=""
              aria-hidden="true"
              className="w-4 h-4 block dark:hidden"
              loading="lazy"
            />
            <img
              src={icon.dark || "/placeholder.svg"}
              alt=""
              aria-hidden="true"
              className="w-4 h-4 hidden dark:block"
              loading="lazy"
            />
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}
