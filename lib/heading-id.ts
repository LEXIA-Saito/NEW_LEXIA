// NOTE: This file is intentionally free of any React / client-only imports
// so it can be used safely from both Server and Client Components.
// Heading text -> stable fragment id generator.
export function generateHeadingId(heading: string): string {
  return heading
    .trim()
    .toLowerCase()
    // allow Latin letters, combining accents, and common CJK ranges (Hiragana/Katakana/Kanji)
    .replace(/[^\w\u00C0-\u024f\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uF900-\uFAFF\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "") // strip leading/trailing hyphens
}

// If a heading somehow results in an empty id (very uncommon), produce a safe fallback.
export function generateHeadingIdWithFallback(heading: string, fallbackSeed = ""): string {
  const id = generateHeadingId(heading)
  if (id && id.length > 0) return id
  // fallback: use encoded heading or seed
  const encoded = encodeURIComponent(heading).replace(/%/g, "-").slice(0, 64)
  return (fallbackSeed ? `${fallbackSeed}-` : "") + (encoded || `h-${Math.random().toString(36).slice(2,8)}`)
}
