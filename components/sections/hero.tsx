"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, ExternalLink } from "lucide-react"
import ParticlesBackground from "@/components/kokonutui/particles-background"
import { t } from "@/lib/i18n"

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <ParticlesBackground className="absolute inset-0 h-full w-full" title="" subtitle="" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-neutral-900 dark:text-neutral-100 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            価値を伝わるカタチに
          </motion.h1>

          <motion.p
            className="hero-subtitle text-lg md:text-xl text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            デジタルであなたのストーリーを伝え、成果につなげます。
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

            <Link href="https://www.linkedin.com/in/lexia-saito/" target="_blank" rel="noopener noreferrer">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="rounded-full px-6 py-6 text-base bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 w-full sm:w-auto group">
                  {t("hero.connectLinkedIn")}
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
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
    </div>
  )
}
