// NOTE: This file is intentionally free of any React / client-only imports
// so it can be used safely from both Server and Client Components.
// Heading text -> stable fragment id generator.
export function generateHeadingId(heading: string): string {
  // 日本語を含む文字列を英数字のみのIDに変換
  // 方法: Base64エンコード後、URL-safeな形式に変換
  const base64 = typeof window !== 'undefined' 
    ? btoa(unescape(encodeURIComponent(heading.trim())))
    : Buffer.from(heading.trim(), 'utf-8').toString('base64')
  
  // Base64のURL-safe変換（+→-, /→_, =を削除）
  return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
    .toLowerCase()
    .slice(0, 32) // 長さを制限
}

// If a heading somehow results in an empty id (very uncommon), produce a safe fallback.
export function generateHeadingIdWithFallback(heading: string, fallbackSeed = ""): string {
  const id = generateHeadingId(heading)
  if (id && id.length > 0) return id
  // fallback: use encoded heading or seed
  const encoded = encodeURIComponent(heading).replace(/%/g, "-").slice(0, 64)
  return (fallbackSeed ? `${fallbackSeed}-` : "") + (encoded || `h-${Math.random().toString(36).slice(2,8)}`)
}
