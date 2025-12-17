"use client"

import React, { useEffect, useRef } from "react"

type EnhancedRichTextProps = {
  html: string
  className?: string
}

export default function EnhancedRichText({ html, className = "" }: EnhancedRichTextProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    // 1. 見出しにIDとアンカーリンクを追加
    addHeadingAnchors()

    // 2. コードブロックにコピーボタンとシンタックスハイライトを追加
    enhanceCodeBlocks()

    // 3. ページロード時のハッシュスクロール
    handleHashScroll()
  }, [html])

  const addHeadingAnchors = () => {
    if (!contentRef.current) return

    const headings = contentRef.current.querySelectorAll("h1, h2, h3, h4, h5, h6")

    headings.forEach((heading, index) => {
      const text = heading.textContent || ""

      // IDを生成または使用
      if (!heading.id) {
        const id = `heading-${index}-${text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .substring(0, 50)}`
        heading.id = id
      }

      // アンカーリンクボタンを追加
      if (!heading.querySelector(".heading-anchor")) {
        heading.classList.add("group", "relative", "scroll-mt-24")

        const anchorLink = document.createElement("a")
        anchorLink.href = `#${heading.id}`
        anchorLink.className =
          "heading-anchor absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-neutral-400 hover:text-neutral-600 dark:text-neutral-600 dark:hover:text-neutral-400 no-underline"
        anchorLink.setAttribute("aria-label", `${text}へのリンク`)
        anchorLink.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`

        anchorLink.addEventListener("click", (e) => {
          e.preventDefault()
          heading.scrollIntoView({ behavior: "smooth", block: "start" })
          window.history.pushState(null, "", `#${heading.id}`)
          
          // 一時的にハイライト
          heading.classList.add("bg-yellow-100", "dark:bg-yellow-900/20", "transition-colors", "duration-300")
          setTimeout(() => {
            heading.classList.remove("bg-yellow-100", "dark:bg-yellow-900/20")
          }, 2000)
        })

        heading.style.position = "relative"
        heading.insertBefore(anchorLink, heading.firstChild)
      }
    })
  }

  const enhanceCodeBlocks = () => {
    if (!contentRef.current) return

    const codeBlocks = contentRef.current.querySelectorAll("pre")

    codeBlocks.forEach((pre) => {
      if (pre.querySelector(".copy-button")) return

      pre.style.position = "relative"
      pre.style.paddingTop = "2.5rem"

      const code = pre.querySelector("code")
      const codeText = code?.textContent || pre.textContent || ""

      // 言語を検出
      let language = "text"
      if (code?.className) {
        const match = code.className.match(/language-(\w+)/)
        if (match) {
          language = match[1]
        }
      }

      // 言語ラベル
      const langLabel = document.createElement("div")
      langLabel.className =
        "absolute top-2 left-3 text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wide select-none"
      langLabel.textContent = language
      pre.appendChild(langLabel)

      // コピーボタン
      const copyButton = document.createElement("button")
      copyButton.className =
        "copy-button absolute top-2 right-2 p-2 rounded-md bg-neutral-700 hover:bg-neutral-600 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
      copyButton.setAttribute("aria-label", "コードをコピー")
      copyButton.title = "コードをコピー"
      copyButton.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      `

      copyButton.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(codeText)

          copyButton.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          `
          copyButton.classList.add("bg-green-600", "dark:bg-green-700")
          copyButton.title = "コピーしました！"

          setTimeout(() => {
            copyButton.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            `
            copyButton.classList.remove("bg-green-600", "dark:bg-green-700")
            copyButton.title = "コードをコピー"
          }, 2000)
        } catch (err) {
          console.error("Failed to copy code:", err)
        }
      })

      pre.appendChild(copyButton)
      pre.classList.add("group")

      // シンタックスハイライト
      if (code && language !== "text") {
        applySyntaxHighlight(code, language)
      }
    })
  }

  const applySyntaxHighlight = (codeElement: HTMLElement, language: string) => {
    const code = codeElement.textContent || ""

    if (
      ["javascript", "typescript", "js", "ts", "jsx", "tsx", "json"].includes(language)
    ) {
      const keywords =
        /\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|try|catch|throw|new|this|typeof|instanceof|break|continue|switch|case|default|extends|implements|interface|type|enum|void|null|undefined|true|false)\b/g
      const strings = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/g
      const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm
      const numbers = /\b(\d+(?:\.\d+)?)\b/g
      const functions = /\b([a-zA-Z_$][\w$]*)\s*(?=\()/g

      let highlighted = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")

      highlighted = highlighted
        .replace(comments, '<span class="text-green-600 dark:text-green-400 italic">$1</span>')
        .replace(strings, '<span class="text-amber-600 dark:text-amber-400">$1</span>')
        .replace(keywords, '<span class="text-purple-600 dark:text-purple-400 font-semibold">$1</span>')
        .replace(numbers, '<span class="text-blue-600 dark:text-blue-400">$1</span>')
        .replace(functions, '<span class="text-cyan-600 dark:text-cyan-400">$1</span>')

      codeElement.innerHTML = highlighted
    } else if (["bash", "sh", "shell", "zsh"].includes(language)) {
      const commands = /^(\s*)([\w-]+)/gm
      const flags = /(\s-[\w-]+)/g
      const strings = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g
      const comments = /(#.*$)/gm

      let highlighted = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")

      highlighted = highlighted
        .replace(comments, '<span class="text-green-600 dark:text-green-400 italic">$1</span>')
        .replace(strings, '<span class="text-amber-600 dark:text-amber-400">$1</span>')
        .replace(flags, '<span class="text-purple-600 dark:text-purple-400">$1</span>')
        .replace(commands, '$1<span class="text-cyan-600 dark:text-cyan-400 font-semibold">$2</span>')

      codeElement.innerHTML = highlighted
    }
  }

  const handleHashScroll = () => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1)
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 100)
      }
    }
  }

  return (
    <div
      ref={contentRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
