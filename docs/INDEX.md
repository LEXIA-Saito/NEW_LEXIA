# 📚 ドキュメント索引

このリポジトリの Markdown ドキュメント一覧です。ルート直下には慣例的な `README.md` / `CHANGELOG.md` / `AGENTS.md` のみを残し、その他はテーマ別に `docs/` 配下へ整理しています。

## ✍️ ブログ（`docs/blog/`）
| ドキュメント | 内容 |
|---|---|
| [blog/BLOG_WORKFLOW.md](blog/BLOG_WORKFLOW.md) | **記事制作の全体フロー**（GitHub Trending選定→重複チェック→執筆→画像生成→投稿→公開）。まずここを読む |
| [../AGENTS.md](../AGENTS.md) | 記事のデータ構造・型・スタイル指針（ルート） |
| [blog/BLOG_CATEGORY_CHANGE_EXAMPLE.md](blog/BLOG_CATEGORY_CHANGE_EXAMPLE.md) | カテゴリ変更の例 |
| [blog/FALLBACK_CATEGORY_MAPPING.md](blog/FALLBACK_CATEGORY_MAPPING.md) | fallback のカテゴリ対応表 |
| [blog/HEADINGS_TEXTAREA_MIGRATION.md](blog/HEADINGS_TEXTAREA_MIGRATION.md) | 見出しテキストエリア移行メモ |
| [blog/TOC_IMPLEMENTATION.md](blog/TOC_IMPLEMENTATION.md) | 目次(ToC)実装メモ |

## 🗄️ microCMS（`docs/microcms/`）
| ドキュメント | 内容 |
|---|---|
| [microcms/README.md](microcms/README.md) | **microCMS連携 統合ガイド**（環境変数/スキーマ/フィールド/見出し/登録/Vercel/FAQ）。旧9文書を統合し、実コードとの差異も明記 |
| `microcms/_archive/` | 統合前の旧9文書（履歴保存用。通常は README.md を参照） |

## 🚀 デプロイ / インフラ（`docs/deployment/`）
| ドキュメント | 内容 |
|---|---|
| [deployment/DEPLOYMENT_ALTERNATIVES.md](deployment/DEPLOYMENT_ALTERNATIVES.md) | デプロイ手段の選択肢 |
| [deployment/DEPLOYMENT_FIXES.md](deployment/DEPLOYMENT_FIXES.md) | デプロイ不具合の修正記録 |
| [deployment/VERCEL_BUILD_FIX.md](deployment/VERCEL_BUILD_FIX.md) | Vercel ビルド修正 |
| [deployment/VERCEL_ENV_TROUBLESHOOTING.md](deployment/VERCEL_ENV_TROUBLESHOOTING.md) | Vercel 環境変数のトラブルシュート |
| [deployment/CSP_ADSENSE_FIX.md](deployment/CSP_ADSENSE_FIX.md) | CSP / AdSense 対応 |
| [deployment/ALTERNATIVE_ENV_MANAGEMENT.md](deployment/ALTERNATIVE_ENV_MANAGEMENT.md) | 環境変数管理の代替案 |

## 💰 AdSense / 収益化
| ドキュメント | 内容 |
|---|---|
| [ADSENSE_DEPLOYMENT_CHECKLIST.md](ADSENSE_DEPLOYMENT_CHECKLIST.md) | AdSense デプロイ チェックリスト |
| [ADSENSE_REVENUE_OPTIMIZATION.md](ADSENSE_REVENUE_OPTIMIZATION.md) | AdSense 収益最適化 |

## ⚡ 最適化 / 開発
| ドキュメント | 内容 |
|---|---|
| [QUICK_START.md](QUICK_START.md) | クイックスタート |
| [BUILD_OPTIMIZATION.md](BUILD_OPTIMIZATION.md) | ビルド最適化 |
| [COMPONENT_OPTIMIZATION.md](COMPONENT_OPTIMIZATION.md) | コンポーネント最適化 |
| [CLEANUP_GUIDE.md](CLEANUP_GUIDE.md) | クリーンアップ指針 |
| [use-searchparams.md](use-searchparams.md) | useSearchParams の扱い |
| [analytics.md](analytics.md) | アナリティクス |
| [multilingual.md](multilingual.md) | 多言語対応 |
| [pricing.md](pricing.md) / [dev-pricing.md](dev-pricing.md) | 料金 / 開発時料金 |
| [SECURITY_IMPLEMENTATION.md](SECURITY_IMPLEMENTATION.md) | セキュリティ実装 |

## 🗃️ アーカイブ（`docs/archive/`）
完了済み・一過性・廃止機能の記録（通常は参照不要）。
| ドキュメント | 内容 |
|---|---|
| [archive/SANITY_SETUP.md](archive/SANITY_SETUP.md) / [archive/SANITY_REMOVAL_GUIDE.md](archive/SANITY_REMOVAL_GUIDE.md) | Sanity（削除済み機能）の記録 |
| [archive/DEPLOYMENT_STATUS.md](archive/DEPLOYMENT_STATUS.md) | 過去のデプロイ状況スナップショット |
| [archive/REFACTORING_SUMMARY.md](archive/REFACTORING_SUMMARY.md) | リファクタ要約 |
| [archive/PR_CLAUDE_CODE.md](archive/PR_CLAUDE_CODE.md) / [archive/pr_body.md](archive/pr_body.md) | 過去のPR本文 |

---

> ルート直下に残すのは `README.md`・`CHANGELOG.md`・`AGENTS.md` のみ。新しいドキュメントは上記いずれかのフォルダに置き、この索引に1行追記してください。
