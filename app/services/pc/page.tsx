"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"

export default function PcServicePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-4 text-center">PC教室</h1>
          <Breadcrumbs />
          <p className="text-neutral-700 dark:text-neutral-300">
            初心者向けからビジネス活用まで、目的に合わせたレッスンを提供します。
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
