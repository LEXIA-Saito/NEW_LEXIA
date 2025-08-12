import type { Metadata } from "next"
import ProjectsClient from "./projects-client"
import { SITE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "制作実績 | 碧南のWeb制作事例 - LEXIA",
  description:
    "碧南市や愛知県で手がけたホームページ制作・Webデザイン・ロゴ制作の事例をご紹介します。",
  alternates: {
    canonical: `${SITE_URL.replace(/\/$/, "")}/projects`,
  },
  openGraph: {
    title: "制作実績 | 碧南のWeb制作事例 - LEXIA",
    description:
      "碧南市や愛知県で手がけたホームページ制作・Webデザイン・ロゴ制作の事例をご紹介します。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "制作実績 | 碧南のWeb制作事例 - LEXIA",
    description:
      "碧南市や愛知県で手がけたホームページ制作・Webデザイン・ロゴ制作の事例をご紹介します。",
    images: [`${SITE_URL.replace(/\/$/, "")}/og/og-image.png`],
  },
}

export default function ProjectsPage() {
  return <ProjectsClient />
}
