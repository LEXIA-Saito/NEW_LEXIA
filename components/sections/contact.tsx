"use client"

import { motion } from "framer-motion"
import { Chip } from "@/components/ui/chip"
import SectionIcon from "@/components/section-icon"
import { ExternalLink, Mail } from "lucide-react"
import Link from "next/link"
import { t } from "@/lib/i18n"

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
          <Chip>{t('contact.chip')}</Chip>
          <div className="flex flex-col items-center mt-4 mb-6">
            <SectionIcon index={5} className="mb-4" />
            <h2 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100">
              まずはお気軽にご相談ください。
            </h2>
          </div>
          <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
            愛知県碧南市のWEB制作事業 LEXIA では、5年の経験を生かし、碧南市・刈谷市・安城市・高浜市・西尾市の中小企業や個人事業主向けに格安でホームページ制作をご提供しています。ご質問・ご相談はメール、または LinkedIn から承ります。
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
            <h3 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-6">メールでのお問い合わせ</h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-8">
              プロジェクトのご依頼や一般的なご質問は、下記アドレスまでご連絡ください。営業日であれば 24〜48 時間以内に返信いたします。
            </p>
            <Link
              href="mailto:lexia0web@gmail.com"
              className="inline-flex items-center text-neutral-900 dark:text-neutral-100 hover:underline text-lg group"
            >
              <Mail className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              lexia0web@gmail.com
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
            <h3 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-6">{t('contact.linkedin')}</h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-8">
              最新の制作事例や WEB デザインのヒントを発信しています。ぜひフォローして最新情報をご覧ください。
            </p>
            <Link
              href="https://www.linkedin.com/in/lexia-saito/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-neutral-900 dark:text-neutral-100 hover:underline text-lg group"
            >
              <ExternalLink className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              {t('contact.linkedin')}
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
            皆さまからのご連絡を心よりお待ちしております。私たちと一緒に、貴社のデジタルビジョンを実現しましょう。
          </p>
        </motion.div>
      </div>
    </div>
  )
}
