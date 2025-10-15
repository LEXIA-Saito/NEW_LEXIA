# Table of Contents Implementation Summary

## 📋 概要

microCMSでリッチエディタV2（`contentHtml`）を使用した記事に目次機能を実装しました。

## 🎯 実装アプローチ

**アプローチC: microCMSで見出し情報を別途保存**

- リッチエディタV2とは別に、`headings`繰り返しフィールドで見出し情報を保存
- 記事作成時に見出しテキストとレベルを手動入力
- サーバーサイドで見出しにIDを自動付与し、目次のアンカーリンクを有効化

### なぜこのアプローチを選んだか

| アプローチ | メリット | デメリット | 選択理由 |
|----------|---------|----------|---------|
| A: サーバーサイドHTML parsing | SEO最適、自動化 | 追加パッケージ必要（cheerio）、パース処理のコスト | 依存関係増加を避けたい |
| B: クライアントサイドDOM parsing | 実装簡単 | SSR不可、SEO不利、初期表示遅延 | SEOとパフォーマンスを重視 |
| **C: microCMSで見出し管理** ✅ | **パッケージ不要、SEO最適、型安全** | **運用の手間（手動入力）** | シンプルで保守性高い |

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
  headings?: BlogHeading[] // contentHtml使用時の目次用
}
```

### 2. microCMS型定義の更新

**`lib/microcms-blog.ts`**
```typescript
export type MicroCMSBlogPost = {
  // ... 既存フィールド
  headings?: Array<{
    text: string
    level: 2 | 3 | 4 | 5 | 6
  }>
}
```

### 3. 記事ページでの使用

**`app/blog/[slug]/page.tsx`**

#### 3-1. 目次データの生成
```typescript
const sectionsWithHeadingIds = (() => {
  const headingCounts = new Map<string, number>()

  // contentHtml使用時はheadingsから目次を生成
  if (post.contentHtml && post.headings && post.headings.length > 0) {
    return post.headings.map((heading) => {
      const baseId = generateHeadingId(heading.text)
      const count = headingCounts.get(baseId) ?? 0
      const uniqueId = count === 0 ? baseId : `${baseId}-${count + 1}`
      
      headingCounts.set(baseId, count + 1)
      
      return {
        heading: heading.text,
        headingId: uniqueId,
      }
    })
  }

  // sections使用時は従来通り（自動生成）
  return (post.sections ?? []).map((section) => {
    // ... existing logic
  })
})()
```

#### 3-2. contentHtml内の見出しにID付与
```typescript
{post.contentHtml ? (
  <div 
    className="prose prose-lg prose-neutral max-w-none dark:prose-invert mt-12"
    dangerouslySetInnerHTML={{ 
      __html: (() => {
        if (!post.headings || post.headings.length === 0) {
          return post.contentHtml
        }
        
        let html = post.contentHtml
        const headingCounts = new Map<string, number>()
        
        post.headings.forEach((heading) => {
          const baseId = generateHeadingId(heading.text)
          const count = headingCounts.get(baseId) ?? 0
          const uniqueId = count === 0 ? baseId : `${baseId}-${count + 1}`
          headingCounts.set(baseId, count + 1)
          
          // 見出しテキストに対応するタグにIDを追加
          const escapedText = heading.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          const headingRegex = new RegExp(
            `<h${heading.level}([^>]*)>\\s*${escapedText}\\s*</h${heading.level}>`,
            'i'
          )
          html = html.replace(headingRegex, (match, attrs) => {
            if (attrs.includes('id=')) return match
            return `<h${heading.level}${attrs} id="${uniqueId}">${heading.text}</h${heading.level}>`
          })
        })
        
        return html
      })()
    }}
  />
) : (
  // sections使用時の表示
)}
```

## 📚 microCMSスキーマ設定

### headingsフィールド（繰り返しフィールド）

```json
{
  "fieldId": "headings",
  "name": "見出し（目次用）",
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

### contentHtml使用時
1. microCMSで `contentHtml` に記事を執筆
2. `headings` フィールドに見出し情報を入力（記事内と完全一致）
3. 目次が表示され、クリックでスムーズスクロール

### sections使用時
1. microCMSで `sections` フィールドに記事を構造化入力
2. `headings` フィールドは不要（自動生成）
3. 目次が表示され、アンカーリンクが機能

## 🔍 トラブルシューティング

### 目次が表示されない
- `headings` フィールドが空 → 見出しを追加
- `headings[].text` が `contentHtml` の見出しと不一致 → テキストを完全一致させる

### アンカーリンクが機能しない
- 見出しテキストの不一致 → `headings[].text` を再確認
- IDが生成されていない → ブラウザの開発者ツールでHTML確認

## 📖 関連ドキュメント

- [MICROCMS_HEADINGS_GUIDE.md](./MICROCMS_HEADINGS_GUIDE.md) - 運用ガイド（詳細）
- [microcms-headings-schema.json](./microcms-headings-schema.json) - スキーマ設定例
- [AGENTS.md](./AGENTS.md) - ブログ記事ワークフロー

## 🚀 今後の改善案

1. **自動抽出機能**: contentHtmlから見出しを自動抽出してheadingsを生成
2. **バリデーション**: headingsとcontentHtmlの整合性チェック
3. **プレビュー**: microCMS管理画面で目次プレビュー表示
4. **webhook連携**: 記事保存時に見出しを自動抽出・更新

---

**実装日**: 2025-10-15  
**対象バージョン**: Next.js 15.5.4, microCMS API  
**実装者**: GitHub Copilot
