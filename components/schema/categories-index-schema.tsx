import { SITE_URL, LOGO_URL } from "../../lib/config"

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
    headline: "記事カテゴリー - LEXIA Blog",
    description: "トピック別に記事を検索し、関心のある分野での洞察やインスピレーションを見つけましょう。",
    url: `${SITE_URL}/categories`,
    publisher: {
      "@type": "Organization",
      name: "LEXIA",
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: categories.map((category, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/categories/${category.id}`,
        name: category.name,
        description: category.description,
      })),
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
