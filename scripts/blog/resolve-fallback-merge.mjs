#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * 記事PRをmainへ取り込むときの lib/blog-posts-fallback.ts の衝突を、決定的に解決する。
 *
 * 日次の記事PRはこのファイルの末尾に `fallbackBlogPosts.push({...})` を1ブロック
 * 足すだけなので、記事PRどうしは必ず同じ場所で衝突する。1本マージすると残りが
 * 全部コンフリクトし、GitHubのマージAPIでは二度と通らない。
 *
 * gitのunionマージ（両側の行を残す）は使えない。既存記事のブロックの内部に
 * 新記事の行が挿し込まれて静かに壊れることを実際に確認している。
 *
 * ここでは「mainの全文 + この記事ブランチが末尾に足した分」として解決する。
 * 追記以外の変更（既存部分の書き換え・削除）が入っていたら解決せず、人間に戻す。
 *
 *   node scripts/blog/resolve-fallback-merge.mjs <base-ref> <ours-ref> <theirs-ref>
 */
import { execFileSync } from "node:child_process"
import { writeFileSync } from "node:fs"

export const FALLBACK_FILE = "lib/blog-posts-fallback.ts"

export class NotAnAppendError extends Error {}

/**
 * @param {{ base: string, ours: string, theirs: string }} sources
 * @returns {string} 解決後のファイル内容
 */
export function resolveAppendMerge({ base, ours, theirs }) {
  if (!theirs.startsWith(base)) {
    throw new NotAnAppendError(
      `記事ブランチは ${FALLBACK_FILE} を末尾に追記しただけの変更ではありません（既存部分が書き換わっています）。自動解決できないため、手で解決してください。`,
    )
  }

  const tail = theirs.slice(base.length)
  if (tail.trim() === "") {
    throw new NotAnAppendError(`記事ブランチが ${FALLBACK_FILE} に何も追記していません。`)
  }

  return ours.endsWith("\n") || ours === "" ? ours + tail : `${ours}\n${tail}`
}

function main() {
  const [baseRef, oursRef, theirsRef] = process.argv.slice(2)
  if (!baseRef || !oursRef || !theirsRef) {
    console.error("usage: resolve-fallback-merge.mjs <base-ref> <ours-ref> <theirs-ref>")
    process.exit(2)
  }

  const show = (ref) =>
    execFileSync("git", ["show", `${ref}:${FALLBACK_FILE}`], {
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    })

  let merged
  try {
    merged = resolveAppendMerge({ base: show(baseRef), ours: show(oursRef), theirs: show(theirsRef) })
  } catch (error) {
    if (error instanceof NotAnAppendError) {
      console.error(error.message)
      process.exit(1)
    }
    throw error
  }

  writeFileSync(FALLBACK_FILE, merged)
  console.log(`${FALLBACK_FILE} を解決しました。`)
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) main()
