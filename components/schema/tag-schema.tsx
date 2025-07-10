import { SITE_URL } from "../../lib/config"

interface TagSchemaProps {
  tag: string
  postCount: number
}

export function TagSchema({ tag, postCount }: TagSchemaProps) {
  // Create the schema markup for a tag page
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    headline: `#${tag} - LEXIA Blog`,
    description: `${tag}関連の記事`,
    url: `${SITE_URL}/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`,
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
