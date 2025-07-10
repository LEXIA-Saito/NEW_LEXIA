interface TagsIndexSchemaProps {
  tags: Array<{
    slug: string
    name: string
    count: number
  }>
}

export function TagsIndexSchema({ tags }: TagsIndexSchemaProps) {
  // Create the schema markup for the tags index page
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    headline: "Article Tags - LEXIA Blog",
    description: "Explore our articles by specific topics and keywords to find exactly what you're looking for.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://lexia.design"}/tags`,
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
      itemListElement: tags.map((tag, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://lexia.design"}/tags/${tag.slug}`,
        name: `#${tag.name}`,
        description: `${tag.count} articles`,
      })),
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
