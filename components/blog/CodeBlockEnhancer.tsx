"use client"

import React, { useEffect, useRef, useState } from "react"
import { Check, Copy } from "lucide-react"

type CodeBlockEnhancerProps = {
  html: string
  className?: string
}

export default function CodeBlockEnhancer({ html, className = "" }: CodeBlockEnhancerProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    // すべてのコードブロックを取得
    const codeBlocks = contentRef.current.querySelectorAll("pre")

    codeBlocks.forEach((pre) => {
      // すでに処理済みの場合はスキップ
      if (pre.querySelector(".copy-button")) return

      // コードブロックを relative にする
      pre.style.position = "relative"

      // コードの内容を取得
      const code = pre.querySelector("code")
      const codeText = code?.textContent || pre.textContent || ""

      // 言語を検出（class="language-xxx" から）
      let language = "text"
      if (code?.className) {
        const match = code.className.match(/language-(\w+)/)
        if (match) {
          language = match[1]
        }
      }

      // 言語ラベルを追加
      const langLabel = document.createElement("div")
      langLabel.className =
        "absolute top-2 left-3 text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide"
      langLabel.textContent = language
      pre.appendChild(langLabel)

      // コピーボタンを作成
      const copyButton = document.createElement("button")
      copyButton.className =
        "copy-button absolute top-2 right-2 p-2 rounded-md bg-neutral-700 hover:bg-neutral-600 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white transition-colors duration-200 opacity-0 group-hover:opacity-100"
      copyButton.setAttribute("aria-label", "コードをコピー")
      copyButton.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      `

      // コピー機能
      copyButton.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(codeText)
          
          // チェックマークに変更
          copyButton.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          `
          copyButton.classList.add("bg-green-600", "dark:bg-green-700")
          
          // 2秒後に元に戻す
          setTimeout(() => {
            copyButton.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            `
            copyButton.classList.remove("bg-green-600", "dark:bg-green-700")
          }, 2000)
        } catch (err) {
          console.error("Failed to copy code:", err)
        }
      })

      pre.appendChild(copyButton)
      pre.classList.add("group")

      // シンタックスハイライト用のスタイルを適用
      if (code) {
        // 基本的な色分け（言語に応じた簡易ハイライト）
        applyBasicSyntaxHighlight(code, language)
      }
    })
  }, [html])

  return (
    <div
      ref={contentRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

// 簡易シンタックスハイライト（外部ライブラリなしで基本的な色分け）
function applyBasicSyntaxHighlight(codeElement: HTMLElement, language: string) {
  const code = codeElement.textContent || ""
  
  // JavaScript/TypeScript用の基本的なハイライト
  if (["javascript", "typescript", "js", "ts", "jsx", "tsx"].includes(language)) {
    const keywords = /\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|try|catch|throw|new|this|typeof|instanceof)\b/g
    const strings = /(".*?"|'.*?'|`.*?`)/g
    const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm
    const numbers = /\b(\d+)\b/g

    let highlighted = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")

    highlighted = highlighted
      .replace(comments, '<span class="text-green-600 dark:text-green-400">$1</span>')
      .replace(strings, '<span class="text-amber-600 dark:text-amber-400">$1</span>')
      .replace(keywords, '<span class="text-purple-600 dark:text-purple-400 font-semibold">$1</span>')
      .replace(numbers, '<span class="text-blue-600 dark:text-blue-400">$1</span>')

    codeElement.innerHTML = highlighted
  }
  // その他の言語も追加可能
}
