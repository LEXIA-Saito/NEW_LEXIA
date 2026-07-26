import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"

const title = "料金プラン | LEXIA"
const description =
  "目的から選べる制作パッケージと、公開後の月額運用プランをご紹介します。"
const url = `${SITE_URL.replace(/\/$/, "")}/pricing`
const image = `${SITE_URL.replace(/\/$/, "")}/og/og-image.png`

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
}

export default metadata
