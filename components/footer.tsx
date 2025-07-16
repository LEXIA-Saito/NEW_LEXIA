"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Mail, Linkedin, ArrowUp } from "lucide-react"
import { t } from "@/lib/i18n"
import {
  LOGO_URL,
  LOGO_WHITE_URL,
  FOOTER_ICONS,
  FOOTER_ICONS_DARK,
} from "@/lib/config"

export default function Footer() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const categoryLinks = [
    { name: t('footer.residential'), href: '/categories/residential' },
    { name: t('footer.commercial'), href: '/categories/commercial' },
    { name: t('footer.interior'), href: '/categories/interior' },
    { name: t('footer.exterior'), href: '/categories/exterior' },
    { name: t('footer.sustainable'), href: '/categories/sustainable' },
  ]

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
            <div className="mb-4">
              <Image
                src={LOGO_URL}
                alt="LEXIA"
                width={120}
                height={24}
                className="h-6 w-auto block dark:hidden"
              />
              <Image
                src={LOGO_WHITE_URL}
                alt="LEXIA"
                width={120}
                height={24}
                className="h-6 w-auto hidden dark:block"
              />
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md">
              Web サイトやアプリ制作を通じて、ビジネスの成長をサポートします。
            </p>
            <div className="flex space-x-4">
              <Link
                href="mailto:lexia0web@gmail.com"
                className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">メール</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/lexia-saito/"
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
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-2">
              {[t('about.chip'), t('ourProcess.title'), t('ourWork.title'), t('team.chip'), "ブログ", t('contact.chip')].map((item) => (
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
              {t('footer.categories')}
            </h4>
            <ul className="space-y-2">
              {categoryLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 text-sm transition-colors duration-300"
                  >
                    {item.name}
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
            © {new Date().getFullYear()} LEXIA. {t('footer.allRights')}
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
            <span className="text-sm mr-1">{t('footer.backToTop')}</span>
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" />
          </motion.button>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {FOOTER_ICONS.map((icon, i) => (
            <div key={icon} className="h-6 w-6 relative">
              <Image
                src={icon}
                alt={`icon ${i + 1}`}
                fill
                className="object-contain block dark:hidden"
              />
              <Image
                src={FOOTER_ICONS_DARK[i]}
                alt=""
                fill
                className="object-contain hidden dark:block"
              />
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
