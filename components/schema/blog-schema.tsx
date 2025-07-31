import type { blogPosts } from "@/lib/blog-data"
import { SITE_URL, LOGO_URL } from "../../lib/config"

interface BlogSchemaProps {
  post: (typeof blogPosts)[0]
}

export function BlogSchema({ post }: BlogSchemaProps) {
  // Create the schema markup for a blog post
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image ? `${SITE_URL}${post.image}` : undefined,
    datePublished: new Date(post.date).toISOString(),
    dateModified: post.dateModified ? new Date(post.dateModified).toISOString() : new Date(post.date).toISOString(),
    publisher: {
      "@type": "Organization",
      name: "LEXIA",
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.tags?.join(", ") || post.category,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
