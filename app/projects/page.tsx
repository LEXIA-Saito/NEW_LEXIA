import type { Metadata } from "next"
import ProjectsClient from "./projects-client"

export const metadata: Metadata = {
  title: "プロジェクト実績 | LEXIA - WEB制作会社",
  description:
    "LEXIAが手がけたWEBサイト制作、システム開発、デザイン制作の実績をご紹介します。企業サイトからECサイト、ブランディングまで、お客様のビジネス成長を支援する多様なプロジェクトをご覧ください。",
  keywords: "WEB制作実績, ホームページ制作事例, システム開発実績, デザイン制作事例, LEXIA実績",
  openGraph: {
    title: "プロジェクト実績 | LEXIA - WEB制作会社",
    description: "LEXIAが手がけたWEBサイト制作、システム開発、デザイン制作の実績をご紹介します。",
    type: "website",
  },
}

export default function ProjectsPage() {
  return <ProjectsClient />
}
