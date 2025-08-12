import CompanyClient from "./company-client"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "会社概要 | 碧南のWeb制作会社LEXIA",
  description:
    "地域密着でホームページ制作を行う愛知県碧南市のWEB制作会社LEXIAの会社概要です。",
  alternates: {
    canonical: `${SITE_URL.replace(/\/$/, "")}/company`,
  },
  openGraph: {
    title: "会社概要 | 碧南のWeb制作会社LEXIA",
    description:
      "地域密着でホームページ制作を行う愛知県碧南市のWEB制作会社LEXIAの会社概要です。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "会社概要 | 碧南のWeb制作会社LEXIA",
    description:
      "地域密着でホームページ制作を行う愛知県碧南市のWEB制作会社LEXIAの会社概要です。",
    images: [`${SITE_URL.replace(/\/$/, "")}/og/og-image.png`],
  },
}

export default function CompanyPage() {
  return <CompanyClient />
}
