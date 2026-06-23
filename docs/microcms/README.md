# microCMS 統合ガイド（統合版）

> このドキュメントは、リポジトリ ルートに散在していた 9 個の microCMS 関連
> Markdown を 1 つに統合・重複排除したものです。
> **実コード（`lib/microcms.ts` / `lib/microcms-blog.ts` / `lib/blog-posts.types.ts`）を正とし、
> 古いドキュメントと食い違う箇所は「⚠️ 旧記載との差異」として明記しています。**
>
> 旧ファイルとの対応関係は末尾の [旧ドキュメント対応表](#旧ドキュメント対応表) を参照してください。

最終更新の基準コード: `lib/microcms-blog.ts`（2025-10-17 スキーマ変更対応コメントあり）

---

## 目次

1. [概要](#概要)
2. [セットアップ / 環境変数](#セットアップ--環境変数)
3. [エンドポイント・スキーマ](#エンドポイントスキーマ)
4. [フィールドフォーマット](#フィールドフォーマット)
5. [見出し / 目次(ToC)の扱い](#見出し--目次tocの扱い)
6. [記事の登録方法（読み取り / 書き込み）](#記事の登録方法読み取り--書き込み)
7. [Vercel ビルド関連の注意点](#vercel-ビルド関連の注意点)
8. [トラブルシューティング / FAQ](#トラブルシューティング--faq)
9. [旧ドキュメント対応表](#旧ドキュメント対応表)

---

## 概要

LEXIA ブログの記事は microCMS で管理されています。このリポジトリにおける microCMS の役割は次のとおりです。

- **読み取り中心**: アプリは microCMS の Content API（GET）から記事を取得して表示します。
  実装は `lib/microcms-blog.ts`（記事取得・型変換）と `lib/microcms.ts`（fetch ラッパー）です。
- **書き込み（POST）は未実装**: コードベースに記事作成・更新のロジックはありません。
  記事の追加・編集は基本的に microCMS の管理画面で行います。
  （ただし「書き込み権限付き API キー」を使えば Content API への POST 自体は技術的に可能です。
  詳細は [記事の登録方法](#記事の登録方法読み取り--書き込み) を参照。）
- **フォールバック併用**: microCMS への接続が失敗した場合、`lib/blog-posts-fallback.ts` の
  静的データを使用します。両方にデータがある場合は **同一スラッグでは microCMS を優先** し、
  結合後に日付降順でソートします（`lib/blog-posts.ts`）。

### データフロー

```
ブログページ (Server Component)
      │
      ▼
lib/blog-posts.ts  fetchBlogPosts() / fetchBlogPost(slug)
      │  microCMS 取得を試行
      ▼
lib/microcms-blog.ts  fetchMicroCMSBlogPosts() / fetchMicroCMSBlogPost(slug)
      │
      ▼
lib/microcms.ts  microcmsFetch()  ── GET https://<domain>.microcms.io/api/v1/blog
      │
   ┌──┴──────────────┐
 成功              失敗/未設定
   │                 │
microCMS 記事     fallback 記事 (lib/blog-posts-fallback.ts)
   └──────┬──────────┘
          ▼
  同一スラッグは microCMS 優先で結合 → 日付降順ソート
          ▼
  読了時間を自動計算 (lib/reading-time.ts)
          ▼
  ブログ一覧 / 個別ページに表示
```

---

## セットアップ / 環境変数

### 必要な環境変数（実コード準拠）

`lib/microcms.ts` が参照するのは次のとおりです。

```bash
# サービスドメイン（サブドメイン名のみ。例: lexia → https://lexia.microcms.io）
# LEXIA_MICROCMS_DOMAIN が優先。無ければ NEXT_PUBLIC_MICROCMS_DOMAIN が使われる。
LEXIA_MICROCMS_DOMAIN=your-service-name
# もしくは
NEXT_PUBLIC_MICROCMS_DOMAIN=your-service-name

# Content API の API キー（読み取り権限があれば表示はできる）
MICROCMS_API_KEY=your-api-key
```

該当コード（`lib/microcms.ts`）:

```ts
const serviceDomain = process.env.LEXIA_MICROCMS_DOMAIN || process.env.NEXT_PUBLIC_MICROCMS_DOMAIN
const apiKey = process.env.MICROCMS_API_KEY
```

> ⚠️ **旧記載との差異**: 一部の旧ドキュメント（`MICROCMS_INTEGRATION_REPORT.md`、`.env.example`）では
> `MICROCMS_SERVICE_DOMAIN` という変数名が使われていますが、**現行コードはこの変数を読みません**。
> 正しくは `LEXIA_MICROCMS_DOMAIN`（または `NEXT_PUBLIC_MICROCMS_DOMAIN`）です。
> `MICROCMS_SERVICE_DOMAIN` を設定しても無視され、`... is not configured` エラーになります。

> 補足: API リクエストヘッダは **`X-MICROCMS-API-KEY`** です（`lib/microcms.ts`）。
> microCMS 公式の標準ヘッダ名であり、これ以外の名前は使いません。

### ローカル開発

プロジェクトルートに `.env.local` を作成し、上記の変数を設定します。

```bash
LEXIA_MICROCMS_DOMAIN=lexia
MICROCMS_API_KEY=（microCMS ダッシュボード → サービス設定 → API キー で取得）
```

開発サーバー起動:

```bash
pnpm install   # 初回のみ
pnpm dev
```

確認 URL:

- 記事一覧: <http://localhost:3000/blog>
- 個別記事: <http://localhost:3000/blog/[slug]>

環境変数を変更したら開発サーバーを再起動してください（`Ctrl+C` → `pnpm dev`）。

### Vercel 設定

1. Vercel プロジェクト → **Settings** → **Environment Variables**
2. `LEXIA_MICROCMS_DOMAIN`（または `NEXT_PUBLIC_MICROCMS_DOMAIN`）と `MICROCMS_API_KEY` を追加
3. **Production / Preview / Development** すべてにチェック

### キャッシュ / ISR

`lib/microcms.ts` と `lib/microcms-blog.ts` で次の再検証設定が入っています。

- `revalidate: 60`（60 秒ごとに再検証）
- タグベースキャッシュ: 一覧は `microcms-blog`、個別記事は `microcms-blog-${slug}`

microCMS で記事を更新後、最大 60 秒で反映されます。即時反映したい場合は Vercel で再デプロイします。

---

## エンドポイント・スキーマ

### エンドポイント

- **エンドポイント名**: `blog`（リスト形式 API）
- 取得 URL: `https://<serviceDomain>.microcms.io/api/v1/blog`
- 一覧取得時のクエリ: `limit`（既定 100）, `orders=-date`（日付降順）
- 個別取得時のクエリ: `filters=slug[equals]<slug>`, `limit=1`

エンドポイント名を変える場合は `lib/microcms-blog.ts` 内の `"blog"` を書き換えます。

### 現行スキーマ（実コード `MicroCMSBlogPost` 型に準拠）

記事 1 件のフィールド構成です。**本文は A / B / C の 3 アプローチのいずれか**を使えます
（後述の [本文の 3 アプローチ](#本文の-3-アプローチ) を参照）。

| フィールドID | 種類 | 必須 | 説明 |
|---|---|---|---|
| `slug` | テキスト | ✅ | URL 用スラッグ。空・非文字列だと変換時に弾かれる |
| `title` | テキスト | ✅ | 記事タイトル。非文字列だと変換時に弾かれる |
| `description` | テキストエリア | 推奨 | OG / Twitter カード用要約。無い場合は空文字 `""` で扱われる |
| `genre` | セレクト | ✅ | ジャンル（後述）。**配列で返る場合は先頭要素を採用**。未設定時は `"AI"` |
| `tags` | 複数選択 | 任意 | タグ配列。空または未設定なら `undefined`（＝表示なし） |
| `date` | 日時 | ✅ | 公開日 |
| `latest_update` | 日時 | 任意 | 最終更新日（新規フィールド・2025-10-17 追加） |
| `heroImage` | 画像 | 任意 | アイキャッチ。**microCMS は画像をオブジェクト `{url,...}` で返す**ため、コード側で URL を抽出 |
| `heroImageAlt` | テキスト | 任意 | アイキャッチの代替テキスト |
| `contentHtml` | リッチエディタV2 | 任意 | 本文 HTML（アプローチA） |
| `sections` | 繰り返し | 任意 | 構造化セクション（アプローチB） |
| `custom` | 繰り返し | 任意 | 本文ブロック（アプローチC・新スキーマ） |

> ⚠️ **旧記載との差異（重要）**:
> - 旧ドキュメント（`MICROCMS_BLOG_GUIDE.md`, `MICROCMS_CORRECT_SCHEMA.md`,
>   `MICROCMS_SCHEMA_GUIDE.md`, `MICROCMS_QUICK_REFERENCE.md`, `MICROCMS_INTEGRATION_REPORT.md`）は
>   `genre` の選択肢を **`tech` / `trends` / `ideas`** と説明していますが、
>   **現行の型 (`BlogGenre`) は異なります**（下記）。`trends` / `ideas` は型に存在しません。
> - 旧ドキュメントは `sections` を **必須** としていますが、現行コードでは `sections` は任意です
>   （`contentHtml` や `custom` だけでも記事は成立します）。
> - 旧ドキュメントは `tags` を「必須・空なら `["未分類"]`」と記述していますが、
>   現行コードでは **任意**で、空・未設定なら `undefined`（フォールバック値なし）です。

### genre の選択肢（現行 `BlogGenre` 型）

`lib/blog-posts.types.ts` の定義:

```ts
export type BlogGenre =
  "AI" | "Frontend" | "Backend" | "Update" | "Full-stack" | "Security" | "Api" | "tech"
```

- microCMS のセレクト値はこのいずれかにしてください。
- 未設定または配列が空の場合、コードは既定値 **`"AI"`** にフォールバックします。
- microCMS が値を配列で返した場合は先頭要素を採用します。

> 補足: 旧ドキュメントの `tech` は型に残っていますが、`trends` / `ideas` は **使われません**。
> microCMS のセレクト選択肢は上記 8 種に合わせて設定し直してください。

---

## フィールドフォーマット

microCMS には「複数テキストエリア（配列の文字列）」という入力種別が無いため、
一部のフィールドは **改行 / カンマ区切りのプレーンテキスト**で入力し、
`lib/microcms-blog.ts` の `convertMicroCMSPost()` が配列・テーブルへ変換します。

### 画像フィールド（heroImage / sections.image / custom.body_img）

microCMS は画像をオブジェクト（`{ url, width, height }`）で返すことがあります。
コードは文字列ならそのまま、オブジェクトなら `.url` を抽出して使います。
入力者が意識する必要はありません（microCMS の画像フィールドにアップロードするだけ）。

### genre / tags / date

- `genre`: セレクトで [上記 8 種](#genre-の選択肢現行-bloggenre-型) から選択。
- `tags`: 複数選択。1〜3 個程度を推奨。未設定でも可（`undefined` 扱い）。
- `date`: microCMS の日時フィールド。コードは値を加工せず `BlogPost.date` に渡します。
- `latest_update`: 最終更新日（任意）。設定すると `BlogPost.latest_update` に渡ります。

### 本文の 3 アプローチ

| アプローチ | フィールド | 用途 |
|---|---|---|
| **A: contentHtml** | `contentHtml`（リッチエディタV2） | 全文を HTML で自由記述。見出し自動抽出 ToC と相性が良い |
| **B: sections** | `sections`（繰り返し） | 構造化セクション。fallback データと互換 |
| **C: custom** | `custom`（繰り返し） | 新スキーマの本文ブロック（body_text / body_img / others_cta） |

> 同一記事で複数アプローチを併用する設計は想定されていません。基本はいずれか 1 つを使います。

#### アプローチ B: `sections` のサブフィールドと入力規則

| サブフィールド | 種類 | 入力規則 → 変換後 |
|---|---|---|
| `heading` | テキスト | セクション見出し（H2 相当）。そのまま |
| `body` | テキストエリア | **改行区切り** → `string[]`（空行はトリムで除去） |
| `richtext` | リッチエディタV2 | HTML 文字列としてそのまま保持 |
| `list` | テキストエリア | **改行区切り** → `string[]`（記号は付けない。UI が `<ul><li>` 化） |
| `image` | 画像 | URL を抽出 |
| `imageAlt` | テキスト | 画像の代替テキスト |
| `tableHeaders` | テキストエリア | **カンマ区切り** → ヘッダー配列 |
| `tableRows` | テキストエリア | **行は改行区切り・セルはカンマ区切り** → 2 次元配列 |

`tableHeaders` と `tableRows` が **両方揃ったときだけ** `table: { headers, rows }` が生成されます。

変換ロジック（抜粋・`convertMicroCMSPost`）:

```ts
// body / list: 改行区切り → 配列
section.body.split("\n").map(l => l.trim()).filter(l => l.length > 0)

// tableHeaders: カンマ区切り → 配列
section.tableHeaders.split(",").map(h => h.trim()).filter(h => h.length > 0)

// tableRows: 改行で行、カンマでセル → 2 次元配列
section.tableRows.split("\n")...map(row => row.split(",").map(c => c.trim()))
```

入力例（microCMS のセクション）と変換結果:

```
■ セクション
見出し: Infisicalの主な機能
本文:
Infisicalは、シークレット管理を容易にする機能を提供します。
以下では代表的な機能を紹介します。
箇条書き:
ダッシュボードによる一元管理
ネイティブ統合（GitHub Actions、Vercel、AWS）
画像Alt: Infisicalのダッシュボード画面
```

```ts
{
  heading: "Infisicalの主な機能",
  body: ["Infisicalは、シークレット管理を容易にする機能を提供します。",
         "以下では代表的な機能を紹介します。"],
  list: ["ダッシュボードによる一元管理",
         "ネイティブ統合（GitHub Actions、Vercel、AWS）"],
  imageAlt: "Infisicalのダッシュボード画面"
}
```

よくある入力ミス:

- ❌ 段落をカンマ区切り → ✅ **改行**で区切る
- ❌ 箇条書きに `- ` を付ける → ✅ 記号なし（UI が自動でリスト化）
- ❌ `tableHeaders` を改行で入力 → ✅ **カンマ**区切り
- ❌ `tableRows` を 1 行に全部 → ✅ **行は改行・セルはカンマ**

> ⚠️ **旧記載との差異**: 旧 `sections` 表（`MICROCMS_CORRECT_SCHEMA.md` ほか）には
> `richtext` サブフィールドの記載がありませんが、現行コードは `sections[].richtext`
> （HTML をそのまま保持）に対応しています。

#### アプローチ C: `custom` ブロック（新スキーマ）

`custom` は繰り返しフィールドで、各ブロックは次のサブフィールドを持ちます（`MicroCMSBlogPost` 型）。

| サブフィールド | 種類 | 説明 |
|---|---|---|
| `body_text` | リッチエディタV2（HTML） | 本文ブロックの HTML |
| `body_img` | 画像（または URL 文字列） | 本文中の画像。オブジェクトなら `.url` を抽出 |
| `others_cta` | 参照（id / slug / title） | 他記事への導線（CTA） |

> このアプローチは現行コードにのみ存在し、旧 9 ドキュメントには記載がありません。

---

## 見出し / 目次(ToC)の扱い

**現行方式は「リッチエディタV2（`contentHtml`）からの自動抽出」です。**
`contentHtml` 内の見出しタグ（h2〜h6）が自動的に抽出され、目次とアンカーリンクが生成されます。
通常、見出し用フィールドを手で入力する必要はありません。

```html
<!-- contentHtml -->
<h2>背景と課題</h2>
<p>本文...</p>
<h2>解決策</h2>
<h3>実装例</h3>
```

→ 上記 3 見出しが自動的に目次に表示されます。

注意点:

- **h1 は使わない**（記事タイトル専用）。本文は h2〜h6。
- 同じ見出しテキストが複数回登場しても、システムがユニークな ID を生成します。

> ⚠️ **ドキュメントのバージョン整理**:
> - `MICROCMS_HEADINGS_GUIDE.md`（**旧 / V1**）: 手動カスタマイズ用に `headings`
>   （繰り返しフィールド：`text` + `level`）を案内。
> - `MICROCMS_HEADINGS_GUIDE_V2.md`（**現行 / V2**）: 手動カスタマイズ用フィールドを
>   `headingsText`（テキストエリア・改行区切り、`##`/`###` でレベル指定）に変更。
>   **V2 が現行**です。V1 の `headings` 方式は V2 に置き換えられています。
> - ⚠️ **実コードとの差異**: ただし `lib/microcms-blog.ts` の変換ロジックは
>   `headings` も `headingsText` も読み取っていません（`MicroCMSBlogPost` 型にこれらのフィールドはありません）。
>   `BlogPost.headings` 型は存在しますが、microCMS から流し込む処理は本ファイルには無く、
>   見出しは `contentHtml` からの自動抽出に依存しています。手動カスタマイズフィールドを
>   実際に使うには別途の実装確認が必要です（ToC の技術実装は `TOC_IMPLEMENTATION.md` を参照）。

---

## 記事の登録方法（読み取り / 書き込み）

### 読み取り（実装済み）

アプリ側の取得は実装済みです。記事は microCMS 管理画面で作成・公開すれば、
ISR（最大 60 秒）でサイトに反映されます。

microCMS 管理画面での基本手順:

1. ダッシュボード → エンドポイント **blog** → **コンテンツを追加**
2. 必須項目を入力: `slug`, `title`, `genre`, `date`（`description` も推奨）
3. 本文を [3 アプローチ](#本文の-3-アプローチ)のいずれかで入力（A: contentHtml が手軽）
4. 必要に応じて `heroImage` / `heroImageAlt` / `tags` / `latest_update` を設定
5. **公開**

記事作成時のスタイル・画像指針は `AGENTS.md` を参照してください。

### 書き込み（POST）について

- **このリポジトリに記事作成・更新の POST 実装はありません**（`microcmsFetch` は GET 用途のみ）。
- ただし microCMS の **Content API は POST/PUT/PATCH に対応**しており、
  **書き込み権限を持つ API キー**を `X-MICROCMS-API-KEY` ヘッダに付ければ、
  外部スクリプトから `POST https://<domain>.microcms.io/api/v1/blog` で記事を作成することは
  技術的に可能です（公式仕様）。本リポジトリではこのフローを使っていないだけです。
- 自動投稿を実装する場合は、**書き込みキーをクライアントに露出させない**（サーバー側のみで使用）
  点に注意してください。現行の読み取りキーは表示用です。

---

## Vercel ビルド関連の注意点

過去に、`"server-only"` を含むモジュールをクライアントコンポーネントから間接 import したことで
Vercel ビルドが失敗しました（`VERCEL_BUILD_FIX_MICROCMS.md`）。

### 原因

```
components/blog/GenreFilterList.tsx ("use client")
  → lib/blog-posts.ts
    → lib/microcms-blog.ts   （旧: import "server-only"）
      → lib/microcms.ts      （旧: import "server-only"）
```

クライアントコンポーネントからの **間接 import** でも `"server-only"` 制限に抵触します。

### 現行の対処（実コード準拠）

- `lib/microcms.ts` / `lib/microcms-blog.ts` から **`import "server-only"` を削除**。
- 代わりに `lib/microcms.ts` の `microcmsFetch` に **クライアント実行ガード**を実装。
  ただし現行コードは **エラーを throw せず、空データを返して警告ログを出します**:

  ```ts
  if (typeof window !== "undefined") {
    console.warn("[v0] microcmsFetch called on client side, returning empty data")
    return { contents: [], totalCount: 0, offset: 0, limit: 0 } as T
  }
  ```

  > ⚠️ **旧記載との差異**: `VERCEL_BUILD_FIX_MICROCMS.md` は
  > 「クライアント実行時に `Error` を throw する」と書いていますが、
  > **現行コードは throw せず空データを返す**実装に変わっています。

### 安全性のポイント

- 環境変数（`LEXIA_MICROCMS_DOMAIN` / `MICROCMS_API_KEY`）は `process.env` 経由で
  サーバーサイドのみ参照（`NEXT_PUBLIC_*` を使う場合はクライアント露出に注意）。
- データ取得は Server Component / `cache()` 経由で実行し、API キーをクライアントに渡さない。
- 型定義・エラークラス（`MicroCMSApiError`）はデータを含まないためクライアントから import 可。

### 画像の remotePatterns

microCMS の画像を `next/image` で表示するため、`next.config.mjs` の
`images.remotePatterns` に microCMS のアセットドメインを登録してください。

```js
images: {
  remotePatterns: [{ hostname: "images.microcms-assets.io" }]
}
```

---

## トラブルシューティング / FAQ

### エラー: `LEXIA_MICROCMS_DOMAIN or NEXT_PUBLIC_MICROCMS_DOMAIN is not configured`

ドメイン環境変数が未設定です。`.env.local` / Vercel に
`LEXIA_MICROCMS_DOMAIN`（または `NEXT_PUBLIC_MICROCMS_DOMAIN`）を設定し、サーバーを再起動します。
（`MICROCMS_SERVICE_DOMAIN` という名前は無効です。）

### エラー: `MICROCMS_API_KEY is not configured`

`MICROCMS_API_KEY` が未設定です。設定後、サーバーを再起動します。

### エラー: `MicroCMS API request failed: 401`

API キーが無効、または権限不足です。読み取り権限のあるキーを設定してください。

### エラー: `MicroCMS API request failed: 404`

エンドポイント名の不一致です。microCMS の API 設定と `lib/microcms-blog.ts` の `"blog"` を確認します。

### 記事が表示されない

- microCMS で記事が「公開」状態か
- `slug` が設定されているか（空・非文字列だと変換時にスキップされる）
- `title` が設定されているか
- `genre` が [現行の 8 種](#genre-の選択肢現行-bloggenre-型) のいずれかか
- 個別記事の変換に失敗した場合、その記事だけスキップされ他は表示されます（ログに `Failed to convert microCMS post` が出る）

### フォールバック記事だけ表示される

microCMS への接続に失敗しています。ネットワーク・API キー・ドメインを確認してください。
microCMS 障害状況: <https://status.microcms.io/>

### Q. 読了時間はどこで設定する？

設定不要です。`lib/reading-time.ts` が全本文から自動計算します（microCMS 側に値を入れても無視）。

### Q. セクションの順番は変えられる？

microCMS の繰り返しフィールドはドラッグ&ドロップで並び替え可能です。

### Q. slug は後から変えられる？

技術的には可能ですが URL が変わり SEO に影響します。公開前に確定させてください。

---

## 旧ドキュメント対応表

> **注意**: 元の 9 ファイルはルートに残してあります（削除・移動はしていません）。
> 本統合ドキュメントが現行の正本です。以下は取り込み内容と陳腐化（superseded）の整理です。

| 元ファイル | 取り込んだ内容 | 状態 |
|---|---|---|
| `MICROCMS_BLOG_GUIDE.md` | 環境変数手順、デプロイ、トラブルシューティング、fallback 併用 | **統合済 / 一部 superseded**（env 名・genre・sections 必須が古い） |
| `MICROCMS_CORRECT_SCHEMA.md` | スキーマ全体、sections サブフィールド、入力ミス例、変換概要 | **統合済 / 一部 superseded**（genre 値・tags 必須・readingTime/未分類フォールバックが古い） |
| `MICROCMS_FIELD_FORMAT.md` | 改行/カンマ区切りの入力規則と変換ロジック | **統合済**（[フィールドフォーマット](#フィールドフォーマット)に反映、ほぼ現行） |
| `MICROCMS_HEADINGS_GUIDE.md` | ToC（`headings` 繰り返しフィールド方式） | **superseded（V1）**（V2 = `headingsText` に置換） |
| `MICROCMS_HEADINGS_GUIDE_V2.md` | ToC（`headingsText` テキストエリア方式・自動抽出） | **統合済 / 現行**（ただし実コードは両フィールド未読込の旨を追記） |
| `MICROCMS_INTEGRATION_REPORT.md` | Sanity→microCMS 移行の経緯、データフロー、依存削減 | **統合済（履歴系） / 一部 superseded**（`MICROCMS_SERVICE_DOMAIN`・genre が古い） |
| `MICROCMS_QUICK_REFERENCE.md` | 最小構成、セクション構成パターン、genre 早見、FAQ | **統合済 / 一部 superseded**（genre 値・必須範囲・検証ルールが古い） |
| `MICROCMS_SCHEMA_GUIDE.md` | 管理画面でのフィールド作成手順（詳細版）、記事作成例 | **統合済（参照用に温存推奨） / 一部 superseded**（genre 値・sections 必須が古い） |
| `VERCEL_BUILD_FIX_MICROCMS.md` | server-only 削除、クライアント実行ガード、ビルド修正経緯 | **統合済 / 一部 superseded**（throw → 空データ返却に変更済み） |

### アーカイブ（参照のみ）推奨

完全に新版へ置き換わっており、内容的に冗長なもの:

- `MICROCMS_HEADINGS_GUIDE.md`（V1。V2 に置換済み）
- `MICROCMS_INTEGRATION_REPORT.md` / `VERCEL_BUILD_FIX_MICROCMS.md`（完了済みの作業履歴。要点は本書に反映済み）
- `MICROCMS_BLOG_GUIDE.md` / `MICROCMS_QUICK_REFERENCE.md` / `MICROCMS_CORRECT_SCHEMA.md`（本書に統合済み。古い genre/env 記載に注意）

### 管理画面の詳細手順を残す価値があるもの

- `MICROCMS_SCHEMA_GUIDE.md`: 各フィールドの microCMS 管理画面での **クリック単位の作成手順**が
  詳細にあるため、初回スキーマ構築時の参照資料として温存する価値があります
  （ただし genre 値は現行 8 種へ読み替えること）。

---

## 関連ファイル

- `lib/microcms.ts` — fetch ラッパー（env / ヘッダ / ISR / クライアントガード）
- `lib/microcms-blog.ts` — 記事取得・`MicroCMSBlogPost` 型・`convertMicroCMSPost()`
- `lib/blog-posts.types.ts` — `BlogPost` / `BlogGenre` / `BlogHeading` / `BlogCustomBlock`
- `lib/blog-posts.ts` — microCMS + fallback の結合・ソート
- `lib/blog-posts-fallback.ts` — フォールバック記事データ
- `lib/reading-time.ts` — 読了時間の自動計算
- `AGENTS.md` — ブログ記事作成ワークフロー / スタイル指針
- `TOC_IMPLEMENTATION.md` — 目次機能の技術実装詳細
- [microCMS 公式ドキュメント](https://document.microcms.io/)
