# 🧩 Agent Notes — Blog Article Workflow

このリポジトリは、ブログをローカルデータのみでレンダリングします（外部CMSなし）。エージェントが記事を追加・更新する際は以下の手順と規約に従ってください。

## Where Blog Data Lives
- Posts source: `lib/blog-posts-fallback.ts`
- Types: `lib/blog-posts.types.ts`（`BlogPost`, `BlogPostSection`）
- Fetch helpers / genre metadata: `lib/blog-posts.ts`

アプリは `fallbackBlogPosts` のみを参照します（microCMS統合は除去済み）。並び替え・描画は `app/blog/page.tsx`（一覧/カード）および `app/blog/[slug]/page.tsx`（記事ページ・meta）で行われます。

## Minimal Post Shape (example)
```ts
{
  slug: "example-slug",
  title: "記事タイトル",
  description: "一覧・OGに使われる短い要約",
  genre: "tech" | "ideas",
  tags: ["Tag1", "Tag2"],
  date: "YYYY-MM-DD",
  readingTime: "6分",
  heroImage: "https://.../path.webp", // カード・OG/Twitter用サムネ（任意だが推奨）
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

## Image Usage
### Hero Image
- フィールド: `heroImage`
- 用途: 一覧カード、OG/Twitterプレビュー、記事ヘッダー
- 推奨: 16:9、1200×675px以上、WebP/AVIF
- 直接URL参照（例：Vercel Blobの公開リンク）で問題ありません

### Inline Images
- フィールド: `sections[i].image`
- alt: `section.heading` があればそれを使用。なければ `記事タイトル + 連番` をフォールバック

## Field Notes
- `slug`: 一意、半角英数とハイフン（URLになるため慎重に）
- `date`: `YYYY-MM-DD`（一覧の並び順に影響）
- `genre`: 既存は `"tech"` または `"ideas"`
  - 新ジャンル追加時は `lib/blog-posts.types.ts` と `lib/blog-posts.ts` の `GENRE_METADATA` を更新
- `readingTime`: 2025-10以降は自動計算（語数 ÷ 400wpm を切り上げ、最低1分）。データファイル値は無視されます
- `tags`: UIの都合上3つ程度が無難（トリミングされる可能性あり）

## Implementation Flow
1. `lib/blog-posts-fallback.ts` に記事データを追加／更新
2. 画像URLを `heroImage` / `sections[].image` に設定
3. ローカルで確認（任意）
   - `pnpm dev` → `http://localhost:3000/blog`
   - heroImage・section image の表示とレイアウトを確認
4. Lint（任意推奨）: `pnpm lint`
5. コミット／PR
   - 例: `feat(blog): add <slug> article` / `fix(blog): …`
   - UI変更がある場合はスクリーンショットを添付

## Performance / Maintenance Notes
- 大きな静的ファイルの直接importは避け、URL参照を推奨
- 画像はWebP/AVIFを推奨。必要に応じて `next/image` で最適化
- サーバーコンポーネント前提。`"use client"` は必要な箇所のみ使用

## Implementation Mapping (reference)
- カード / ハイライト: `app/blog/page.tsx`
- ジャンルフィルター: `components/blog/GenreFilterList.tsx`
- 記事ページ（本文+OG/Twitter）: `app/blog/[slug]/page.tsx`
- データ取得（ローカル）: `lib/blog-posts.ts`

## 2025-10 Operational Rules
- TOC（目次）は常時表示（見出しが無い場合は案内文を表示）
- 読了時間は `lib/blog-posts.ts` で自動算出（データファイルの値は無視）
- 語数カウントは英数字の連続文字列＋CJK単一文字を1語とする簡易ヒューリスティック
- ヒューリスティック変更時は互換性に注意、必要ならテストを追加

---

# 🧩 Article Styling Schema（LEXIA Blog 記事スタイル指針）
デザインとセマンティクスの一貫性を保ち、可読性と情報階層を明確にするためのガイドです。将来的に `note` / `alert` など専用ブロックを `BlogPostSection` に追加する場合は参照してください。

## Visual & Semantic Elements
| 要素名 | 意図 (Purpose) | 使用タイミング |
|---|---|---|
| 補足 note ブロック | 情報の温度差・補足説明を示す | 本文で触れきれない背景やTipsを補足する時 |
| 注意 alert ブロック | 注意喚起・誤解防止・重要警告 | 誤解されやすい要点や制約を示す時 |
| 引用 blockquote | 引用・発言・参考文献明示 | 外部情報や他者発言を明示する時 |
| 小見出し (H3) | 段落内の構造的分割 | 同一セクション内で話題を切り替える時 |
| 強調テキスト (`<mark>` / `<span class="em">`) | 読者の視線誘導・キーワード強調 | 概念名・数値・重要語句を強調する時 |
| 区切り線 (`<hr>`) | 情報ブロック間の視覚的リズム | セクションを大きく切り替える時（例: まとめ前） |

## Content Hierarchy（構造ルール）
| レベル | 要素 | 使用目的 |
|---|---|---|
| H1 | 記事タイトル | ページ唯一・SEOタイトルと一致 |
| H2 | メインセクション | 大項目（目安: 3〜6個） |
| H3 | 小項目 | 補足・分岐トピック |
| P | 本文 | 基本の解説テキスト |
| UL / OL | 箇条書き | 手順・リスト表示 |
| blockquote | 引用・参照 | 外部発言や資料引用 |

## Design Rhythm（視覚リズム指針）
| ポイント | 内容 |
|---|---|
| H2 → P | セクション区切りに余白を取る |
| P → note/alert | テキストの「呼吸」を作るため間隔を置く |
| リスト or 引用後 | ブロック間が詰まらないよう間隔を取る |
| `<hr>` 前後 | 記事全体のテンポを整えるため広めの余白を取る |

## Implementation Notes（現状と拡張方針）
| 項目 | 現状 | 拡張案 |
|---|---|---|
| note / alert ブロック | 未実装（`sections[].body` の通常段落のみ） | `BlogPostSection` に `blocks?: Array<{ type: 'note' | 'alert' | 'blockquote'; content: string[] }>` を追加して描画切替 |
| blockquote | 未実装 | 上記 `blocks` で `type: 'blockquote'` をサポート |
| H3 | 未実装 | `sections[].subheadings` などを導入してTOCの階層化 |
| mark/span | 生HTML挿入 | 将来的にMarkdownまたは軽量マークアップの導入を検討 |
| hr | 生HTML (`contentHtml`) | `section.type = 'divider'` を追加して描画対応予定 |

> NOTE: sections構造は現状を壊さず段階的に拡張します。PR時にはこの節を更新し、既存記事への影響（後方互換）を必ず記載してください。

## Agent Usage Rules
- 記事生成時はこのスキーマを参照し、適宜 `note` / `alert` / `blockquote` を挿入すること
- 目安として3段落に1つはビジュアル的変化（補足・引用・区切り等）を入れる
- コンテンツ構成は「専門性 × 温度 × リズム」を意識すること

---

このドキュメントはブログ記事の追加・更新手順を明確にする運用指針です。変更があればこの `AGENTS.md` を修正し、関連ファイル（例: `lib/blog-posts.types.ts`）も合わせて更新してください。
