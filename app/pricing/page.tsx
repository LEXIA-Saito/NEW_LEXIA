"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import HomepageCalculator from "@/components/pricing/homepage-calculator"
import HomepageRunningCost from "@/components/pricing/homepage-running-cost"
import GeneralPricingTable, {
  PricingItem,
} from "@/components/pricing/general-pricing-table"
import SystemCalculator from "@/components/pricing/system-calculator"
import DesignCalculator from "@/components/pricing/design-calculator"
import PcClassPricingTable from "@/components/pricing/pc-class-pricing-table"

export default function PricingPage() {
  const [tab, setTab] = useState("homepage")

  const ecItems: PricingItem[] = [
    { name: "ディレクション費用", cost: 50000 },
    { name: "デザイン費用", cost: 100000 },
    { name: "コーディング費用", cost: 100000 },
    { name: "システム開発費用", cost: 200000 },
    { name: "CMS・管理画面構築費用", cost: 100000 },
    { name: "テスト・調整費用", cost: 50000 },
    { name: "SEO・マーケ対策費用", cost: 50000 },
  ]

  const aiSupportItems: PricingItem[] = [
    { name: "初期コンサルティング", cost: 100000 },
    { name: "AIツール選定支援", cost: 50000 },
    { name: "導入支援・設定", cost: 150000 },
    { name: "社内トレーニング", cost: 50000 },
    { name: "運用サポート・改善提案(月額)", cost: 50000 },
    { name: "データ分析・レポーティング", cost: 100000 },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-4 text-center">
            料金計算・サービス別料金表
          </h1>
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
              <HomepageRunningCost />
            </TabsContent>
            <TabsContent value="ec">
              <GeneralPricingTable items={ecItems} note="料金は一例で変化する場合があります。" />
            </TabsContent>
            <TabsContent value="system">
              <SystemCalculator />
            </TabsContent>
            <TabsContent value="design">
              <DesignCalculator />
            </TabsContent>
            <TabsContent value="pc">
              <PcClassPricingTable />
            </TabsContent>
            <TabsContent value="ai">
              <GeneralPricingTable
                items={aiSupportItems}
                note="※ 価格はすべて税込表示です。運用サポート・改善提案は月額費用です。"
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  )
}
