export function parsePublicationMetadata(body = "") {
  const match = body.match(/<!--\s*blog-publish-metadata:\s*(\{.*?\})\s*-->/s)
  if (!match) return null

  try {
    const metadata = JSON.parse(match[1])
    if (!metadata.publishAt || Number.isNaN(Date.parse(metadata.publishAt))) return null
    return {
      publishAt: metadata.publishAt,
      timezone: metadata.timezone || "Asia/Tokyo",
    }
  } catch {
    return null
  }
}

const READY_LABEL = "blog:ready"
const ARTICLE_LABEL = "blog:article"
const AFFILIATE_LABEL = "blog:affiliate"

/**
 * Pure readiness gate shared by the blog:ready workflow.
 * Mirrors the merge-time checks in blog-scheduled-publish.yml so a PR only
 * earns blog:ready once every automated gate (policy + Vercel Preview) is green.
 */
export function evaluateArticleReadiness({
  pr,
  labels,
  vercelState,
  validateConclusion,
  failedCheckNames = [],
} = {}) {
  if (!pr) return { ready: false, reasons: ["PR情報がありません"] }
  const labelNames = new Set(
    (labels ?? pr.labels ?? []).map((label) => (typeof label === "string" ? label : label.name)),
  )
  const reasons = []

  if (pr.draft) reasons.push("PRがDraftです")
  if (!labelNames.has(ARTICLE_LABEL)) reasons.push(`${ARTICLE_LABEL} ラベルがありません`)
  if (labelNames.has(AFFILIATE_LABEL)) reasons.push("アフィリエイト記事は自動公開しません")
  if (!pr.head?.ref?.startsWith("blog/")) reasons.push("記事ブランチ(blog/)ではありません")
  if (!parsePublicationMetadata(pr.body || "")) reasons.push("公開予定メタデータがありません")
  if (vercelState !== "success") reasons.push("Vercel Previewが成功していません")
  if (validateConclusion !== "success") reasons.push("記事ポリシーチェック(validate)が成功していません")
  if (failedCheckNames.length > 0) reasons.push(`失敗中のチェック: ${failedCheckNames.join(", ")}`)

  return { ready: reasons.length === 0, reasons }
}

export { READY_LABEL, ARTICLE_LABEL, AFFILIATE_LABEL }

export function selectDuePullRequest(pullRequests, now = new Date()) {
  return pullRequests
    .map((pullRequest) => ({
      pullRequest,
      metadata: parsePublicationMetadata(pullRequest.body || ""),
    }))
    .filter(({ pullRequest, metadata }) => {
      if (!metadata || pullRequest.draft) return false
      const labels = new Set((pullRequest.labels || []).map((label) => label.name))
      return (
        labels.has("blog:article") &&
        labels.has("blog:ready") &&
        Date.parse(metadata.publishAt) <= now.getTime()
      )
    })
    .sort((a, b) => Date.parse(a.metadata.publishAt) - Date.parse(b.metadata.publishAt))[0] ?? null
}
