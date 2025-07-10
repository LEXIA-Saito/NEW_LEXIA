import type { projectsData } from "@/lib/projects-data"

interface ProjectSchemaProps {
  project: (typeof projectsData)[0]
}

export function ProjectSchema({ project }: ProjectSchemaProps) {
  // Create the schema markup for a project page
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ArchitectureProject",
    name: project.title,
    description: project.description,
    image: project.coverImage
      ? `${process.env.NEXT_PUBLIC_SITE_URL || "https://lexia.design"}${project.coverImage}`
      : undefined,
    datePublished: new Date(project.year, 0).toISOString(),
    author: {
      "@type": "Organization",
      name: "LEXIA",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://lexia.design"}`,
    },
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
    genre: project.category,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://lexia.design"}/projects/${project.slug}`,
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
