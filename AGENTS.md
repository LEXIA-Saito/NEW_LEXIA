## Agent Notes — Blog Article Workflow

This repository renders the blog entirely from local data (no external CMS). Agents adding or updating blog posts should follow these steps and conventions.

### Where Blog Data Lives
- Posts source: `lib/blog-posts-fallback.ts`
- Types: `lib/blog-posts.types.ts` (`BlogPost`, `BlogPostSection`)
- Fetch helpers and genre metadata: `lib/blog-posts.ts`

The app reads from `fallbackBlogPosts` only (microCMS integration is removed). Sorting and rendering are handled in `app/blog/page.tsx` (lists/cards) and `app/blog/[slug]/page.tsx` (article page + meta).

### Minimal Post Shape (example)
```ts
{
  slug: "example-slug",
  title: "記事タイトル",
  description: "一覧・OGに使われる短い要約",
  genre: "tech" | "ideas",
  tags: ["Tag1", "Tag2"],
  date: "YYYY-MM-DD",
  readingTime: "6分",
  heroImage: "https://.../path.webp", // カード・OG/Twitterに使うサムネ（任意だが推奨）
  sections: [
    { body: ["導入文を1〜2段落で。"] },
    {
      heading: "見出し（任意）",
      body: ["本文段落…"],
      list: ["箇条書き…"],
      image: "https://.../inline-image.webp" // セクション内に表示する画像（任意）
    }
  ]
}
```

### 画像の扱い（サムネ・本文）
- サムネ（カード・OG用）は `heroImage` に設定します。
  - 推奨: 16:9, 最低 1200×675px 以上, WebP/AVIF。
  - 直接URL参照でOK（例: Vercel Blob の公開URL）。
  - 使用箇所:
    - 一覧カード/ハイライト: `app/blog/page.tsx`
    - 記事ページのヘッダー画像とOG/Twitter: `app/blog/[slug]/page.tsx`
- 本文中の画像は、各 `sections[i].image` にURLを指定します。
  - `alt` は `section.heading` があればそれを、なければ `記事タイトル + 連番` を自動使用。

### フィールドの注意点
- `slug`: 一意、半角英数・ハイフン。URL になるため慎重に決定。
- `date`: `YYYY-MM-DD`。一覧の並び順に影響します。
- `genre`: 既存の `"tech" | "ideas"` のいずれか。
  - 新ジャンルを追加する場合は `lib/blog-posts.types.ts` と `lib/blog-posts.ts` の `GENRE_METADATA` を更新し、UI影響範囲を確認してください。
- `readingTime`: 2025-10 以降は手動入力を無視し、自動計算（総語数 / 400wpm 切り上げ、最低1分）で表示されます。データファイルに書いてあっても上書きされるため、気にしなくてOKです。
- `tags`: 3つ程度までが無難（UIでトリミングされます）。

### 実装・確認フロー
1) 記事データを `lib/blog-posts-fallback.ts` に追加/更新
2) 画像URL（Vercel Blob など）を `heroImage` や `sections[].image` に設定
3) ローカル確認（任意）
   - `pnpm dev` → `http://localhost:3000/blog` で一覧とカード表示
   - 記事ページで `heroImage` と各 `section.image` の表示/レイアウトを確認
4) Lint（任意だが推奨）: `pnpm lint`
5) コミット/PR
   - 例: `feat(blog): add <slug> article` / `fix(blog): …`
   - ブランチから PR を作成し、スクリーンショット（UI 変更時）を添付

### パフォーマンス/運用メモ
- 大きい静的ファイルの直接 import は避け、URL参照にしてください。
- 画像は WebP/AVIF を推奨。必要に応じて `next/image` で最適化されます。
- サーバーコンポーネント前提。`"use client"` は必要な箇所のみ。

### 既存実装との対応づけ（参考）
- カード・ハイライトで `heroImage` を参照: `app/blog/page.tsx`
- ジャンル別カード（フィルター）: `components/blog/GenreFilterList.tsx`
- 記事本文のセクション描画＆OG/Twitter: `app/blog/[slug]/page.tsx`
- データ取得（ローカルのみ）: `lib/blog-posts.ts`

### 2025-10 運用ルール追加
- 目次（TOC）は見出し数に関わらず常時表示します（見出しが無い場合は案内文）。
- 読了時間は `lib/blog-posts.ts` 内で自動算出し、`fallbackBlogPosts` 内の `readingTime` 値は無視されます。
- 語数カウントは英数字の連続文字列 + CJK 単一文字を1語として抽出する簡易ヒューリスティックです。
- 変更時はヒューリスティックを壊さないように注意し、必要ならテスト導入を検討してください。

---
このドキュメントは、ブログ記事追加・更新の一連作業を迷いなく行うための運用指針です。更新が必要になった場合は、この `AGENTS.md` を修正してください。
