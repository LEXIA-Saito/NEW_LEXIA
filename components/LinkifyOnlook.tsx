"use client"

import React from "react"

type Props = {
  text: string
  className?: string
}

/**
 * Replace plain "Onlook" text with a link to https://www.onlook.com/
 * - Matches exact word "Onlook" in Latin letters (case-sensitive)
 * - Safe for Japanese contexts like "Onlookの" as word boundary still applies
 */
export default function LinkifyOnlook({ text, className }: Props) {
  const regex = /\bOnlook\b/g
  const nodes: React.ReactNode[] = []

  let lastIndex = 0
  let i = 0
  for (const match of text.matchAll(regex)) {
    const start = match.index ?? 0
    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start))
    }
    nodes.push(
      <a
        key={`onlook-${i++}`}
        href="https://www.onlook.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={className ?? "underline underline-offset-4"}
      >
        Onlook
      </a>,
    )
    lastIndex = start + match[0].length
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  if (nodes.length === 0) return <>{text}</>
  return <>{nodes}</>
}

