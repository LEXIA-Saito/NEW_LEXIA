import { parse, type HTMLElement as ParsedElement } from "node-html-parser"
import { createHighlighter, type Highlighter } from "shiki"

import { fetchOgpBatch, type OgpData } from "./fetch-ogp"

/**
 * 記事本文HTMLをサーバー側で仕上げる。
 *
 * 以前はこの加工をすべてクライアントのDOM操作でやっていたため、
 * (1) Googleには未加工のHTMLしか見えない
 * (2) 描画後に要素が差し込まれてレイアウトシフトが起きる
 * (3) OGP取得のような外部通信がブラウザ側では現実的でない
 * という問題があった。配信前に完成させることで3つとも解消する。
 */

/** Shikiに読ませる言語。ここに無い言語はプレーンテキストとして描画する */
const SUPPORTED_LANGS = [
  "javascript", "typescript", "jsx", "tsx", "json", "html", "css", "scss",
  "bash", "shell", "python", "go", "php", "sql", "yaml", "markdown", "diff",
]

/** microCMSの言語名の揺れを吸収する */
const LANG_ALIASES: Record<string, string> = {
  js: "javascript", ts: "typescript", sh: "bash", zsh: "bash", console: "bash",
  yml: "yaml", md: "markdown", py: "python", golang: "go", plaintext: "text", txt: "text",
}

/**
 * Highlighterの生成は重いのでモジュール単位で使い回す。
 * リクエストごとに作ると記事描画のたびにテーマと文法を読み直すことになる。
 */
let highlighterPromise: Promise<Highlighter> | null = null
function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: SUPPORTED_LANGS,
    })
  }
  return highlighterPromise
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

/** 見出しの装飾を除いた素のテキストを取り出す */
function plainText(el: ParsedElement): string {
  return (el.textContent || "").trim()
}

/**
 * 見出しIDを振る。
 *
 * 算出方法と採番順は components/blog/RichTextTableOfContents.tsx と完全に
 * 揃えること。目次は「IDがあればそれを使う」実装なので、ここで振ったIDが
 * そのまま目次のリンク先になる。式を変えると既存の共有リンクも切れる。
 */
function applyHeadingIds(root: ParsedElement): void {
  const headings = root.querySelectorAll("h1, h2, h3, h4, h5, h6")

  headings.forEach((heading, index) => {
    if (heading.getAttribute("id")) return

    const text = plainText(heading)
    const id = `heading-${index}-${text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 50)}`

    heading.setAttribute("id", id)
    // 目次から飛んできたとき、固定ヘッダーの下に隠れないようにする
    const cls = heading.getAttribute("class")
    heading.setAttribute("class", cls ? `${cls} scroll-mt-24` : "scroll-mt-24")
  })
}

/** 横に長い表がページごと横スクロールしてしまうのを防ぐ */
function wrapTables(root: ParsedElement): void {
  root.querySelectorAll("table").forEach((table) => {
    const parent = table.parentNode
    if (parent && (parent.getAttribute?.("data-table-wrapper") === "true")) return

    table.replaceWith(
      `<div data-table-wrapper="true" class="not-prose my-6 overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">${table.outerHTML}</div>`,
    )
  })
}

/** HTMLエンティティを実文字に戻す。&amp; は他を巻き込むので最後に処理する */
function decodeEntities(value: string): string {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#0?39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&amp;/g, "&")
}

/**
 * <pre> の中身から言語とコード本文を取り出す。
 *
 * node-html-parser は <pre> を「生テキスト要素」として扱うため、内側の
 * <code> は子要素にならず innerHTML に文字列として入る。そのため
 * querySelector では取れず、文字列として処理する必要がある。
 */
function extractCodeFromPre(pre: ParsedElement): { lang: string; code: string } {
  const rawInner = pre.innerHTML ?? ""

  // language-xxx / lang-xxx のどちらの記法にも対応する
  const classAttr = `${rawInner.slice(0, 200)} ${pre.getAttribute("class") ?? ""}`
  const rawLang = (classAttr.match(/(?:language|lang)-([\w+-]+)/)?.[1] ?? "text").toLowerCase()
  const aliased = LANG_ALIASES[rawLang] ?? rawLang

  const code = decodeEntities(
    rawInner
      .replace(/<br\s*\/?>/gi, "\n") // リッチエディタは改行を <br> で出すことがある
      .replace(/<\/?[^>]+>/g, ""), // <code> などのタグを剥がす
  )

  return {
    lang: SUPPORTED_LANGS.includes(aliased) ? aliased : "text",
    code,
  }
}

/**
 * コードブロックをシンタックスハイライト済みのHTMLに置き換える。
 *
 * 明暗2テーマ分の色をCSS変数として同時に埋め込むので、ダークモード切替時に
 * 再ハイライトは不要。
 */
async function highlightCodeBlocks(root: ParsedElement): Promise<void> {
  const pres = root.querySelectorAll("pre")
  if (pres.length === 0) return

  const highlighter = await getHighlighter()

  for (const pre of pres) {
    const { lang: finalLang, code: source } = extractCodeFromPre(pre)
    if (!source.trim()) continue

    try {
      const highlighted = highlighter.codeToHtml(source, {
        lang: finalLang,
        themes: { light: "github-light", dark: "github-dark" },
        defaultColor: false,
      })

      // 言語ラベルとコピーボタンの土台。ボタン本体はクライアント側で付ける
      pre.replaceWith(
        `<div class="not-prose group relative my-6" data-code-block="true" data-lang="${escapeHtml(finalLang)}">` +
          `<div class="flex items-center justify-between rounded-t-lg border border-b-0 border-neutral-200 bg-neutral-100 px-4 py-2 text-xs font-medium uppercase tracking-wide text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">` +
            `<span>${escapeHtml(finalLang === "text" ? "code" : finalLang)}</span>` +
          `</div>` +
          `<div class="code-block-body overflow-x-auto rounded-b-lg border border-neutral-200 dark:border-neutral-800">${highlighted}</div>` +
        `</div>`,
      )
    } catch {
      // 未知の文法などで失敗しても、元のコードブロックをそのまま残す
      continue
    }
  }
}

/** カード化の対象になりうる「単独で置かれた外部リンク」を集める */
function collectCardCandidates(
  root: ParsedElement,
  siteHost: string,
): { el: ParsedElement; url: string; compact: boolean }[] {
  const candidates: { el: ParsedElement; url: string; compact: boolean }[] = []

  root.querySelectorAll("a").forEach((a) => {
    const href = a.getAttribute("href")
    if (!href) return

    let url: URL
    try {
      url = new URL(href)
    } catch {
      return // 相対リンク・アンカーは対象外
    }
    if (url.protocol !== "https:" && url.protocol !== "http:") return
    if (url.hostname === siteHost) return // 内部リンクはカードにしない
    if (a.querySelector("img")) return // バナーリンクはそのまま

    const parent = a.parentNode as ParsedElement | null
    if (!parent) return

    const parentTag = parent.rawTagName?.toLowerCase()
    if (parentTag !== "p" && parentTag !== "li") return

    // 文中のリンクはカードにしない。段落や項目にリンク1本だけの場合が対象
    if (plainText(parent) !== plainText(a)) return
    if (parent.querySelectorAll("a").length !== 1) return

    candidates.push({
      el: a,
      url: href,
      // 参考リンクの箇条書きは件数が多くなりがちなので、リスト内は省スペース版にする
      compact: parentTag === "li",
    })
  })

  return candidates
}

function renderFullCard(ogp: OgpData): string {
  const host = new URL(ogp.url).hostname
  const image = ogp.image
    ? `<div class="hidden h-[130px] w-[200px] shrink-0 overflow-hidden bg-neutral-100 sm:block dark:bg-neutral-800">` +
        `<img src="${escapeHtml(ogp.image)}" alt="" loading="lazy" decoding="async" class="h-full w-full object-cover" />` +
      `</div>`
    : ""

  const description = ogp.description
    ? `<p class="mt-1 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">${escapeHtml(ogp.description)}</p>`
    : ""

  return (
    `<a href="${escapeHtml(ogp.url)}" target="_blank" rel="noopener noreferrer" ` +
      `class="not-prose my-6 flex items-stretch justify-between gap-0 overflow-hidden rounded-lg border border-neutral-200 no-underline transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600">` +
      `<div class="flex min-w-0 flex-1 flex-col justify-center p-4">` +
        `<div class="line-clamp-2 font-medium text-neutral-900 dark:text-neutral-100">${escapeHtml(ogp.title ?? ogp.url)}</div>` +
        description +
        `<div class="mt-2 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">` +
          `<img src="${escapeHtml(ogp.favicon ?? "")}" alt="" width="16" height="16" loading="lazy" decoding="async" class="h-4 w-4 rounded-sm" />` +
          `<span class="truncate">${escapeHtml(ogp.siteName ?? host)}</span>` +
        `</div>` +
      `</div>` +
      image +
    `</a>`
  )
}

function renderCompactCard(ogp: OgpData): string {
  const host = new URL(ogp.url).hostname
  return (
    `<a href="${escapeHtml(ogp.url)}" target="_blank" rel="noopener noreferrer" ` +
      `class="not-prose my-1 flex items-center gap-3 rounded-md border border-neutral-200 px-3 py-2 no-underline transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600">` +
      `<img src="${escapeHtml(ogp.favicon ?? "")}" alt="" width="20" height="20" loading="lazy" decoding="async" class="h-5 w-5 shrink-0 rounded-sm" />` +
      `<span class="min-w-0 flex-1 truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">${escapeHtml(ogp.title ?? ogp.url)}</span>` +
      `<span class="hidden shrink-0 text-xs text-neutral-500 sm:inline dark:text-neutral-400">${escapeHtml(host)}</span>` +
    `</a>`
  )
}

/**
 * 単独で置かれた外部リンクをOGPカードに差し替える。
 * OGPが取れなかったリンクは元のまま残すので、外部サイトの不調で
 * 記事から参照が消えることはない。
 */
async function applyLinkCards(root: ParsedElement, siteHost: string): Promise<void> {
  const candidates = collectCardCandidates(root, siteHost)
  if (candidates.length === 0) return

  const ogpMap = await fetchOgpBatch(candidates.map((c) => c.url))

  for (const candidate of candidates) {
    const ogp = ogpMap.get(candidate.url)
    if (!ogp) continue
    candidate.el.replaceWith(candidate.compact ? renderCompactCard(ogp) : renderFullCard(ogp))
  }
}

export type TransformOptions = {
  /** 自サイトのホスト名。内部リンクをカード化しないための判定に使う */
  siteHost?: string
  /** 外部通信を伴うため、プレビューなど即時性を優先したい場面では切れるようにする */
  enableLinkCards?: boolean
}

/**
 * 記事本文HTMLを配信可能な状態に仕上げる。
 * 個々の加工が失敗しても、入力HTMLをそのまま返して記事は必ず表示する。
 */
export async function transformArticleHtml(
  html: string,
  options: TransformOptions = {},
): Promise<string> {
  if (!html) return html

  const { siteHost = "lexia-hp.com", enableLinkCards = true } = options

  try {
    const root = parse(html, { comment: false })

    applyHeadingIds(root)
    wrapTables(root)
    await highlightCodeBlocks(root)
    if (enableLinkCards) {
      await applyLinkCards(root, siteHost)
    }

    return root.toString()
  } catch (error) {
    console.error("[transformArticleHtml] 変換に失敗したため元のHTMLを返します", error)
    return html
  }
}
