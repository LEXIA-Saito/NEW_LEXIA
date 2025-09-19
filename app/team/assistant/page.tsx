"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Image from "next/image"
import Breadcrumbs from "@/components/breadcrumbs"
import { Chip } from "@/components/ui/chip"
import Script from "next/script"
import { SITE_URL } from "@/lib/config"

export default function AssistantProfile() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="text-center mb-12">
                        <div className="relative aspect-square bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden">
              <Image src="/placeholder-user.svg" alt="アシスタント" fill className="object-cover" />
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
      <Script
        id="person-assistant-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "アシスタント",
            jobTitle: "アシスタント",
            openGraph: {
            title: "アシスタント - LEXIA",
            description: "LEXIA アシスタントのプロフィールをご覧ください。",
            url: `${SITE_URL}/team/assistant`,
            siteName: 'LEXIA',
            images: [
                {
                    url: `${SITE_URL.replace(/\/$/, "")}/og/team-assistant.png`,
                    width: 1200,
                    height: 630,
                    alt: "LEXIA アシスタント",
                },
            ],
            image: `${SITE_URL.replace(/\/$/, "")}/placeholder-user.svg`,
            locale: 'ja_JP',
            type: 'website',
        },
            worksFor: { "@type": "Organization", name: "LEXIA", url: SITE_URL },
          }),
        }}
      />
    </>
  )
}
