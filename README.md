# LEXIA Web Design

愛知県碧南市のWEB制作事業「LEXIA」のリポジトリです。v0.dev で構築したチャット UI と Vercel のデプロイが同期されています。

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/lexia-projects/lexia-web)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/9UrVLVai4dj)

## 概要

このリポジトリは [v0.dev](https://v0.dev) で編集した内容を自動で取得し、Vercel にデプロイすることで最新状態を保ちます。

## デプロイ先

**[https://vercel.com/lexia-projects/lexia-web](https://vercel.com/lexia-projects/lexia-web)**

## 開発の続き

さらに開発する場合は **[https://v0.dev/chat/projects/9UrVLVai4dj](https://v0.dev/chat/projects/9UrVLVai4dj)** にアクセスしてください。

## 仕組み

1. [v0.dev](https://v0.dev) でプロジェクトを編集
2. v0 の画面からデプロイ
3. 変更がこのリポジトリへ自動プッシュ
4. Vercel が最新バージョンを公開

## ブラウザサポート

従来のブラウザ向けポリフィルを減らすため、ビルドは最新ブラウザ（Chrome 93+, Edge 93+, Firefox 92+, Safari 15.4+）をターゲットにしています。

## 今後の多言語展開

デフォルト言語は日本語です。将来的に英語などへの多言語対応を予定しており、詳細は [`docs/multilingual.md`](docs/multilingual.md) にまとめています。

## Google Analytics

GA スクリプトは常時読み込まれます。設定方法は [`docs/analytics.md`](docs/analytics.md) を参照してください。

## 開発メモ

Next.js の `useSearchParams` フックを使用する際は、非同期処理になる可能性があるため
`useSearchParams() should be wrapped in a suspense boundary` という警告が表示されることがあります。
対応方法については [`docs/use-searchparams.md`](docs/use-searchparams.md) にまとめています。

## microCMS 設定

ブログ記事は microCMS で管理します。以下の環境変数を `.env.local` などに設定してください。

```

## 2025-10-10 画像 alt と型の改善

このリポジトリのブログ機能について、アクセシビリティとSEO向上のために以下の変更を行いました：

- ブログ記事データ型に `heroImageAlt` と `sections[].imageAlt` を追加しました（`lib/blog-posts.types.ts`）。
- 既存のフォールバック記事（`lib/blog-posts-fallback.ts`）に対して、すべての hero / section 画像に対して明示的な alt テキストを埋め込みました。
- 記事ページのレンダラー（`app/blog/[slug]/page.tsx`）を更新し、alt が明示されていればそれを優先して使用するようになりました。

確認方法：ローカルで `pnpm dev` を起動し、記事ページを開いて画像要素の `alt` 属性が適切にセットされていることを確認してください。
MICROCMS_SERVICE_DOMAIN=<サービスドメイン>
MICROCMS_API_KEY=<API キー>
# 任意: ブログのエンドポイントを変更したい場合のみ
MICROCMS_BLOG_ENDPOINT=blog
```

- microCMS のコンテンツ ID をブログ記事のスラッグと同じにすると、ビルド時の静的生成がスムーズです。別フィールドにスラッグを保持する場合は `slug` というフィールド名で作成してください。
- 記事本文は `sections`（繰り返しフィールド）または `content` / `contentHtml` / `body` といったリッチテキストで取得できます。`sections` を設定している場合は従来どおり見出しと本文・リストで段落を描画し、リッチテキストのみの場合は HTML をそのまま出力します。
- 環境変数が未設定の場合は、開発中に既存のサンプル記事がフォールバックとして表示されます。

## Google Maps の埋め込み

会社概要ページのアクセスセクションでは Google Maps Embed API を利用しています。地図を表示するには以下の環境変数を設定し、対象ドメインを許可した API キーを用意してください。

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<Google Maps API キー>
```

API キーは Vercel のダッシュボードなど、ホスティング環境で設定してください。

## 料金シミュレーション

初期費用とランニングコストの計算方法については [docs/pricing.md](docs/pricing.md) にまとめています。
システム開発向けの詳細な料金計算例は [docs/dev-pricing.md](docs/dev-pricing.md) を参照してください。
Web 制作単価表は [pricing.json](pricing.json) を編集するだけでシミュレーターへ反映されます。
