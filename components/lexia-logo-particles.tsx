"use client"

import { useRef, useEffect, useState, useCallback } from "react"

type Particle = {
  x: number
  y: number
  baseX: number
  baseY: number
  size: number
  color: string
  life: number
}

const CONSTANTS = {
  BASE_PARTICLE_COUNT: 7000,
  MAX_DISTANCE: 240,
  FORCE_MULTIPLIER: 60,
  RETURN_SPEED: 0.1,
  ALPHA_THRESHOLD: 128,
  MAX_ATTEMPTS: 100,
  REFERENCE_RESOLUTION: { width: 1920, height: 1080 },
  MOBILE_BREAKPOINT: 768,
  FONT_SIZE: { mobile: 60, desktop: 120 }
} as const

export default function LexiaLogoParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isTouchingRef = useRef(false)
  const animationFrameRef = useRef<number>()
  const [isMobile, setIsMobile] = useState(false)

  const updateCanvasSize = useCallback((canvas: HTMLCanvasElement) => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    setIsMobile(window.innerWidth < CONSTANTS.MOBILE_BREAKPOINT)
  }, [])

  const createTextImage = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const fontSize = isMobile ? CONSTANTS.FONT_SIZE.mobile : CONSTANTS.FONT_SIZE.desktop
    
    ctx.save()
    ctx.font = `bold ${fontSize}px sans-serif`
    ctx.fillStyle = "white"
    
    const text = "LEXIA"
    const textWidth = ctx.measureText(text).width
    const x = (canvas.width - textWidth) / 2
    const y = (canvas.height - fontSize) / 2 + fontSize
    
    ctx.fillText(text, x, y)
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    ctx.restore()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    return imageData
  }, [isMobile])

  const calculateParticleCount = useCallback((canvas: HTMLCanvasElement) => {
    const { width, height } = CONSTANTS.REFERENCE_RESOLUTION
    return Math.floor(
      CONSTANTS.BASE_PARTICLE_COUNT * Math.sqrt((canvas.width * canvas.height) / (width * height))
    )
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    updateCanvasSize(canvas)

    let particles: Particle[] = []
    let textImageData: ImageData | null = null

    const createParticle = (): Particle | null => {
      if (!textImageData) return null

      const data = textImageData.data

      for (let attempt = 0; attempt < CONSTANTS.MAX_ATTEMPTS; attempt++) {
        const x = Math.floor(Math.random() * canvas.width)
        const y = Math.floor(Math.random() * canvas.height)
        const index = (y * canvas.width + x) * 4

        if (data[index + 3] > CONSTANTS.ALPHA_THRESHOLD) {
          return {
            x,
            y,
            baseX: x,
            baseY: y,
            size: Math.random() * 1 + 0.5,
            color: "white",
            life: Math.random() * 100 + 50,
          }
        }
      }
      return null
    }

    const createInitialParticles = () => {
      const particleCount = calculateParticleCount(canvas)
      particles = []
      for (let i = 0; i < particleCount; i++) {
        const particle = createParticle()
        if (particle) particles.push(particle)
      }
    }

    const initializeCanvas = () => {
      textImageData = createTextImage(ctx, canvas)
      createInitialParticles()
    }

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const { x: mouseX, y: mouseY } = mousePositionRef.current
      const isInteracting = isTouchingRef.current || !("ontouchstart" in window)

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Apply mouse interaction
        if (distance < CONSTANTS.MAX_DISTANCE && isInteracting) {
          const force = (CONSTANTS.MAX_DISTANCE - distance) / CONSTANTS.MAX_DISTANCE
          const angle = Math.atan2(dy, dx)
          const moveX = Math.cos(angle) * force * CONSTANTS.FORCE_MULTIPLIER
          const moveY = Math.sin(angle) * force * CONSTANTS.FORCE_MULTIPLIER
          p.x = p.baseX - moveX
          p.y = p.baseY - moveY
        } else {
          // Return to base position
          p.x += (p.baseX - p.x) * CONSTANTS.RETURN_SPEED
          p.y += (p.baseY - p.y) * CONSTANTS.RETURN_SPEED
        }

        // Draw particle
        ctx.fillStyle = p.color
        ctx.fillRect(p.x, p.y, p.size, p.size)

        // Handle particle lifecycle
        p.life--
        if (p.life <= 0) {
          const newParticle = createParticle()
          if (newParticle) {
            particles[i] = newParticle
          } else {
            particles.splice(i, 1)
          }
        }
      }

      // Maintain target particle count
      const targetCount = calculateParticleCount(canvas)
      while (particles.length < targetCount) {
        const newParticle = createParticle()
        if (newParticle) particles.push(newParticle)
        else break
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Event handlers
    const handleResize = () => {
      updateCanvasSize(canvas)
      initializeCanvas()
    }

    const handleMove = (x: number, y: number) => {
      mousePositionRef.current = { x, y }
    }

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY)
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault()
        handleMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const handleTouchStart = () => {
      isTouchingRef.current = true
    }

    const handleTouchEnd = () => {
      isTouchingRef.current = false
      mousePositionRef.current = { x: 0, y: 0 }
    }

    const handleMouseLeave = () => {
      if (!("ontouchstart" in window)) {
        mousePositionRef.current = { x: 0, y: 0 }
      }
    }

    // Initialize and start animation
    initializeCanvas()
    animate()

    // Add event listeners
    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false })
    canvas.addEventListener("mouseleave", handleMouseLeave)
    canvas.addEventListener("touchstart", handleTouchStart)
    canvas.addEventListener("touchend", handleTouchEnd)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("touchmove", handleTouchMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      canvas.removeEventListener("touchstart", handleTouchStart)
      canvas.removeEventListener("touchend", handleTouchEnd)
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isMobile])

  return (
    <div className="relative w-full h-dvh flex flex-col items-center justify-center bg-black">
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute top-0 left-0 touch-none"
        aria-label="Interactive particle effect with LEXIA logo"
      />
    </div>
  )
}
