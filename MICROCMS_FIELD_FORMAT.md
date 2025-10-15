# 📝 microCMS フィールド入力フォーマット

microCMSには「複数テキストエリア」という種類が存在しないため、**改行区切り**でデータを入力します。コード側で自動的に配列に変換されます。

---

## 🎯 基本ルール

### ✅ 段落の入力（`body`フィールド）

**microCMSでの入力**:
```
段落1です。この文章は最初の段落。

段落2です。空行を入れても大丈夫です。
段落3です。
```

**変換後（コード内部）**:
```typescript
body: [
  "段落1です。この文章は最初の段落。",
  "段落2です。空行を入れても大丈夫です。",
  "段落3です。"
]
```

---

### ✅ 箇条書きの入力（`list`フィールド）

**microCMSでの入力**:
```
リスト項目1
リスト項目2
リスト項目3
```

**変換後（コード内部）**:
```typescript
list: [
  "リスト項目1",
  "リスト項目2",
  "リスト項目3"
]
```

---

### ✅ テーブルヘッダーの入力（`tableHeaders`フィールド）

**microCMSでの入力**:
```
列1,列2,列3
```

**変換後（コード内部）**:
```typescript
table: {
  headers: ["列1", "列2", "列3"]
}
```

---

### ✅ テーブル行の入力（`tableRows`フィールド）

**microCMSでの入力**:
```
値1,値2,値3
値4,値5,値6
値7,値8,値9
```

**変換後（コード内部）**:
```typescript
table: {
  headers: ["列1", "列2", "列3"],
  rows: [
    ["値1", "値2", "値3"],
    ["値4", "値5", "値6"],
    ["値7", "値8", "値9"]
  ]
}
```

---

## 📋 完全な入力例

### microCMSでのセクション入力

```
■ セクション[0]
見出し: Infisicalの主な機能
本文:
Infisicalは、シークレット管理を容易にするための多くの機能を提供しています。
以下では代表的な機能をご紹介します。

箇条書き:
ダッシュボードによる一元管理
ネイティブ統合（GitHub Actions、Vercel、AWS）
バージョン管理とポイントインタイムリカバリ
シークレットローテーションと動的シークレット

画像: https://example.com/image.webp
画像Alt: Infisicalのダッシュボード画面
```

### 変換後のデータ構造

```typescript
{
  heading: "Infisicalの主な機能",
  body: [
    "Infisicalは、シークレット管理を容易にするための多くの機能を提供しています。",
    "以下では代表的な機能をご紹介します。"
  ],
  list: [
    "ダッシュボードによる一元管理",
    "ネイティブ統合（GitHub Actions、Vercel、AWS）",
    "バージョン管理とポイントインタイムリカバリ",
    "シークレットローテーションと動的シークレット"
  ],
  image: "https://example.com/image.webp",
  imageAlt: "Infisicalのダッシュボード画面"
}
```

---

## ⚙️ 変換ロジック（参考）

`lib/microcms-blog.ts`の`convertMicroCMSPost`関数で以下の処理を実行:

```typescript
// body: 改行区切り → 配列
if (section.body) {
  converted.body = section.body
    .split("\n")               // 改行で分割
    .map((line) => line.trim()) // 前後の空白を削除
    .filter((line) => line.length > 0) // 空行を除外
}

// list: 改行区切り → 配列
if (section.list) {
  converted.list = section.list
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
}

// tableHeaders: カンマ区切り → 配列
if (section.tableHeaders) {
  const headers = section.tableHeaders
    .split(",")
    .map((h) => h.trim())
    .filter((h) => h.length > 0)
}

// tableRows: 改行+カンマ区切り → 2次元配列
if (section.tableRows) {
  const rows = section.tableRows
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((row) => row.split(",").map((cell) => cell.trim()))
}
```

---

## ❌ よくある間違い

### 間違い1: カンマ区切りで段落を入力
```
❌ 本文: 段落1,段落2,段落3
```
→ **正解**: 改行で区切る

### 間違い2: 箇条書きに記号を付ける
```
❌ 箇条書き:
- リスト項目1
- リスト項目2
```
→ **正解**: 記号なしで改行のみ（UI側で自動的に`<ul><li>`が生成されます）

### 間違い3: テーブルヘッダーを改行で入力
```
❌ テーブルヘッダー:
列1
列2
列3
```
→ **正解**: カンマ区切り（`列1,列2,列3`）

### 間違い4: テーブル行をカンマのみで入力
```
❌ テーブル行: 値1,値2,値3,値4,値5,値6
```
→ **正解**: 改行で行を区切り、各行内はカンマ区切り
```
値1,値2,値3
値4,値5,値6
```

---

## 🧪 動作テスト

### 1. ローカル開発環境でテスト

```bash
# .env.local を確認
LEXIA_MICROCMS_DOMAIN=lexia
MICROCMS_API_KEY=your-api-key

# 開発サーバー起動
pnpm dev
```

### 2. ブラウザで確認

```
http://localhost:3000/blog
→ 記事一覧に表示されるか確認

http://localhost:3000/blog/your-article-slug
→ 段落・リスト・テーブルが正しく表示されるか確認
```

### 3. デバッグ方法

```typescript
// app/blog/[slug]/page.tsx などでconsole.log
console.log('Sections:', post.sections)

// 期待される出力:
// sections: [
//   {
//     heading: "...",
//     body: ["段落1", "段落2"], // ← 配列になっているか確認
//     list: ["項目1", "項目2"]  // ← 配列になっているか確認
//   }
// ]
```

---

## 📚 関連ドキュメント

- `MICROCMS_CORRECT_SCHEMA.md`: スキーマ設計の全体像
- `lib/microcms-blog.ts`: 変換ロジックの実装
- `lib/blog-posts.types.ts`: TypeScript型定義
- `AGENTS.md`: 記事作成時の運用ルール

---

## 🎯 まとめ

| フィールド | 区切り文字 | 例 |
|----------|----------|---|
| `body` | 改行 | `段落1\n段落2\n段落3` |
| `list` | 改行 | `項目1\n項目2\n項目3` |
| `tableHeaders` | カンマ | `列1,列2,列3` |
| `tableRows` | 改行（行間）+ カンマ（セル間） | `値1,値2,値3\n値4,値5,値6` |

この方式により、microCMSの標準フィールドのみで柔軟なブログ記事を作成できます。
