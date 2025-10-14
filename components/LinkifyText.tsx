"use client"

import React from "react"
import RelatedArticleSection from "./blog/RelatedArticleSection"

type Props = {
  text: string
  linkClassName?: string
}

const ONLOOK_URL = "https://www.onlook.com/"

function linkifyOnlook(text: string, linkClassName?: string): React.ReactNode[] {
  const regex = /\bOnlook\b/g
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let i = 0
  for (const match of text.matchAll(regex)) {
    const start = match.index ?? 0
    if (start > lastIndex) nodes.push(text.slice(lastIndex, start))
    nodes.push(
      <a
        key={`onlook-${i++}`}
        href={ONLOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName ?? "underline underline-offset-4"}
      >
        Onlook
      </a>,
    )
    lastIndex = start + match[0].length
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  if (nodes.length === 0) return [text]
  return nodes
}

export default function LinkifyText({ text, linkClassName }: Props) {
  // 関連記事プレースホルダーをチェック
  const relatedArticleRegex = /\{\{RELATED_ARTICLE:([^}]+)\}\}/g
  const relatedArticleMatches = Array.from(text.matchAll(relatedArticleRegex))
  
  // 関連記事プレースホルダーがある場合の処理
  if (relatedArticleMatches.length > 0) {
    const nodes: React.ReactNode[] = []
    let lastIndex = 0
    let componentIndex = 0
    
    for (const match of relatedArticleMatches) {
      const start = match.index ?? 0
      const slug = match[1]
      
      // プレースホルダーの前のテキストを処理
      if (start > lastIndex) {
        const beforeText = text.slice(lastIndex, start)
        if (beforeText.trim()) {
          nodes.push(
            <div key={`text-${componentIndex}`} className="mb-4">
              {processTextWithLinks(beforeText, linkClassName)}
            </div>
          )
        }
      }
      
      // 関連記事コンポーネントを追加
      nodes.push(
        <RelatedArticleSection 
          key={`related-${componentIndex}`} 
          targetSlug={slug} 
          className="my-6"
        />
      )
      
      lastIndex = start + match[0].length
      componentIndex++
    }
    
    // 最後のプレースホルダー以降のテキストを処理
    if (lastIndex < text.length) {
      const afterText = text.slice(lastIndex)
      if (afterText.trim()) {
        nodes.push(
          <div key={`text-${componentIndex}`} className="mt-4">
            {processTextWithLinks(afterText, linkClassName)}
          </div>
        )
      }
    }
    
    return <>{nodes}</>
  }

  // 関連記事プレースホルダーがない場合は通常の処理
  return <>{processTextWithLinks(text, linkClassName)}</>
}

function processTextWithLinks(text: string, linkClassName?: string): React.ReactNode[] {
  const urlRegex = /https?:\/\/[^\s)]+/g
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let i = 0

  for (const match of text.matchAll(urlRegex)) {
    const start = match.index ?? 0
    if (start > lastIndex) {
      const chunk = text.slice(lastIndex, start)
      nodes.push(...linkifyOnlook(chunk, linkClassName))
    }
    const url = match[0]
    nodes.push(
      <a
        key={`url-${i++}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName ?? "underline underline-offset-4"}
      >
        {url}
      </a>,
    )
    lastIndex = start + url.length
  }

  if (lastIndex < text.length) {
    const tail = text.slice(lastIndex)
    nodes.push(...linkifyOnlook(tail, linkClassName))
  }

  if (nodes.length === 0) return [text]
  return nodes
}

