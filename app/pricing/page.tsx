"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import HomepageCalculator from "@/components/pricing/homepage-calculator"
import ComingSoon from "@/components/pricing/coming-soon"
// Temporarily disable other calculators in favor of ComingSoon placeholder
// import EcCalculator from "@/components/pricing/ec-calculator"
// import SystemCalculator from "@/components/pricing/system-calculator"
// import DesignCalculator from "@/components/pricing/design-calculator"
import PcClassPricingTable from "@/components/pricing/pc-class-pricing-table"
import { SITE_URL } from "@/lib/config"

export default function PricingPage() {
  const [tab, setTab] = useState("homepage")

  const offers = [
    { name: "ホームページ制作", price: "100000" },
    { name: "ECサイト制作", price: "120000" },
    { name: "システム開発", price: "180000" },
    { name: "デザイン制作", price: "100000" },
    { name: "PC教室", price: "5000" },
    { name: "AI活用サポート", price: "100000" },
  ]

  const offersJsonLd = {
    "@context": "https://schema.org",
    "@graph": offers.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      price: offer.price,
      priceCurrency: "JPY",
      url: `${SITE_URL.replace(/\/$/, "")}/pricing`,
    })),
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-4 text-center">
            料金計算・サービス別料金表
          </h1>
          <Breadcrumbs />
          <p className="text-center text-neutral-700 dark:text-neutral-300 mb-8">
            このページではAI活用サポートをはじめ、各サービスの料金目安を紹介します。
          </p>
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <div className="overflow-x-auto mb-4">
              <TabsList className="flex w-max">
                <TabsTrigger value="homepage">ホームページ制作</TabsTrigger>
                <TabsTrigger value="ec">ECサイト制作</TabsTrigger>
                <TabsTrigger value="system">システム開発</TabsTrigger>
                <TabsTrigger value="design">デザイン制作</TabsTrigger>
                <TabsTrigger value="pc">PC教室</TabsTrigger>
                <TabsTrigger value="ai">AI活用サポート</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="homepage">
              <HomepageCalculator />
            </TabsContent>
            <TabsContent value="ec">
              <ComingSoon />
            </TabsContent>
            <TabsContent value="system">
              <ComingSoon />
            </TabsContent>
            <TabsContent value="design">
              <ComingSoon />
            </TabsContent>
            <TabsContent value="pc">
              <PcClassPricingTable />
            </TabsContent>
            <TabsContent value="ai">
              <ComingSoon />
            </TabsContent>
          </Tabs>
          {/* Global CTA at bottom */}
          <div className="mt-12 text-center">
            <div className="inline-flex flex-wrap gap-3 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-neutral-900 text-white px-5 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors"
              >
                この内容で相談する
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 px-5 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                サービス一覧へ
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offersJsonLd) }}
      />
    </>
  )
}
