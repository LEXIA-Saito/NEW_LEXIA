/**
 * アフィリエイト記事用のHTMLヘルパー。
 *
 * ブログ記事データ（`lib/blog-posts-fallback.ts` / microCMS）の
 * `sections[].richtext` に文字列として埋め込んで使う。記事ページの
 * レンダラ（app/blog/[slug]/page.tsx）が richtext をそのまま描画する。
 *
 * 設計方針（景表法ステマ規制・Amazonアソシエイト規約への配慮）:
 *  - 記事冒頭に AFFILIATE_DISCLOSURE_HTML を必ず置き、「広告（アフィリエイト）」を明示する。
 *  - 商品カードには PR を明示し、rel="sponsored nofollow" を付与する。
 *  - 価格・在庫はコードに手書きしない（規約違反）。最新はリンク先で確認、の運用にする。
 *  - 実リンクは Amazon の SiteStripe で発行し、AMAZON_LINK_PLACEHOLDER を差し替える。
 *
 * 色は dark / light 両対応にするため、文字色は指定せず親（prose）から継承させ、
 * 背景・枠線は半透明グレー等のモード非依存色のみを使う。
 */

/** SiteStripe で発行した実リンクに差し替えるまでのプレースホルダ。 */
export const AMAZON_LINK_PLACEHOLDER = "#"

/** 記事冒頭に置くステマ規制対応の開示ボックス（必須）。 */
export const AFFILIATE_DISCLOSURE_HTML = `
<div style="margin:1.5rem 0;padding:14px 16px;border:1px solid rgba(130,130,130,.3);border-radius:12px;background:rgba(130,130,130,.07);font-size:.92em;line-height:1.75;">
<strong>［PR］本記事はアフィリエイト広告（Amazonアソシエイト等）を含みます。</strong><br/>
記事内の商品リンクを経由して購入された場合、運営者が紹介料を受け取ることがあります。価格・在庫状況は変動するため、最新の情報は必ずリンク先のAmazon商品ページでご確認ください。紹介内容は筆者の見解に基づくものであり、購入を強制するものではありません。
</div>`.trim()

/** 注意・警告ブロック（アンバー）。誇大広告防止の免責などに使う。 */
export function affiliateAlertHtml(title: string, bodyHtml: string): string {
  return `
<div style="margin:1.5rem 0;padding:14px 16px;border:1px solid rgba(214,140,30,.5);border-radius:12px;background:rgba(214,140,30,.10);font-size:.95em;line-height:1.75;">
<strong>${title}</strong><br/>${bodyHtml}
</div>`.trim()
}

/** 補足ノート（左罫線）。Tips・背景補足に使う。 */
export function affiliateNoteHtml(title: string, bodyHtml: string): string {
  return `
<div style="margin:1.5rem 0;padding:12px 16px;border-left:3px solid rgba(130,130,130,.5);background:rgba(130,130,130,.06);border-radius:0 8px 8px 0;font-size:.95em;line-height:1.75;">
<strong>${title}</strong><br/>${bodyHtml}
</div>`.trim()
}

/**
 * Amazon商品カード。価格は記載しない。
 * url が未設定（プレースホルダ）の間はボタンを無効表示にして、
 * 差し替え漏れに気付けるようにする。
 */
export function amazonProductHtml(opts: { name: string; context: string; url?: string }): string {
  const url = opts.url && opts.url !== AMAZON_LINK_PLACEHOLDER ? opts.url : ""
  const action = url
    ? `<a href="${url}" rel="sponsored nofollow noopener" target="_blank" style="display:inline-block;padding:8px 18px;border-radius:999px;background:#ff9900;color:#111;font-weight:600;text-decoration:none;font-size:.9em;">Amazonで見る</a><span style="margin-left:8px;font-size:.75em;opacity:.7;">［PR］</span>`
    : `<span style="display:inline-block;padding:8px 18px;border-radius:999px;background:rgba(130,130,130,.18);color:inherit;font-weight:600;font-size:.9em;">Amazonで見る（リンク未設定）</span><span style="margin-left:8px;font-size:.75em;opacity:.7;">［PR・SiteStripeで発行したURLに差し替え］</span>`
  return `
<div style="margin:1rem 0;padding:14px 16px;border:1px solid rgba(130,130,130,.3);border-radius:12px;">
<div style="font-weight:600;margin-bottom:4px;">${opts.name}</div>
<div style="font-size:.9em;opacity:.85;margin-bottom:10px;">${opts.context}</div>
${action}
</div>`.trim()
}
