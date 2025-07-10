"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Linkedin, ArrowUp } from "lucide-react"

export default function Footer() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <footer className="py-12 border-t border-neutral-100 dark:border-neutral-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <motion.div
            className="md:col-span-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeIn}
          >
            <h3 className="text-xl font-light text-neutral-900 dark:text-neutral-100 mb-4">LEXIA</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md">
              Web サイトやアプリ制作を通じて、ビジネスの成長をサポートします。
            </p>
            <div className="flex space-x-4">
              <Link
                href="mailto:contact@lexia.design"
                className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
              <Link
                href="https://www.linkedin.com/company/lexia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variants={fadeIn}
          >
            <h4 className="text-sm font-medium uppercase tracking-wider text-neutral-900 dark:text-neutral-100 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {["About", "Process", "Work", "Team", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 text-sm transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            variants={fadeIn}
          >
            <h4 className="text-sm font-medium uppercase tracking-wider text-neutral-900 dark:text-neutral-100 mb-4">
              Categories
            </h4>
            <ul className="space-y-2">
              {["Residential", "Commercial", "Interior", "Exterior", "Sustainable"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/categories#${item.toLowerCase()}`}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 text-sm transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-neutral-100 dark:border-neutral-800">
          <motion.p
            className="text-neutral-500 dark:text-neutral-400 text-sm"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            variants={fadeIn}
          >
            © {new Date().getFullYear()} LEXIA. All rights reserved.
          </motion.p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 mt-4 md:mt-0 group"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <span className="text-sm mr-1">Back to top</span>
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
