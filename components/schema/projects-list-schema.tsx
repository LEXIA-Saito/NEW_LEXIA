import type { projectsData } from "@/lib/projects-data"

interface ProjectsListSchemaProps {
  projects: typeof projectsData
}

export function ProjectsListSchema({ projects }: ProjectsListSchemaProps) {
  // Create the schema markup for a projects listing page
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    headline: "Our Projects - Risala Design Portfolio",
    description:
      "Explore our diverse portfolio of architectural projects, from residential homes to commercial spaces.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://risala.design"}/projects`,
    publisher: {
      "@type": "Organization",
      name: "Risala Design",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://risala.design"}/logo.png`,
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://risala.design"}/projects/${project.slug}`,
        name: project.title,
      })),
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
