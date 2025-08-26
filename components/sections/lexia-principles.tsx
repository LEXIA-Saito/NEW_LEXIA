"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface PrincipleData {
  keyword: string
  title: string
  description: string
  bg: string
}

const principles: PrincipleData[] = [
  {
    keyword: "Lead",
    title: "Lead with Value（価値で導く）",
    description: "価値あるデジタル資産を創出し、クライアントや社会の未来を切り拓く",
    bg: "bg-cyan-50",
  },
  {
    keyword: "Evolve",
    title: "Evolve Constantly（常に進化する）",
    description: "技術・思考を常に磨き、向上心に溢れる生活力の高い人材を育成する",
    bg: "bg-emerald-50",
  },
  {
    keyword: "Xperience",
    title: "Xperience by Design（体験をデザインする）",
    description: "見る・触れる・使う、その瞬間の感動と記憶に残る体験をデザインする",
    bg: "bg-orange-50",
  },
  {
    keyword: "Inspire",
    title: "Inspire Connection（つながりを生む）",
    description: "人と人、企業と顧客の間に情報の架け橋を築く",
    bg: "bg-violet-50",
  },
  {
    keyword: "Achieve",
    title: "Achieve Together（共に成し遂げる）",
    description: "クライアントと共創し、ローカルでも語り継がれる情報を残す",
    bg: "bg-rose-50",
  },
]

export default function LexiaPrinciples() {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    refs.current.forEach((ref, index) => {
      if (!ref) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(index)
          }
        },
        { threshold: 0.6 }
      )
      observer.observe(ref)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section id="principles" className="w-full">
      {/* Intro */}
      <div className="h-screen flex flex-col items-center justify-center text-center bg-white">
        <h3 className="text-3xl md:text-4xl font-bold text-neutral-900">LEXIA Principles</h3>
        <ChevronDown className="mt-6 h-8 w-8 text-neutral-600 animate-bounce" />
      </div>

      {/* Timeline */}
      {principles.map((p, idx) => (
        <div
          key={p.keyword}
          ref={(el) => (refs.current[idx] = el)}
          className={`${p.bg} min-h-screen flex items-center justify-center transition-colors duration-500`}
        >
          <motion.div
            animate={active === idx ? { scale: 1.2, opacity: 1 } : { scale: 0.8, opacity: 0.3 }}
            transition={{ duration: 0.4 }}
            className="text-center px-4 max-w-2xl"
          >
            <div className="text-6xl md:text-7xl font-black mb-6">{p.keyword}</div>
            <motion.div
              animate={active === idx ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h4 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4">{p.title}</h4>
              <p className="text-neutral-700 text-base md:text-lg leading-relaxed">{p.description}</p>
            </motion.div>
          </motion.div>
        </div>
      ))}

      {/* Summary */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-white px-4 py-24 space-y-12">
        <h4 className="text-2xl md:text-3xl font-bold text-neutral-900">
          LEXIAはこの5つの原則を基盤としています
        </h4>
        <motion.div
          className="grid gap-6 md:grid-cols-5 w-full max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {principles.map((p) => (
            <motion.div
              key={p.keyword}
              className="p-4 border border-neutral-200 rounded-lg bg-white shadow-sm"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="text-xl font-bold mb-2">{p.keyword}</div>
              <p className="text-sm text-neutral-700">{p.title}</p>
            </motion.div>
          ))}
        </motion.div>
        <Link href="/company" className="mt-8 inline-block">
          <button className="px-6 py-3 rounded-md bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors">
            Companyページへ
          </button>
        </Link>
      </div>
    </section>
  )
}

