"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function PricingCTA() {
  return (
    <div className="container mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-6">
          料金シミュレーションはこちら
        </h2>
        <Link href="/pricing">
          <Button className="rounded-full px-8 py-6 text-base bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900">
            料金ページへ
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
