/* eslint-disable no-console */
import assert from "node:assert/strict"
import {
  analyzeSources,
  extractFallbackPosts,
} from "../scripts/blog/analyze-article-changes.mjs"
import {
  evaluateArticleReadiness,
  parsePublicationMetadata,
  selectDuePullRequest,
} from "../scripts/blog/publication-metadata.mjs"

const base = `
import type { BlogPost } from "./blog-posts.types"
export const fallbackBlogPosts: BlogPost[] = [
  {
    slug: "existing-post",
    title: "Existing",
    description: "既存記事の説明です。読者に内容が伝わるよう十分な長さを確保しています。",
    genre: "AI",
    date: "2026-06-20",
    sections: [
      { heading: "概要", body: ["本文"] },
      { heading: "特徴", body: ["本文"] },
      { heading: "まとめ", body: ["https://example.com/docs"] }
    ]
  }
]
`

const head = `${base}
fallbackBlogPosts.push({
  slug: "affiliate-post",
  title: "Affiliate",
  description: "アフィリエイト記事の説明です。読者に内容が伝わるよう十分な長さを確保しています。",
  genre: "AI",
  date: "2026-06-21",
  sections: [
    { heading: "概要", body: ["本文"] },
    { heading: "比較", body: ["本文"] },
    { heading: "まとめ", body: ["https://example.com/docs"] }
  ],
  richtext: amazonProductHtml({ name: "Product", context: "Context", url: "https://amzn.to/example" })
})
`

const posts = extractFallbackPosts(head)
assert.equal(posts.size, 2)
assert.equal(posts.get("affiliate-post")?.affiliate, true)

const result = analyzeSources(base, head)
assert.deepEqual(result.changedSlugs, ["affiliate-post"])
assert.equal(result.affiliate, true)
assert.deepEqual(result.affiliateSlugs, ["affiliate-post"])
assert.deepEqual(result.errors, [])

const invalidHead = `${base}
fallbackBlogPosts.push({
  slug: "Invalid Slug",
  title: "Invalid",
  description: "短い",
  genre: "AI",
  date: "2026/06/21",
  sections: []
})
`
const invalid = analyzeSources(base, invalidHead)
assert.ok(invalid.errors.some((message) => message.includes("slug")))
assert.ok(invalid.errors.some((message) => message.includes("date")))

const duplicate = analyzeSources(
  "",
  `${base}
  fallbackBlogPosts.push({
    slug: "existing-post",
    title: "Duplicate",
    description: "重複記事の説明です。読者に内容が伝わるよう十分な長さを確保しています。",
    genre: "AI",
    date: "2026-06-22",
    sections: [
      { heading: "概要", body: ["本文"] },
      { heading: "特徴", body: ["本文"] },
      { heading: "まとめ", body: ["https://example.com/docs"] }
    ]
  })`,
)
assert.ok(duplicate.errors.some((message) => message.includes("重複")))

const duplicateProperty = analyzeSources(
  "",
  `
  import type { BlogPost } from "./blog-posts.types"
  export const fallbackBlogPosts: BlogPost[] = [{
    slug: "duplicate-property",
    title: "Duplicate property",
    description: "重複プロパティを検出するための説明です。読者に内容が伝わる長さを確保しています。",
    genre: "AI",
    date: "2026-06-22",
    sections: [{
      heading: "概要",
      body: ["前半"],
      body: ["後半"]
    }]
  }]`,
)
assert.ok(duplicateProperty.errors.some((message) => message.includes("body")))

const metadata = parsePublicationMetadata(
  '<!-- blog-publish-metadata: {"publishAt":"2026-06-28T18:00:00+09:00","timezone":"Asia/Tokyo"} -->',
)
assert.equal(metadata?.publishAt, "2026-06-28T18:00:00+09:00")

const due = selectDuePullRequest(
  [
    {
      number: 1,
      body: '<!-- blog-publish-metadata: {"publishAt":"2026-06-29T18:00:00+09:00"} -->',
      draft: false,
      labels: [{ name: "blog:article" }, { name: "blog:ready" }],
    },
    {
      number: 2,
      body: '<!-- blog-publish-metadata: {"publishAt":"2026-06-28T18:00:00+09:00"} -->',
      draft: false,
      labels: [{ name: "blog:article" }, { name: "blog:ready" }],
    },
  ],
  new Date("2026-06-30T00:00:00Z"),
)
assert.equal(due?.pullRequest.number, 2)

const readyPr = {
  draft: false,
  head: { ref: "blog/2026-06-28-example" },
  body: '<!-- blog-publish-metadata: {"publishAt":"2026-06-28T18:00:00+09:00"} -->',
  labels: [{ name: "blog:article" }],
}
const readyArgs = {
  pr: readyPr,
  labels: readyPr.labels,
  vercelState: "success",
  validateConclusion: "success",
  failedCheckNames: [],
}

assert.equal(evaluateArticleReadiness(readyArgs).ready, true)

// Affiliate articles never auto-ready.
assert.equal(
  evaluateArticleReadiness({
    ...readyArgs,
    labels: [{ name: "blog:article" }, { name: "blog:affiliate" }],
  }).ready,
  false,
)

// Each gate independently blocks readiness.
assert.equal(evaluateArticleReadiness({ ...readyArgs, vercelState: "pending" }).ready, false)
assert.equal(evaluateArticleReadiness({ ...readyArgs, validateConclusion: "failure" }).ready, false)
assert.equal(evaluateArticleReadiness({ ...readyArgs, failedCheckNames: ["lint"] }).ready, false)
assert.equal(evaluateArticleReadiness({ ...readyArgs, pr: { ...readyPr, draft: true } }).ready, false)
assert.equal(
  evaluateArticleReadiness({ ...readyArgs, pr: { ...readyPr, head: { ref: "feature/x" } } }).ready,
  false,
)
assert.equal(
  evaluateArticleReadiness({ ...readyArgs, pr: { ...readyPr, body: "no metadata" } }).ready,
  false,
)

console.log("blog article policy tests passed")
