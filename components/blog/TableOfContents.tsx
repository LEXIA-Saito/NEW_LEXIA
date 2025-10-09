"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp } from "lucide-react"
import type { BlogPostSection } from "@/lib/blog-posts.types"
import { generateHeadingId } from "@/lib/heading-id"

type TableOfContentsProps = {
  sections: Array<BlogPostSection & { headingId?: string }>
}

export default function TableOfContents({ sections }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [activeId, setActiveId] = useState<string>("")
  const visibleHeadings = useRef(new Set<string>())

  const tocItems = sections
    .filter((section) => section.heading)
    .map((section) => ({
      heading: section.heading!,
      id: section.headingId ?? generateHeadingId(section.heading!),
    }))

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          visibleHeadings.current.add(entry.target.id)
        } else {
          visibleHeadings.current.delete(entry.target.id)
        }
      }

      let newActiveId = ""
      // Find the first visible heading from the top of the viewport
      for (const item of tocItems) {
        if (visibleHeadings.current.has(item.id)) {
          newActiveId = item.id
          break
        }
      }
      setActiveId(newActiveId)
    }

    const observer = new IntersectionObserver(callback, {
      // -120px top margin to account for sticky header
      // -60% bottom margin to focus on the top part of the screen
      rootMargin: "-120px 0px -60% 0px",
    })

    const elements = tocItems.map(item => document.getElementById(item.id)).filter(el => el)
    elements.forEach(el => observer.observe(el))

    return () => elements.forEach(el => observer.unobserve(el))
  }, [tocItems])

  return (
    <nav
      className="mb-8 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 p-6"
      aria-label="目次"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={isOpen}
      >
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          📑 目次
        </h2>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-neutral-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-neutral-500" />
        )}
      </button>

      {isOpen && (
        tocItems.length > 0 ? (
          <ol className="mt-4 space-y-2 text-sm">
            {tocItems.map((item, index) => (
              <li key={item.id}>
                <Link
                  href={`#${item.id}`}
                  className={`block py-1 transition-colors duration-200 hover:text-neutral-900 dark:hover:text-neutral-100 ${
                    activeId === item.id
                      ? "font-semibold text-neutral-900 dark:text-neutral-100"
                      : "text-neutral-600 dark:text-neutral-400"
                  }`}
                >
                  {index + 1}. {item.heading}
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">この投稿には見出しがありません。</p>
        )
      )}
    </nav>
  )
}
