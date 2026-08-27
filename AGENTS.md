# 🧩 Agent Notes — Blog Article Workflow

このリポジトリは、ブログをmicroCMSとローカルフォールバックデータで管理します。エージェントが記事を追加・更新する際は以下の手順と規約に従ってください。

## Where Blog Data Lives
- **microCMS**: 主要なデータソース（`lib/microcms-blog.ts`）
- Fallback source: `lib/blog-posts-fallback.ts`
- Types: `lib/blog-posts.types.ts`（`BlogPost`, `BlogPostSection`, `BlogHeading`）
- Fetch helpers / genre metadata: `lib/blog-posts.ts`

アプリは優先的にmicroCMSから記事を取得し、取得できない場合は `fallbackBlogPosts` を使用します。並び替え・描画は `app/blog/page.tsx`（一覧/カード）および `app/blog/[slug]/page.tsx`（記事ページ・meta）で行われます。

## Daily Publication Policy

毎日投稿の制作・レビュー・公開手順は [`docs/blog/BLOG_WORKFLOW.md`](docs/blog/BLOG_WORKFLOW.md) に従います。

- 通常記事は記事専用ブランチ `blog/YYYY-MM-DD-<slug>` で制作する
- Pull RequestとVercel Previewで本文・一覧・目次を確認する
- 最初の30日間は毎日18:00 JSTの公開を目標とする
- 公開待ち記事を3件程度確保し、未完成記事を公開しない
- 画像は任意。本文と一次情報確認を優先し、後日追加してよい
- Amazonアソシエイトなどの広告記事は運営者本人の承認なしに公開しない
- 記事の基準構成は `/blog/open-notebook-ai-notebooklm-alt-2025` を参考にする

通常記事の本文には、依頼者への回答、執筆プロンプト、内部メモ、未公開の運用意図を含めません。読者の疑問から書き始め、機能だけでなく制約・費用・セキュリティ・運用継続性のうち必要な判断材料を示してください。

## microCMS Article Creation (Recommended)

### 1. リッチエディタV2使用時（contentHtml）

microCMS管理画面で以下のフィールドを設定:

```ts
{
  slug: "example-slug",
  title: "記事タイトル",
  description: "一覧・OGに使われる短い要約",
  genre: ["tech"], // または ["trends"], ["ideas"]
  tags: ["Tag1", "Tag2"],
  date: "2025-10-15",
  heroImage: { url: "https://.../hero.webp" },
  contentHtml: "<h2>見出し1</h2><p>本文...</p><h2>見出し2</h2>...",
  // headingsフィールドは省略可能 - contentHtmlから自動抽出されます
}
```

**重要**: 目次（ToC）は `contentHtml` 内のh2〜h6タグから自動的に抽出されます。

**オプション**: 目次をカスタマイズしたい場合は `headings` フィールド（テキストエリア）に改行区切りで入力:
```
見出し1
見出し2
## 見出し3
```
- 行頭に `##` をつけるとh2、`###` でh3（最大h6まで）
- レベル指定なしの場合はh2として扱われます

### 2. 構造化データ使用時（sections）

```ts
{
  slug: "example-slug",
  title: "記事タイトル",
  description: "要約",
  genre: ["tech"],
  tags: ["Tag1"],
  date: "2025-10-15",
  heroImage: { url: "https://.../hero.webp" },
  sections: [
    {
      heading: "見出し",
      body: "段落1\n段落2",
      list: "項目1\n項目2",
      image: "https://.../inline.webp"
    }
  ]
}
```

sections使用時は `headings` 不要（自動生成されます）。

## Fallback Article Shape (Local Development)

```ts
{
  slug: "example-slug",
  title: "記事タイトル",
  description: "一覧・OGに使われる短い要約",
  genre: "tech" | "trends" | "ideas",
  tags: ["Tag1", "Tag2"],
  date: "YYYY-MM-DD",
  readingTime: "6分",
  heroImage: "https://.../path.webp",
  sections: [
    { body: ["導入文を1〜2段落で。"] },
    {
      heading: "見出し（任意）",
      body: ["本文段落…"],
      list: ["箇条書き…"],
      image: "https://.../inline-image.webp"
    }
  ]
}
```

## Image Usage
画像は公開の必須条件ではありません。画像が未設定の場合は既存のプレースホルダー表示を利用し、本文を先に公開できます。画像を後日追加する場合も、内容に変更がなければ記事を不必要に新着扱いへ戻さないでください。

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
- `date`: `YYYY-MM-DD`（一覧の並び順に影響）。公開時刻は記事PR本文の `blog-publish-metadata.publishAt` で管理
- `genre`: 既存は `"AI"` / `"Frontend"` / `"Backend"` / `"Update"` / `"Full-stack"` / `"Security"`（旧データの `"tech"` は後方互換で利用）
  - 新ジャンル追加時は `lib/blog-posts.types.ts` と `lib/blog-posts.ts` の `GENRE_METADATA` を更新
  - 記事生成時は、実際の内容（コード中心か／動向紹介か／戦略・思想か）を把握した上で最も適切なカテゴリを決定すること
- `readingTime`: 2025-10以降は自動計算（語数 ÷ 400wpm を切り上げ、最低1分）。データファイル値は無視されます
- `tags`: UIの都合上3つ程度が無難（トリミングされる可能性あり）

## Implementation Flow
1. `main`を最新・クリーンな状態にし、記事ブランチを作成
   - `pnpm blog:branch -- --slug <slug> --date YYYY-MM-DD`
2. microCMSとfallbackの重複を確認
3. `lib/blog-posts-fallback.ts` に記事データを追加／更新
4. 一次情報・公式情報を確認し、記事末尾に参考リンクを置く
5. 画像は必要な場合だけ `heroImage` / `sections[].image` に設定
6. ローカルで確認
   - `pnpm dev` → `http://localhost:3000/blog`
   - 一覧、本文、目次、表、外部リンク、画像未設定時の表示を確認
7. 記事チェック
   - `pnpm blog:check -- --base origin/main`
   - `pnpm test:blog`
8. コミット後、記事PRを作成
   - `pnpm blog:pr -- --slug <slug> --title "記事タイトル" --date YYYY-MM-DD`
   - 例: `feat(blog): add <slug> article` / `fix(blog): …`
9. Vercel PreviewとBlog article policyの成功を確認
10. 通常記事は `blog:ready` を付けて18:00 JSTの予約公開キューへ入れる
11. 公開には本人の `blog:manual-approved` が必要（アフィリエイト記事はさらに `blog:affiliate-approved` も必要）

記事ブランチへ新しいコミットが入ると `blog:ready` は解除されます。修正後はPreviewを再確認してください。

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
- 記事冒頭は定型の執筆者挨拶ではなく、読者の疑問・課題・前提から始めること
- 主要な事実、料金、仕様、リリース情報は一次情報または公式情報で確認すること
- 「この記事でわかること」、判断材料、まとめ、参考リンクを基本構成に含めること
- `AFFILIATE_DISCLOSURE_HTML`、`amazonProductHtml`、`amzn.to`、Amazon商品URLを含む記事はアフィリエイト記事として扱うこと
- `blog:manual-approved` と `blog:affiliate-approved` を自動付与してはならない（この2つが人間の承認ゲートそのもの）
- 画像生成や画像不足を理由に、完成した通常記事の公開を遅らせないこと

---

このドキュメントはブログ記事の追加・更新手順を明確にする運用指針です。変更があればこの `AGENTS.md` を修正し、関連ファイル（例: `lib/blog-posts.types.ts`）も合わせて更新してください。
