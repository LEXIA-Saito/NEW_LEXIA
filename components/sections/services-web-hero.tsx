"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import ServicesWebHeroCTA from "@/components/cta/services-web-hero-cta"

export default function ServicesWebHero() {
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  
  // Parallax transforms
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 400])
  const textY = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const scale = useTransform(scrollY, [0, 500], [1, 0.95])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a non-animated version for SSR
    return (
      <section className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/lexia_visual/hero_cover.webp"
          alt="LEXIAのWeb制作サービス。レスポンシブ対応の美しいサイトを構築"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 dark:from-black/75 dark:via-black/50 dark:to-black/30" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl md:text-6xl font-light tracking-tight text-white mb-4">
              WEB制作
            </h1>
            <p className="text-neutral-100/95 md:text-xl mb-8">
              コーポレート、EC、ランディング、採用、キャンペーンまで。Next.jsを活用し、成果につながるサイトをスピーディに構築します。
            </p>
            <ServicesWebHeroCTA />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: backgroundY }}
      >
        <Image
          src="https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/lexia_visual/hero_cover.webp"
          alt="LEXIAのWeb制作サービス。レスポンシブ対応の美しいサイトを構築"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 dark:from-black/75 dark:via-black/50 dark:to-black/30" />
      </motion.div>

      {/* Parallax Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4"
        style={{
          y: textY,
          opacity,
          scale,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Glass morphism background for better readability */}
          <div className="rounded-2xl bg-black/20 backdrop-blur-md p-8 md:p-12 ring-1 ring-white/10 shadow-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-6"
            >
              WEB制作
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-neutral-100/95 text-lg md:text-xl lg:text-2xl mb-10 leading-relaxed"
            >
              コーポレート、EC、ランディング、採用、キャンペーンまで。
              <br className="hidden md:block" />
              Next.jsを活用し、成果につながるサイトをスピーディに構築します。
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <ServicesWebHeroCTA />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        style={{ opacity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/60 text-sm">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}