# 📅 LEXIA Blog 日次自動公開パイプライン

毎日 **09:00 JST** に記事を1本生成して PR を作成し、検証がすべて緑になった通常記事だけに
`blog:ready` が自動付与され、毎日 **18:00 JST** に GitHub Actions が公開予定を迎えた PR を
最大1件だけ `main` へ squash merge して Vercel 本番デプロイ成功まで確認します。

```
09:00 JST  生成     （生成トリガー）→ 分離worktree → headless Claude → blog/<date>-<slug> ブランチ + PR(blog:article)
   ↓
PR上で      検証     blog-article-policy.yml (schema/lint/test/affiliate判定) + Vercel Preview
   ↓
全緑なら    準備完了  blog-article-ready.yml が blog:ready を自動付与（公開可否の“合図”。アフィリ記事は対象外）
   ↓
人間ゲート  レビュー  LEXIA-Saito が Vercel Preview を確認 → 問題なければ PR を Approve（不備があれば修正を依頼）
   ↓
18:00 JST  公開     blog-scheduled-publish.yml (cron 0 9 * * * = 18:00 JST) が「blog:ready かつ 本人がApprove済み」の最古PRを1件マージ → 本番デプロイ確認
```

> 重要: 通常記事も**本人の Approve レビューが無いと自動マージされません**（人間レビューゲート）。`blog:ready` は「技術チェックが全緑」という合図にすぎず、公開はあなたの承認後です。新しい commit を push すると承認は無効化され、再レビューが必要です。

## 構成ファイル

| 役割 | パス |
|---|---|
| 生成オーケストレーション（worktree隔離・重複ガード・ログ） | `scripts/blog/generate-daily-article.sh` |
| 生成プロンプト（Claudeが従う指示） | `scripts/blog/daily-article.prompt.md` |
| 重複チェック（fallback + 公開待ちPR + 任意でmicroCMS） | `scripts/blog/list-known-slugs.mjs` |
| ブランチ作成（作業ツリー保護） | `scripts/blog/create-article-branch.mjs`（`pnpm blog:branch`） |
| 記事ポリシー解析（schema/slug重複/アフィリ/一次情報） | `scripts/blog/analyze-article-changes.mjs`（`pnpm blog:check`） |
| PR作成（公開メタデータ + ラベル） | `scripts/blog/open-article-pr.mjs`（`pnpm blog:pr`） |
| 公開メタデータ解析 + 公開対象選択 + 準備判定 | `scripts/blog/publication-metadata.mjs` |
| PRポリシー Workflow | `.github/workflows/blog-article-policy.yml` |
| `blog:ready` 自動付与 Workflow | `.github/workflows/blog-article-ready.yml` |
| 18時公開 Workflow | `.github/workflows/blog-scheduled-publish.yml` |
| LaunchAgent テンプレート | `ops/launchd/com.lexia.blog-daily-article.plist.template` |
| LaunchAgent インストーラ | `scripts/blog/install-launchd.sh` |
| テスト | `tests/blog-article-policy.test.mjs`（`pnpm test:blog`） |

## ラベルと公開条件

- `blog:article` … 日次生成記事（PR作成時に付与）
- `blog:ready` … 全ゲート通過で**自動付与**。新規コミットpushで自動解除（再検証）
- `blog:affiliate` … アフィリエイト/広告/スポンサー/紹介コードを含む記事（自動検出）
- `blog:manual-approved` … アフィリ記事の本人手動承認（自動付与しない）

`blog:ready` 自動付与の条件（すべて満たす通常記事のみ）：PRがOpenかつDraftでない／ブランチが
`blog/` 始まり／公開メタデータあり／`blog:article` あり／`blog:affiliate` でない／記事ポリシー
`validate` 成功／Vercel Preview 成功／失敗中チェックなし。

### マージ条件（人間レビューゲート）

18:00 のジョブが実際にマージするのは、上記 `blog:ready` に加えて次を満たす最古の1件だけです。

- **`LEXIA-Saito` 本人が、その PR の最新コミットに対して Approve レビュー済み**（`blog:ready` だけでは公開されません）。
- 新しい commit を push すると、その承認は無効化されます（承認は承認時点のコミットに紐づくため）。
- アフィリエイト記事は、Approve に加えて `blog:manual-approved` ラベルも必要。

運用フロー: 生成された PR を Vercel Preview で確認 → 不備があれば修正（ここで依頼、または新規セッションで Claude に修正させる）→ 問題なければ PR を **Approve** → 次の 18:00 JST で自動マージ・公開。

## アフィリエイト記事の手動ゲート

`blog:affiliate` が付いた記事は **自動公開されません**。公開には次がすべて必要です：
本人(`LEXIA-Saito`)の **Approve レビュー** ＋ `blog:manual-approved` ラベル。新規コミットを
push すると承認は無効化されます（policy Workflow が `blog:manual-approved` を自動解除）。
日次生成は原則アフィリエイト記事を作りません。

## スケジューラ（launchd）の操作

```bash
# インストール（09:00 ローカル時刻に登録。MacのTZをJSTに）
scripts/blog/install-launchd.sh install

# 状態確認 / 停止 / 手動実行 / ログ
scripts/blog/install-launchd.sh status
scripts/blog/install-launchd.sh uninstall
scripts/blog/install-launchd.sh run        # いますぐ1本生成（本番動作）
scripts/blog/install-launchd.sh dry-run     # Claude/PRなしで環境と重複ガードだけ確認
scripts/blog/install-launchd.sh logs        # 当日ログを tail
```

ログ: `~/.lexia-blog/logs/generate-YYYY-MM-DD.log`（および launchd の out/err ログ）。
生成は `~/.lexia-blog/worktrees/<date>` の**分離worktree**（detached `origin/main`）で動くため、
リポジトリ本体の作業ツリーや未コミット変更には一切触れません。実行ごとにworktreeは破棄されます。

> 補足: 完全ヘッドレス実行のため `claude -p ... --dangerously-skip-permissions` を使います。
> 動作は分離worktree内のブログ生成フローに限定され、`main` への push やマージは行いません
> （マージは18時Workflow＋全チェック通過＋本人Approve時のみ）。停止は `uninstall`。

> ⚠️ **既知の制約（macOS TCC）**: このリポジトリは `~/Desktop` 配下にあり、`~/Desktop` /
> `~/Documents` / `~/Downloads` は macOS のプライバシー保護(TCC)対象です。**launchd エージェントは
> これらにアクセスできず、09:00 の自動起動は `Operation not permitted` で失敗します**（手動の
> `install-launchd.sh run` を“認証済みのGUIセッション”から実行した場合のみ完走）。さらに完全無人だと
> keychain 認証（claude / gh）も別の壁になり得ます。
>
> **そのため、無人で確実に毎日生成したい場合は launchd ではなく次を推奨します:**
> - **GitHub Actions cron（00:00 UTC = 09:00 JST）＋ Claude API**（`ANTHROPIC_API_KEY` を GitHub
>   Secrets に）で生成＋PR作成。Mac・TCC・keychain に一切依存せず、既存の policy / ready / publish
>   ワークフローと人間レビューゲートはそのまま使えます。
> - どうしても launchd を使う場合は、リポジトリを TCC 非対象の場所（例 `~/.lexia-blog/repo` の専用
>   クローン）に置く、または実行バイナリにフルディスクアクセスを付与する必要があります。

## 重複防止

`list-known-slugs.mjs` が fallback 記事 + 公開待ちPR のslugを集約します。microCMS 記事も対象に
含めたい場合は、実行環境に `MICROCMS_DOMAIN` と読み取り専用の `MICROCMS_API_KEY` を**環境変数**
として渡してください（リポジトリには保存しません）。未設定時はその旨を表示してスキップします。
生成スクリプトは当日分のブランチ/公開待ちPRが既にあれば、その日は生成をスキップします。

## 手動運用（任意）

スケジューラを使わず手動で1本作る場合：

```bash
git switch main && git pull --ff-only
pnpm blog:branch -- --slug <slug> --date YYYY-MM-DD
#  …lib/blog-posts-fallback.ts に記事を追記…
pnpm blog:check
pnpm exec eslint lib/blog-posts-fallback.ts
pnpm test:blog
git add lib/blog-posts-fallback.ts && git commit -m "feat(blog): add <title>"
pnpm blog:pr -- --slug <slug> --date YYYY-MM-DD --title "<title>"
```

## トラブルシュート

- 公開Workflowが「公開時刻を迎えた blog:ready PR はありません」で正常終了 → 対象なしの想定動作。
- `blog:ready` が付かない → PRの Checks タブで `validate` と `Vercel` の状態を確認。失敗を直して
  再 push すると `blog:ready` は一旦解除され、再度全緑で自動付与されます。
- launchd が走らない → `status` でロード状態、`logs` で出力、PATHに `claude/gh/pnpm/node` が
  含まれるか（`install` 時に自動解決）を確認。Macのスリープ中は発火しません（起動後にまとめて実行）。
- 手動でWorkflowを試す → `gh workflow run "Blog scheduled publish" -f dry_run=true`。
