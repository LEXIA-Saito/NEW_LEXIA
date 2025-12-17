"use client"

import React, { useState, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

type Heading = {
  id: string
  text: string
  level: number
}

type RichTextTableOfContentsProps = {
  contentHtml: string
}

export default function RichTextTableOfContents({ contentHtml }: RichTextTableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [headings, setHeadings] = useState<Heading[]>([])

  useEffect(() => {
    // HTMLから見出しを抽出
    const parser = new DOMParser()
    const doc = parser.parseFromString(contentHtml, "text/html")
    const headingElements = doc.querySelectorAll("h1, h2, h3, h4, h5, h6")

    const extractedHeadings: Heading[] = []
    headingElements.forEach((element, index) => {
      const level = parseInt(element.tagName.substring(1))
      const text = element.textContent || ""
      
      // IDが既にある場合はそれを使用、なければ生成
      let id = element.id
      if (!id) {
        id = `heading-${index}-${text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .substring(0, 50)}`
      }

      extractedHeadings.push({ id, text, level })
    })

    setHeadings(extractedHeadings)
  }, [contentHtml])

  if (headings.length === 0) {
    return null
  }

  return (
    <nav
      className="mb-8 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 p-6 sticky top-24"
      aria-label="目次"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={isOpen}
      >
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">📑 目次</h2>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-neutral-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-neutral-500" />
        )}
      </button>

      {isOpen && (
        <ol className="mt-4 space-y-2 text-sm">
          {headings.map((heading, index) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
            >
              <a
                href={`#${heading.id}`}
                className="block py-1 text-neutral-600 transition-colors duration-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(heading.id)
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" })
                    // URLを更新
                    window.history.pushState(null, "", `#${heading.id}`)
                  }
                }}
              >
                {heading.level === 2 ? `${index + 1}. ` : ""}
                {heading.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  )
}
