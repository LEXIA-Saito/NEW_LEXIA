"use client"

import { useState } from "react"
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface PcClassItem {
  name: string
  visit: number
  remote: number
  oneOnOne: number
  oneToTwo: number
  oneToFive: number
}

const items: PcClassItem[] = [
  { name: "PC基本操作", visit: 8000, remote: 5000, oneOnOne: 6000, oneToTwo: 4000, oneToFive: 3000 },
  { name: "Word、Excel基礎", visit: 8000, remote: 5000, oneOnOne: 6000, oneToTwo: 4000, oneToFive: 3000 },
  { name: "メール操作", visit: 6000, remote: 3000, oneOnOne: 5000, oneToTwo: 3000, oneToFive: 2500 },
  { name: "分からない部分だけ教えてほしい場合", visit: 6000, remote: 3000, oneOnOne: 5000, oneToTwo: 3000, oneToFive: 2500 },
  { name: "個別指導", visit: 7000, remote: 4000, oneOnOne: 6000, oneToTwo: 4000, oneToFive: 3000 },
]

export default function PcClassPricingTable() {
  const [billing, setBilling] = useState<"session" | "month">("session")

  const factor = billing === "month" ? 4 : 1
  const suffix = billing === "month" ? "月額" : "1回"

  return (
    <>
      <div className="mb-4 flex justify-end">
        <ToggleGroup type="single" value={billing} onValueChange={(val) => val && setBilling(val as "session" | "month")}>
          <ToggleGroupItem value="session">1回</ToggleGroupItem>
          <ToggleGroupItem value="month">月額</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>内容</TableHead>
            <TableHead className="text-right">出張({suffix})</TableHead>
            <TableHead className="text-right">リモート({suffix})</TableHead>
            <TableHead className="text-right">マンツーマン({suffix})</TableHead>
            <TableHead className="text-right">1対2({suffix})</TableHead>
            <TableHead className="text-right">1対5({suffix})</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.name}>
              <TableCell>{item.name}</TableCell>
              <TableCell className="text-right">{(item.visit * factor).toLocaleString()}円</TableCell>
              <TableCell className="text-right">{(item.remote * factor).toLocaleString()}円</TableCell>
              <TableCell className="text-right">{(item.oneOnOne * factor).toLocaleString()}円</TableCell>
              <TableCell className="text-right">{(item.oneToTwo * factor).toLocaleString()}円</TableCell>
              <TableCell className="text-right">{(item.oneToFive * factor).toLocaleString()}円</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableHead>※月額は4回受講した場合の目安です。</TableHead>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  )
}
