"use client"

import { motion } from "framer-motion"
import { Chip } from "@/components/ui/chip"
import { t } from "@/lib/i18n"

const steps = [
  {
    number: "01",
    title: "ヒアリング・理解",
    description: "サイトの目的や課題を丁寧に把握します。",
  },
  {
    number: "02",
    title: "設計・共有",
    description: "設計案を共有しながら最適解へブラッシュアップ。",
  },
  {
    number: "03",
    title: "構築・改善",
    description: "公開後も検証を重ね、より良いサイトへと育てます。",
  },
]

export default function HowWeWork() {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Chip>共創の流れ</Chip>

          <h2 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mt-4 mb-6">
            {t('about.listen.title')}
          </h2>

          <p className="text-lg text-neutral-700 dark:text-neutral-300">
            {t('about.listen.body')}
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            className="bg-white dark:bg-neutral-800 p-8 border border-neutral-100 dark:border-neutral-700 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="text-neutral-300 dark:text-neutral-600 text-4xl font-light mb-4">{step.number}</div>
            <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-2">{step.title}</h3>
            <p className="text-neutral-700 dark:text-neutral-300">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
