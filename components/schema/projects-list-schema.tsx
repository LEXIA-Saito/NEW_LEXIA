import type { projectsData } from "@/lib/projects-data"
import { SITE_URL } from "../../lib/config"

interface ProjectsListSchemaProps {
  projects: typeof projectsData
}

export function ProjectsListSchema({ projects }: ProjectsListSchemaProps) {
  // Create the schema markup for a projects listing page
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    headline: "プロジェクト実績 - LEXIAポートフォリオ",
    description:
      "ダイナミックなEコマースプラットフォームから魅力的なコーポレートサイトまで、LEXIAの多様なウェブデザインプロジェクトをご覧ください。",
    url: `${SITE_URL}/projects`,
    publisher: {
      "@type": "Organization",
      name: "LEXIA",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/projects/${project.slug}`,
        name: project.title,
      })),
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
