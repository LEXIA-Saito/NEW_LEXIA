"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Instagram, Linkedin, Share2, Phone, Mail } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LOGO_URL, LOGO_WHITE_URL, LOGO_TEXT_URL, LOGO_TEXT_WHITE_URL } from "@/lib/config"

// Japanese navigation items
export const navItems = [
  {
    name: "事業概要",
    href: "/company",
    subItems: [
      { name: "ミッション＆バリュー", href: "/company#mission" },
      { name: "LEXIA Principles", href: "/company#principles" },
      { name: "事業情報", href: "/company#data" },
      { name: "LEXIAの強み", href: "/company#strengths" },
      { name: "代表＆チーム", href: "/company#team" },
      { name: "実績", href: "/company#achievements" },
      { name: "FAQ", href: "/company#faq" },
      { name: "アクセス", href: "/company#access" },
    ],
  },
  {
    name: "サービス一覧",
    href: "/services",
    subItems: [
      { name: "制作工程", href: "/company/process" },
      { name: "WEB制作", href: "/services/web" },
      { name: "デザイン制作", href: "/services/design" },
      { name: "システム開発", href: "/services/system" },
      { name: "動画制作", href: "/services/movie" },
      { name: "PC教室", href: "/services/pc" },
    ],
  },
  {
    name: "料金詳細",
    href: "/pricing",
    subItems: [{ name: "料金シミュレーション", href: "/pricing" }],
  },
  { name: "制作実績", href: "/projects", subItems: [] },
  {
    name: "チーム",
    href: "/team",
    subItems: [
      { name: "齋藤雅人", href: "/team/masato-saito" },
      { name: "齋藤李保", href: "/team/riho-saito" },
      { name: "アシスタント", href: "/team/assistant" },
    ],
  },
  { name: "お問い合わせ", href: "/contact", subItems: [] },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [snsOpen, setSnsOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  // GA4 event helper (fires only if gtag exists)
  const gaEvent = (name: string, params: Record<string, any> = {}) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", name, params)
    }
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  // Map route paths to homepage section ids for active indicator sync
  const routeToSection: Record<string, string> = {
    "/projects": "work",
    "/pricing": "pricing",
    "/contact": "contact",
    "/team": "team",
    "/services": "services",
  }

  const getSectionFromHref = (href: string) => {
    if (!href) return null
    if (href.startsWith("#")) return href.substring(1)
    return routeToSection[href] || null
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      // Determine active section based on scroll position
      const sections = ["contact", "team", "work", "pricing", "services", "about", "hero"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Update CSS variable with current header height
  useEffect(() => {
    const updateHeight = () => {
      const height = headerRef.current?.offsetHeight || 0
      document.documentElement.style.setProperty("--header-height", `${height}px`)
    }

    updateHeight()

    const resizeObserver = new ResizeObserver(updateHeight)
    if (headerRef.current) resizeObserver.observe(headerRef.current)
    window.addEventListener("resize", updateHeight)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", updateHeight)
    }
  }, [isScrolled])

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If we're not on the homepage and the link is an anchor, navigate to home first
    if (typeof window !== "undefined" && !window.location.pathname.match(/^\/$|^\/index$/)) {
      if (href.startsWith("#")) {
        e.preventDefault()
        window.location.href = `/${href}`
      }
    }

    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false)
    }
  }

  

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-50"
        onMouseEnter={() => setMegaMenuOpen(true)}
        onMouseLeave={() => setMegaMenuOpen(false)}
      >
        <motion.header
          ref={headerRef}
          className={`transition-all duration-300 ${
            isScrolled
              ? "bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-sm py-3"
              : "bg-transparent py-5"
          }`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Link href="/" className="flex items-center" aria-label="LEXIA">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center">
                  <Image
                    src={LOGO_URL || "/placeholder.svg"}
                    alt="LEXIA"
                    width={120}
                    height={24}
                    className="h-6 w-auto block dark:hidden"
                    priority
                    fetchPriority="high"
                  />
                  <Image
                    src={LOGO_TEXT_URL || "/placeholder.svg"}
                    alt="LEXIA text"
                    width={120}
                    height={24}
                    className="h-6 w-auto ml-2 block dark:hidden"
                    priority
                    fetchPriority="high"
                  />
                  <Image
                    src={LOGO_WHITE_URL || "/placeholder.svg"}
                    alt="LEXIA"
                    width={120}
                    height={24}
                    className="h-6 w-auto hidden dark:block"
                    priority
                    fetchPriority="high"
                  />
                  <Image
                    src={LOGO_TEXT_WHITE_URL || "/placeholder.svg"}
                    alt="LEXIA text"
                    width={120}
                    height={24}
                    className="h-6 w-auto ml-2 hidden dark:block"
                    priority
                    fetchPriority="high"
                  />
                </div>
              </motion.div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <nav>
                <ul className="flex space-x-8">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                  <Link
                    href={item.href}
                    className={`text-sm transition-colors relative ${
                          activeSection === getSectionFromHref(item.href)
                            ? "text-neutral-900 dark:text-neutral-100"
                            : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                        }`}
                    onClick={(e) => handleNavigation(e, item.href)}
                  >
                    {item.name}
                    {activeSection === getSectionFromHref(item.href) && (
                      <motion.span
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neutral-900 dark:bg-neutral-100"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.8 }}
              >
                <ThemeToggle />
              </motion.div>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.9 }}
                className="relative"
                onClick={() => setSnsOpen((prev) => !prev)}
                aria-label="SNS"
              >
                <Share2
                  className={`h-5 w-5 transition-colors ${
                    snsOpen
                      ? "text-neutral-900 dark:text-neutral-100"
                      : "text-neutral-500 dark:text-neutral-400"
                  }`}
                />
                <div
                  className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 ${
                    snsOpen ? "flex" : "hidden"
                  } space-x-2`}
                >
                  <a
                    href="https://www.instagram.com/lexia_web/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/lexia-saito/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </motion.button>
            </div>

            <div className="flex items-center space-x-4 md:hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <ThemeToggle />
              </motion.div>
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                href="https://www.instagram.com/lexia_web/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                href="tel:+819017423456"
                aria-label="今すぐ電話"
                className="text-neutral-900 dark:text-neutral-100"
                onClick={() => gaEvent("tel_click", { location: "header", phone: "09017423456" })}
              >
                <Phone className="h-5 w-5" />
              </motion.a>
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.55 }}
                href="/contact"
                aria-label="お問い合わせ"
                className="text-neutral-900 dark:text-neutral-100"
                onClick={() => gaEvent("contact_click", { location: "header", type: "form" })}
              >
                <Mail className="h-5 w-5" />
              </motion.a>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="text-neutral-900 dark:text-neutral-100"
                onClick={() => {
                  setMobileMenuOpen(true)
                  gaEvent("menu_open", { location: "header" })
                }}
                aria-label="メニューを開く"
              >
                <Menu />
              </motion.button>
            </div>
          </div>
        </motion.header>

        <AnimatePresence>
          {megaMenuOpen && (
            <motion.div
              className="hidden md:block bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="container mx-auto px-4 py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
                {navItems.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="font-medium text-neutral-900 dark:text-neutral-100 hover:underline"
                    >
                      {item.name}
                    </Link>
                    {item.subItems && item.subItems.length > 0 && (
                      <ul className="mt-2 space-y-2">
                        {item.subItems.map((sub) => (
                          <li key={sub.name}>
                            <Link
                              href={sub.href}
                              className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white dark:bg-neutral-900 z-50 md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex justify-end p-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  gaEvent("menu_close", { location: "drawer" })
                }}
                className="text-neutral-900 dark:text-neutral-100"
                aria-label="メニューを閉じる"
              >
                <X />
              </button>
            </div>

            <nav className="flex flex-col items-center justify-between h-full pt-4 pb-28">
              {/* Logo + Tagline */}
              <div className="flex flex-col items-center px-6">
                <div className="flex items-center">
                  <Image
                    src={LOGO_URL || "/placeholder.svg"}
                    alt="LEXIA"
                    width={140}
                    height={28}
                    className="h-7 w-auto block dark:hidden"
                  />
                  <Image
                    src={LOGO_TEXT_URL || "/placeholder.svg"}
                    alt="LEXIA text"
                    width={140}
                    height={28}
                    className="h-7 w-auto ml-2 block dark:hidden"
                  />
                  <Image
                    src={LOGO_WHITE_URL || "/placeholder.svg"}
                    alt="LEXIA"
                    width={140}
                    height={28}
                    className="h-7 w-auto hidden dark:block"
                  />
                  <Image
                    src={LOGO_TEXT_WHITE_URL || "/placeholder.svg"}
                    alt="LEXIA text"
                    width={140}
                    height={28}
                    className="h-7 w-auto ml-2 hidden dark:block"
                  />
                </div>
                <p className="mt-4 text-base text-neutral-600 dark:text-neutral-400 text-center px-2">
                  価値を伝わるカタチに
                </p>
              </div>

              {/* Navigation */}
              <ul className="space-y-8 text-center mt-8">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <Link
                      href={item.href}
                      className={`text-2xl font-light ${
                        activeSection === getSectionFromHref(item.href)
                          ? "text-neutral-900 dark:text-neutral-100"
                          : "text-neutral-500 dark:text-neutral-400"
                      }`}
                      onClick={(e) => {
                        gaEvent("nav_click", { item: item.name, href: item.href, location: "mobile_menu" })
                        handleNavigation(e, item.href)
                      }}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* SNS */}
              <div className="mt-8">
                <Link
                  href="https://www.instagram.com/lexia_web/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                >
                  <Instagram className="h-6 w-6" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/lexia-saito/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="ml-4 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                >
                  <Linkedin className="h-6 w-6" />
                </Link>
              </div>
            </nav>

            {/* Bottom fixed CTA bar */}
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-neutral-900/60">
              <div className="container mx-auto px-4 py-3 flex gap-3 items-center" style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 12px)" }}>
                <a
                  href="tel:+819017423456"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 py-3 text-base text-neutral-900 dark:text-neutral-100"
                  aria-label="今すぐ電話する"
                  onClick={() => gaEvent("tel_click", { location: "drawer_bottom", phone: "09017423456" })}
                >
                  <Phone className="h-5 w-5" /> 今すぐ電話
                </a>
                <Link
                  href="/contact"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 py-3 text-base"
                  aria-label="お問い合わせ"
                  onClick={() => gaEvent("contact_click", { location: "drawer_bottom", type: "form" })}
                >
                  <Mail className="h-5 w-5" /> お問い合わせ
                </Link>
              </div>
              <div className="container mx-auto px-4 pb-3 -mt-2 text-center">
                <a
                  href="mailto:lexia0web@gmail.com"
                  className="text-sm text-neutral-500 dark:text-neutral-400 underline"
                  onClick={() => gaEvent("contact_click", { location: "drawer_bottom", type: "email" })}
                >
                  メールで問い合わせ（lexia0web@gmail.com）
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
