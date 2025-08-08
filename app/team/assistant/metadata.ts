import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"

const description =
  "LEXIAアシスタント｜日々の業務を支え、スムーズなコミュニケーションと作業効率化に貢献します"
const title = "アシスタント | LEXIAサポートメンバー"
const url = `${SITE_URL.replace(/\/$/, "")}/team/assistant`
const image = `${SITE_URL.replace(/\/$/, "")}/og/og-image.png`

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "profile",
    url,
    siteName: "LEXIA",
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
}

export default metadata
