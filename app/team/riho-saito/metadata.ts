import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"

const description =
  "LEXIA経理担当・齋藤李保｜会社の資金管理と請求業務を担い、安定運営を支える経理スペシャリスト"
const title = "齋藤李保 | LEXIA経理"
const url = `${SITE_URL.replace(/\/$/, "")}/team/riho-saito`
const image = `${SITE_URL.replace(/\/$/, "")}/og/og-image.png`

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
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
