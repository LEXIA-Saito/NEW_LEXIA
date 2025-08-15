export function trackEvent(name: string, params?: Record<string, any>) {
  if (typeof window === "undefined") return
  try {
    // Google Analytics (gtag)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).gtag?.("event", name, params || {})
  } catch {}
  try {
    // Vercel Analytics (client runtime)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).va?.track?.(name, params || {})
  } catch {}
}

