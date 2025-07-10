interface CategorySchemaProps {
  category: {
    id: string
    name: string
    description: string
  }
  postCount: number
}

export function CategorySchema({ category, postCount }: CategorySchemaProps) {
  // Create the schema markup for a category page
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    headline: `${category.name} - LEXIA Blog`,
    description: category.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://lexia.design"}/categories/${category.id}`,
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
      numberOfItems: postCount,
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
