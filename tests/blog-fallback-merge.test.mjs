/* eslint-disable no-console */
import assert from "node:assert/strict"
import { NotAnAppendError, resolveAppendMerge } from "../scripts/blog/resolve-fallback-merge.mjs"

const base = `export const fallbackBlogPosts = [
  { slug: "existing" },
]
`
const articleA = `fallbackBlogPosts.push({ slug: "article-a" })
`
const articleB = `fallbackBlogPosts.push({ slug: "article-b" })
`

// mainが先に別の記事を取り込んでいても、記事ブランチの追記だけが末尾に足される
{
  const merged = resolveAppendMerge({ base, ours: base + articleA, theirs: base + articleB })
  assert.equal(merged, base + articleA + articleB)
  assert.equal(merged.match(/slug: "article-a"/g).length, 1)
  assert.equal(merged.match(/slug: "article-b"/g).length, 1)
}

// mainが動いていない場合はそのまま追記される
{
  assert.equal(resolveAppendMerge({ base, ours: base, theirs: base + articleA }), base + articleA)
}

// 既存部分を書き換えるPRは自動解決しない（unionマージだと静かに壊れるケース）
{
  const rewritten = base.replace('"existing"', '"renamed"') + articleB
  assert.throws(
    () => resolveAppendMerge({ base, ours: base + articleA, theirs: rewritten }),
    NotAnAppendError,
  )
}

// 記事を1本も足していないPRは公開対象にしない
{
  assert.throws(() => resolveAppendMerge({ base, ours: base, theirs: base }), NotAnAppendError)
}

// ours が改行で終わっていなくても記事ブロックが連結されない
{
  const noTrailingNewline = "export const fallbackBlogPosts = []"
  const merged = resolveAppendMerge({ base, ours: noTrailingNewline, theirs: base + articleA })
  assert.equal(merged, `${noTrailingNewline}\n${articleA}`)
}

console.log("blog-fallback-merge.test.mjs: passed")
