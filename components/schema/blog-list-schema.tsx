import type { blogPosts } from "@/lib/blog-data"

interface BlogListSchemaProps {
  posts: typeof blogPosts
}

export function BlogListSchema({ posts }: BlogListSchemaProps) {
  // Create the schema markup for a blog listing page
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    headline: "Web Design Journal - LEXIA Blog",
    description: "ウェブ制作やデザインに関する最新情報を発信しています。",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://lexia.design"}/blog`,
    publisher: {
      "@type": "Organization",
      name: "LEXIA",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://lexia.design"}/logo.png`,
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://lexia.design"}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
