import type { blogPosts } from "@/lib/blog-data"
import { SITE_URL } from "../../lib/config"

interface BlogListSchemaProps {
  posts: typeof blogPosts
}

export function BlogListSchema({ posts }: BlogListSchemaProps) {
  // Create the schema markup for a blog listing page
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    headline: "ウェブデザインジャーナル - LEXIA Blog",
    description: "ウェブ制作やデザインに関する最新情報を発信しています。",
    url: `${SITE_URL}/blog`,
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
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
