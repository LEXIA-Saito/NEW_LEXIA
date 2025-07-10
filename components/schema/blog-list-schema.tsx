import type { blogPosts } from "@/lib/blog-data"

interface BlogListSchemaProps {
  posts: typeof blogPosts
}

export function BlogListSchema({ posts }: BlogListSchemaProps) {
  // Create the schema markup for a blog listing page
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    headline: "Architecture Journal - Risala Design Blog",
    description: "Thoughts, insights, and explorations on architecture, design, and the built environment.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://risala.design"}/blog`,
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
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://risala.design"}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
