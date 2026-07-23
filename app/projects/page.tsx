import type { Metadata } from "next"
import ProjectsClient from "./projects-client"
import { SITE_URL } from "@/lib/config"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { fetchProjects } from "@/lib/microcms-projects"

export const metadata: Metadata = {
  title: "制作実績 | 愛知県碧南市のWeb制作事例 - LEXIA",
  description:
    "愛知県碧南市や愛知県で手がけたホームページ制作・Webデザイン・ロゴ制作の事例をご紹介します。",
  alternates: {
    canonical: `${SITE_URL.replace(/\/$/, "")}/projects`,
  },
  openGraph: {
    title: "制作実績 | 愛知県碧南市のWeb制作事例 - LEXIA",
    description:
      "愛知県碧南市や愛知県で手がけたホームページ制作・Webデザイン・ロゴ制作の事例をご紹介します。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "制作実績 | 愛知県碧南市のWeb制作事例 - LEXIA",
    description:
      "愛知県碧南市や愛知県で手がけたホームページ制作・Webデザイン・ロゴ制作の事例をご紹介します。",
    images: [`${SITE_URL.replace(/\/$/, "")}/og/og-image.png`],
  },
}

export default async function ProjectsPage() {
  const projects = await fetchProjects()
  return (
    <>
      <Navigation />
      <main
        id="main-content"
        className="min-h-screen bg-white dark:bg-neutral-900"
        style={{ paddingTop: "var(--header-height)" }}
      >
        <ProjectsClient initialProjects={projects} />
      </main>
      <Footer />
    </>
  )
}
