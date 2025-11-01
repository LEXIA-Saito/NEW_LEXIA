## 概要
- ブログに新規記事「Claude Code入門：ターミナルで動く“エージェント型”コーディングアシスタント」を追加しました。
- GitHubトレンド掲載の「anthropics/claude-code」を題材に、機能・導入・安全性・活用シーンを一次情報に基づき整理。
- 既存の記事（Infisical / Onlook / Stremio / Stagehand / XYFlow）と重複のないテーマです。

## 変更点
- 追加: lib/blog-posts-fallback.ts に記事データを1件追加（slug: claude-code-overview-2025-10-14）。
- 読了時間は既存ロジックにより自動計算されます。

## 企画意図（AdSense 審査観点）
- 独自性: READMEと公式ドキュメントを基に、導入と安全運用の観点を具体化。
- 有益性: インストール手順、注意点（レビュー/権限最小化/ログ管理）を明記。
- E-A-T配慮: 一次公式リンク（Docs/Issues/Policies）を提示し、出典を明確化。
- ユーザビリティ: セクション分割、箇条書き、要約で可読性を最適化。

## 動作確認
1. 開発サーバー起動（pnpm dev）
2. /blog で一覧に記事が表示され、クリックで詳細へ遷移できること
3. 画像・外部リンクは記事中に含まれていないため、描画はテキスト中心で安定

## 参考
- GitHub: https://github.com/anthropics/claude-code
- Docs: https://docs.anthropic.com/en/docs/claude-code/overview
- Data usage: https://docs.anthropic.com/en/docs/claude-code/data-usage
