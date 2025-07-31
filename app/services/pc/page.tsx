"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PcServicePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-3xl">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              ホームへ戻る
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-8 text-center">PC教室</h1>
          <p className="text-neutral-700 dark:text-neutral-300">
            初心者向けからビジネス活用まで、目的に合わせたレッスンを提供します。
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
