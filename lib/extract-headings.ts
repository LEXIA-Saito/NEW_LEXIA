import { load } from "cheerio"
import { generateHeadingId } from "./heading-id"
import type { BlogHeading } from "./blog-posts.types"

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
 * @param headings 見出し情報（IDを含む）
 * @returns ID属性が追加されたHTML
 */
export function addIdsToHeadings(
  html: string,
  headings: Array<BlogHeading & { id: string }>
): string {
  if (!html || headings.length === 0) {
    return html
  }

  try {
    const $ = load(html)
    let headingIndex = 0

    // h2-h6タグにIDを追加
    $("h2, h3, h4, h5, h6").each((_, element) => {
      const $el = $(element)
      
      // すでにID属性がある場合はスキップ
      if ($el.attr("id")) {
        return
      }

      // 対応する見出し情報からIDを取得
      if (headingIndex < headings.length) {
        const heading = headings[headingIndex]
        $el.attr("id", heading.id)
        headingIndex++
      }
    })

    return $.html()
  } catch (error) {
    console.error("[addIdsToHeadings] Failed to add IDs:", error)
    return html
  }
}
