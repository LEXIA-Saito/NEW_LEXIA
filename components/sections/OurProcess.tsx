"use client"

import { motion } from "framer-motion"
import { Chip } from "@/components/ui/chip"
import SectionIcon from "@/components/section-icon"
import Image from "next/image"
import { useTranslations } from "@/lib/i18n"

const steps = [
  {
    number: "01",
    image:
      "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/ui_kit/workflow.svg",
  },
  {
    number: "02",
    image:
      "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/ui_kit/modular-coding-of-application.svg",
  },
  {
    number: "03",
    image:
      "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/ui_kit/coding.svg",
  },
]

export default function OurProcess() {
  const t = useTranslations()
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeIn}
        >
          <Chip>{t("ourProcess.title")}</Chip>
          <div className="flex flex-col items-center mt-4 mb-6">
            <SectionIcon index={1} className="mb-4" />
            <p className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100">
              {t("ourProcess.intro")}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="space-y-24">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            className={`flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } gap-8 md:gap-12 items-center`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            variants={fadeIn}
          >
            <div className="w-full md:w-1/2">
              <motion.div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={step.image}
                  alt={t(`ourProcess.steps.${step.number}.title`)}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </div>
            <div className="w-full md:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-baseline space-x-2 md:block md:space-x-0">
                  <div className="text-neutral-400 dark:text-neutral-500 text-3xl md:text-5xl font-light">
                    {step.number}
                  </div>
                  <h3 className="text-xl md:text-2xl font-medium text-neutral-900 dark:text-neutral-100">
                    {t(`ourProcess.steps.${step.number}.title`)}
                  </h3>
                </div>
                <div className="space-y-3 md:space-y-4 mt-3">
                  <p className="text-lg text-neutral-700 dark:text-neutral-300">
                    {t(`ourProcess.steps.${step.number}.description`)}
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400">{t(`ourProcess.steps.${step.number}.body`)}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
