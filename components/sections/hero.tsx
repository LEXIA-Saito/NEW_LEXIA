"use client"

import Link from "next/link"
import React from "react"
import { motion, useAnimation, useScroll } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, ExternalLink } from "lucide-react"
import ParticlesBackground from "@/components/kokonutui/particles-background"
import { footerIcons, getRandomSpinDuration } from "@/lib/footerIcons"
import { t } from "@/lib/i18n"

export default function Hero() {
  const controls = useAnimation()
  const { scrollY } = useScroll()
  const randomDurations = React.useMemo(
    () => footerIcons.map(() => getRandomSpinDuration()),
    []
  )

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
    <div className="hero-wrapper">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <ParticlesBackground className="absolute inset-0 h-full w-full" title="" subtitle="" />
      </div>

      <div className="hero-inner">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          価値を伝わるカタチに
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          企業のウェブサイトは"顔"であると同時に、ブランド価値を伝える最重要ポイントです。御社のウェブサイトを「成果を生む資産」へと進化させます。
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link href="#work">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="rounded-full px-6 py-6 text-base border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 w-full sm:w-auto group"
              >
                {t("hero.viewWork")}
                <ArrowDown className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
              </Button>
            </motion.div>
          </Link>

          <Link href="/contact">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="rounded-full px-6 py-6 text-base bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 w-full sm:w-auto group">
                {t("hero.contact")}
                <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      >
        <Link href="#about" aria-label="Scroll down">
          <ArrowDown className="h-6 w-6 text-neutral-400 dark:text-neutral-500" />
        </Link>
      </motion.div>

      <motion.div
        className="absolute bottom-4 right-4 flex space-x-2"
        animate={controls}
      >
        {footerIcons.map((icon, index) => (
          <motion.span
            key={index}
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: randomDurations[index],
              ease: "linear",
            }}
          >
            <img
              src={icon.light}
              alt=""
              aria-hidden="true"
              className="w-4 h-4 block dark:hidden"
            />
            <img
              src={icon.dark}
              alt=""
              aria-hidden="true"
              className="w-4 h-4 hidden dark:block"
            />
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}
