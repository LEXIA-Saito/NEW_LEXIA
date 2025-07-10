import type { blogPosts } from "@/lib/blog-data"

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
    image: post.image ? `${process.env.NEXT_PUBLIC_SITE_URL || "https://lexia.design"}${post.image}` : undefined,
    datePublished: new Date(post.date).toISOString(),
    dateModified: post.dateModified ? new Date(post.dateModified).toISOString() : new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name: post.author,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://lexia.design"}/team`,
    },
    publisher: {
      "@type": "Organization",
      name: "LEXIA",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://lexia.design"}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://lexia.design"}/blog/${post.slug}`,
    },
    keywords: post.tags?.join(", ") || post.category,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
