import { SITE_URL } from "../../lib/config"

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
    url: `${SITE_URL}/categories/${category.id}`,
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
      numberOfItems: postCount,
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
