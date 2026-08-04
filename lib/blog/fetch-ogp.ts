import { parse } from "node-html-parser"

/**
 * 外部リンクのOGP情報。取得できなかった項目は undefined のままにし、
 * 呼び出し側で「出せるものだけ出す」判断ができるようにする。
 */
export type OgpData = {
  url: string
  title?: string
  description?: string
  image?: string
  siteName?: string
  favicon?: string
}

/** 1リンクあたりの取得上限。遅いサイトに記事全体の描画を引きずられないための保険 */
const FETCH_TIMEOUT_MS = 5000

/** OGPは頻繁には変わらないので長めに寝かせる（24時間） */
const REVALIDATE_SECONDS = 60 * 60 * 24

/** HTMLのheadだけ読めれば十分なので、巨大なページは途中で打ち切る */
const MAX_HTML_BYTES = 300_000

/**
 * metaタグを名前で引く。property/name のどちらに入っているかはサイトによって
 * まちまちなので両方を見る。
 */
function pickMeta(root: ReturnType<typeof parse>, keys: string[]): string | undefined {
  for (const key of keys) {
    const el =
      root.querySelector(`meta[property="${key}"]`) ??
      root.querySelector(`meta[name="${key}"]`)
    const content = el?.getAttribute("content")?.trim()
    if (content) return content
  }
  return undefined
}

/** 相対パスで書かれた画像URLを絶対URLに直す。直せなければ捨てる */
function toAbsoluteUrl(value: string | undefined, base: string): string | undefined {
  if (!value) return undefined
  try {
    return new URL(value, base).toString()
  } catch {
    return undefined
  }
}

/**
 * 外部URLのOGPを取得する。
 *
 * 失敗（タイムアウト / 4xx / HTMLでない / パース不能）は例外にせず null を返す。
 * リンクカード化は「できたら嬉しい」装飾であって、失敗が記事の描画を
 * 巻き添えにしてはいけないため。
 */
export async function fetchOgp(url: string): Promise<OgpData | null> {
  let parsedUrl: URL
  try {
    parsedUrl = new URL(url)
  } catch {
    return null
  }

  // http(s) 以外（mailto: や tel: など）は対象外
  if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") return null

  try {
    const res = await fetch(url, {
      // Next.js のデータキャッシュに乗せる。同じURLが複数記事に出ても取得は1回で済む
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      redirect: "follow",
      headers: {
        // UAを名乗らないとbot扱いで弾くサイトがあるため明示する
        "User-Agent": "Mozilla/5.0 (compatible; LEXIA-Blog-LinkCard/1.0; +https://lexia-hp.com/)",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "ja,en;q=0.8",
      },
    })

    if (!res.ok) return null

    const contentType = res.headers.get("content-type") ?? ""
    if (!contentType.includes("html")) return null

    const raw = await res.text()
    const html = raw.length > MAX_HTML_BYTES ? raw.slice(0, MAX_HTML_BYTES) : raw
    const root = parse(html)

    const title =
      pickMeta(root, ["og:title", "twitter:title"]) ??
      root.querySelector("title")?.textContent?.trim()

    const description = pickMeta(root, [
      "og:description",
      "twitter:description",
      "description",
    ])

    const image = toAbsoluteUrl(
      pickMeta(root, ["og:image", "og:image:url", "twitter:image"]),
      res.url || url,
    )

    const siteName = pickMeta(root, ["og:site_name"]) ?? parsedUrl.hostname

    // タイトルが取れないものはカードにする価値がないので通常リンクに戻す
    if (!title) return null

    return {
      url,
      title,
      description,
      image,
      siteName,
      favicon: `https://www.google.com/s2/favicons?domain=${parsedUrl.hostname}&sz=64`,
    }
  } catch {
    // タイムアウト・DNS失敗・パース不能はすべてここ。カード化を諦めるだけ
    return null
  }
}

/**
 * 複数URLのOGPをまとめて取得する。
 *
 * 1記事に20本前後の外部リンクがあるため直列だと描画が詰まる。同時実行数を
 * 絞ったうえで並列に取りに行く。
 */
export async function fetchOgpBatch(
  urls: string[],
  concurrency = 6,
): Promise<Map<string, OgpData>> {
  const unique = [...new Set(urls)]
  const result = new Map<string, OgpData>()

  for (let i = 0; i < unique.length; i += concurrency) {
    const chunk = unique.slice(i, i + concurrency)
    const settled = await Promise.all(chunk.map((u) => fetchOgp(u)))
    settled.forEach((ogp) => {
      if (ogp) result.set(ogp.url, ogp)
    })
  }

  return result
}
