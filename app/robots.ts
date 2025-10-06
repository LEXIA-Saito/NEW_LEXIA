import type { MetadataRoute } from "next"
import { SITE_URL } from "../lib/config"

export default function robots(): MetadataRoute.Robots {
  const base = SITE_URL.replace(/\/$/, "")

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // If you have private endpoints, add explicit disallow rules here, e.g.
      // { userAgent: '*', disallow: '/api/private' },
    ],
    sitemap: `${base}/sitemap.xml`,
  }
}
