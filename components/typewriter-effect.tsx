"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

function typeText(el: HTMLElement, speed = 50) {
  const text = el.textContent || ""
  el.textContent = ""
  let i = 0
  const interval = setInterval(() => {
    el.textContent += text.charAt(i)
    i++
    if (i >= text.length) {
      clearInterval(interval)
    }
  }, speed)
}

export default function TypewriterEffect() {
  const pathname = usePathname()

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("h2, .hero-title, .hero-subtitle")
    )

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.hasAttribute("data-typed")) {
            typeText(entry.target as HTMLElement)
            entry.target.setAttribute("data-typed", "true")
          }
        })
      },
      { threshold: 0.1 }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [pathname])

  return null
}
