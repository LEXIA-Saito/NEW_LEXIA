# Sanity CMS セットアップガイド

このプロジェクトでは、ブログ記事の管理にSanity CMSを使用できます。

## 初期セットアップ

### 1. 必要なパッケージのインストール

```bash
npm install @sanity/vision
```

### 2. 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```bash
SANITY_PROJECT_ID=your_project_id_here
SANITY_DATASET=production
SANITY_API_VERSION=2025-10-01
```

### 3. Sanity Studioのビルド

```bash
npm run sanity-build
```

### 4. Sanity Studioの起動

```bash
npm run sanity-dev
```

Sanity Studioが `http://localhost:3333` で起動します。

### 5. 初回ログイン

1. ブラウザで `http://localhost:3333` にアクセス
2. Sanityアカウントでログイン
3. プロジェクトの設定を確認

## ブログ記事の管理

### 記事の作成

1. Sanity Studioで「Blog Post」を選択
2. 以下のフィールドを入力：
   - **Title**: 記事タイトル
   - **Slug**: URL用のスラッグ（自動生成）
   - **Description**: 記事の説明文
   - **Genre**: カテゴリ（Tech/Trends/Ideas）
   - **Tags**: タグの配列
   - **Publish Date**: 公開日
   - **Hero Image URL**: ヒーロー画像のURL
   - **Hero Image Alt Text**: ヒーロー画像の代替テキスト
   - **Sections**: 記事のセクション（配列）
   - **Content HTML**: 追加のHTMLコンテンツ（オプション）

### セクションの構造

各セクションには以下のフィールドがあります：

- **Heading**: セクションの見出し
- **Body Paragraphs**: 本文の段落（配列）
- **Inline Image URL**: セクション内の画像URL
- **Image Alt Text**: 画像の代替テキスト
- **List Items**: リスト項目（配列）
- **Table**: テーブルデータ（ヘッダーと行のオブジェクト配列）

## データの統合

### Sanity + Fallback システム

このプロジェクトは以下の優先順位でブログ記事を取得します：

1. **Sanity CMS**: 最優先でSanityから記事を取得
2. **Fallback Posts**: Sanityが利用できない場合やSanityにない記事は`lib/blog-posts-fallback.ts`から取得
3. **重複回避**: 同じスラッグの記事がある場合、Sanityの記事が優先される

### 読了時間の自動計算

- 記事の内容（タイトル、説明、セクション）から自動的に読了時間を計算
- 400文字/分の基準で計算
- Sanity記事とfallback記事の両方で統一された計算ロジックを使用

## 関連記事CTA

記事内で関連記事CTAを表示するには、以下のプレースホルダーを使用：

```
{{RELATED_ARTICLE:記事のスラッグ}}
```

例：
```
{{RELATED_ARTICLE:firebase-studio-getting-started-lexia}}
```

## デプロイメント

### Sanity Studioのデプロイ

```bash
npm run sanity-deploy
```

### 本番環境での注意点

- 環境変数が正しく設定されていることを確認
- Sanityが利用できない場合でも、fallback記事で正常に動作
- 読了時間は常に動的に計算される

## トラブルシューティング

### Sanity Studioが起動しない場合

1. **設定ファイルエラー**
   ```bash
   # sanity.config.tsがプロジェクトルートにあることを確認
   ls sanity.config.ts
   ```

2. **依存関係エラー**
   ```bash
   npm install @sanity/vision
   npm run sanity-build
   ```

3. **ポート競合**
   ```bash
   # 別のポートで起動
   sanity dev --port 3334
   ```

### Sanityに接続できない場合

- 環境変数が正しく設定されているか確認
- プロジェクトIDとデータセット名が正しいか確認
- ネットワーク接続を確認

### 記事が表示されない場合

- Sanityで記事が公開されているか確認
- スラッグが正しく設定されているか確認
- ブラウザのコンソールでエラーを確認

### 関連記事CTAが表示されない場合

- プレースホルダーの構文が正しいか確認
- 参照している記事のスラッグが存在するか確認
- 記事がSanityまたはfallbackに存在するか確認
### 
記事が表示されない場合

- Sanityで記事が公開されているか確認
- スラッグが正しく設定されているか確認
- ブラウザのコンソールでエラーを確認

### 関連記事CTAが表示されない場合

- プレースホルダーの構文が正しいか確認
- 参照している記事のスラッグが存在するか確認
- 記事がSanityまたはfallbackに存在するか確認

### ビルドエラーが発生する場合

```bash
# 依存関係を再インストール
npm install
npm run sanity-build
npm run build
```

## よくある質問

### Q: Sanityを使わずにfallbackファイルだけで運用できますか？

A: はい、可能です。Sanityが利用できない場合、自動的にfallbackファイルのみを使用します。

### Q: Sanityとfallbackで同じスラッグの記事がある場合はどうなりますか？

A: Sanityの記事が優先されます。重複を避けるため、Sanityにある記事はfallbackから除外されます。

### Q: 読了時間は手動で設定できますか？

A: いいえ、読了時間は常に自動計算されます。これにより一貫性が保たれます。
### 
テーブルの作成方法

Sanity Studioでテーブルを作成する際は、以下の手順に従ってください：

1. **セクション**を追加
2. **Table**フィールドを展開
3. **Table Headers**に列のヘッダーを追加
4. **Table Rows**で各行を追加：
   - 「Add item」をクリック
   - **Row Cells**に各セルの値を入力
   - 必要な行数分繰り返し

**例：**
```
Headers: ["名前", "年齢", "職業"]
Row 1 Cells: ["田中太郎", "30", "エンジニア"]  
Row 2 Cells: ["佐藤花子", "25", "デザイナー"]
```

### 技術的な注意事項

- Sanityでは多次元配列がサポートされていないため、テーブル行は`{ cells: string[] }`オブジェクトの配列として管理されます
- アプリケーション側で自動的に`string[][]`形式に変換されます
- 既存のfallback記事のテーブル形式との互換性は保たれます