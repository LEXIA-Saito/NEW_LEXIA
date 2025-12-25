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

    try {
      // 1. 見出しにIDとアンカーリンクを追加
      addHeadingAnchors()

      // 2. コードブロックにコピーボタンとシンタックスハイライトを追加
      enhanceCodeBlocks()

      // 3. テーブルをレスポンシブラッパーで囲む
      wrapTablesForResponsive()

      // 4. 埋め込みコンテンツを処理（Twitter/Instagram/Facebook）
      processEmbeds()

      // 5. ページロード時のハッシュスクロール
      handleHashScroll()
    } catch (error) {
      console.error("EnhancedRichText: Error applying enhancements", error)
    }
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
      pre.style.paddingTop = "2.75rem"

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

      // Header container for language label and copy button
      const headerBar = document.createElement("div")
      headerBar.className =
        "absolute top-0 left-0 right-0 flex items-center justify-between px-3 py-2 border-b border-neutral-700 dark:border-neutral-600 bg-neutral-800/50 dark:bg-neutral-900/50 backdrop-blur-sm rounded-t-lg"
      
      // 言語ラベル with icon
      const langLabel = document.createElement("div")
      langLabel.className =
        "flex items-center gap-2 text-xs font-medium text-neutral-300 dark:text-neutral-400 uppercase tracking-wider select-none"
      
      // Language icon (generic code icon)
      const langIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`
      langLabel.innerHTML = `${langIcon}<span>${language}</span>`
      
      headerBar.appendChild(langLabel)

      // コピーボタン
      const copyButton = document.createElement("button")
      copyButton.className =
        "copy-button flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-neutral-700/70 hover:bg-neutral-600 dark:bg-neutral-800/70 dark:hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition-all duration-200 opacity-70 hover:opacity-100 focus:opacity-100"
      copyButton.setAttribute("aria-label", "コードをコピー")
      copyButton.title = "コードをコピー"
      copyButton.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <span>Copy</span>
      `

      copyButton.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(codeText)

          copyButton.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Copied!</span>
          `
          copyButton.classList.add("bg-green-600", "dark:bg-green-700", "hover:bg-green-600")
          copyButton.title = "コピーしました！"

          setTimeout(() => {
            copyButton.innerHTML = `
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span>Copy</span>
            `
            copyButton.classList.remove("bg-green-600", "dark:bg-green-700", "hover:bg-green-600")
            copyButton.title = "コードをコピー"
          }, 2000)
        } catch (err) {
          console.error("Failed to copy code:", err)
        }
      })

      headerBar.appendChild(copyButton)
      pre.appendChild(headerBar)
      pre.classList.add("group")

      // シンタックスハイライト
      if (code && language !== "text") {
        applySyntaxHighlight(code, language)
      }
    })
  }

  const applySyntaxHighlight = (codeElement: HTMLElement, language: string) => {
    const code = codeElement.textContent || ""

    // Escape HTML entities
    const escapeHtml = (text: string) => 
      text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")

    if (
      ["javascript", "typescript", "js", "ts", "jsx", "tsx"].includes(language)
    ) {
      const keywords =
        /\b(const|let|var|function|return|if|else|for|while|do|class|import|export|from|as|default|async|await|try|catch|finally|throw|new|this|super|typeof|instanceof|break|continue|switch|case|extends|implements|interface|type|enum|void|null|undefined|true|false|static|public|private|protected|readonly|get|set|constructor)\b/g
      const strings = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/g
      const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm
      const numbers = /\b(\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/g
      const functions = /\b([a-zA-Z_$][\w$]*)\s*(?=\()/g
      const properties = /\.([a-zA-Z_$][\w$]*)/g

      let highlighted = escapeHtml(code)

      highlighted = highlighted
        .replace(comments, '<span class="token-comment">$1</span>')
        .replace(strings, '<span class="token-string">$1</span>')
        .replace(keywords, '<span class="token-keyword">$1</span>')
        .replace(numbers, '<span class="token-number">$1</span>')
        .replace(functions, '<span class="token-function">$1</span>')
        .replace(properties, '.<span class="token-property">$1</span>')

      codeElement.innerHTML = highlighted
    } else if (["bash", "sh", "shell", "zsh", "terminal"].includes(language)) {
      // Common shell commands to highlight
      const commonCommands = [
        "sudo", "npm", "yarn", "pnpm", "git", "docker", "kubectl",
        "cd", "ls", "mkdir", "rm", "cp", "mv", "cat", "echo",
        "curl", "wget", "grep", "sed", "awk", "chmod", "chown",
        "find", "ps", "kill", "top", "htop", "vim", "nano",
        "code", "brew", "apt", "yum", "dnf", "pacman",
        "systemctl", "service", "export", "source", "alias"
      ]
      const commandPattern = `^(\\s*)(${commonCommands.join("|")}|[\\w-]+)`
      const commands = new RegExp(commandPattern, "gm")
      const flags = /(\s-{1,2}[\w-]+)/g
      const strings = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g
      const comments = /(#.*$)/gm
      const variables = /(\$\{?[\w_]+\}?)/g
      const pipes = /([|&;><])/g

      let highlighted = escapeHtml(code)

      highlighted = highlighted
        .replace(comments, '<span class="token-comment">$1</span>')
        .replace(strings, '<span class="token-string">$1</span>')
        .replace(variables, '<span class="token-variable">$1</span>')
        .replace(flags, '<span class="token-flag">$1</span>')
        .replace(pipes, '<span class="token-operator">$1</span>')
        .replace(commands, '$1<span class="token-command">$2</span>')

      codeElement.innerHTML = highlighted
    } else if (["python", "py"].includes(language)) {
      const keywords =
        /\b(def|class|import|from|as|if|elif|else|for|while|break|continue|return|pass|try|except|finally|raise|with|lambda|yield|async|await|True|False|None|and|or|not|in|is|del|global|nonlocal)\b/g
      const strings = /("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|r["'].*?["'])/g
      const comments = /(#.*$)/gm
      const numbers = /\b(\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/g
      const functions = /\b([a-zA-Z_][\w]*)\s*(?=\()/g
      const decorators = /(@[\w.]+)/g

      let highlighted = escapeHtml(code)

      highlighted = highlighted
        .replace(comments, '<span class="token-comment">$1</span>')
        .replace(strings, '<span class="token-string">$1</span>')
        .replace(decorators, '<span class="token-decorator">$1</span>')
        .replace(keywords, '<span class="token-keyword">$1</span>')
        .replace(numbers, '<span class="token-number">$1</span>')
        .replace(functions, '<span class="token-function">$1</span>')

      codeElement.innerHTML = highlighted
    } else if (["json"].includes(language)) {
      const properties = /"([^"]+)"(?=\s*:)/g
      const strings = /"(?:\\.|[^"\\])*"/g
      const numbers = /\b(\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/g
      const boolNull = /\b(true|false|null)\b/g

      let highlighted = escapeHtml(code)

      highlighted = highlighted
        .replace(properties, '<span class="token-property">"$1"</span>')
        .replace(strings, '<span class="token-string">$&</span>')
        .replace(numbers, '<span class="token-number">$1</span>')
        .replace(boolNull, '<span class="token-keyword">$1</span>')

      codeElement.innerHTML = highlighted
    } else if (["html", "xml", "svg"].includes(language)) {
      const tags = /(&lt;\/?)([\w-]+)([^&]*?)(\/?&gt;)/g
      const attributes = /([\w-]+)=("[^"]*"|'[^']*')/g
      const comments = /(&lt;!--[\s\S]*?--&gt;)/g

      let highlighted = escapeHtml(code)

      highlighted = highlighted
        .replace(comments, '<span class="token-comment">$1</span>')
        .replace(tags, (match, open, tagName, attrs, close) => {
          const highlightedAttrs = attrs.replace(
            attributes,
            '<span class="token-attribute">$1</span>=<span class="token-string">$2</span>'
          )
          return `<span class="token-tag">${open}${tagName}</span>${highlightedAttrs}<span class="token-tag">${close}</span>`
        })

      codeElement.innerHTML = highlighted
    } else if (["css", "scss", "sass", "less"].includes(language)) {
      const selectors = /([.#]?[\w-]+)(?=\s*\{)/g
      const properties = /([\w-]+)(?=\s*:)/g
      const values = /:\s*([^;{}]+)/g
      const comments = /(\/\*[\s\S]*?\*\/)/g
      const important = /(!important)/g

      let highlighted = escapeHtml(code)

      highlighted = highlighted
        .replace(comments, '<span class="token-comment">$1</span>')
        .replace(important, '<span class="token-important">$1</span>')
        .replace(properties, '<span class="token-property">$1</span>')
        .replace(values, ': <span class="token-value">$1</span>')
        .replace(selectors, '<span class="token-selector">$1</span>')

      codeElement.innerHTML = highlighted
    } else if (["sql"].includes(language)) {
      const keywords =
        /\b(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|TABLE|DATABASE|INDEX|VIEW|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AS|AND|OR|NOT|NULL|TRUE|FALSE|IN|BETWEEN|LIKE|ORDER BY|GROUP BY|HAVING|LIMIT|OFFSET|DISTINCT|COUNT|SUM|AVG|MAX|MIN)\b/gi
      const strings = /('(?:\\.|[^'\\])*')/g
      const comments = /(--.*$|\/\*[\s\S]*?\*\/)/gm
      const numbers = /\b(\d+(?:\.\d+)?)\b/g

      let highlighted = escapeHtml(code)

      highlighted = highlighted
        .replace(comments, '<span class="token-comment">$1</span>')
        .replace(strings, '<span class="token-string">$1</span>')
        .replace(keywords, '<span class="token-keyword">$1</span>')
        .replace(numbers, '<span class="token-number">$1</span>')

      codeElement.innerHTML = highlighted
    } else if (["go", "golang"].includes(language)) {
      const keywords =
        /\b(package|import|func|var|const|type|struct|interface|if|else|for|range|switch|case|default|return|break|continue|go|defer|select|chan|map|make|new|len|cap|append|copy|delete|true|false|nil)\b/g
      const strings = /("(?:\\.|[^"\\])*"|`[^`]*`)/g
      const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm
      const numbers = /\b(\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/g
      const functions = /\b([a-zA-Z_][\w]*)\s*(?=\()/g

      let highlighted = escapeHtml(code)

      highlighted = highlighted
        .replace(comments, '<span class="token-comment">$1</span>')
        .replace(strings, '<span class="token-string">$1</span>')
        .replace(keywords, '<span class="token-keyword">$1</span>')
        .replace(numbers, '<span class="token-number">$1</span>')
        .replace(functions, '<span class="token-function">$1</span>')

      codeElement.innerHTML = highlighted
    } else if (["rust", "rs"].includes(language)) {
      const keywords =
        /\b(fn|let|mut|const|static|if|else|match|loop|while|for|in|break|continue|return|pub|use|mod|struct|enum|trait|impl|type|where|as|crate|super|self|Self|true|false|None|Some|Ok|Err|async|await|move|ref|unsafe)\b/g
      const strings = /("(?:\\.|[^"\\])*"|r#"[^"]*"#)/g
      const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm
      const numbers = /\b(\d+(?:\.\d+)?(?:e[+-]?\d+)?[iuf]?(?:8|16|32|64|128|size)?)\b/g
      const macros = /(\w+!)/g

      let highlighted = escapeHtml(code)

      highlighted = highlighted
        .replace(comments, '<span class="token-comment">$1</span>')
        .replace(strings, '<span class="token-string">$1</span>')
        .replace(macros, '<span class="token-macro">$1</span>')
        .replace(keywords, '<span class="token-keyword">$1</span>')
        .replace(numbers, '<span class="token-number">$1</span>')

      codeElement.innerHTML = highlighted
    } else if (["markdown", "md"].includes(language)) {
      const headings = /^(#{1,6}\s+.+)$/gm
      const bold = /(\*\*|__)(.*?)\1/g
      const italic = /(\*|_)(.*?)\1/g
      const links = /(\[.*?\]\(.*?\))/g
      const codeInline = /(`[^`]+`)/g
      const lists = /^(\s*[-*+]\s+)/gm

      let highlighted = escapeHtml(code)

      highlighted = highlighted
        .replace(headings, '<span class="token-heading">$1</span>')
        .replace(bold, '$1<span class="token-bold">$2</span>$1')
        .replace(italic, '$1<span class="token-italic">$2</span>$1')
        .replace(links, '<span class="token-link">$1</span>')
        .replace(codeInline, '<span class="token-code">$1</span>')
        .replace(lists, '<span class="token-list">$1</span>')

      codeElement.innerHTML = highlighted
    }
  }

  const wrapTablesForResponsive = () => {
    if (!contentRef.current) return

    const tables = contentRef.current.querySelectorAll("table")

    tables.forEach((table) => {
      // 既にラッパーで囲まれているかチェック
      if (table.parentElement?.classList.contains("table-wrapper")) return

      // レスポンシブラッパーを作成
      const wrapper = document.createElement("div")
      wrapper.className = "table-wrapper overflow-x-auto -mx-4 sm:mx-0 my-6"
      
      // テーブルをラッパーで囲む
      table.parentNode?.insertBefore(wrapper, table)
      wrapper.appendChild(table)
    })
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

  const processEmbeds = () => {
    if (!contentRef.current) return

    // Twitter埋め込みの処理
    const twitterEmbeds = contentRef.current.querySelectorAll('iframe[src*="twitter.com"], iframe[src*="x.com"], blockquote[class*="twitter-tweet"]')
    if (twitterEmbeds.length > 0) {
      loadTwitterWidgets()
    }

    // Instagram埋め込みの処理
    const instagramEmbeds = contentRef.current.querySelectorAll('iframe[src*="instagram.com"], blockquote[class*="instagram-media"]')
    if (instagramEmbeds.length > 0) {
      loadInstagramEmbeds()
    }

    // Facebook埋め込みの処理
    const facebookEmbeds = contentRef.current.querySelectorAll('iframe[src*="facebook.com"]')
    if (facebookEmbeds.length > 0) {
      loadFacebookSDK()
    }

    // YouTube埋め込みにレスポンシブラッパーを追加
    const youtubeIframes = contentRef.current.querySelectorAll('iframe[src*="youtube.com"], iframe[src*="youtube-nocookie.com"]')
    youtubeIframes.forEach((iframe) => {
      if (!iframe.parentElement?.classList.contains('youtube-embed-wrapper')) {
        const wrapper = document.createElement('div')
        wrapper.className = 'youtube-embed-wrapper relative w-full pt-[56.25%] my-6'
        iframe.parentNode?.insertBefore(wrapper, iframe)
        wrapper.appendChild(iframe)
        iframe.classList.add('absolute', 'top-0', 'left-0', 'w-full', 'h-full', 'rounded-lg')
      }
    })
  }

  const loadTwitterWidgets = () => {
    const scriptId = "twitter-widgets-script"
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script")
      script.id = scriptId
      script.async = true
      script.src = "https://platform.twitter.com/widgets.js"
      script.charset = "utf-8"
      document.head.appendChild(script)
    } else if (window.twttr?.widgets && contentRef.current) {
      window.twttr.widgets.load(contentRef.current)
    }
  }

  const loadInstagramEmbeds = () => {
    const scriptId = "instagram-embed-script"
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script")
      script.id = scriptId
      script.async = true
      script.src = "https://www.instagram.com/embed.js"
      document.head.appendChild(script)
    } else if (window.instgrm?.Embeds) {
      window.instgrm.Embeds.process()
    }
  }

  const loadFacebookSDK = () => {
    const scriptId = "facebook-jssdk"
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script")
      script.id = scriptId
      script.async = true
      script.defer = true
      script.crossOrigin = "anonymous"
      script.src = "https://connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v12.0"
      document.head.appendChild(script)
    } else if (window.FB?.XFBML && contentRef.current) {
      window.FB.XFBML.parse(contentRef.current)
    }
  }

  // 文字列ベースの簡易サニタイズ（DOMParserを使わない）
  // MicroCMSから配信される可能性のある不正なscriptタグなどを削除して
  // ハイドレーションエラーやappendChildエラーを防ぐ
  const sanitizedHtml = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // scriptタグを削除
    .replace(/<!\[CDATA\[(.*?)\]\]>/g, '') // CDATAセクションを削除
    .replace(/<!--(.*?)-->/g, '') // コメントを削除

  return (
    <div
      ref={contentRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  )
}

// グローバル型定義の拡張
declare global {
  interface Window {
    twttr?: {
      widgets?: {
        load: (element?: HTMLElement) => void
      }
    }
    instgrm?: {
      Embeds?: {
        process: () => void
      }
    }
    FB?: {
      XFBML?: {
        parse: (element?: HTMLElement) => void
      }
    }
  }
}
