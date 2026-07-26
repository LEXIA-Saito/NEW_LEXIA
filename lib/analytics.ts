type AnalyticsValue = string | number | boolean | undefined
type AnalyticsParams = Record<string, AnalyticsValue>

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: AnalyticsParams) => void
    va?: {
      track?: (name: string, params?: AnalyticsParams) => void
    }
  }
}

export function trackEvent(name: string, params?: AnalyticsParams) {
  if (typeof window === "undefined") return

  try {
    window.gtag?.("event", name, params || {})
  } catch {}

  try {
    window.va?.track?.(name, params || {})
  } catch {}
}
