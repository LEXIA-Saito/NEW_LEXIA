import type { projectsData } from "@/lib/projects-data"
import { SITE_URL } from "../../lib/config"

interface ProjectSchemaProps {
  project: (typeof projectsData)[0]
}

export function ProjectSchema({ project }: ProjectSchemaProps) {
  // Create the schema markup for a project page
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork", // Changed from ArchitectureProject
    name: project.title,
    description: project.description,
    image: project.coverImage ? `${SITE_URL}${project.coverImage}` : undefined,
    datePublished: new Date(project.year, 0).toISOString(),
    author: {
      "@type": "Organization",
      name: "LEXIA",
      url: SITE_URL,
    },
    locationCreated: {
      "@type": "Place",
      name: project.location, // This now refers to client industry/type
    },
    genre: project.category, // This now refers to web design categories
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/projects/${project.slug}`,
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
