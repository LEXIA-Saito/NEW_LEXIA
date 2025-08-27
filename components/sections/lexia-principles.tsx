"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"

interface Principle {
  letter: string
  en: string
  ja: string
  body: string
  proof?: string
}

const principles: Principle[] = [
  {
    letter: "L",
    en: "Lead with Value",
    ja: "価値で導く",
    body: "価値あるデジタル資産を創出し、クライアントや社会の未来を切り拓く",
    proof: "LCP ≤ 2.5s",
  },
  {
    letter: "E",
    en: "Evolve Constantly",
    ja: "常に進化する",
    body: "技術・思考を常に磨く、生活力の高い人材を育成する",
    proof: "継続改善 +15%",
  },
  {
    letter: "X",
    en: "Xperience by Design",
    ja: "体験をデザインする",
    body: "見る・触れる・使う、その瞬間の感動と記憶に残る体験をデザインする",
    proof: "体験向上指標 ↑",
  },
  {
    letter: "I",
    en: "Inspire Connection",
    ja: "つながりを生む",
    body: "人と人、企業と顧客の間に情報の架け橋を築く",
  },
  {
    letter: "A",
    en: "Achieve Together",
    ja: "共に成し遂げる",
    body: "クライアントと共創し、ローカルでも語り継がれる成果を残す",
  },
]

export default function LexiaPrinciples() {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    refs.current.forEach((ref, idx) => {
      if (!ref) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(idx)
        },
        { threshold: 0.5 }
      )
      obs.observe(ref)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section id="principles" className="mx-auto max-w-6xl px-6 py-20">
      <header className="mb-10 text-center md:text-left">
        <p className="text-sm tracking-wide text-neutral-500">LEXIA PRINCIPLES</p>
        <h2 className="text-2xl md:text-3xl font-medium">
          価値を伝わる体験設計の、5つの約束。
        </h2>
      </header>
      <div className="grid grid-cols-12 gap-6">
        <aside className="col-span-3 sticky top-24 h-fit">
          <ul className="space-y-2 text-neutral-400">
            {principles.map((p, i) => (
              <li
                key={p.letter}
                className={`text-xl font-medium transition-colors ${
                  active === i ? "text-neutral-900" : ""
                }`}
              >
                {p.letter}
              </li>
            ))}
          </ul>
        </aside>
        <main className="col-span-9 space-y-10">
          {principles.map((p, i) => (
            <article
              key={p.letter}
              ref={(el) => (refs.current[i] = el)}
              className="p-6 border border-neutral-200 rounded-xl bg-white text-neutral-900 space-y-2"
            >
              <h3 className="text-lg font-semibold">{p.ja}</h3>
              <p className="text-sm text-neutral-500">{p.en}</p>
              <p className="text-sm leading-relaxed">{p.body}</p>
              {p.proof && (
                <p className="text-xs text-neutral-500 pt-2">{p.proof}</p>
              )}
            </article>
          ))}
        </main>
      </div>
      <div className="mt-20 flex flex-col items-center text-center space-y-6">
        <motion.div
          className="flex text-5xl md:text-6xl font-bold text-neutral-900"
          initial={{ letterSpacing: "0.6em" }}
          whileInView={{ letterSpacing: shouldReduceMotion ? "0.6em" : "0" }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {principles.map((p) => (
            <span key={p.letter} className="mx-1">
              {p.letter}
            </span>
          ))}
        </motion.div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/company/process"
            className="px-6 py-3 rounded-lg bg-neutral-900 text-white text-sm"
          >
            制作工程
          </Link>
          <Link
            href="/projects"
            className="px-6 py-3 rounded-lg border border-neutral-900 text-neutral-900 text-sm"
          >
            実績
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-lg border border-neutral-900 text-neutral-900 text-sm"
          >
            お問い合わせ
          </Link>
        </div>
      </div>
    </section>
  )
}

