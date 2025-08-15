"use client"

import Link from "next/link"
import { trackEvent } from "@/lib/analytics"

export default function ServicesWebHeroCTA() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Link
        href="/contact"
        onClick={() => trackEvent("cta_click", { location: "services_web_hero", label: "contact" })}
        className="inline-flex items-center justify-center rounded-md bg-white text-neutral-900 px-6 py-3 text-sm font-medium shadow-lg shadow-black/30 hover:bg-white/90 transition-colors"
      >
        無料相談する
      </Link>
      <Link
        href="/pricing"
        onClick={() => trackEvent("cta_click", { location: "services_web_hero", label: "pricing" })}
        className="inline-flex items-center justify-center rounded-md bg-neutral-900/90 text-white px-6 py-3 text-sm font-medium ring-1 ring-white/40 shadow-lg hover:bg-neutral-900 transition-colors"
      >
        料金を見る
      </Link>
      <Link
        href="/projects"
        onClick={() => trackEvent("cta_click", { location: "services_web_hero", label: "projects" })}
        className="inline-flex items-center justify-center rounded-md bg-white/10 text-white px-6 py-3 text-sm font-medium ring-1 ring-white/40 hover:bg-white/20 transition-colors"
      >
        実績を見る
      </Link>
    </div>
  )
}

