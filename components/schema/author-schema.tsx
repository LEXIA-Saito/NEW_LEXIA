interface AuthorSchemaProps {
  author: {
    name: string
    role: string
    bio: string
    image: string
    email?: string
    linkedin?: string
    slug: string
  }
  postCount: number
}

export function AuthorSchema({ author, postCount }: AuthorSchemaProps) {
  // Create the schema markup for an author page
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    headline: `${author.name} - LEXIA Blog`,
    description: author.bio,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://lexia.design"}/authors/${author.slug}`,
    mainEntity: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.role,
      description: author.bio,
      image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://lexia.design"}${author.image}`,
      email: author.email,
      sameAs: author.linkedin ? [author.linkedin] : undefined,
      worksFor: {
        "@type": "Organization",
        name: "LEXIA",
        url: process.env.NEXT_PUBLIC_SITE_URL || "https://lexia.design",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "LEXIA",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://lexia.design"}/logo.png`,
      },
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
