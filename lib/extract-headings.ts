import { load } from "cheerio"
import { generateHeadingId } from "./heading-id"
import type { BlogHeading } from "./blog-posts.types"

/**
 * テキストエリア（改行区切り）から見出しリストを解析
 * フォーマット: "見出しテキスト" または "## 見出しテキスト" (レベル指定)
 * @param headingsText 改行区切りの見出しテキスト
 * @returns 見出しの配列
 */
export function parseHeadingsText(headingsText: string): BlogHeading[] {
  if (!headingsText || headingsText.trim().length === 0) {
    return []
  }

  return headingsText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      // "## 見出し" 形式の場合はレベルを抽出
      const hashMatch = line.match(/^(#{2,6})\s+(.+)$/)
      if (hashMatch) {
        const level = hashMatch[1].length as 2 | 3 | 4 | 5 | 6
        const text = hashMatch[2].trim()
        return { text, level }
      }
      // レベル指定なしの場合はh2として扱う
      return { text: line, level: 2 as const }
    })
}

/**
 * HTMLから見出し（h2-h6）を抽出
 * @param html HTMLコンテンツ
 * @returns 見出しの配列
 */
export function extractHeadingsFromHtml(html: string): Array<BlogHeading & { id: string }> {
  if (!html || html.trim().length === 0) {
    return []
  }

  try {
    const $ = load(html)
    const headings: Array<BlogHeading & { id: string }> = []
    const headingCounts = new Map<string, number>()

    // h2-h6タグを順番に抽出
    $("h2, h3, h4, h5, h6").each((_, element) => {
      const $el = $(element)
      const text = $el.text().trim()
      const tagName = element.tagName.toLowerCase()
      const level = parseInt(tagName[1]) as 2 | 3 | 4 | 5 | 6

      if (text.length === 0) {
        return // 空の見出しはスキップ
      }

      // ユニークなIDを生成
      const baseId = generateHeadingId(text)
      const count = headingCounts.get(baseId) ?? 0
      const uniqueId = count === 0 ? baseId : `${baseId}-${count + 1}`
      headingCounts.set(baseId, count + 1)

      headings.push({
        text,
        level,
        id: uniqueId,
      })
    })

    return headings
  } catch (error) {
    console.error("[extractHeadingsFromHtml] Failed to parse HTML:", error)
    return []
  }
}

/**
 * HTMLの見出しにID属性を追加
 * @param html 元のHTML
 * @param headings 見出し情報（テキストとレベルのみでもOK）
 * @returns ID属性が追加されたHTML
 */
export function addIdsToHeadings(
  html: string,
  headings: Array<BlogHeading>
): string {
  if (!html || headings.length === 0) {
    return html
  }

  try {
    const $ = load(html)
    const headingCounts = new Map<string, number>()

    // 見出しごとにIDを生成してマッピング
    const headingIds = headings.map((heading) => {
      const baseId = generateHeadingId(heading.text)
      const count = headingCounts.get(baseId) ?? 0
      const uniqueId = count === 0 ? baseId : `${baseId}-${count + 1}`
      headingCounts.set(baseId, count + 1)
      return uniqueId
    })

    let headingIndex = 0

    // h2-h6タグにIDを追加
    $("h2, h3, h4, h5, h6").each((_, element) => {
      const $el = $(element)
      
      // すでにID属性がある場合はスキップ
      if ($el.attr("id")) {
        return
      }

      // 対応する見出し情報からIDを取得
      if (headingIndex < headingIds.length) {
        $el.attr("id", headingIds[headingIndex])
        headingIndex++
      }
    })

    return $.html()
  } catch (error) {
    console.error("[addIdsToHeadings] Failed to add IDs:", error)
    return html
  }
}
