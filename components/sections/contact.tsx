"use client"

import { motion } from "framer-motion"
import { Chip } from "@/components/ui/chip"
import { ExternalLink, Mail } from "lucide-react"
import Link from "next/link"

export default function Contact() {
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
          <Chip>Get in Touch</Chip>
          <h2 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mt-4 mb-6">
            Let's Start a Conversation
          </h2>
          <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
            Ready to bring your architectural vision to life? We'd love to hear from you. Reach out directly through
            email or connect with us on LinkedIn.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variants={fadeIn}
            className="bg-neutral-50 dark:bg-neutral-800 p-8 rounded-lg transform transition-transform duration-300 hover:scale-[1.02]"
          >
            <h3 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-6">Email Us</h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-8">
              For project inquiries or general questions, feel free to email us directly. We typically respond within
              24-48 hours during business days.
            </p>
            <Link
              href="mailto:contact@risala.design?subject=Project%20Inquiry&body=Hello%20Risala%20Team%2C%0D%0A%0D%0AI%20would%20like%20to%20discuss%20a%20potential%20project%20with%20you.%0D%0A%0D%0AProject%20details%3A%0D%0A-%20Type%20of%20project%3A%0D%0A-%20Location%3A%0D%0A-%20Timeline%3A%0D%0A-%20Additional%20information%3A%0D%0A%0D%0AThank%20you%2C%0D%0A"
              className="inline-flex items-center text-neutral-900 dark:text-neutral-100 hover:underline text-lg group"
            >
              <Mail className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              contact@risala.design
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            variants={fadeIn}
            className="bg-neutral-50 dark:bg-neutral-800 p-8 rounded-lg transform transition-transform duration-300 hover:scale-[1.02]"
          >
            <h3 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-6">Connect on LinkedIn</h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-8">
              Connect with our principal architect on LinkedIn to stay updated on our latest projects and architectural
              insights.
            </p>
            <Link
              href="https://www.linkedin.com/in/raflykurnia72/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-neutral-900 dark:text-neutral-100 hover:underline text-lg group"
            >
              <ExternalLink className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              Rafly Kurnia
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          variants={fadeIn}
          className="text-center mt-16"
        >
          <p className="text-neutral-700 dark:text-neutral-300">
            We look forward to hearing from you and discussing how we can bring your architectural vision to life.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
