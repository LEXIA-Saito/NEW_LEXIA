"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

const services = [
  { id: "corporate", name: "コーポレートサイト(5ページ)", price: 300000 },
  { id: "ec", name: "ECサイト", price: 500000 },
  { id: "lp", name: "ランディングページ", price: 150000 },
  { id: "seo", name: "SEO対策", price: 50000 },
  { id: "maintenance", name: "保守管理(月額)", price: 10000 },
]

export default function PricingPage() {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const total = selected.reduce((sum, id) => {
    const service = services.find((s) => s.id === id)
    return sum + (service?.price || 0)
  }, 0)

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-8 text-center">
            料金計算
          </h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12" />
                <TableHead>サービス</TableHead>
                <TableHead className="text-right">料金(円)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>
                    <Checkbox
                      checked={selected.includes(s.id)}
                      onCheckedChange={() => toggle(s.id)}
                    />
                  </TableCell>
                  <TableCell>{s.name}</TableCell>
                  <TableCell className="text-right">
                    {s.price.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell />
                <TableHead className="text-right">合計</TableHead>
                <TableCell className="text-right font-medium">
                  {total.toLocaleString()} 円
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </main>
      <Footer />
    </>
  )
}
