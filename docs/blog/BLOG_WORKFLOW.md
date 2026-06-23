# 📝 LEXIA Blog 記事制作ワークフロー（GitHub Trending → 自動記事化）

GitHub Trending から流行リポジトリを選び、まだ書いていなければ記事化し、二次元女の子の hero 画像を生成して投稿するまでの一連の流れをまとめた運用ドキュメントです。

> 記事の**データ構造・型・スタイル指針**はリポジトリ直下の [`AGENTS.md`](../../AGENTS.md) を参照。本書はその上位にある「**何を・どう選び・どう作って・どこへ出すか**」の編集パイプラインを定義します。

---

## 全体フロー

```
1. リポジトリ選定   GitHub Trending から流行リポを選ぶ
2. 重複チェック     既存記事（microCMS / fallback）に同テーマが無いか確認
3. 記事執筆         BlogPost 型に沿って本文を作成（スタイル指針準拠）
4. 画像生成         hero / inline 画像を image-combiner（fal-ai/nano-banana）で生成
5. 投稿             microCMS へ登録 もしくは fallback にハードコード
6. 確認・公開       pnpm dev で表示確認 → lint → commit / PR
```

---

## Step 1. リポジトリ選定（GitHub Trending）

- **ソース**: <https://github.com/trending>（All languages / Daily を基本とする）
- **取得方法**: WebFetch 等で当日のトレンドページを取得し、リポジトリ名・概要・言語・スター増加数を抽出。
- **選定基準**（LEXIA読者＝開発者・AI関心層に刺さるものを優先）:
  - AI / LLM / エージェント / フロントエンド / 開発ツール系を優先
  - 新規性・実用性・スター増加の勢い
  - 「日本語で詳しく解説された記事が少ない」テーマほど価値が高い
- 1回につき1リポ＝1記事を基本とする。

---

## Step 2. 重複チェック（既に書いていないか）

記事の登録先は2系統あるため、**両方**を確認する。

### microCMS 側（本番データ）
- エンドポイント名: **`blog`**（`lib/microcms-blog.ts`）
- 取得は `lib/microcms.ts` の `microcmsFetch("blog", ...)`（GET）。
- 公開中の全 slug を一覧し、同テーマ・同 slug が無いか確認。

### fallback 側（ローカル/コード管理）
- ファイル: [`lib/blog-posts-fallback.ts`](../../lib/blog-posts-fallback.ts)
- `fallbackBlogPosts` 配列の `slug` を確認。

> アプリは `fetchAllBlogPosts()`（`lib/blog-posts.ts`）で microCMS と fallback を**マージ**し、slug が重複する場合は **microCMS を優先**して fallback 側を除外する。したがって「同じ slug が両方にある」状態は避ける。

判定:
- 既存に**無い** → 新規記事として Step 3 へ
- 既存に**ある** → スキップ、または内容を更新（`latest_update` を更新）

---

## Step 3. 記事執筆

- 型定義: [`lib/blog-posts.types.ts`](../../lib/blog-posts.types.ts) の `BlogPost` / `BlogPostSection` / `BlogHeading`
- スタイル指針: [`AGENTS.md`](../../AGENTS.md) の「Article Styling Schema」に従う
  - H2 は3〜6個。H2→本文の間に余白リズム。
  - **3段落に1つ**はビジュアル的変化（補足 note / 引用 / 区切り `<hr>` 等）を入れる。
  - 「専門性 × 温度 × リズム」を意識。

### 必須・主要フィールド

| フィールド | 内容 |
|---|---|
| `slug` | 一意・半角英数とハイフン（URLになる。慎重に） |
| `title` | 記事タイトル（H1・SEOタイトルと一致） |
| `description` | 一覧カード・OG/Twitter に使う短い要約 |
| `genre` | `AI` / `Frontend` / `Backend` / `Update` / `Full-stack` / `Security` から内容に最も合うもの |
| `tags` | 3つ程度（UI都合でトリミングされる） |
| `date` | `YYYY-MM-DD`（一覧の並び順に影響） |
| `latest_update` | 更新日。並び替えは `latest_update` 優先 |
| `heroImage` | hero 画像URL（Step 4 で生成） |
| `heroImageAlt` | hero 画像の alt |
| `sections[]` または `contentHtml` | 本文（構造化 or リッチHTML） |

> `readingTime` は `lib/blog-posts.ts` で**自動算出**されるため、データ側の値は無視される。

---

## Step 4. 画像生成（hero / inline・二次元女の子）

**ツール**: リポジトリ内の `image-combiner`（fal.ai 経由・**`fal-ai/nano-banana`** モデル）

- 実装: [`image-combiner/app/api/generate-image/route.ts`](../../image-combiner/app/api/generate-image/route.ts)
- 必要な環境変数: **`FAL_KEY`**（fal.ai のAPIキー）
- 起動: `cd image-combiner && pnpm install && pnpm dev` → ブラウザUI（`image-combiner/app/page.tsx`）から操作
- モード:
  - `text-to-image` … プロンプトから新規生成（`fal-ai/nano-banana`、出力 jpeg）
  - `image-editing` … 画像2枚＋プロンプトで合成・編集（`fal-ai/nano-banana/edit`）
- 出力: 生成画像の URL が返る（fal ホスト）。これを `heroImage` / `sections[].image` に設定する。

### hero 画像プロンプト規約（二次元女の子）
記事の技術テーマを象徴する二次元の女の子を、目を引くビジュアルとして生成する。

- **構図**: 16:9、1200×675px 以上
- **被写体**: 記事テーマ（例: そのリポジトリの技術モチーフ）を反映した二次元の女の子
- **トーン**: クリーン / モダン / テック感。LEXIA のブランドに合うこと
- **テキスト**: 画像内に文字は入れない（OG/カードで崩れるため）
- **出力形式**: 最終的に WebP/AVIF 推奨（`AGENTS.md` の Image Usage 準拠）

### ホスティング
- 既存記事は Vercel Blob の公開URL（例: `https://...public.blob.vercel-storage.com/...`）を直参照している。
- 生成画像も公開URL化して `heroImage` に**直URLで**設定する（大きな静的ファイルの直 import は避ける）。

---

## Step 5. 投稿

投稿先は2通り。運用方針に応じて選ぶ。

### (A) microCMS に登録【本番推奨】
- microCMS の Content API は、**書き込み権限付き API キー**を使えば同じエンドポイントへ POST して記事を新規登録できる。
  - 例: `POST https://{LEXIA_MICROCMS_DOMAIN}.microcms.io/api/v1/blog`（ヘッダ `X-MICROCMS-API-KEY: <書き込み可能キー>`、JSON ボディに記事フィールド）
- **現状の注意**: リポジトリの `microcmsFetch`（`lib/microcms.ts`）は GET 前提で、**書き込みヘルパーは未実装**。自動投稿するには次が必要:
  1. 書き込み権限キーを env に追加（既存の `MICROCMS_API_KEY` は読み取り専用推奨のため別キー推奨）
  2. `microcmsFetch` を使った `createBlogPost()`（`method: "POST"` + body）を追加
- 登録後はコード変更不要で `/blog` に反映される（`revalidate = 60`）。

### (B) fallback にハードコード【手軽・コードレビュー経由】
- [`lib/blog-posts-fallback.ts`](../../lib/blog-posts-fallback.ts) の `fallbackBlogPosts` 配列に `BlogPost` を1件追加。
- 書き込みキー不要。Git の commit/PR でレビューを通せる。
- microCMS に同 slug があるとそちらが優先される点に注意。

> どちらに出しても `fetchAllBlogPosts()` でマージされて一覧・個別ページに表示される。

---

## Step 6. 確認・公開

1. ローカル確認: `pnpm dev` → <http://localhost:3000/blog>
   - 一覧カード、hero 画像、本文レイアウト、目次(ToC) を確認
2. Lint: `pnpm lint`
3. commit / PR:
   - 例: `feat(blog): add <slug> article`
   - UI変更があればスクリーンショット添付
4. 反映: `revalidate = 60`（`app/blog/page.tsx` / `app/blog/[slug]/page.tsx`）

---

## ✅ 記事制作チェックリスト

- [ ] GitHub Trending から対象リポを選定した
- [ ] 既存記事（microCMS + fallback）と重複していないか確認した
- [ ] `genre` を内容に合わせて選んだ
- [ ] 本文をスタイル指針（H2×3〜6、3段落に1ビジュアル変化）に沿って書いた
- [ ] hero 画像（二次元女の子・16:9）を生成した
- [ ] 必要なら inline 画像も生成・配置した
- [ ] 画像を公開URL化して `heroImage` / `sections[].image` に設定した
- [ ] microCMS か fallback のどちらかに投稿した（slug重複なし）
- [ ] `pnpm dev` で表示確認・`pnpm lint` 通過
- [ ] commit / PR を作成した

---

## 関連ファイル / ドキュメント

| 用途 | 場所 |
|---|---|
| 記事スキーマ・スタイル指針 | [`AGENTS.md`](../../AGENTS.md) |
| 記事の型定義 | `lib/blog-posts.types.ts` |
| データ取得・マージ・ジャンル | `lib/blog-posts.ts` |
| microCMS 連携（読み取り） | `lib/microcms-blog.ts` / `lib/microcms.ts` |
| fallback 記事データ | `lib/blog-posts-fallback.ts` |
| microCMS 詳細ガイド | [`../microcms/README.md`](../microcms/README.md) |
| 画像生成ツール | `image-combiner/`（fal-ai/nano-banana） |
| 一覧ページ | `app/blog/page.tsx` |
| 記事ページ | `app/blog/[slug]/page.tsx` |
