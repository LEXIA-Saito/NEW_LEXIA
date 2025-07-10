interface TagSchemaProps {
  tag: string
  postCount: number
}

export function TagSchema({ tag, postCount }: TagSchemaProps) {
  // Create the schema markup for a tag page
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    headline: `#${tag} - Risala Design Blog`,
    description: `Articles related to ${tag}`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://risala.design"}/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`,
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
      numberOfItems: postCount,
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
