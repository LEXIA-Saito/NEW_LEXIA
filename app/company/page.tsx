import CompanyClient from "./company-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "会社概要 | 碧南のWeb制作会社LEXIA",
  description:
    "地域密着でホームページ制作を行う愛知県碧南市のWEB制作会社LEXIAの会社概要です。",
  keywords:
    "碧南 Web制作会社, 愛知県 ホームページ 制作会社, 地域密着 Web制作 碧南",
  openGraph: {
    title: "会社概要 | 碧南のWeb制作会社LEXIA",
    description:
      "地域密着でホームページ制作を行う愛知県碧南市のWEB制作会社LEXIAの会社概要です。",
    type: "website",
  },
}

export default function CompanyPage() {
  return <CompanyClient />
}
