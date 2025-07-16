"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { footerIcons, spinDurations } from "@/lib/footerIcons"

export default function SectionIcon({
  index,
  className,
}: {
  index: number
  className?: string
}) {
  const icon = footerIcons[index % footerIcons.length]
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`inline-block align-middle ${className ?? ''}`}
    >
      <motion.span
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: spinDurations[index % spinDurations.length],
          ease: "linear",
        }}
        className="inline-block"
      >
        <Image
          src={icon.light}
          alt="section icon"
          width={20}
          height={20}
          className="block dark:hidden"
        />
        <Image
          src={icon.dark}
          alt="section icon"
          width={20}
          height={20}
          className="hidden dark:block"
        />
      </motion.span>
    </motion.span>
  )
}
