"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowRight, Check } from "lucide-react"
import ParticlesBackground from "@/components/kokonutui/particles-background"
import { trackEvent } from "@/lib/analytics"

// 対応エリア・価格・保守などの信頼バッジ（すべてサイト内で公開済みの情報）
const TRUST_BADGES = [
  "無料相談",
  "碧南・刈谷・安城・高浜・西尾 対応",
  "ホームページ制作 15万円〜",
  "公開後の保守・運用も対応",
]

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-white dark:bg-neutral-900">
      <div className="absolute inset-0 opacity-60 pointer-events-none">
        <ParticlesBackground className="absolute inset-0 h-full w-full" title="" subtitle="" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-20 text-center max-w-4xl mx-auto">
        <motion.h1
          className="mb-6 text-neutral-900 dark:text-neutral-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="block text-sm sm:text-base font-medium tracking-wide text-neutral-500 dark:text-neutral-400 mb-3">
            愛知県碧南市の小さなお店・会社のためのホームページ制作
          </span>
          <span className="block font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight">
            価値を、伝わるカタチに。
          </span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl mb-8 text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          ウェブサイトはお店・会社の「顔」。地元の中小企業・個人事業主の皆さまのサイトを、成果を生む資産へと育てます。
        </motion.p>

        <motion.ul
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {TRUST_BADGES.map((badge) => (
            <li
              key={badge}
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white/70 dark:bg-neutral-800/70 px-3 py-1.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300"
            >
              <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" aria-hidden="true" />
              {badge}
            </li>
          ))}
        </motion.ul>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link href="/contact" className="w-full sm:w-auto">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="rounded-full px-8 py-4 text-lg min-h-[48px] min-w-[220px] bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 w-full sm:w-auto group transition-all duration-200"
                onClick={() => trackEvent("cta_click", { location: "home_hero", label: "contact" })}
              >
                無料で相談する
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </Link>

          <Link href="#work" className="w-full sm:w-auto">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-4 text-lg min-h-[48px] min-w-[200px] border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 w-full sm:w-auto group transition-all duration-200 bg-transparent"
                onClick={() => trackEvent("cta_click", { location: "home_hero", label: "view_work" })}
              >
                制作実績を見る
                <ArrowDown className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
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
          href="#services"
          aria-label="下にスクロール"
          className="block p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
        >
          <ArrowDown className="h-6 w-6 text-neutral-400 dark:text-neutral-500" />
        </Link>
      </motion.div>
    </div>
  )
}
