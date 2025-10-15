# ✅ LEXIAブログ用 正しいmicroCMSスキーマ設計

このドキュメントは、既存の`BlogPost`型に完全準拠したmicroCMSスキーマの設定手順です。

---

## 📋 API基本設定

### エンドポイント作成
1. microCMSダッシュボード → **API作成**
2. 以下を入力:
   ```
   API名: ブログ
   エンドポイント: blog
   API型: リスト形式
   ```

---

## 🏗️ フィールド設計（完全版）

### 1️⃣ 基本情報フィールド

| フィールドID | 表示名 | 種類 | 必須 | 説明 |
|-------------|--------|------|------|------|
| `title` | タイトル | テキストフィールド | ✅ | 記事タイトル（60文字程度推奨） |
| `slug` | スラッグ | テキストフィールド | ✅ | URL用（例: `firebase-studio-overview`） |
| `description` | ディスクリプション | テキストエリア | ✅ | OG/Twitter用要約（120-160文字） |
| `genre` | ジャンル | セレクトフィールド | ✅ | `tech` / `trends` / `ideas` |
| `tags` | タグ | 複数選択 | ❌ | 記事のトピック（例: `Firebase`, `AI`） |
| `date` | 公開日 | 日時 | ✅ | 記事の公開日時 |

#### 📌 `genre`（セレクトフィールド）の設定
```
選択肢:
- tech (技術解説・実装ガイド)
- trends (業界動向・ニュース)
- ideas (戦略・思想・考察)

初期値: tech
複数選択: OFF
```

#### 📌 `tags`（複数選択フィールド）の設定
```
選択肢の管理: カスタムフィールドで管理
または
選択肢を手動追加:
- Firebase
- AI
- Next.js
- TypeScript
- セキュリティ
- オープンソース
（必要に応じて追加）

複数選択: ON
```

---

### 2️⃣ ヒーロー画像フィールド

| フィールドID | 表示名 | 種類 | 必須 | 説明 |
|-------------|--------|------|------|------|
| `heroImage` | ヒーロー画像 | 画像 | ❌ | カード・OG用サムネイル（1200×675推奨） |
| `heroImageAlt` | ヒーロー画像Alt | テキストフィールド | ❌ | アクセシビリティ用（例: "Firebaseのロゴ"） |

---

### 3️⃣ 本文フィールド（2つのアプローチ）

#### アプローチA: `sections`（構造化・推奨）

**フィールドID**: `sections`  
**種類**: 繰り返しフィールド  
**必須**: ❌

##### `sections`内のサブフィールド

| フィールドID | 表示名 | 種類 | 必須 | 説明 |
|-------------|--------|------|------|------|
| `heading` | 見出し | テキストフィールド | ❌ | セクションタイトル（H2相当） |
| `body` | 本文 | 複数テキストエリア | ❌ | 段落ごとに1つ入力（配列） |
| `list` | 箇条書き | 複数テキストフィールド | ❌ | リスト項目（配列） |
| `image` | 画像 | 画像 | ❌ | セクション内画像 |
| `imageAlt` | 画像Alt | テキストフィールド | ❌ | 画像の説明 |
| `tableHeaders` | テーブルヘッダー | 複数テキストフィールド | ❌ | 表の列名 |
| `tableRows` | テーブル行 | 複数テキストエリア | ❌ | 各行をカンマ区切り（例: `値1,値2,値3`） |

**設定手順**:
1. 「繰り返しフィールド」を追加
2. フィールドID: `sections`
3. 上記7つのサブフィールドを追加
4. すべて任意（必須OFF）

#### アプローチB: `contentHtml`（HTML直接入力）

**フィールドID**: `contentHtml`  
**種類**: リッチエディタV2  
**必須**: ❌  
**用途**: 既存のHTML形式記事や自由度の高い編集

**注意**: `sections`と`contentHtml`は**どちらか一方**を使用

---

### 4️⃣ メタデータフィールド（自動計算）

| フィールドID | 表示名 | 種類 | 必須 | 説明 |
|-------------|--------|------|------|------|
| `readingTime` | 読了時間（分） | 数値 | ❌ | **自動計算されるため設定不要** |

> **重要**: `readingTime`はコード側で自動計算されます。microCMSで設定しても無視されます。

---

## 🎯 microCMS管理画面での設定例

### ステップ1: API作成
```
API名: ブログ
エンドポイント: blog
API型: リスト形式
```

### ステップ2: フィールド追加順序
```
1. title (テキストフィールド) ✅必須
2. slug (テキストフィールド) ✅必須
3. description (テキストエリア) ✅必須
4. genre (セレクトフィールド) ✅必須
   → 選択肢: tech, trends, ideas
5. tags (複数選択) ❌任意
   → 選択肢: Firebase, AI, Next.js, TypeScript, etc.
6. date (日時) ✅必須
7. heroImage (画像) ❌任意
8. heroImageAlt (テキストフィールド) ❌任意
9. sections (繰り返しフィールド) ❌任意
   → サブフィールド7つ（上記参照）
10. contentHtml (リッチエディタV2) ❌任意
```

---

## 📝 記事作成例（microCMS UI操作）

### 例: Firebase Studioの記事

```
■ 基本情報
タイトル: Firebase Studio完全ガイド
スラッグ: firebase-studio-complete-guide
ディスクリプション: Firebase Studioの機能と活用法を徹底解説します。
ジャンル: tech
タグ: Firebase, 開発環境, Google Cloud
公開日: 2025-10-15

■ ヒーロー画像
画像: (Firebase Studioのスクリーンショット)
Alt: Firebase Studioのダッシュボード画面

■ セクション[0]
見出し: はじめに
本文:
  - Firebase Studioは開発者向けの統合環境です。
  - この記事では基本的な使い方を解説します。

■ セクション[1]
見出し: 主な機能
箇条書き:
  - リアルタイムデータベース
  - 認証機能
  - ホスティング

■ セクション[2]
見出し: まとめ
本文:
  - Firebase Studioを活用することで開発効率が向上します。
画像: (活用イメージ図)
Alt: Firebase Studio活用のイメージ
```

---

## 🔄 データ変換の仕組み

### microCMSレスポンス → BlogPost型への変換

```typescript
// lib/microcms-blog.ts の convertMicroCMSPost() 関数
{
  id: "abc123",                          // microCMS側のID
  title: "記事タイトル",
  slug: "article-slug",
  genre: "tech",                         // ← microCMSの"genre"
  tags: ["Firebase", "AI"],              // ← 配列そのまま
  date: "2025-10-15T00:00:00.000Z",      // ← ISO形式
  heroImage: "https://...",
  sections: [
    {
      heading: "見出し",
      body: ["段落1", "段落2"],          // ← 配列
      list: ["項目1", "項目2"],          // ← 配列
      image: "https://...",
      imageAlt: "画像説明",
      table: {
        headers: ["列1", "列2"],
        rows: [["値1", "値2"]]
      }
    }
  ]
}
```

### 自動処理される項目
- `readingTime`: 本文から自動計算（`lib/reading-time.ts`）
- `date`: ISO形式 → `YYYY-MM-DD` に変換
- `tags`: 空配列の場合は`["未分類"]`にフォールバック

---

## ⚠️ よくある間違い

### ❌ NG: `category`フィールドを作る
```json
{
  "category": "tech"  // ← 間違い
}
```
→ **正解**: `genre`フィールドを使う

### ❌ NG: `sections`を選択式フィールドにする
```json
{
  "sections": {
    "kind": "select",
    "selectItems": ["見出し", "本文", "画像"]
  }
}
```
→ **正解**: 繰り返しフィールド（複数セクション入力可能）

### ❌ NG: `tags`を単一選択にする
```json
{
  "tags": {
    "kind": "select",
    "multipleSelect": false  // ← 間違い
  }
}
```
→ **正解**: 複数選択ON（`multipleSelect: true`）

### ❌ NG: `body`や`list`を単一テキストにする
```json
{
  "body": "段落1\n段落2"  // ← 文字列1つでは配列にならない
}
```
→ **正解**: 複数テキストエリア（配列として保存）

---

## 🧪 動作確認手順

### 1. ローカルテスト
```bash
# .env.local を作成
LEXIA_MICROCMS_DOMAIN=lexia
MICROCMS_API_KEY=×

# 開発サーバー起動
pnpm dev

# ブログページで確認
http://localhost:3000/blog
```

### 2. データ確認
```typescript
// lib/blog-posts.ts の fetchAllBlogPosts() が以下を返すか確認
{
  slug: "your-article-slug",
  title: "記事タイトル",
  genre: "tech",          // ← "category"ではない
  tags: ["Tag1", "Tag2"], // ← 配列
  date: "2025-10-15",     // ← YYYY-MM-DD形式
  sections: [...]         // ← 配列
}
```

---

## 📚 参考資料

- `lib/blog-posts.types.ts`: TypeScript型定義
- `lib/microcms-blog.ts`: microCMS → BlogPost変換ロジック
- `lib/blog-posts-fallback.ts`: 既存記事の構造サンプル
- `MICROCMS_SCHEMA_GUIDE.md`: 詳細なスキーマガイド
- `AGENTS.md`: エージェント向け運用ルール

---

## 🎯 まとめ

### 必須設定
1. ✅ `genre`（セレクト: tech/trends/ideas）
2. ✅ `tags`（複数選択）
3. ✅ `date`（日時）
4. ✅ `sections`（繰り返しフィールド + 7サブフィールド）

### 間違えやすいポイント
- ❌ `category` → ✅ `genre`
- ❌ `sections`を選択式 → ✅ 繰り返しフィールド
- ❌ `body`を単一テキスト → ✅ 複数テキストエリア
- ❌ `tags`を単一選択 → ✅ 複数選択

この設定により、既存のフォールバック記事と同等の柔軟性を持つブログ記事をmicroCMSで管理できます。
