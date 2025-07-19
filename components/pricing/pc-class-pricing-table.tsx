"use client"

import { useState } from "react"
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PcClassItem {
  name: string
  visit: number
  remote: number
  oneOnOne: number
  oneToTwo: number
  oneToFive: number
}

type MethodKey = "visit" | "remote" | "oneOnOne" | "oneToTwo" | "oneToFive"

const METHOD_LABELS: Record<MethodKey, string> = {
  visit: "出張",
  remote: "リモート",
  oneOnOne: "マンツーマン",
  oneToTwo: "1対2",
  oneToFive: "1対5",
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
  const [method, setMethod] = useState<MethodKey>("visit")

  const factor = billing === "month" ? 4 : 1
  const suffix = billing === "month" ? "月額" : "1回"

  return (
    <>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Select value={method} onValueChange={(v) => setMethod(v as MethodKey)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="受講方法" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(METHOD_LABELS).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <ToggleGroup type="single" value={billing} onValueChange={(val) => val && setBilling(val as "session" | "month")}
          className="self-end sm:self-auto">
          <ToggleGroupItem value="session">1回</ToggleGroupItem>
          <ToggleGroupItem value="month">月額</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>内容</TableHead>
            <TableHead className="text-right">{METHOD_LABELS[method]}({suffix})</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.name}>
              <TableCell>{item.name}</TableCell>
              <TableCell className="text-right">{(item[method] * factor).toLocaleString()}円</TableCell>
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
