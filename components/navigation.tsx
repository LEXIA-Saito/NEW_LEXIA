"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Search, Instagram } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchDialog } from "@/components/search-dialog"
import { LOGO_URL, LOGO_WHITE_URL } from "@/lib/config"

// Japanese navigation items
export const navItems = [
  { name: "事業概要", href: "#about" },
  { name: "制作工程", href: "#process" },
  { name: "制作実績", href: "#work" },
  { name: "チーム", href: "#team" },
  { name: "ブログ", href: "#blog" },
  { name: "お問い合わせ", href: "#contact" },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      // Determine active section based on scroll position
      const sections = ["contact", "blog", "team", "work", "process", "about", "hero"]
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
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center" aria-label="LEXIA">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Image
                src={LOGO_URL}
                alt="LEXIA"
                width={120}
                height={24}
                className="h-6 w-auto block dark:hidden"
              />
              <Image
                src={LOGO_WHITE_URL}
                alt="LEXIA"
                width={120}
                height={24}
                className="h-6 w-auto hidden dark:block"
              />
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
                        activeSection === item.href.substring(1)
                          ? "text-neutral-900 dark:text-neutral-100"
                          : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                      }`}
                      onClick={(e) => handleNavigation(e, item.href)}
                    >
                      {item.name}
                      {activeSection === item.href.substring(1) && (
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
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              onClick={() => setSearchOpen(true)}
              className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
              aria-label="プロジェクトを検索"
            >
              <Search className="h-5 w-5" />
            </motion.button>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.8 }}>
              <ThemeToggle />
            </motion.div>
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.9 }}
              href="https://www.instagram.com/lexia_web/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </motion.a>
          </div>

          <div className="flex items-center space-x-4 md:hidden">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              onClick={() => setSearchOpen(true)}
              className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
              aria-label="プロジェクトを検索"
            >
              <Search className="h-5 w-5" />
            </motion.button>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.4 }}>
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
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="text-neutral-900 dark:text-neutral-100"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="メニューを開く"
            >
              <Menu />
            </motion.button>
          </div>
        </div>
      </motion.header>

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
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-900 dark:text-neutral-100"
                aria-label="メニューを閉じる"
              >
                <X />
              </button>
            </div>

            <nav className="flex flex-col items-center justify-center h-full">
              <ul className="space-y-8 text-center">
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
                        activeSection === item.href.substring(1)
                          ? "text-neutral-900 dark:text-neutral-100"
                          : "text-neutral-500 dark:text-neutral-400"
                      }`}
                      onClick={(e) => handleNavigation(e, item.href)}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
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
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
