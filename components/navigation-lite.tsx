"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

import {
  LOGO_TEXT_URL,
  LOGO_TEXT_WHITE_URL,
  LOGO_URL,
  LOGO_WHITE_URL,
} from "@/lib/config"

const defaultNavLinks = [
  { href: "/company", label: "事業概要" },
  { href: "/services", label: "サービス一覧" },
  { href: "/projects", label: "制作実績" },
  { href: "/pricing", label: "料金" },
  { href: "/blog", label: "LEXIA BLOG" },
  { href: "/contact", label: "お問い合わせ" },
]

export default function NavigationLite() {
  const pathname = usePathname()
  const blogNavLinks = [
    { href: "/blog", label: "記事一覧" },
    { href: "/blog/genres/tech", label: "技術（Tech）" },
    { href: "/blog/genres/ideas", label: "アイデア（Ideas）" },
  ] as const

  const navLinks = pathname?.startsWith("/blog") ? blogNavLinks : defaultNavLinks
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-950/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 relative">
        <Link href="/" className="flex items-center gap-3" aria-label="LEXIA">
          <Image
            src={LOGO_URL || "/placeholder.svg"}
            alt="LEXIA"
            width={120}
            height={32}
            className="h-8 w-auto dark:hidden"
            priority
          />
          <Image
            src={LOGO_TEXT_URL || "/placeholder.svg"}
            alt="LEXIA"
            width={120}
            height={24}
            className="h-6 w-auto dark:hidden"
            priority
          />
          <Image
            src={LOGO_WHITE_URL || "/placeholder.svg"}
            alt="LEXIA"
            width={120}
            height={32}
            className="hidden h-8 w-auto dark:block"
            priority
          />
          <Image
            src={LOGO_TEXT_WHITE_URL || "/placeholder.svg"}
            alt="LEXIA"
            width={120}
            height={24}
            className="hidden h-6 w-auto dark:block"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-neutral-700 dark:text-neutral-200 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-neutral-900 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white dark:border-neutral-700 dark:text-neutral-100 dark:hover:border-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-neutral-900 md:inline-flex"
          >
            無料相談
          </Link>
          {/* Mobile menu: dropdown overlays below header instead of expanding header */}
          <details className="w-full md:hidden">
            <summary className="cursor-pointer rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-900 dark:border-neutral-700 dark:text-neutral-100">
              メニュー
            </summary>
            {/* Dropdown panel positioned below header */}
            <div className="absolute left-0 right-0 top-full z-40 mx-auto max-w-6xl px-4">
              <div className="mt-2 flex flex-col gap-2 rounded-2xl border border-neutral-200 bg-white p-4 shadow-lg ring-1 ring-black/5 dark:border-neutral-800 dark:bg-neutral-900">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-2 py-1 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="rounded-lg bg-neutral-900 px-3 py-2 text-center text-sm font-semibold text-white dark:bg-neutral-100 dark:text-neutral-900"
              >
                無料相談
              </Link>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  )
}
