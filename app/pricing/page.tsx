"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import HomepageCalculator from "@/components/pricing/homepage-calculator"

export default function PricingPage() {
  const [tab, setTab] = useState("homepage")

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-8 text-center">
            料金計算
          </h1>
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="flex flex-wrap justify-center mb-4">
              <TabsTrigger value="homepage">ホームページ制作</TabsTrigger>
              <TabsTrigger value="ec">ECサイト制作</TabsTrigger>
              <TabsTrigger value="system">システム開発</TabsTrigger>
              <TabsTrigger value="design">デザイン制作</TabsTrigger>
              <TabsTrigger value="pc">PC教室</TabsTrigger>
              <TabsTrigger value="ai">AI活用サポート</TabsTrigger>
            </TabsList>
            <TabsContent value="homepage">
              <HomepageCalculator />
            </TabsContent>
            <TabsContent value="ec">
              <p className="p-4 text-center">準備中</p>
            </TabsContent>
            <TabsContent value="system">
              <p className="p-4 text-center">準備中</p>
            </TabsContent>
            <TabsContent value="design">
              <p className="p-4 text-center">準備中</p>
            </TabsContent>
            <TabsContent value="pc">
              <p className="p-4 text-center">準備中</p>
            </TabsContent>
            <TabsContent value="ai">
              <p className="p-4 text-center">準備中</p>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  )
}
