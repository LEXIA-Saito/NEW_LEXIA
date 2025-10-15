# 目次機能アップデート: テキストエリア方式への移行

## 📋 変更概要

microCMSの見出し管理を**繰り返しフィールド（repeater）**から**テキストエリア（textArea）**に変更しました。

### 変更前（repeater方式）

- フィールド: `headings` (繰り返しフィールド)
- 入力方法: 各見出しごとに「text」と「level」を個別入力
- 運用負荷: **高い**（見出しごとにフィールド追加が必要）

### 変更後（textArea方式）✅

- フィールド: `headingsText` (テキストエリア)
- 入力方法: 改行区切りで一括入力
- 運用負荷: **低い**（コピペで簡単入力）

## 🎯 使い方

### 推奨: 自動抽出（何もしない）

`headingsText` フィールドを**空のまま**にすると、`contentHtml` から全ての見出しが自動抽出されます。

### カスタマイズ: テキストエリアに入力

特定の見出しだけを目次に表示したい場合:

```
見出し1
見出し2
## 見出し3
### 見出し4
```

#### フォーマット

- **レベル指定なし**: h2として扱われます
- **`##`**: h2
- **`###`**: h3
- **`####`**: h4
- **`#####`**: h5
- **`######`**: h6

## 🔧 技術実装

### 1. 新しいパーサー追加

**`lib/extract-headings.ts`**

```typescript
export function parseHeadingsText(headingsText: string): BlogHeading[] {
  return headingsText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      // "## 見出し" 形式の場合はレベルを抽出
      const hashMatch = line.match(/^(#{2,6})\s+(.+)$/)
      if (hashMatch) {
        const level = hashMatch[1].length as 2 | 3 | 4 | 5 | 6
        const text = hashMatch[2].trim()
        return { text, level }
      }
      // レベル指定なしの場合はh2として扱う
      return { text: line, level: 2 as const }
    })
}
```

### 2. microCMS型定義更新

**`lib/microcms-blog.ts`**

```typescript
// 変更前
headings?: Array<{
  text: string
  level: 2 | 3 | 4 | 5 | 6
}>

// 変更後
headingsText?: string
```

### 3. 変換ロジック更新

```typescript
headings: post.contentHtml 
  ? (post.headingsText && post.headingsText.trim().length > 0
      ? parseHeadingsText(post.headingsText) // テキストをパース
      : extractHeadingsFromHtml(post.contentHtml)) // 自動抽出
  : undefined
```

## 📝 microCMSスキーマ設定

### 新しいフィールド設定

```json
{
  "fieldId": "headingsText",
  "name": "目次の見出し（オプショナル）",
  "kind": "textArea",
  "required": false,
  "description": "目次をカスタマイズしたい場合のみ使用。改行区切りで見出しを入力。空の場合はcontentHtmlから自動抽出されます。"
}
```

### 古いフィールドの削除（オプション）

既存の `headings` 繰り返しフィールドは削除可能です:

1. microCMS管理画面 → APIスキーマ
2. `headings` フィールドを削除
3. 新しい `headingsText` テキストエリアを追加

## 🚀 移行手順

### 既存記事の移行

既存記事で `headings` フィールドを使用している場合:

**Option 1: 自動抽出に切り替え**（推奨）
- `headings` フィールドの内容を削除
- 何もしない → 自動抽出が動作

**Option 2: textAreaに移行**
- `headings` の内容を以下の形式でコピー:
  ```
  ## 見出し1
  ### 見出し2
  ## 見出し3
  ```
- `headingsText` フィールドに貼り付け

### スキーマ変更

1. microCMSで `headingsText` テキストエリアを追加
2. 既存記事を移行
3. 動作確認後、古い `headings` フィールドを削除

## ✅ メリット

| 項目 | repeater方式 | textArea方式 |
|------|-------------|-------------|
| **入力速度** | ❌ 遅い（1件ずつ） | ✅ 速い（一括入力） |
| **運用負荷** | ❌ 高い | ✅ 低い |
| **視認性** | ❌ 分散表示 | ✅ 一覧表示 |
| **コピペ** | ❌ 難しい | ✅ 簡単 |
| **自動抽出** | ✅ 可能 | ✅ 可能 |

## 📖 関連ドキュメント

- [MICROCMS_HEADINGS_GUIDE.md](./MICROCMS_HEADINGS_GUIDE.md) - 詳細な使い方ガイド
- [microcms-headings-schema-v2.json](./microcms-headings-schema-v2.json) - スキーマ設定例
- [TOC_IMPLEMENTATION.md](./TOC_IMPLEMENTATION.md) - 技術実装詳細

---

**更新日**: 2025-10-15  
**変更**: repeater方式 → textArea方式に移行  
**影響**: 既存記事は自動抽出にフォールバックされるため、互換性あり
