export function trackEvent(name: string, params?: Record<string, any>) {
  if (typeof window === "undefined") return
  try {
    // Google Analytics (gtag)
    ;(window as any).gtag?.("event", name, params || {})
  } catch {}
  try {
    // Vercel Analytics (client runtime)
    ;(window as any).va?.track?.(name, params || {})
  } catch {}
}

