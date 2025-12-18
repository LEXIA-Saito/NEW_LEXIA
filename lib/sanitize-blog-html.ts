/**
 * microCMSなどから渡されるリッチテキストHTMLを安全に整形する。
 * - scriptタグを除去してCSR/SSRの差分やCSP違反を防ぐ
 * - CSSファイルをscriptとして読み込んでしまうプレロードの記述を修正
 */
export function sanitizeBlogHtml(rawHtml: string): string {
  if (!rawHtml) return rawHtml

  // 1) scriptタグを全て取り除く（自己完結型も含む）
  let sanitized = rawHtml
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<script\b[^>]*\/?>/gi, "")

  // 2) 誤ってas="script"でプリロードされたCSSを修正
  sanitized = sanitized.replace(/<link([^>]*href=["'][^"']+\.css[^"']*["'][^>]*)>/gi, (match, attrs) => {
    if (!/as=["']script["']/i.test(attrs) && !/rel=["']preload["']/i.test(attrs)) {
      return match
    }

    let updated = attrs

    // as="script" を as="style" に修正
    if (/as=["']script["']/i.test(updated)) {
      updated = updated.replace(/as=["']script["']/i, 'as="style"')
    }

    // preload + CSS の場合は stylesheet として扱う
    if (/rel=["']preload["']/i.test(updated)) {
      updated = updated.replace(/rel=["']preload["']/i, 'rel="stylesheet"')
    }

    return `<link ${updated}>`
  })

  return sanitized
}
