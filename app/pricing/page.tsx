"use client"

import { useState } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import HomepageCalculator from "@/components/pricing/homepage-calculator"
import PackagePlans from "@/components/pricing/package-plans"
import ComingSoon from "@/components/pricing/coming-soon"
// Temporarily disable other calculators in favor of ComingSoon placeholder
// import EcCalculator from "@/components/pricing/ec-calculator"
// import SystemCalculator from "@/components/pricing/system-calculator"
// import DesignCalculator from "@/components/pricing/design-calculator"
import PcClassPricingTable from "@/components/pricing/pc-class-pricing-table"
import { trackEvent } from "@/lib/analytics"

export default function PricingPage() {
  const [tab, setTab] = useState("homepage")

  const handleTabChange = (value: string) => {
    setTab(value)
    trackEvent("pricing_tab_view", { service: value })
  }

  // Offer の構造化データは app/pricing/layout.tsx で出力している（重複を避けるためここでは持たない）

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-4 text-center">
            料金プラン
          </h1>
          <Breadcrumbs />
          <p className="text-center text-neutral-700 dark:text-neutral-300 mb-8">
            目的から選べる制作パッケージと、公開後の月額運用プランをご紹介します。
          </p>
          <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
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
              <PackagePlans />

              {/* 内訳から概算したい方向けに、従来の積み上げ計算も残す */}
              <section className="mt-20 pt-12 border-t border-neutral-200 dark:border-neutral-800">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-light text-neutral-900 dark:text-neutral-100">
                    内訳から概算する
                  </h2>
                  <p className="mt-3 text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
                    ページ数や素材の数から概算を出したい場合はこちらをご利用ください。
                  </p>
                </div>
                <HomepageCalculator />
              </section>
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
              {tab !== "homepage" && (
                <Link
                  href={`/contact?source=pricing&service=${encodeURIComponent(tab)}`}
                  onClick={() => trackEvent("service_cta_click", {
                    location: "pricing_page",
                    service: tab,
                  })}
                  className="inline-flex items-center justify-center rounded-md bg-neutral-900 text-white px-5 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors"
                >
                  このサービスについて相談する
                </Link>
              )}
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 px-5 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                サービス一覧へ
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
