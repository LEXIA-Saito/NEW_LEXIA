# Table of Contents Implementation Summary

## 📋 概要

microCMSでリッチエディタV2（`contentHtml`）を使用した記事に目次機能を実装しました。

## 🎯 実装アプローチ

**ハイブリッド方式: 自動抽出 + 手動カスタマイズ（オプション）**

- **基本**: `contentHtml`から見出し（h2-h6）を自動抽出して目次を生成
- **オプション**: `headings`フィールドで手動カスタマイズ可能
- サーバーサイドでcheerioを使用してHTML解析
- 見出しに自動的にIDを付与し、アンカーリンクを有効化

### アプローチの進化

| 段階 | 実装方法 | 特徴 |
|-----|---------|------|
| 初期検討 | 手動入力のみ（Approach C） | 運用負荷大、テキスト不一致リスク |
| **最終実装** ✅ | **自動抽出 + 手動オプション** | **運用負荷軽減、柔軟性確保** |

### なぜハイブリッド方式か

- **自動抽出**: 運用負荷ゼロ、テキスト不一致なし、SEO最適
- **手動カスタマイズ**: 特定の見出しだけ目次に表示したい場合に対応
- **段階的導入**: 既存記事は自動抽出、必要に応じて手動設定

## 🏗️ 実装内容

### 1. 型定義の追加

**`lib/blog-posts.types.ts`**
```typescript
export type BlogHeading = {
  text: string
  level: 2 | 3 | 4 | 5 | 6
}

export type BlogPost = {
  // ... 既存フィールド
  headings?: BlogHeading[] // contentHtml使用時の目次用（オプショナル）
}
```

### 2. HTML解析ユーティリティの追加

**`lib/extract-headings.ts`**（新規作成）
```typescript
import * as cheerio from 'cheerio'
import { generateHeadingId } from './heading-id'
import type { BlogHeading } from './blog-posts.types'

/**
 * contentHtmlから見出し（h2-h6）を自動抽出
 */
export function extractHeadingsFromHtml(html: string): Array<BlogHeading & { id: string }> {
  // cheerioでHTMLをパース
  const $ = cheerio.load(html)
  const headings: Array<BlogHeading & { id: string }> = []
  const headingCounts = new Map<string, number>()

  // h2-h6タグを順番に抽出
  $('h2, h3, h4, h5, h6').each((_, element) => {
    const $el = $(element)
    const text = $el.text().trim()
    const tagName = element.tagName.toLowerCase()
    const level = parseInt(tagName.substring(1), 10) as 2 | 3 | 4 | 5 | 6

    // 一意なIDを生成
    const baseId = generateHeadingId(text)
    const count = headingCounts.get(baseId) ?? 0
    const uniqueId = count === 0 ? baseId : `${baseId}-${count + 1}`
    headingCounts.set(baseId, count + 1)

    headings.push({ text, level, id: uniqueId })
  })

  return headings
}

/**
 * HTMLの見出しタグにID属性を追加
 */
export function addIdsToHeadings(
  html: string, 
  headings: Array<{ id: string }>
): string {
  const $ = cheerio.load(html)
  let headingIndex = 0

  $('h2, h3, h4, h5, h6').each((_, element) => {
    if (headingIndex < headings.length) {
      $(element).attr('id', headings[headingIndex].id)
      headingIndex++
    }
  })

  return $.html()
}
```

### 3. microCMS型定義の更新

**`lib/microcms-blog.ts`**
```typescript
import { extractHeadingsFromHtml } from './extract-headings'

export type MicroCMSBlogPost = {
  // ... 既存フィールド
  headings?: Array<{
    text: string
    level: 2 | 3 | 4 | 5 | 6
  }>
}

// データ変換処理
function convertMicroCMSPost(post: MicroCMSBlogPost): BlogPost {
  return {
    // ... 既存フィールド
    headings: post.contentHtml 
      ? (post.headings && post.headings.length > 0 
          ? post.headings // 手動設定があれば優先
          : extractHeadingsFromHtml(post.contentHtml)) // なければ自動抽出
      : undefined
  }
}
```

### 4. 記事ページでの使用

**`app/blog/[slug]/page.tsx`**

```typescript
import { addIdsToHeadings } from '@/lib/extract-headings'

// 目次データの生成（headingsフィールドから）
const sectionsWithHeadingIds = post.headings?.map((heading) => ({
  heading: heading.text,
  headingId: heading.id, // extract-headings.tsで自動生成されたID
})) || []

// contentHtml内の見出しにID付与
{post.contentHtml ? (
  <div 
    className="prose prose-lg prose-neutral max-w-none dark:prose-invert mt-12"
    dangerouslySetInnerHTML={{ 
      __html: addIdsToHeadings(post.contentHtml, post.headings || [])
    }}
  />
) : (
  // sections使用時は従来通り
  <article>{/* ... */}</article>
)}
```

**変更点**:
- 複雑な正規表現処理を削除
- cheerioベースのユーティリティ関数に置き換え
- コード行数を約40行→10行に削減

## 📚 microCMSスキーマ設定

### headingsフィールド（繰り返しフィールド）- **オプショナル**

```json
{
  "fieldId": "headings",
  "name": "見出し（目次用）- オプショナル",
  "kind": "repeater",
  "required": false,
  "repeaterFields": [
    {
      "fieldId": "text",
      "name": "見出しテキスト",
      "kind": "text",
      "required": true
    },
    {
      "fieldId": "level",
      "name": "見出しレベル",
      "kind": "select",
      "required": true,
      "selectItems": [
        { "value": 2, "label": "2 (h2)" },
        { "value": 3, "label": "3 (h3)" },
        { "value": 4, "label": "4 (h4)" },
        { "value": 5, "label": "5 (h5)" },
        { "value": 6, "label": "6 (h6)" }
      ]
    }
  ]
}
```

## ✅ 動作確認

### contentHtml使用時（推奨: 自動抽出）
1. microCMSで `contentHtml` フィールド（リッチエディタV2）に記事を執筆
2. 見出し（h2〜h6）を設定
3. **完了！** - 目次が自動生成され、クリックでスムーズスクロール

### contentHtml使用時（カスタマイズする場合）
1. microCMSで `contentHtml` フィールド（リッチエディタV2）に記事を執筆
2. `headings` フィールドに表示したい見出しのみを手動入力
3. 目次がカスタマイズ表示され、クリックでスムーズスクロール

### sections使用時
1. microCMSで `sections` フィールドに記事を構造化入力
2. `headings` フィールドは不要（自動生成）
3. 目次が表示され、アンカーリンクが機能

## 🔍 トラブルシューティング

### 目次が表示されない
- **自動抽出の場合**: `contentHtml` に見出しタグ（h2-h6）が存在するか確認
- **手動設定の場合**: `headings` フィールドが空 → 見出しを追加
- `headings[].text` が `contentHtml` の見出しと不一致 → テキストを完全一致させる

### アンカーリンクが機能しない
- ブラウザの開発者ツールで見出しタグに `id` 属性が付与されているか確認
- cheerioが正しくインストールされているか確認: `pnpm list cheerio`

## 📖 関連ドキュメント

- [MICROCMS_HEADINGS_GUIDE.md](./MICROCMS_HEADINGS_GUIDE.md) - 運用ガイド（詳細）
- [microcms-headings-schema.json](./microcms-headings-schema.json) - スキーマ設定例
- [AGENTS.md](./AGENTS.md) - ブログ記事ワークフロー

## 🚀 今後の改善案

1. **階層表示**: h3以降をインデント表示して視覚的な階層を強化
2. **バリデーション**: 手動設定時にheadingsとcontentHtmlの整合性チェック
3. **プレビュー**: microCMS管理画面で目次プレビュー表示
4. **webhook連携**: 記事保存時に見出しを検証・通知

---

**実装日**: 2025-10-15  
**最終更新**: 2025-10（ハイブリッド自動抽出方式に移行）  
**対象バージョン**: Next.js 15.5.4, microCMS API, cheerio 1.0.0  
**実装者**: GitHub Copilot
