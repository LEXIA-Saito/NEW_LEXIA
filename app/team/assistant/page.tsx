"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Image from "next/image"
import Breadcrumbs from "@/components/breadcrumbs"
import { Chip } from "@/components/ui/chip"

export default function AssistantProfile() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="text-center mb-12">
            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
              <Image src="/placeholder-user.jpg" alt="アシスタント" fill className="object-cover" />
            </div>
            <Chip className="mb-2">アシスタント</Chip>
            <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-4">
              アシスタント
            </h1>
            <Breadcrumbs />
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              日々の業務をサポートし、チームが円滑に動くように支援しています。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
