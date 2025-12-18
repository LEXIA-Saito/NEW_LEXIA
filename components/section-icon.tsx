"use client"

import React from "react"
import { motion } from "framer-motion"

export default function SectionIcon({
  index,
  className,
}: {
  index: number
  className?: string
}) {
  // Decorative icon removed
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`inline-block align-middle ${className ?? ""}`}
    >
      <span className="inline-block w-5 h-5 rounded-full bg-gradient-to-tr from-neutral-200 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800 shadow-inner" />
    </motion.span>
  )
}
