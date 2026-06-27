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
