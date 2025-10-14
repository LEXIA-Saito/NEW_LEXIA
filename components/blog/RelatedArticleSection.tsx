import RelatedArticleCTA from "./RelatedArticleCTA"
import { getSpecificArticle } from "@/lib/related-articles"

interface RelatedArticleSectionProps {
  targetSlug: string
  title?: string
  description?: string
  className?: string
}

export default async function RelatedArticleSection({
  targetSlug,
  title = "関連記事",
  description,
  className = "",
}: RelatedArticleSectionProps) {
  const article = await getSpecificArticle(targetSlug)

  if (!article) {
    return null
  }

  return (
    <div className={`my-8 ${className}`}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        )}
      </div>

      <RelatedArticleCTA
        slug={article.slug}
        title={article.title}
        description={article.description}
        heroImage={article.heroImage || "/images/blog-placeholder.svg"}
        heroImageAlt={article.heroImageAlt || article.title}
        readingTime={article.readingTime}
        tags={article.tags}
      />
    </div>
  )
}