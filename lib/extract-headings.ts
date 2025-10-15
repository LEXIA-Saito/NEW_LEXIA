import { generateHeadingId } from "./heading-id"
import type { BlogHeading } from "./blog-posts.types"

/**
 * テキストエリア（改行区切り）から見出しリストを解析
 * フォーマット: "見出しテキスト" または "## 見出しテキスト" (レベル指定)
 * @param headingsText 改行区切りの見出しテキスト
 * @returns 見出しの配列（ID付き）
 */
export function parseHeadingsText(headingsText: string): Array<BlogHeading & { id: string }> {
  if (!headingsText || headingsText.trim().length === 0) {
    return []
  }

  const headingCounts = new Map<string, number>()

  return headingsText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      // "## 見出し" 形式の場合はレベルを抽出
      const hashMatch = line.match(/^(#{2,6})\s+(.+)$/)
      let text: string
      let level: 2 | 3 | 4 | 5 | 6

      if (hashMatch) {
        level = hashMatch[1].length as 2 | 3 | 4 | 5 | 6
        text = hashMatch[2].trim()
      } else {
        // レベル指定なしの場合はh2として扱う
        text = line
        level = 2
      }

      // ユニークなIDを生成
      const baseId = generateHeadingId(text)
      const count = headingCounts.get(baseId) ?? 0
      const uniqueId = count === 0 ? baseId : `${baseId}-${count + 1}`
      headingCounts.set(baseId, count + 1)

      return { text, level, id: uniqueId }
    })
}

/**
 * HTMLから見出しを自動抽出してID付きの配列を生成
 * @param html HTML文字列
 * @returns 見出しの配列（ID付き）
 */
export function extractHeadingsFromHtml(html: string): Array<BlogHeading & { id: string }> {
  if (!html) {
    return []
  }

  const headingCounts = new Map<string, number>()
  const headings: Array<BlogHeading & { id: string }> = []

  // h2〜h6タグを順番に抽出
  const headingRegex = /<h([2-6])(?![^>]*\sid=)[^>]*>(.*?)<\/h\1>/gi
  let match

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1]) as 2 | 3 | 4 | 5 | 6
    // HTMLタグを除去してテキストのみ抽出
    const text = match[2].replace(/<[^>]+>/g, '').trim()

    if (!text) continue

    // ユニークなIDを生成
    const baseId = generateHeadingId(text)
    const count = headingCounts.get(baseId) ?? 0
    const uniqueId = count === 0 ? baseId : `${baseId}-${count + 1}`
    headingCounts.set(baseId, count + 1)

    headings.push({ text, level, id: uniqueId })
  }

  return headings
}

/**
 * HTMLの見出しにID属性を追加（正規表現ベース）
 * @param html 元のHTML
 * @param headings 見出し情報（ID付き）
 * @returns ID属性が追加されたHTML
 */
export function addIdsToHeadings(
  html: string,
  headings: Array<BlogHeading & { id: string }>
): string {
  if (!html || headings.length === 0) {
    return html
  }

  let result = html
  let headingIndex = 0
  
  // h2〜h6タグを順番に探してIDを付与
  result = result.replace(/<h([2-6])(?![^>]*\sid=)([^>]*)>(.*?)<\/h\1>/gi, (match, level, attrs, content) => {
    if (headingIndex >= headings.length) {
      return match // 見出しリストを超えた場合はそのまま
    }
    
    const heading = headings[headingIndex]
    
    // レベルが一致する場合のみIDを付与
    if (parseInt(level) === heading.level) {
      headingIndex++
      return `<h${level}${attrs} id="${heading.id}">${content}</h${level}>`
    }
    
    return match
  })

  return result
}
