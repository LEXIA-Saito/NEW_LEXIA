"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Instagram } from "lucide-react"

export function InstagramContactCTA() {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-800 p-8 rounded-lg text-center">
      <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-4">
        お問い合わせはこちら
      </h3>
      <p className="text-neutral-700 dark:text-neutral-300 mb-6">
        最新情報や制作実績はInstagramでも公開中です。フォームまたはDMからお気軽にご連絡ください。
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/contact">
          <Button className="text-base">お問い合わせフォーム</Button>
        </Link>
        <a
          href="https://www.instagram.com/lexia_web/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" className="text-base inline-flex items-center">
            <Instagram className="mr-2 h-5 w-5" />Instagramで相談する
          </Button>
        </a>
      </div>
    </div>
  )
}
