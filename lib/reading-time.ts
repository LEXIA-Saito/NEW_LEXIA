import type { BlogPost } from "./blog-posts.types"

// 読了時間計算の設定
const WORDS_PER_MINUTE = 400

/**
 * テキストから単語数をカウントする
 * 英数字の連続文字列または日中韓文字1文字を1単語として計算
 */
function countWordsFromText(text: string): number {
  if (!text) return 0
  const matches = text.match(/[A-Za-z0-9]+|[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uF900-\uFAFF]/g)
  return matches ? matches.length : 0
}

/**
 * ブログ記事の読了時間を計算する
 * @param post ブログ記事データ
 * @returns 読了時間（例: "5分"）
 */
export function computeReadingTime(post: BlogPost): string {
  let totalWords = 0
  
  // タイトルと説明文も含める
  totalWords += countWordsFromText(post.title)
  totalWords += countWordsFromText(post.description)
  
  // セクションの内容を計算
  if (post.sections) {
    for (const section of post.sections) {
      if (section.heading) {
        totalWords += countWordsFromText(section.heading)
      }
      if (section.body) {
        totalWords += section.body.reduce((sum, p) => sum + countWordsFromText(p), 0)
      }
      if (section.list) {
        totalWords += section.list.reduce((sum, li) => sum + countWordsFromText(li), 0)
      }
      if (section.table) {
        totalWords += section.table.headers.reduce((sum, h) => sum + countWordsFromText(h), 0)
        for (const row of section.table.rows) {
          totalWords += row.reduce((sum, cell) => sum + countWordsFromText(cell), 0)
        }
      }
    }
  }
  
  // contentHtmlがある場合も考慮（HTMLタグを除去して計算）
  if (post.contentHtml) {
    const textContent = post.contentHtml.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    totalWords += countWordsFromText(textContent)
  }
  
  const minutes = Math.max(1, Math.ceil(totalWords / WORDS_PER_MINUTE))
  return `${minutes}分`
}

/**
 * ブログ記事に計算された読了時間を追加する
 * @param post 元のブログ記事データ
 * @returns 読了時間が計算されたブログ記事データ
 */
export function withComputedReadingTime(post: BlogPost): BlogPost & { readingTime: string } {
  return { ...post, readingTime: computeReadingTime(post) }
}