"use client"

import { motion } from "framer-motion"
import { Chip } from "@/components/ui/chip"
import Image from "next/image"

const steps = [
  {
    number: "01",
    title: "Listen & Learn",
    description: "We dive into your story and site context.",
    details:
      "Every project begins with a conversation. We take the time to understand your vision, needs, and the unique characteristics of your site. This foundation ensures that our design truly reflects your goals.",
    image: "/process/process-1.png",
  },
  {
    number: "02",
    title: "Shape & Share",
    description: "We sketch, model, and refine together until it feels right.",
    details:
      "We transform your ideas into initial concepts, then collaborate closely with you to refine them. Through sketches, 3D models, and detailed plans, we ensure the design evolves to perfectly match your vision.",
    image: "/process/process-2.png",
  },
  {
    number: "03",
    title: "Build & Better",
    description: "We support construction to ensure your vision comes alive.",
    details:
      "Our involvement continues throughout the construction phase. We work closely with builders and contractors to ensure that every detail is executed according to plan, making adjustments as needed to bring your vision to life.",
    image: "/process/process-3.png",
  },
]

export default function Process() {
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
          <Chip>Our Process</Chip>
          <h2 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mt-4 mb-6">
            We partner with you
          </h2>
          <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
            We believe collaboration brings out the best in every design—working side by side, sharing ideas, and
            refining every detail together.
          </p>
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
              <motion.div
                className="relative aspect-[4/3] overflow-hidden rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={step.image || "/placeholder.svg"}
                  alt={step.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            </div>
            <div className="w-full md:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="text-neutral-400 dark:text-neutral-500 text-5xl font-light mb-4">{step.number}</div>
                <h3 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100 mb-3">{step.title}</h3>
                <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-4">{step.description}</p>
                <p className="text-neutral-600 dark:text-neutral-400">{step.details}</p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
