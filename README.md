# LEXIA Web Design

愛知県碧南市のWEB制作会社「LEXIA」のリポジトリです。v0.dev で構築したチャット UI と Vercel のデプロイが同期されています。

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

## 今後の多言語展開

デフォルト言語は日本語です。将来的に英語などへの多言語対応を予定しており、詳細は [`docs/multilingual.md`](docs/multilingual.md) にまとめています。

## Google Analytics

利用者の同意を得てから GA スクリプトを読み込むよう実装しています。設定方法は [`docs/analytics.md`](docs/analytics.md) を参照してください。

## 開発メモ

Next.js の `useSearchParams` フックを使用する際は、非同期処理になる可能性があるため
`useSearchParams() should be wrapped in a suspense boundary` という警告が表示されることがあります。
対応方法については [`docs/use-searchparams.md`](docs/use-searchparams.md) にまとめています。

## microCMS 設定

記事コンテンツは microCMS で管理します。以下の環境変数を `.env` に設定してください。

\`\`\`
NEXT_PUBLIC_MICROCMS_DOMAIN=<サービスドメイン>
LEXIA_MICROCMS_DOMAIN=<サービスドメイン>
MICROCMS_API_KEY=<API キー>
\`\`\`

`lib/microcms.ts` にて microCMS のクライアントを生成しています。利用するエンドポイントは `posts`、`categories`、`authors`、`projects` です。`service` というエンドポイントは存在しないため、呼び出しは行っていません。

## 料金シミュレーション

初期費用とランニングコストの計算方法については [docs/pricing.md](docs/pricing.md) にまとめています。
