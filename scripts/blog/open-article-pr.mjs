#!/usr/bin/env node
/* eslint-disable no-console */

import { execFileSync } from "node:child_process"

const LABELS = {
  article: { color: "1D76DB", description: "Daily blog publication workflow" },
  ready: { color: "0E8A16", description: "Ready for scheduled publication" },
  affiliate: { color: "B60205", description: "Contains affiliate or sponsored links" },
  manual: { color: "FBCA04", description: "Publication approved by owner (required for every article)" },
  affiliateApproved: { color: "D93F0B", description: "Affiliate publication additionally approved by owner" },
}

function argument(name) {
  const index = process.argv.indexOf(`--${name}`)
  return index >= 0 ? process.argv[index + 1] : undefined
}

function hasFlag(name) {
  return process.argv.includes(`--${name}`)
}

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    encoding: "utf8",
    stdio: options.capture ? ["ignore", "pipe", "inherit"] : "inherit",
  })?.trim()
}

function ensureLabel(name, config) {
  run("gh", [
    "label",
    "create",
    name,
    "--repo",
    process.env.GITHUB_REPOSITORY || "LEXIA-Saito/NEW_LEXIA",
    "--color",
    config.color,
    "--description",
    config.description,
    "--force",
  ])
}

const slug = argument("slug")
const title = argument("title") || slug
const publishDate = argument("date")
const publishAtArgument = argument("publish-at")
const affiliate = hasFlag("affiliate")

if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error(
    "Usage: pnpm blog:pr -- --slug <slug> --date YYYY-MM-DD [--title <title>] [--affiliate]",
  )
  process.exit(1)
}

const publishAt =
  publishAtArgument ||
  (publishDate && /^\d{4}-\d{2}-\d{2}$/.test(publishDate)
    ? `${publishDate}T18:00:00+09:00`
    : undefined)

if (!publishAt || Number.isNaN(Date.parse(publishAt))) {
  console.error("--date YYYY-MM-DD または --publish-at ISO-8601 を指定してください")
  process.exit(1)
}

const branch = run("git", ["branch", "--show-current"], { capture: true })
if (!branch.startsWith("blog/")) {
  console.error(`記事ブランチではありません: ${branch}`)
  process.exit(1)
}

const dirty = run("git", ["status", "--porcelain"], { capture: true })
if (dirty) {
  console.error("未コミット変更があります。記事をコミットしてからPRを作成してください。")
  process.exit(1)
}

for (const [name, config] of Object.entries({
  "blog:article": LABELS.article,
  "blog:ready": LABELS.ready,
  "blog:affiliate": LABELS.affiliate,
  "blog:manual-approved": LABELS.manual,
  "blog:affiliate-approved": LABELS.affiliateApproved,
})) {
  ensureLabel(name, config)
}

run("git", ["push", "-u", "origin", branch])

const metadata = JSON.stringify({
  publishAt,
  timezone: "Asia/Tokyo",
})
const body = `<!-- blog-publish-metadata: ${metadata} -->

## 記事

- slug: \`${slug}\`
- 公開予定: \`${publishAt}\`
- アフィリエイト: ${affiliate ? "あり（手動承認必須）" : "なし"}

## レビュー → 承認ラベルでマージ

- [ ] Vercel Preview で一覧・本文・目次・表示を確認した
- [ ] 一次情報・公式情報のリンクが正しい
- [ ] 既存記事との重複がない／読者向けの文章になっている
- [ ] 内部事情・作業メモが本文に無い

検証が全て緑になると \`blog:ready\` が自動付与されます（公開可否の合図）。
**本人(${process.env.MANUAL_APPROVER || "LEXIA-Saito"})が \`blog:manual-approved\` を付けると、次回 18:00 JST のジョブがマージ・公開します。** ラベル付与より後にcommitをpushすると承認は無効になるので、ラベルを付け直してください。

\`\`\`bash
gh pr edit <番号> --add-label blog:manual-approved
\`\`\`
${affiliate ? "\n> アフィリエイト記事: `blog:manual-approved` に加えて `blog:affiliate-approved` ラベルも必要です。" : ""}
`

const labels = ["blog:article"]
if (affiliate) labels.push("blog:affiliate")

const args = [
  "pr",
  "create",
  "--base",
  "main",
  "--head",
  branch,
  "--title",
  `feat(blog): add ${title}`,
  "--body",
  body,
]
for (const label of labels) args.push("--label", label)

run("gh", args)

console.log("PRを作成しました。検証が緑になると blog:ready が自動付与されます。Vercel Previewを確認し、blog:manual-approved ラベルを付けると18時のジョブがマージ・公開します。")
if (affiliate) {
  console.log("アフィリエイト記事は blog:manual-approved に加えて blog:affiliate-approved も必要です。")
}
