#!/usr/bin/env node
/* eslint-disable no-console */

import { execFileSync } from "node:child_process"

const LABELS = {
  article: { color: "1D76DB", description: "Daily blog publication workflow" },
  ready: { color: "0E8A16", description: "Ready for scheduled publication" },
  affiliate: { color: "B60205", description: "Contains affiliate or sponsored links" },
  manual: { color: "FBCA04", description: "Affiliate publication manually approved by owner" },
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

## 公開前チェック

- [ ] 一次情報・公式情報を確認した
- [ ] 既存記事との重複がない
- [ ] 読者向けの文章になっている
- [ ] Vercel Previewで一覧・本文・目次を確認した
- [ ] 画像は任意。未設定時のプレースホルダーを確認した
- [ ] 公開可能になったら \`blog:ready\` ラベルを付ける
${affiliate ? "- [ ] 本人が内容とリンクを確認し、承認レビュー後に `blog:manual-approved` を付ける" : ""}
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

console.log("PRを作成しました。Vercel Preview確認後に blog:ready を付けてください。")
if (affiliate) {
  console.log("アフィリエイト記事は承認レビューと blog:manual-approved が揃うまで自動公開されません。")
}
