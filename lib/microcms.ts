export class MicroCMSApiError extends Error {
  status: number
  statusText: string
  details?: string

  constructor(status: number, statusText: string, details?: string) {
    super(`MicroCMS API request failed: ${status} ${statusText}`)
    this.name = "MicroCMSApiError"
    this.status = status
    this.statusText = statusText
    this.details = details
  }
}

type QueryRecord = Record<string, string | number | boolean | undefined>

type FetchOptions = RequestInit & {
  next?: {
    revalidate?: number
    tags?: string[]
  }
}

const serviceDomain = process.env.LEXIA_MICROCMS_DOMAIN || process.env.NEXT_PUBLIC_MICROCMS_DOMAIN
const apiKey = process.env.MICROCMS_API_KEY

function ensureConfigured() {
  if (!serviceDomain) {
    throw new Error("LEXIA_MICROCMS_DOMAIN or NEXT_PUBLIC_MICROCMS_DOMAIN is not configured")
  }
  if (!apiKey) {
    throw new Error("MICROCMS_API_KEY is not configured")
  }
}

export async function microcmsFetch<T>(
  endpoint: string,
  queries: QueryRecord = {},
  init: FetchOptions = {},
): Promise<T> {
  // v0 preview environment may render server components on client side
  const isServer = typeof window === "undefined"

  if (!isServer) {
    console.warn("[v0] microcmsFetch called on client side, returning empty response")
    // Return empty response instead of throwing error
    return { contents: [], totalCount: 0, offset: 0, limit: 0 } as T
  }

  ensureConfigured()

  const url = new URL(`https://${serviceDomain}.microcms.io/api/v1/${endpoint}`)
  Object.entries(queries).forEach(([key, value]) => {
    if (value === undefined) return
    url.searchParams.append(key, String(value))
  })

  const response = await fetch(url.toString(), {
    ...init,
    headers: {
      "X-MICROCMS-API-KEY": apiKey!,
      ...init.headers,
    },
    next: {
      revalidate: 60,
      ...init.next,
    },
  })

  if (!response.ok) {
    const message = await response.text().catch(() => undefined)
    throw new MicroCMSApiError(response.status, response.statusText, message)
  }

  return (await response.json()) as T
}

type MicroCMSListResponse<T> = {
  contents: T[]
  totalCount: number
  offset: number
  limit: number
}

export type { MicroCMSListResponse }
