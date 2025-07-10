interface AuthorsIndexSchemaProps {
  authors: Array<{
    name: string
    role: string
    bio: string
    image: string
    slug: string
    count: number
  }>
}

export function AuthorsIndexSchema({ authors }: AuthorsIndexSchemaProps) {
  // Create the schema markup for the authors index page
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    headline: "Our Authors - LEXIA Blog",
    description: "Meet the talented team behind our architectural insights and articles.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://lexia.design"}/authors`,
    publisher: {
      "@type": "Organization",
      name: "LEXIA",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://lexia.design"}/logo.png`,
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: authors.map((author, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://lexia.design"}/authors/${author.slug}`,
        name: author.name,
        description: author.role,
      })),
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
