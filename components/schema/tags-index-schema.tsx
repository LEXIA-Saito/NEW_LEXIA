import { SITE_URL } from "../../lib/config"

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
    headline: "記事タグ - LEXIA Blog",
    description: "特定のトピックやキーワードで記事を検索し、お探しの情報を正確に見つけましょう。",
    url: `${SITE_URL}/tags`,
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
      itemListElement: tags.map((tag, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/tags/${tag.slug}`,
        name: `#${tag.name}`,
        description: `${tag.count} articles`,
      })),
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
