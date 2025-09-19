"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"


interface CyberBackgroundProps {
  title?: string
  subtitle?: string
  particleCount?: number
  noiseIntensity?: number
  particleSize?: { min: number; max: number }
  className?: string
  /** 影響半径（px）: マウス周辺で粒子が靡く範囲 */
  mouseRadius?: number
  /** 影響強度（0〜1目安）: 粒子速度に足されるバイアス量 */
  mouseStrength?: number
  /** 靡きプリセット: subtle | medium | strong */
  swayPreset?: "subtle" | "medium" | "strong"
  /** 影響モード: blend=ベクトル補間, swirl=渦（直交方向） */
  swayMode?: "blend" | "swirl"
}

function createNoise() {
  const permutation = [
    151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240,
    21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88,
    237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83,
    111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80,
    73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64,
    52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182,
    189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22,
    39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210,
    144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84,
    204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78,
    66, 215, 61, 156, 180,
  ]

  const p = new Array(512)
  for (let i = 0; i < 256; i++) p[256 + i] = p[i] = permutation[i]

  function fade(t: number) {
    return t * t * t * (t * (t * 6 - 15) + 10)
  }

  function lerp(t: number, a: number, b: number) {
    return a + t * (b - a)
  }

  function grad(hash: number, x: number, y: number, z: number) {
    const h = hash & 15
    const u = h < 8 ? x : y
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
  }

  return {
    simplex3: (x: number, y: number, z: number) => {
      const X = Math.floor(x) & 255
      const Y = Math.floor(y) & 255
      const Z = Math.floor(z) & 255

      x -= Math.floor(x)
      y -= Math.floor(y)
      z -= Math.floor(z)

      const u = fade(x)
      const v = fade(y)
      const w = fade(z)

      const A = p[X] + Y
      const AA = p[A] + Z
      const AB = p[A + 1] + Z
      const B = p[X + 1] + Y
      const BA = p[B] + Z
      const BB = p[B + 1] + Z

      return lerp(
        w,
        lerp(
          v,
          lerp(u, grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z)),
          lerp(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z)),
        ),
        lerp(
          v,
          lerp(u, grad(p[AA + 1], x, y, z - 1), grad(p[BA + 1], x - 1, y, z - 1)),
          lerp(u, grad(p[AB + 1], x, y - 1, z - 1), grad(p[BB + 1], x - 1, y - 1, z - 1)),
        ),
      )
    },
  }
}

const COLOR_SCHEME = {
  light: {
    particle: {
      color: "rgba(0, 0, 0, 0.07)",
    },
    background: "rgba(255, 255, 255, 0.12)",
  },
  dark: {
    particle: {
      color: "rgba(255, 255, 255, 0.07)",
    },
    background: "rgba(0, 0, 0, 0.12)",
  },
} as const

interface Particle {
  x: number
  y: number
  size: number
  velocity: { x: number; y: number }
  life: number
  maxLife: number
}

export default function ParticlesBackground({
  title = "Particles Background",
  subtitle = "Make your website stand out",
  particleCount = 2000,
  noiseIntensity = 0.003,
  particleSize = { min: 0.5, max: 2 },
  className,
  mouseRadius,
  mouseStrength,
  swayPreset = "strong",
  swayMode = "blend",
}: CyberBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const noise = createNoise()
  const rafRef = useRef<number | null>(null)
  const reducedMotionRef = useRef<boolean>(false)

  // ポインタ位置（ビューポート座標）
  const pointerRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const resizeCanvas = () => {
      // ビューポートに対して固定なので、ウィンドウサイズに合わせる
      canvas.width = Math.max(1, Math.floor(window.innerWidth))
      canvas.height = Math.max(1, Math.floor(window.innerHeight))
    }

    resizeCanvas()

    // 端末幅に応じて粒子数をスケール（モバイル軽量化）
    const mobileScale = window.innerWidth < 768 ? 0.5 : 1
    const effectiveParticleCount = Math.max(100, Math.floor(particleCount * mobileScale))

    const particles: Particle[] = Array.from({ length: effectiveParticleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * (particleSize.max - particleSize.min) + particleSize.min,
      velocity: { x: 0, y: 0 },
      life: Math.random() * 100,
      maxLife: 100 + Math.random() * 50,
    }))

    // プリセットに応じた係数
    const preset = (() => {
      switch (swayPreset) {
        case "subtle":
          return { baseSpeed: 1.6, swayBoost: 2.0, radius: 200, strength: 0.12, maxSpeed: 2.6 }
        case "medium":
          return { baseSpeed: 1.4, swayBoost: 2.3, radius: 230, strength: 0.18, maxSpeed: 2.8 }
        case "strong":
        default:
          return { baseSpeed: 1.3, swayBoost: 2.5, radius: 260, strength: 0.22, maxSpeed: 3.0 }
      }
    })()

    const effectiveRadius = (mouseRadius ?? preset.radius)
    const effectiveStrength = (mouseStrength ?? preset.strength)

    // ユーティリティ
    const len = (x: number, y: number) => Math.hypot(x, y)
    const normalize = (x: number, y: number) => {
      const l = Math.hypot(x, y) || 1
      return { x: x / l, y: y / l }
    }
    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))
    const smoothstep = (edge0: number, edge1: number, x: number) => {
      const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
      return t * t * (3 - 2 * t)
    }
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      if (reducedMotionRef.current) {
        // 動きを抑制：クリアのみでループを止める
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        return
      }

      const isDark = document.documentElement.classList.contains("dark")
      const scheme = isDark ? COLOR_SCHEME.dark : COLOR_SCHEME.light

      // 半透明全面塗り（ベール蓄積）をやめて、完全にクリアする方式に変更
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.life += 1
        if (particle.life > particle.maxLife) {
          particle.life = 0
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
        }

        const opacity = Math.sin((particle.life / particle.maxLife) * Math.PI) * 0.15

        // ノイズベースの方向
        const n = noise.simplex3(
          particle.x * noiseIntensity,
          particle.y * noiseIntensity,
          Date.now() * 0.0001,
        )
        const angle = n * Math.PI * 4
        const baseDir = { x: Math.cos(angle), y: Math.sin(angle) }
        const baseVec = { x: baseDir.x * preset.baseSpeed, y: baseDir.y * preset.baseSpeed }

        // マウス（ポインタ）による靡き効果：blend/swirl 方式
        const mx = pointerRef.current.x
        const my = pointerRef.current.y
        let finalVx = baseVec.x
        let finalVy = baseVec.y
        if (mx !== -9999 && my !== -9999) {
          const dx = particle.x - mx
          const dy = particle.y - my
          const dist = len(dx, dy)
          if (dist > 0 && dist < effectiveRadius) {
            const falloff = 1 - dist / effectiveRadius
            // なめらかな重み
            const w = smoothstep(0, 1, falloff)
            const away = normalize(dx, dy)
            let targetX = away.x
            let targetY = away.y
            if (swayMode === "swirl") {
              // 渦：away の直交方向（右回り）
              const tmp = targetX
              targetX = -targetY
              targetY = tmp
            }
            // 目標速度ベクトル（外向き/渦方向）
            const swaySpeed = preset.swayBoost
            const targetVx = targetX * swaySpeed
            const targetVy = targetY * swaySpeed

            // ベクトル補間（base→target）
            finalVx = baseVec.x * (1 - w) + targetVx * w
            finalVy = baseVec.y * (1 - w) + targetVy * w

            // 速度量も base→swayBoost で補間し、強さ係数も反映
            const targetSpeed = lerp(preset.baseSpeed, preset.swayBoost, w) * (1 + effectiveStrength)
            const nrm = normalize(finalVx, finalVy)
            finalVx = nrm.x * targetSpeed
            finalVy = nrm.y * targetSpeed
          }
        }
        // 上限クランプ
        const sp = len(finalVx, finalVy)
        const maxSp = preset.maxSpeed
        if (sp > maxSp) {
          const k = maxSp / sp
          finalVx *= k
          finalVy *= k
        }
        particle.velocity.x = finalVx
        particle.velocity.y = finalVy

        particle.x += particle.velocity.x
        particle.y += particle.velocity.y

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    // prefers-reduced-motion を尊重して開始制御
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    reducedMotionRef.current = !!mql.matches
    if (!reducedMotionRef.current) {
      animate()
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    const updateReducedMotion = () => {
      const enabled = !!mql.matches
      const wasReduced = reducedMotionRef.current
      reducedMotionRef.current = enabled
      if (!enabled && (wasReduced || !rafRef.current)) {
        rafRef.current = requestAnimationFrame(animate)
      } else if (enabled && rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
    try {
      mql.addEventListener("change", updateReducedMotion)
    } catch {
      // Safari 旧仕様 fallback
      // @ts-ignore
      mql.addListener && mql.addListener(updateReducedMotion)
    }

    const handleResize = () => {
      resizeCanvas()
    }

    const handlePointerMove = (e: PointerEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY }
    }
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        const t = e.touches[0]
        pointerRef.current = { x: t.clientX, y: t.clientY }
      }
    }
    const handlePointerLeave = () => {
      pointerRef.current = { x: -9999, y: -9999 }
    }

    const handleVisibility = () => {
      if (document.visibilityState === "hidden" && rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      } else if (document.visibilityState === "visible" && !rafRef.current && !reducedMotionRef.current) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerleave", handlePointerLeave)
    window.addEventListener("touchmove", handleTouchMove, { passive: true })
    document.addEventListener("visibilitychange", handleVisibility)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerleave", handlePointerLeave)
      window.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("visibilitychange", handleVisibility)
      try {
        mql.removeEventListener("change", updateReducedMotion)
      } catch {
        // @ts-ignore
        mql.removeListener && mql.removeListener(updateReducedMotion)
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [particleCount, noiseIntensity, particleSize, noise])

  return (
    <div className="fixed inset-0 w-screen h-[100dvh] overflow-hidden -z-10">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />
      {(title || subtitle) && (
        <div className={cn("relative z-10 flex h-full w-full flex-col items-center justify-center", className)}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4"
          >
            {title && (
              <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-black to-black/70 dark:from-white dark:to-white/70 drop-shadow-sm">
                {title}
              </h1>
            )}
            {subtitle && (
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://kokonutui.com/"
                className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-black/90 to-black/50 dark:from-white/90 dark:to-white/50 flex items-center justify-center"
              >
                {subtitle}
              </Link>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}
