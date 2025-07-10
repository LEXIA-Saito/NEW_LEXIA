interface CategoriesIndexSchemaProps {
  categories: Array<{
    id: string
    name: string
    description: string
    count: number
  }>
}

export function CategoriesIndexSchema({ categories }: CategoriesIndexSchemaProps) {
  // Create the schema markup for the categories index page
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    headline: "Article Categories - Risala Design Blog",
    description: "Explore our articles by topic to find insights and inspiration in your area of interest.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://risala.design"}/categories`,
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
      itemListElement: categories.map((category, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://risala.design"}/categories/${category.id}`,
        name: category.name,
        description: category.description,
      })),
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
