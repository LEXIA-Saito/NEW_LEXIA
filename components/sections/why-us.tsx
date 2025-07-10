"use client"

import { motion } from "framer-motion"
import { Chip } from "@/components/ui/chip"

export default function WhyUs() {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Chip>Why us</Chip>

          <h2 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mt-4 mb-6">
            We listen first
          </h2>

          <p className="text-lg text-neutral-700 dark:text-neutral-300">
            At LEXIA, we begin by understanding you—your goals, your site, and the message you want to share—so
            every choice truly reflects your vision.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
