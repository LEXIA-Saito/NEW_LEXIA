import CompanyClient from "./company-client"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"
import { fetchProjects } from "@/lib/microcms-projects"

export const metadata: Metadata = {
  title: "事業概要 | 愛知県碧南市のWEB制作事業LEXIA",
  description:
    "地域密着でホームページ制作を行う愛知県碧南市のWEB制作事業LEXIAの事業概要です。",
  alternates: {
    canonical: `${SITE_URL.replace(/\/$/, "")}/company`,
  },
  openGraph: {
  title: "事業概要 | 愛知県碧南市のWEB制作事業LEXIA",
    description:
      "地域密着でホームページ制作を行う愛知県碧南市のWEB制作事業LEXIAの事業概要です。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  title: "事業概要 | 愛知県碧南市のWEB制作事業LEXIA",
    description:
      "地域密着でホームページ制作を行う愛知県碧南市のWEB制作事業LEXIAの事業概要です。",
    images: [`${SITE_URL.replace(/\/$/, "")}/og/og-image.png`],
  },
}

export default async function CompanyPage() {
  const projects = await fetchProjects(3) // Only need 3 for achievements
  return <CompanyClient projects={projects} />
}
