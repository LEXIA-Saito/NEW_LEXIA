"use client"

import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ChipProps {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
}

export function Chip({ children, className, href, onClick }: ChipProps) {
  const chipClasses = cn(
    "inline-block px-3 py-1 text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 rounded-full transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700",
    className,
  )

  if (href) {
    return (
      <Link href={href} className={chipClasses}>
        {children}
      </Link>
    )
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={chipClasses}>
        {children}
      </button>
    )
  }

  return <span className={chipClasses}>{children}</span>
}
