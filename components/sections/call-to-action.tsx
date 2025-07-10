"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Mail } from "lucide-react"

export default function CallToAction() {
  return (
    <div className="container mx-auto px-4 text-center">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-12">
          Ready to start your journey?
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="#portfolio">
            <Button
              variant="outline"
              className="rounded-full px-6 py-6 text-base border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 w-full sm:w-auto"
            >
              See Our Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <Link href="mailto:lexia0web@gmail.com">
            <Button
              variant="outline"
              className="rounded-full px-6 py-6 text-base border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 w-full sm:w-auto"
            >
              Send Us an Email
              <Mail className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <Link href="https://www.linkedin.com/in/lexia-saito/" target="_blank" rel="noopener noreferrer">
            <Button className="rounded-full px-6 py-6 text-base bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 w-full sm:w-auto">
              Connect on LinkedIn
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
