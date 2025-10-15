# microCMS ブログ統合ガイド

LEXIAブログはmicroCMSで管理されています。このガイドでは、microCMSの設定と使用方法を説明します。

## 📋 目次

1. [環境変数の設定](#環境変数の設定)
2. [microCMSのAPIスキーマ](#microcmsのapiスキーマ)
3. [記事の追加方法](#記事の追加方法)
4. [ローカル開発](#ローカル開発)
5. [デプロイ設定](#デプロイ設定)
6. [トラブルシューティング](#トラブルシューティング)

## 🔧 環境変数の設定

### ローカル開発用

プロジェクトルートに `.env.local` ファイルを作成し、以下の環境変数を設定します:

```bash
# microCMS設定
MICROCMS_SERVICE_DOMAIN=your-service-name
MICROCMS_API_KEY=your-api-key
```

### 環境変数の取得方法

1. **microCMSダッシュボード**にログイン
2. **サービス設定** → **APIキー**から確認
   - `MICROCMS_SERVICE_DOMAIN`: サービス名（例: `lexia-blog`）
   - `MICROCMS_API_KEY`: APIキー（読み取り専用推奨）

### Vercel用設定

Vercelダッシュボードで環境変数を設定:

1. プロジェクト → **Settings** → **Environment Variables**
2. 以下の変数を追加:
   - `MICROCMS_SERVICE_DOMAIN`
   - `MICROCMS_API_KEY`
3. 環境: **Production**, **Preview**, **Development** すべてにチェック

## 📝 microCMSのAPIスキーマ

### エンドポイント名
`blog` (変更する場合は `lib/microcms-blog.ts` を更新)

### フィールド定義

| フィールドID | 種類 | 必須 | 説明 |
|---|---|---|---|
| `slug` | テキスト | ✅ | 記事のURL用スラッグ（英数字とハイフン） |
| `title` | テキスト | ✅ | 記事タイトル |
| `description` | テキストエリア | ✅ | 記事の概要（OG/Twitter用） |
| `genre` | セレクト | ✅ | カテゴリ: `tech`, `trends`, `ideas` |
| `tags` | 複数選択 | ✅ | タグ（最大3つ推奨） |
| `date` | 日時 | ✅ | 公開日（YYYY-MM-DD形式） |
| `heroImage` | 画像 | 任意 | アイキャッチ画像（1200×675px推奨） |
| `sections` | 繰り返し | ✅ | 記事本文セクション |

### `sections` フィールドの構造

繰り返しフィールド内のフィールド:

| フィールドID | 種類 | 必須 | 説明 |
|---|---|---|---|
| `heading` | テキスト | 任意 | セクション見出し（H2相当） |
| `body` | 複数テキスト | 任意 | 本文段落（配列） |
| `list` | 複数テキスト | 任意 | 箇条書きリスト |
| `image` | 画像 | 任意 | セクション内画像 |

### genre の選択肢設定

セレクトフィールド `genre` に以下の選択肢を追加:

- **tech**: 技術・実装（Tech / Implementation）
- **trends**: トレンド・先端（Trends / Innovation）
- **ideas**: 戦略・構想（Strategy / Ideas）

## ✍️ 記事の追加方法

### microCMSでの新規記事作成

1. microCMSダッシュボード → **blog** → **コンテンツを追加**
2. 必須フィールドを入力:
   ```
   slug: nextjs-15-migration-guide
   title: Next.js 15 移行ガイド
   description: Next.js 15の新機能と移行手順を徹底解説
   genre: tech
   tags: [Next.js, React, Web開発]
   date: 2025-10-15
   heroImage: [画像をアップロード]
   ```

3. セクションを追加:
   ```
   sections[0]:
     body: ["導入文を1〜2段落で記述..."]
   
   sections[1]:
     heading: "新機能の概要"
     body: ["本文段落1...", "本文段落2..."]
     list: ["機能1の説明", "機能2の説明"]
     image: [セクション内画像]
   ```

4. **公開**ボタンをクリック

### フォールバックデータとの併用

- microCMSが利用できない場合、`lib/blog-posts-fallback.ts` のデータを使用
- microCMSとフォールバックで同じスラッグがある場合、microCMSを優先
- フォールバックデータは `AGENTS.md` のガイドに従って管理

## 🛠️ ローカル開発

### 開発サーバーの起動

```powershell
# 依存関係のインストール（初回のみ）
pnpm install

# 開発サーバー起動
pnpm dev
```

### ブログページの確認

- 記事一覧: http://localhost:3000/blog
- 個別記事: http://localhost:3000/blog/[slug]

### microCMS接続確認

ターミナルで以下をチェック:

```
✓ microCMS connected: fetched 10 posts
```

エラーが出る場合:
```
⚠ microCMS fetch failed, using fallback posts only
```
→ 環境変数とAPIキーを確認

## 🚀 デプロイ設定

### Vercelへのデプロイ

1. **環境変数の設定**（前述参照）
2. **Git push**でデプロイ:
   ```powershell
   git add .
   git commit -m "feat(blog): add new article via microCMS"
   git push origin main
   ```

3. Vercelが自動ビルド・デプロイ
4. デプロイログで確認:
   ```
   ✓ Fetching blog posts from microCMS...
   ✓ Successfully fetched 15 posts
   ```

### ISR（Incremental Static Regeneration）

- **再検証間隔**: 60秒（`lib/microcms-blog.ts` で設定）
- microCMSで記事を更新後、最大60秒で反映
- 手動再検証が必要な場合: Vercelダッシュボード → **Deployments** → **Redeploy**

## 🔍 トラブルシューティング

### エラー: `MICROCMS_SERVICE_DOMAIN is not configured`

**原因**: 環境変数が設定されていない

**解決策**:
1. `.env.local` ファイルを確認
2. Vercelの環境変数を確認
3. 開発サーバーを再起動: `Ctrl+C` → `pnpm dev`

### エラー: `MicroCMS API request failed: 401`

**原因**: APIキーが無効または権限不足

**解決策**:
1. microCMSダッシュボードでAPIキーを確認
2. 読み取り権限があるか確認
3. `.env.local` の `MICROCMS_API_KEY` を更新

### エラー: `MicroCMS API request failed: 404`

**原因**: エンドポイント名が間違っている

**解決策**:
1. microCMSのAPI設定でエンドポイント名を確認
2. `lib/microcms-blog.ts` の `"blog"` を実際のエンドポイント名に変更

### 記事が表示されない

**チェックリスト**:
- [ ] microCMSで記事が「公開」状態か
- [ ] `slug` フィールドが設定されているか
- [ ] `genre` が `tech`, `trends`, `ideas` のいずれかか
- [ ] `date` フィールドが正しい形式か（YYYY-MM-DD）

**デバッグ方法**:
```typescript
// lib/microcms-blog.ts に追加
console.log('Fetched microCMS posts:', response.contents)
```

### フォールバックデータのみ表示される

**原因**: microCMSへの接続失敗

**確認手順**:
1. ブラウザコンソールで警告を確認:
   ```
   ⚠ microCMS fetch failed, using fallback posts only
   ```
2. ネットワークタブでAPIリクエストを確認
3. microCMSのステータスページを確認: https://status.microcms.io/

## 📚 関連ドキュメント

- [AGENTS.md](./AGENTS.md) - ブログ記事作成ガイド（画像・スタイル指針）
- [lib/blog-posts.types.ts](./lib/blog-posts.types.ts) - 型定義
- [lib/blog-posts-fallback.ts](./lib/blog-posts-fallback.ts) - フォールバックデータ
- [microCMS公式ドキュメント](https://document.microcms.io/)

## 🔄 今後の拡張案

- [ ] 下書き機能のサポート
- [ ] カテゴリの動的追加
- [ ] 著者情報の追加
- [ ] コメント機能
- [ ] 関連記事の自動推薦（AI活用）

---

**更新日**: 2025-10-15  
**管理者**: LEXIA開発チーム
