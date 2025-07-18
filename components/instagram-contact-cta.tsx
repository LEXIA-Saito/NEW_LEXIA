"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function InstagramContactCTA() {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-800 p-8 rounded-lg text-center">
      <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-4">
        Instagramでお問い合わせ
      </h3>
      <p className="text-neutral-700 dark:text-neutral-300 mb-6">
        最新情報や制作実績をInstagramで公開しています。DMからお気軽にご連絡ください。
      </p>
      <Link
        href="https://www.instagram.com/lexia_web/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button className="text-base">Instagramで相談する</Button>
      </Link>
    </div>
  )
}
