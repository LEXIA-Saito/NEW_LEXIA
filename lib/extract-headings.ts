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
  
  headings.forEach((heading) => {
    // 見出しテキストをエスケープ
    const escapedText = heading.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    
    // 該当レベルの見出しタグを検索（既にID属性がない場合のみ）
    const regex = new RegExp(
      `<h${heading.level}(?![^>]*\\sid=)([^>]*)>\\s*${escapedText}\\s*</h${heading.level}>`,
      'i'
    )
    
    result = result.replace(regex, (match, attrs) => {
      return `<h${heading.level}${attrs} id="${heading.id}">${heading.text}</h${heading.level}>`
    })
  })

  return result
}
