"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PrincipleData {
  letter: string
  title: string
  description: string
}

const principles: PrincipleData[] = [
  {
    letter: "L",
    title: "Lead with Value（価値で導く）",
    description: "価値あるデジタル資産を創出し、クライアントや社会の未来を切り拓く",
  },
  {
    letter: "E",
    title: "Evolve Constantly（常に進化する）",
    description: "技術・思考を常に磨き、向上心に溢れる生活力の高い人材を育成する",
  },
  {
    letter: "X",
    title: "Xperience by Design（体験をデザインする）",
    description: "見る・触れる・使う、その瞬間の感動と記憶に残る体験をデザインする",
  },
  {
    letter: "I",
    title: "Inspire Connection（つながりを生む）",
    description: "人と人、企業と顧客の間に情報の架け橋を築く",
  },
  {
    letter: "A",
    title: "Achieve Together（共に成し遂げる）",
    description: "クライアントと共創し、ローカルでも語り継がれる情報を残す",
  },
]

export default function LexiaPrinciples() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>("L") // デフォルトでLを表示
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    const checkReducedMotion = () =>
      setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)

    checkMobile()
    checkReducedMotion()

    window.addEventListener("resize", checkMobile)
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    mediaQuery.addEventListener("change", checkReducedMotion)

    return () => {
      window.removeEventListener("resize", checkMobile)
      mediaQuery.removeEventListener("change", checkReducedMotion)
    }
  }, [])

  const handleMouseEnter = (letter: string) => {
    if (!isMobile) {
      setSelectedLetter(letter)
    }
  }

  const handleClick = (letter: string) => {
    setSelectedLetter(letter)
  }

  const handleKeyDown = (e: React.KeyboardEvent, letter: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setSelectedLetter(letter)
    }
  }

  const selectedPrinciple = principles.find((p) => p.letter === selectedLetter)

  return (
    <section id="principles" className="py-16 md:py-24 bg-gradient-to-b from-slate-50/50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">LEXIA Principles</h3>
          <p className="text-sm text-slate-600">
            {isMobile ? "タップで詳細が表示されます" : "ホバーで詳細が表示されます"}
          </p>
        </div>

        {/* LEXIA Letters */}
        <div className="relative flex justify-center items-center gap-2 md:gap-6 mb-12">
          {principles.map((principle) => {
            const isSelected = selectedLetter === principle.letter

            return (
              <motion.button
                key={principle.letter}
                className={`
                  relative text-6xl md:text-8xl lg:text-9xl font-black transition-colors duration-200
                  focus:outline-none focus:ring-4 focus:ring-sky-500/20 rounded-lg
                  ${isSelected ? "text-sky-700" : "text-slate-800 hover:text-sky-700"}
                `}
                style={{
                  fontSize: "clamp(72px, 10vw, 160px)",
                  lineHeight: 1,
                }}
                onMouseEnter={() => handleMouseEnter(principle.letter)}
                onClick={() => handleClick(principle.letter)}
                onKeyDown={(e) => handleKeyDown(e, principle.letter)}
                aria-pressed={isSelected}
                aria-label={`${principle.letter}: ${principle.title}`}
                whileHover={prefersReducedMotion ? {} : { scale: 1.08 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {principle.letter}

                {/* Glow effect */}
                {isSelected && !prefersReducedMotion && (
                  <motion.div
                    className="absolute inset-0 bg-sky-400/20 rounded-full blur-xl -z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {selectedPrinciple && (
              <motion.div
                key={selectedPrinciple.letter}
                className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-start gap-6">
                  <div className="text-5xl md:text-6xl font-black text-sky-700 flex-shrink-0">
                    {selectedPrinciple.letter}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">{selectedPrinciple.title}</h4>
                    <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                      {selectedPrinciple.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Fallback for JS disabled */}
        <noscript>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle) => (
              <div key={principle.letter} className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="text-3xl font-black text-sky-700 mb-3">{principle.letter}</div>
                <h4 className="font-semibold text-slate-900 mb-2">{principle.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </noscript>
      </div>
    </section>
  )
}
