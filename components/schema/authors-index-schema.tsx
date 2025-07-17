import { SITE_URL, LOGO_URL } from "../../lib/config"

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
    headline: "チームメンバー一覧 - LEXIA Blog",
    description: "LEXIAのWEB制作や開発に関わるチームメンバーを紹介します。",
    url: `${SITE_URL}/authors`,
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
      itemListElement: authors.map((author, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/authors/${author.slug}`,
        name: author.name,
        description: author.role,
      })),
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
