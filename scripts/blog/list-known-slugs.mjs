#!/usr/bin/env node
/* eslint-disable no-console */

// Lists slugs/themes already taken, so the daily generator never duplicates:
//   - fallback articles (lib/blog-posts-fallback.ts)
//   - open blog:article pull requests (branch name → slug)
//   - microCMS published articles (only if MICROCMS_DOMAIN + MICROCMS_API_KEY are
//     present in the environment — never read from a committed file)
//
// Usage: node scripts/blog/list-known-slugs.mjs

import { readFileSync } from "node:fs"
import { execFileSync } from "node:child_process"
import { extractFallbackPosts } from "./analyze-article-changes.mjs"

const FALLBACK_PATH = "lib/blog-posts-fallback.ts"

function fallbackSlugs() {
  try {
    return [...extractFallbackPosts(readFileSync(FALLBACK_PATH, "utf8")).keys()]
  } catch {
    return []
  }
}

function openPullRequestSlugs() {
  try {
    const out = execFileSync(
      "gh",
      ["pr", "list", "--state", "open", "--label", "blog:article", "--json", "headRefName", "--jq", ".[].headRefName"],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    )
    return out
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((ref) => ref.replace(/^blog\/\d{4}-\d{2}-\d{2}-/, ""))
  } catch {
    return []
  }
}

async function microcmsSlugs() {
  const key = process.env.MICROCMS_API_KEY
  const domain = process.env.MICROCMS_DOMAIN
  if (!key || !domain) {
    return { slugs: [], note: "microCMS未設定（MICROCMS_DOMAIN / MICROCMS_API_KEY が無いためスキップ）" }
  }
  const slugs = []
  let offset = 0
  try {
    for (;;) {
      const url = `https://${domain}.microcms.io/api/v1/blog?limit=100&offset=${offset}&fields=slug`
      const res = await fetch(url, { headers: { "X-MICROCMS-API-KEY": key } })
      if (!res.ok) return { slugs, note: `microCMS取得失敗 HTTP ${res.status}` }
      const data = await res.json()
      for (const content of data.contents || []) if (content.slug) slugs.push(content.slug)
      const total = data.totalCount ?? slugs.length
      if (offset + 100 >= total) break
      offset += 100
    }
  } catch (error) {
    return { slugs, note: `microCMS取得エラー: ${error.message}` }
  }
  return { slugs, note: `microCMS ${slugs.length}件` }
}

const fallback = fallbackSlugs()
const openPullRequests = openPullRequestSlugs()
const mc = await microcmsSlugs()
const allKnownSlugs = [...new Set([...fallback, ...openPullRequests, ...mc.slugs])].sort()

console.log(
  JSON.stringify(
    {
      fallback,
      openPullRequests,
      microcms: mc.slugs,
      microcmsNote: mc.note,
      allKnownSlugs,
    },
    null,
    2,
  ),
)
