# LEXIA Blog 毎日投稿ワークフロー

通常の技術記事をGitHubブランチで執筆し、Pull RequestとVercel Previewで確認して、毎日18:00 JSTを目標に1記事公開するための運用手順です。

記事のデータ構造、文章規約、表示上の制約はリポジトリ直下の [`AGENTS.md`](../../AGENTS.md) を参照してください。本書はテーマ選定から本番公開までの編集パイプラインを定義します。

## 運用目標

- 毎日1記事を18:00 JSTに公開する
- 最初の30日間は公開時刻を固定し、時間帯別アクセスを比較できる状態にする
- 公開待ち記事を常に3件程度確保する
- 通常記事は品質チェックとVercel Preview確認後に予約公開できる
- Amazonアソシエイトなどの広告記事は、運営者本人の承認なしに公開しない
- 画像は任意とし、本文の品質と一次情報確認を優先する

GitHub Actionsのcronは開始が数分遅れる場合があります。18:00ちょうどではなく「18時台の公開」を運用上の目標とします。

## 標準記事

通常記事の構成は、次の記事を基準にします。

- `/blog/open-notebook-ai-notebooklm-alt-2025`

基本構成:

1. 読者が抱える疑問、更新情報、記事の前提
2. 「この記事でわかること」
3. 概要
4. 主な特徴
5. 導入・利用方法
6. セキュリティ、費用、運用継続性などの判断材料
7. 活用例
8. まとめ
9. 一次情報・公式情報

記事テーマによって項目は調整できます。執筆者の作業メモ、依頼者への回答、内部相談は本文に含めません。

## 1日の標準スケジュール

| 時刻 | 作業 |
|---|---|
| 前日〜09:00 | テーマ候補選定、重複確認 |
| 09:00〜12:00 | 一次情報調査、記事執筆 |
| 12:00〜14:00 | 校正、記事チェック、ローカル確認 |
| 14:00まで | 記事ブランチをpushし、PRを作成 |
| 14:00〜17:00 | Vercel Preview確認、必要な修正 |
| 17:00まで | `blog:ready`を付けて公開待ちにする |
| 18:00 JST | GitHub Actionsが公開時刻を迎えたPRを最大1件マージ |
| マージ後 | Vercel本番デプロイの成功を自動確認 |

当日分が完成しない場合は、未完成記事を公開せず、公開待ちキューの次の記事を使用します。

## Step 1. テーマ選定

GitHub Trendingだけに限定せず、LEXIAの読者に役立つ技術・トレンドから選定します。

優先テーマ:

- AI、LLM、AIエージェント
- Web制作、フロントエンド、バックエンド
- Markdown、ドキュメント管理、ナレッジ管理
- 開発ツール、OSS、セルフホスト
- セキュリティ、データ管理

情報源:

- GitHub Trending
- 公式ブログ、公式ドキュメント、公式リポジトリ
- リリースノート
- 信頼できる一次資料

選定基準:

- 日本語でまとまった解説が少ない
- 読者が試せる、比較できる、判断できる
- 一次情報で主要な主張を確認できる
- 既存記事と重複しない
- 単なる話題紹介ではなく、注意点や運用判断まで説明できる

## Step 2. 重複チェック

公開データはmicroCMSとfallbackの2系統です。両方を確認します。

### microCMS

- エンドポイント: `blog`
- 実装: `lib/microcms-blog.ts`
- 同一slugだけでなく、同じ製品・同じ論点の記事も確認する

### fallback

- `lib/blog-posts-fallback.ts`
- `fallbackBlogPosts`内のslug、title、tagsを確認する

同じslugがmicroCMSとfallbackにある場合はmicroCMSが優先されます。意図しない重複は作りません。

## Step 3. 記事ブランチを作る

記事制作は`main`へ直接コミットせず、記事専用ブランチで行います。

ブランチ名:

```text
blog/YYYY-MM-DD-<slug>
```

作成コマンド:

```bash
pnpm blog:branch -- --slug <slug> --date YYYY-MM-DD
```

このコマンドは次を確認してから`origin/main`を起点にブランチを作ります。

- 作業ツリーがクリーン
- 現在のブランチが`main`
- ローカル`main`と`origin/main`が一致

## Step 4. 記事執筆

- 型: `lib/blog-posts.types.ts`
- fallback: `lib/blog-posts-fallback.ts`
- 詳細規約: `AGENTS.md`

必須事項:

- slug、title、description、genre、date
- H2相当の主要見出しを3〜6個程度
- 読者が記事から得られる内容を冒頭で明示
- 一次情報・公式情報へのリンク
- 機能紹介だけでなく、費用、制約、セキュリティ、継続性から必要な項目を扱う
- 最後に判断材料をまとめる

禁止事項:

- 依頼者への返答
- 執筆プロンプトや内部メモ
- 未確認の数値や断定
- 「必ず稼げる」など結果を保証する表現
- APIキー、認証情報、顧客情報

## Step 5. 画像

hero画像と本文画像は任意です。

- 画像がなくても記事を公開できる
- 未設定時は既存のプレースホルダー表示を確認する
- 本文の完成を画像待ちで遅らせない
- 画像は後日の更新PRで追加できる
- 画像追加だけで記事を不必要に新着扱いへ戻さない

画像を追加する場合は`AGENTS.md`の画像規約に従います。

## Step 6. ローカルチェック

```bash
pnpm dev
```

確認URL:

```text
http://localhost:3000/blog
http://localhost:3000/blog/<slug>
```

確認項目:

- 一覧カード
- タイトル、description、公開日
- 本文、表、リスト
- 目次
- 外部リンク
- 画像未設定時の表示
- モバイル幅での表と長いURL

記事差分の自動チェック:

```bash
pnpm blog:check -- --base origin/main
pnpm test:blog
```

## Step 7. CommitとPR

記事をコミットした後、次のコマンドでpushとPR作成を行います。

```bash
pnpm blog:pr -- \
  --slug <slug> \
  --title "記事タイトル" \
  --date YYYY-MM-DD
```

標準公開時刻は指定日の18:00 JSTです。時刻を変える場合:

```bash
pnpm blog:pr -- \
  --slug <slug> \
  --publish-at "2026-06-28T19:00:00+09:00"
```

PRには次のメタデータが入ります。

```html
<!-- blog-publish-metadata: {"publishAt":"2026-06-28T18:00:00+09:00","timezone":"Asia/Tokyo"} -->
```

## Step 8. PRラベル

| ラベル | 用途 |
|---|---|
| `blog:article` | 記事PR |
| `blog:ready` | Vercel Preview確認済み・予約公開可能 |
| `blog:affiliate` | 広告・アフィリエイトリンクを含む |
| `blog:manual-approved` | 運営者本人がアフィリエイト記事を承認済み |

記事PRチェックは変更された記事を解析し、Amazonリンクやアフィリエイト用ヘルパーを検出すると`blog:affiliate`を自動付与します。

新しいコミットがpushされた場合:

- `blog:ready`を自動解除
- アフィリエイト記事では`blog:manual-approved`も自動解除

修正後はVercel Previewと記事内容を再確認してください。

## Step 9. Vercel Preview

記事ブランチのpushとPR作成でVercel Previewが開始されます。

次を確認してから`blog:ready`を付けます。

- Vercelステータスが成功
- Blog article policyが成功
- 本文が読者向けになっている
- 内部メモがない
- リンクと表示が崩れていない
- 公開日時が正しい

## Step 10. 18時予約公開

`.github/workflows/blog-scheduled-publish.yml`が毎日09:00 UTC（18:00 JST）に実行されます。

公開対象条件:

- PRがOpenかつDraftではない
- ブランチ名が`blog/`で始まる
- `blog:article`と`blog:ready`が付いている
- PR本文の`publishAt`を過ぎている
- Vercel Previewが成功
- Blog article policyが成功
- 他のチェックに失敗がない

条件を満たすPRが複数あっても、公開予定が最も古い1件だけをマージします。

マージ後はVercelの本番デプロイを最大10分確認します。

手動テスト:

```text
GitHub Actions
→ Blog scheduled publish
→ Run workflow
→ dry_run: true
```

## Amazonアソシエイト記事の手動ゲート

次のいずれかを含む記事はアフィリエイト記事として扱います。

- `AFFILIATE_DISCLOSURE_HTML`
- `amazonProductHtml(...)`
- `amzn.to`
- `amazon.*`
- `rel="sponsored"`

自動公開には通常条件に加えて次が必要です。

1. `LEXIA-Saito`本人の最新レビューが`APPROVED`
2. `blog:manual-approved`ラベル

どちらかが欠けている場合は予約公開されません。

アフィリエイト記事のPR作成例:

```bash
pnpm blog:pr -- \
  --slug <slug> \
  --title "記事タイトル" \
  --date YYYY-MM-DD \
  --affiliate
```

## 公開失敗時

### 18時に対象PRがない

- その日は自動公開しない
- 未完成記事を強制公開しない
- 次の記事を完成させ、公開待ちキューを補充する

### チェック失敗

- PRはOpenのまま
- エラーを修正して再push
- `blog:ready`が解除されるため、Preview確認後に再付与

### Vercel本番デプロイ失敗

- GitHub Actionsを失敗扱いにする
- Vercelログを確認する
- 必要ならマージコミットをrevertする

## アクセス時間の見直し

最初の30日間は18:00 JST固定で投稿します。その後、GA4などで次を比較します。

- 公開後1時間、3時間、24時間の閲覧数
- 曜日別の閲覧時間帯
- 新規ユーザーとリピーター
- SNS流入と検索流入
- 記事カテゴリ別の差

分析結果をもとに16:00〜20:00の範囲で公開時刻を変更します。

## チェックリスト

- [ ] テーマがAI・Web制作・Markdown・OSSなどLEXIA読者に合っている
- [ ] microCMSとfallbackを重複確認した
- [ ] 一次情報を確認した
- [ ] 読者向けの文章になっている
- [ ] 記事構造が`AGENTS.md`に沿っている
- [ ] 画像なしでも表示が成立する
- [ ] 記事専用ブランチで作業した
- [ ] Blog article policyが成功した
- [ ] Vercel Previewを確認した
- [ ] PR本文の公開日時を確認した
- [ ] `blog:ready`を付けた
- [ ] アフィリエイト記事は本人承認を受けた

## 関連ファイル

| 用途 | 場所 |
|---|---|
| 記事スキーマ・文章規約 | `AGENTS.md` |
| fallback記事 | `lib/blog-posts-fallback.ts` |
| 記事型 | `lib/blog-posts.types.ts` |
| データ取得 | `lib/blog-posts.ts` |
| PR記事チェック | `.github/workflows/blog-article-policy.yml` |
| 18時予約公開 | `.github/workflows/blog-scheduled-publish.yml` |
| 記事差分解析 | `scripts/blog/analyze-article-changes.mjs` |
| ブランチ作成 | `scripts/blog/create-article-branch.mjs` |
| PR作成 | `scripts/blog/open-article-pr.mjs` |
| PRテンプレート | `.github/PULL_REQUEST_TEMPLATE/blog-article.md` |
