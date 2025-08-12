import type { Metadata } from "next"
import ProjectsClient from "./projects-client"

export const metadata: Metadata = {
  title: "制作実績 | 碧南のWeb制作事例 - LEXIA",
  description:
    "碧南市や愛知県で手がけたホームページ制作・Webデザイン・ロゴ制作の事例をご紹介します。",
  keywords:
    "Web制作 実績 碧南, 愛知県 ホームページ 制作事例, Webデザイン 事例, ロゴ制作 実績",
  openGraph: {
    title: "制作実績 | 碧南のWeb制作事例 - LEXIA",
    description:
      "碧南市や愛知県で手がけたホームページ制作・Webデザイン・ロゴ制作の事例をご紹介します。",
    type: "website",
  },
}

export default function ProjectsPage() {
  return <ProjectsClient />
}
