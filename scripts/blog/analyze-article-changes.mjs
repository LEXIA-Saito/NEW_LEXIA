#!/usr/bin/env node
/* eslint-disable no-console */

import { appendFileSync, readFileSync } from "node:fs"
import { execFileSync } from "node:child_process"
import { fileURLToPath } from "node:url"
import ts from "typescript"

const FALLBACK_PATH = "lib/blog-posts-fallback.ts"

export const AFFILIATE_PATTERNS = [
  /AFFILIATE_DISCLOSURE_HTML/,
  /amazonProductHtml\s*\(/,
  /https?:\/\/(?:www\.)?amazon\./i,
  /https?:\/\/amzn\.to\//i,
  /rel=["'][^"']*sponsored/i,
]

const REQUIRED_FIELDS = ["slug", "title", "description", "genre", "date"]

function propertyName(node, sourceFile) {
  if (!node?.name) return undefined
  if (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name)) return node.name.text
  return node.name.getText(sourceFile)
}

function findProperty(objectNode, name, sourceFile) {
  return objectNode.properties.find(
    (property) => ts.isPropertyAssignment(property) && propertyName(property, sourceFile) === name,
  )
}

function stringValue(property) {
  if (!property || !ts.isPropertyAssignment(property)) return undefined
  const initializer = property.initializer
  if (ts.isStringLiteral(initializer) || ts.isNoSubstitutionTemplateLiteral(initializer)) {
    return initializer.text
  }
  return undefined
}

function countNamedProperties(node, name, sourceFile) {
  let count = 0
  function visit(current) {
    if (
      ts.isPropertyAssignment(current) &&
      propertyName(current, sourceFile) === name
    ) {
      count += 1
    }
    ts.forEachChild(current, visit)
  }
  visit(node)
  return count
}

function findDuplicateProperties(node, sourceFile) {
  const duplicates = []

  function visit(current) {
    if (ts.isObjectLiteralExpression(current)) {
      const counts = new Map()
      for (const property of current.properties) {
        if (!ts.isPropertyAssignment(property)) continue
        const name = propertyName(property, sourceFile)
        if (!name) continue
        counts.set(name, (counts.get(name) ?? 0) + 1)
      }
      for (const [name, count] of counts) {
        if (count > 1) duplicates.push(name)
      }
    }
    ts.forEachChild(current, visit)
  }

  visit(node)
  return duplicates
}

function metadataFromObject(objectNode, sourceFile) {
  const text = objectNode.getText(sourceFile)
  const fields = Object.fromEntries(
    REQUIRED_FIELDS.map((field) => [
      field,
      stringValue(findProperty(objectNode, field, sourceFile)),
    ]),
  )

  return {
    ...fields,
    text,
    hasSections: Boolean(findProperty(objectNode, "sections", sourceFile)),
    hasContentHtml: Boolean(findProperty(objectNode, "contentHtml", sourceFile)),
    headingCount: countNamedProperties(objectNode, "heading", sourceFile),
    duplicateProperties: findDuplicateProperties(objectNode, sourceFile),
    affiliate: AFFILIATE_PATTERNS.some((pattern) => pattern.test(text)),
  }
}

function collectFallbackPosts(source) {
  const sourceFile = ts.createSourceFile(
    FALLBACK_PATH,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  )
  const posts = []

  function addObject(objectNode) {
    if (!ts.isObjectLiteralExpression(objectNode)) return
    const metadata = metadataFromObject(objectNode, sourceFile)
    if (metadata.slug) posts.push(metadata)
  }

  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === "fallbackBlogPosts" &&
      node.initializer &&
      ts.isArrayLiteralExpression(node.initializer)
    ) {
      node.initializer.elements.forEach(addObject)
    }

    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === "push" &&
      ts.isIdentifier(node.expression.expression) &&
      node.expression.expression.text === "fallbackBlogPosts"
    ) {
      node.arguments.forEach(addObject)
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return posts
}

export function extractFallbackPosts(source) {
  return new Map(collectFallbackPosts(source).map((post) => [post.slug, post]))
}

function validatePost(post) {
  const errors = []
  const warnings = []
  const label = post.slug || "(slug不明)"

  for (const field of REQUIRED_FIELDS) {
    if (!post[field]) errors.push(`${label}: ${field} がありません`)
  }

  if (post.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) {
    errors.push(`${label}: slug は半角英小文字・数字・ハイフンのみ使用できます`)
  }

  if (post.date && !/^\d{4}-\d{2}-\d{2}$/.test(post.date)) {
    errors.push(`${label}: date は YYYY-MM-DD 形式にしてください`)
  }

  if (!post.hasSections && !post.hasContentHtml) {
    errors.push(`${label}: sections または contentHtml が必要です`)
  }

  for (const name of post.duplicateProperties) {
    errors.push(`${label}: 同じオブジェクト内で ${name} が重複しています`)
  }

  if (post.headingCount < 3) {
    warnings.push(`${label}: H2相当の見出しが3個未満です`)
  } else if (post.headingCount > 8) {
    warnings.push(`${label}: 見出しが8個を超えています。構成を整理してください`)
  }

  if (post.description && (post.description.length < 45 || post.description.length > 180)) {
    warnings.push(`${label}: description は45〜180文字を目安にしてください`)
  }

  if (/こんにちは、LEXIAの齋藤です。?/.test(post.text)) {
    warnings.push(`${label}: 定型の執筆者挨拶より、読者の課題から始める構成を推奨します`)
  }

  const externalSourceUrls = post.text.match(/https?:\/\/[^\s"'）)]+/g) ?? []
  const primarySourceUrls = externalSourceUrls.filter(
    (url) =>
      !url.includes("lexia-hp.com") &&
      !url.includes("vercel-storage.com") &&
      !url.includes("amzn.to") &&
      !url.includes("amazon."),
  )
  if (primarySourceUrls.length === 0) {
    warnings.push(`${label}: 一次情報または公式情報への外部リンクが見つかりません`)
  }

  return { errors, warnings }
}

export function analyzeSources(baseSource, headSource) {
  const basePosts = extractFallbackPosts(baseSource)
  const headPostList = collectFallbackPosts(headSource)
  const headPosts = new Map(headPostList.map((post) => [post.slug, post]))
  const changedSlugs = []
  const deletedSlugs = []
  const affiliateSlugs = []
  const errors = []
  const warnings = []

  const slugCounts = new Map()
  for (const post of headPostList) {
    slugCounts.set(post.slug, (slugCounts.get(post.slug) ?? 0) + 1)
  }
  for (const [slug, count] of slugCounts) {
    if (count > 1) errors.push(`${slug}: fallback内でslugが${count}件重複しています`)
  }

  const slugs = new Set([...basePosts.keys(), ...headPosts.keys()])
  for (const slug of slugs) {
    const before = basePosts.get(slug)
    const after = headPosts.get(slug)

    if (!after) {
      deletedSlugs.push(slug)
      if (before?.affiliate) affiliateSlugs.push(slug)
      continue
    }

    if (!before || before.text !== after.text) {
      changedSlugs.push(slug)
      if (after.affiliate) affiliateSlugs.push(slug)
      const result = validatePost(after)
      errors.push(...result.errors)
      warnings.push(...result.warnings)
    }
  }

  return {
    changedSlugs,
    deletedSlugs,
    affiliate: affiliateSlugs.length > 0,
    affiliateSlugs,
    errors,
    warnings,
  }
}

function readFromGit(ref, path) {
  try {
    return execFileSync("git", ["show", `${ref}:${path}`], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
  } catch {
    return ""
  }
}

function parseBaseRef(argv) {
  const index = argv.indexOf("--base")
  if (index >= 0 && argv[index + 1]) return argv[index + 1]
  if (process.env.GITHUB_BASE_REF) return `origin/${process.env.GITHUB_BASE_REF}`
  return "origin/main"
}

function writeGithubOutput(result) {
  if (!process.env.GITHUB_OUTPUT) return
  const lines = [
    `changed=${result.changedSlugs.length > 0 || result.deletedSlugs.length > 0}`,
    `affiliate=${result.affiliate}`,
    `changed_slugs=${JSON.stringify(result.changedSlugs)}`,
    `affiliate_slugs=${JSON.stringify(result.affiliateSlugs)}`,
    `warnings=${JSON.stringify(result.warnings)}`,
  ]
  appendFileSync(process.env.GITHUB_OUTPUT, `${lines.join("\n")}\n`)
}

export function runAnalysis({ baseRef = "origin/main", headPath = FALLBACK_PATH } = {}) {
  const baseSource = readFromGit(baseRef, FALLBACK_PATH)
  const headSource = readFileSync(headPath, "utf8")
  return analyzeSources(baseSource, headSource)
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]
if (isDirectRun) {
  const result = runAnalysis({ baseRef: parseBaseRef(process.argv.slice(2)) })
  writeGithubOutput(result)

  console.log(JSON.stringify(result, null, 2))

  if (result.warnings.length > 0) {
    for (const warning of result.warnings) console.warn(`WARNING: ${warning}`)
  }
  if (result.errors.length > 0) {
    for (const error of result.errors) console.error(`ERROR: ${error}`)
    process.exitCode = 1
  }
}
