"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface Principle {
  letter: string
  en: string
  ja: string
}

const principles: Principle[] = [
  { letter: "L", en: "Lead with Value", ja: "価値で導く" },
  { letter: "E", en: "Evolve Everyday", ja: "常に進化する" },
  { letter: "X", en: "Xperience Design", ja: "体験をデザインする" },
  { letter: "I", en: "Inspire Empathy", ja: "共感を育む" },
  { letter: "A", en: "Advance the Future", ja: "未来を拓く" },
]

export default function LexiaPrinciples() {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    refs.current.forEach((ref, idx) => {
      if (!ref) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(idx)
        },
        { threshold: 0.6 }
      )
      obs.observe(ref)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section id="principles" className="w-full">
      <div className="h-screen flex flex-col items-center justify-center text-center bg-white">
        <h3 className="text-3xl md:text-4xl font-bold text-neutral-900">
          LEXIA Principles
        </h3>
        <ChevronDown className="mt-6 h-8 w-8 text-neutral-600 animate-bounce" />
      </div>

      {principles.map((p, idx) => (
        <div
          key={p.letter}
          ref={(el) => (refs.current[idx] = el)}
          className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${
            idx % 2 ? "bg-black text-white" : "bg-white text-neutral-900"
          }`}
        >
          <motion.div
            animate={
              active === idx
                ? { scale: 1, opacity: 1 }
                : { scale: 0.8, opacity: 0.3 }
            }
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="text-8xl md:text-9xl font-black text-emerald-500 mb-8">
              {p.letter}
            </div>
            <motion.div
              animate={
                active === idx ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.4, delay: 0.1 }}
              className="space-y-2"
            >
              <p className="text-xl md:text-2xl font-bold">{p.en}</p>
              <p className="text-base md:text-lg">{p.ja}</p>
            </motion.div>
          </motion.div>
        </div>
      ))}

      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-white px-4 py-24 space-y-12">
        <motion.div
          className="flex text-6xl md:text-7xl font-black text-emerald-500"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {principles.map((p) => (
            <motion.span
              key={p.letter}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              {p.letter}
            </motion.span>
          ))}
        </motion.div>
        <p className="text-neutral-900 text-xl md:text-2xl">
          LEXIAは5つのPrinciplesを大切にしています
        </p>
        <Link href="/company">
          <button className="px-6 py-3 rounded-md bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors">
            私たちについて
          </button>
        </Link>
      </div>
    </section>
  )
}

