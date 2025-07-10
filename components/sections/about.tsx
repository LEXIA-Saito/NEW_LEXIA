"use client"

import { motion } from "framer-motion"
import { Chip } from "@/components/ui/chip"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { t } from "@/lib/i18n"

export default function About() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <Chip>{t('about.chip')}</Chip>
          <h2 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mt-4 mb-6">
            {t('about.heading')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variants={fadeIn}
          >
            <h3 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-4">{t('about.listen.title')}</h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-6">
              {t('about.listen.body')}
            </p>
            <Link
              href="#process"
              className="inline-flex items-center text-neutral-900 dark:text-neutral-100 hover:underline group"
            >
              {t('about.learnProcess')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            variants={fadeIn}
            className="relative aspect-[4/3] rounded-lg overflow-hidden"
          >
            <Image
              src="/about/about-1.png"
              alt="LEXIA team discussing with clients"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            variants={fadeIn}
            className="relative aspect-[4/3] rounded-lg overflow-hidden order-1 md:order-2"
          >
            <Image src="/about/about-2.png" alt="Architectural design process" fill className="object-cover" />
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
            <h3 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-4">{t('about.ideas.title')}</h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-6">
              {t('about.ideas.body')}
            </p>
            <Link
              href="#work"
              className="inline-flex items-center text-neutral-900 dark:text-neutral-100 hover:underline group"
            >
              {t('about.seeWork')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
