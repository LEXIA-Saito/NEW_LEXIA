# フォールバック記事のカテゴリ更新マッピング

## 記事とカテゴリの対応表

| スラグ | タイトル | 旧カテゴリ | 新カテゴリ | 理由 |
|--------|---------|------------|------------|------|
| infisical-introduction | Infisical: オープンソースのシークレット管理プラットフォーム | tech | **Security** | セキュリティツール |
| what-is-onlook | Onlookとは？ReactとTailwindを直感的に操る | tech | **Frontend** | React/Tailwindツール |
| v0-dev-tutorial | v0 Dev Tutorial: AI駆動UIジェネレーターの全て | tech | **AI** | AI駆動ツール |
| lovable-ai | Lovable AI: 自然言語でWebアプリを構築 | tech | **AI** | AI開発ツール |
| bolt-new-ai-code-generator | Bolt.new: AI Code Generator | tech | **AI** | AIコード生成 |
| cursor-ide | Cursor IDE: AIペアプログラミングの新標準 | tech | **AI** | AI統合IDE |
| cursor-rules | Cursor Rulesの技術解説 | tech | **AI** | AI設定・ルール |
| cursor-composer | Cursor Composer Agent Mode | tech | **AI** | AIエージェント機能 |
| ai-code-editor-trends | AI Code Editorのトレンド | trends | **Update** | 最新トレンド情報 |
| rag-implementation-guide | RAG実装ガイド | tech | **AI** | AI/RAG技術 |

## 一括置換スクリプト（参考）

fallback記事のカテゴリを個別に更新する必要があります。以下の方針で更新：

- **AI系記事** → `"AI"`
- **フロントエンド記事** → `"Frontend"`
- **セキュリティ記事** → `"Security"`
- **トレンド記事** → `"Update"`

## 手動更新が必要な箇所

`lib/blog-posts-fallback.ts` の以下の行を更新：

1. Line 8: `genre: "Security"` (infisical-introduction) ✅ 済
2. Line 156: `genre: "Frontend"` (what-is-onlook)
3. Line 286: `genre: "AI"` (v0-dev-tutorial)
4. Line 464: `genre: "AI"` (lovable-ai)
5. Line 578: `genre: "AI"` (bolt-new-ai-code-generator)
6. Line 723: `genre: "AI"` (cursor-ide)
7. Line 913: `genre: "AI"` (cursor-rules)
8. Line 1091: `genre: "AI"` (cursor-composer)
9. Line 66: `genre: "Update"` (ai-code-editor-trends)
10. Line 1270: `genre: "AI"` (rag-implementation-guide)
11. Line 1385: `genre: "AI"` (最後の記事)
