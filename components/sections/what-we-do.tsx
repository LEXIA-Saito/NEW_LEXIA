"use client"

import { motion } from "framer-motion"
import { Chip } from "@/components/ui/chip"

export default function WhatWeDo() {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Chip>What we offer</Chip>

          <h2 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mt-4 mb-6">
            We bring ideas to life
          </h2>

          <p className="text-lg text-neutral-700 dark:text-neutral-300">
            We turn your thoughts into concept sketches, develop clear plans, create 3D visuals to help you see the
            design, and stay by your side through every step of the build.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
