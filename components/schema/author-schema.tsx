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
import { SITE_URL, LOGO_URL } from "../../lib/config"

export function AuthorSchema({ author, postCount }: AuthorSchemaProps) {
  // Create the schema markup for an author page
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    headline: `${author.name} - LEXIA Blog`,
    description: author.bio,
    url: `${SITE_URL}/authors/${author.slug}`,
    mainEntity: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.role,
      description: author.bio,
      image: `${SITE_URL}${author.image}`,
      email: author.email,
      sameAs: author.linkedin ? [author.linkedin] : undefined,
      worksFor: {
        "@type": "Organization",
        name: "LEXIA",
        url: SITE_URL,
      },
    },
    publisher: {
      "@type": "Organization",
      name: "LEXIA",
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
