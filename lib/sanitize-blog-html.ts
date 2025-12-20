/**
 * microCMSなどから渡されるリッチテキストHTMLを安全に整形する。
 * - scriptタグを除去してCSR/SSRの差分やCSP違反を防ぐ
 * - CSSファイルをscriptとして読み込んでしまうプレロードの記述を修正
 * - 許可されたドメインのiframe埋め込みは保持する
 */
export function sanitizeBlogHtml(rawHtml: string): string {
  if (!rawHtml) return rawHtml

  // 許可するiframeドメイン（埋め込みコンテンツ用）
  const allowedIframeDomains = [
    'www.youtube.com',
    'www.youtube-nocookie.com',
    'platform.twitter.com',
    'twitter.com',
    'x.com',
    'www.instagram.com',
    'instagram.com',
    'www.facebook.com',
    'facebook.com',
    'player.vimeo.com',
    'vimeo.com',
    'codepen.io',
    'jsfiddle.net',
    'codesandbox.io',
    'stackblitz.com',
    'speakerdeck.com',
    'www.slideshare.net',
    'docs.google.com',
    'drive.google.com',
    'maps.google.com',
    'www.google.com',
  ]

  // 1) scriptタグを全て取り除く（自己完結型も含む）
  // ただし、Twitter埋め込み用のblockquoteは保持
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

  // 3) iframeを検証して、許可されたドメイン以外は削除
  sanitized = sanitized.replace(/<iframe([^>]*)>/gi, (match, attrs) => {
    // src属性を抽出
    const srcMatch = attrs.match(/src=["']([^"']+)["']/i)
    if (!srcMatch) {
      // src属性がない場合は削除
      return ""
    }

    const src = srcMatch[1]
    
    // 許可されたドメインかチェック
    const isAllowed = allowedIframeDomains.some(domain => {
      try {
        const url = new URL(src)
        return url.hostname === domain || url.hostname.endsWith(`.${domain}`)
      } catch {
        return false
      }
    })

    if (!isAllowed) {
      console.warn(`[sanitizeBlogHtml] Blocked iframe from unauthorized domain: ${src}`)
      return ""
    }

    // 許可されたiframeはそのまま返す（sandbox属性を追加してセキュリティ強化）
    if (!attrs.includes('sandbox=')) {
      // sandbox属性を追加（セキュリティ強化）
      return `<iframe${attrs} sandbox="allow-scripts allow-same-origin allow-popups allow-presentation">`
    }
    
    return match
  })

  return sanitized
}
