#!/usr/bin/env node
/* eslint-disable no-console */

import { execFileSync } from "node:child_process"

function argument(name) {
  const index = process.argv.indexOf(`--${name}`)
  return index >= 0 ? process.argv[index + 1] : undefined
}

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    encoding: "utf8",
    stdio: options.capture ? ["ignore", "pipe", "inherit"] : "inherit",
  })?.trim()
}

const slug = argument("slug")
const date = argument("date") || new Date().toISOString().slice(0, 10)

if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error("Usage: pnpm blog:branch -- --slug <slug> [--date YYYY-MM-DD]")
  process.exit(1)
}

if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  console.error("--date は YYYY-MM-DD 形式で指定してください")
  process.exit(1)
}

const dirty = run("git", ["status", "--porcelain"], { capture: true })
if (dirty) {
  console.error("未コミット変更があります。記事ブランチを作る前に作業ツリーを整理してください。")
  process.exit(1)
}

const currentBranch = run("git", ["branch", "--show-current"], { capture: true })
if (currentBranch !== "main") {
  console.error(`現在のブランチは ${currentBranch} です。main から実行してください。`)
  process.exit(1)
}

run("git", ["fetch", "origin", "main"])

const localMain = run("git", ["rev-parse", "main"], { capture: true })
const remoteMain = run("git", ["rev-parse", "origin/main"], { capture: true })
if (localMain !== remoteMain) {
  console.error("ローカルmainがorigin/mainと一致していません。fast-forwardしてから再実行してください。")
  process.exit(1)
}

const branch = `blog/${date}-${slug}`
run("git", ["switch", "-c", branch, "origin/main"])

console.log(`記事ブランチ ${branch} を作成しました。`)
console.log("記事を執筆・検証・コミットした後、pnpm blog:pr を実行してください。")
