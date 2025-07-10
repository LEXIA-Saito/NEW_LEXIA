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
    headline: `${author.name} - Risala Design Blog`,
    description: author.bio,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://risala.design"}/authors/${author.slug}`,
    mainEntity: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.role,
      description: author.bio,
      image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://risala.design"}${author.image}`,
      email: author.email,
      sameAs: author.linkedin ? [author.linkedin] : undefined,
      worksFor: {
        "@type": "Organization",
        name: "Risala Design",
        url: process.env.NEXT_PUBLIC_SITE_URL || "https://risala.design",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Risala Design",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://risala.design"}/logo.png`,
      },
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
