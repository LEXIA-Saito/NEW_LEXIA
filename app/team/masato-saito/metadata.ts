import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"

const description =
  "LEXIA代表・齋藤雅人｜WEB制作業界歴5年、愛知県安城市生まれ・愛知県碧南市育ちのWEBディレクター。ホームページ制作からシステム開発、AI活用、PC教室まで一貫対応。地元視点×技術力で愛知の企業のデジタル化を直接サポート"
const title = "齋藤雅人 | LEXIA代表・WEBディレクター"
const url = `${SITE_URL.replace(/\/$/, "")}/team/masato-saito`
const image = `${SITE_URL.replace(/\/$/, "")}/og/og_ceo.jpg`

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
        width: 512,
        height: 512,
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
