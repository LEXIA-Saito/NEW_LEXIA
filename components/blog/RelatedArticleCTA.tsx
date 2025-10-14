"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, Tag } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

interface RelatedArticleCTAProps {
    slug: string
    title: string
    description: string
    heroImage: string
    heroImageAlt: string
    readingTime: string
    tags: string[]
    className?: string
}

export default function RelatedArticleCTA({
    slug,
    title,
    description,
    heroImage,
    heroImageAlt,
    readingTime,
    tags,
    className = "",
}: RelatedArticleCTAProps) {
    return (
        <div className={`group relative overflow-hidden rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${className}`}>
            <Link
                href={`/blog/${slug}`}
                onClick={() => trackEvent("related_article_click", { slug, title })}
                className="block"
            >
                {/* Hero Image */}
                <div className="relative h-48 overflow-hidden">
                    <Image
                        src={heroImage}
                        alt={heroImageAlt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    
                    {/* 関連記事バッジ */}
                    <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-white/90 text-neutral-800 rounded-full backdrop-blur-sm">
                            関連記事
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Tags and Reading Time */}
                    <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400">
                            <Clock className="w-4 h-4" />
                            <span>{readingTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {tags.slice(0, 2).map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full"
                                >
                                    <Tag className="w-3 h-3" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {title}
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-4 line-clamp-3">
                        {description}
                    </p>

                    {/* CTA Button */}
                    <div className="flex items-center justify-between pt-2 border-t border-neutral-200 dark:border-neutral-700">
                        <span className="text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                            記事を読む
                        </span>
                        <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                            <span className="text-xs font-medium">続きを読む</span>
                            <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1" />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}