"use client"

import { useState } from "react"
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

const TYPES = {
  card: {
    label: "名刺デザイン",
    base: 5000,
    free: 3,
    add: 4000,
  },
  logo: {
    label: "ロゴデザイン",
    base: 30000,
    free: 2,
    add: 7000,
  },
  promo: {
    label: "販促物デザイン",
    base: 13000,
    free: 1,
    add: 8000,
  },
} as const

type TypeKey = keyof typeof TYPES

export default function DesignCalculator() {
  const [type, setType] = useState<TypeKey>("card")
  const [proposals, setProposals] = useState(1)
  const [changes, setChanges] = useState(0)

  const info = TYPES[type]
  const additional = Math.max(proposals - info.free, 0)
  const proposalCost = additional * info.add
  const subtotal = info.base + proposalCost
  const total = Math.round(subtotal * (1 + 0.1 * changes))

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>項目</TableHead>
          <TableHead className="text-right">料金(円)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            種別
            <Select value={type} onValueChange={(v) => setType(v as TypeKey)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(TYPES).map(([key, val]) => (
                  <SelectItem key={key} value={key}>
                    {val.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell className="text-right">{info.base.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            提案数
            <Input
              type="number"
              min={1}
              value={proposals}
              onChange={(e) => setProposals(parseInt(e.target.value) || 0)}
              className="w-20"
            />
            <span className="text-sm text-muted-foreground">無料 {info.free} 件</span>
          </TableCell>
          <TableCell className="text-right">{proposalCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            軽微な変更回数
            <Input
              type="number"
              min={0}
              value={changes}
              onChange={(e) => setChanges(parseInt(e.target.value) || 0)}
              className="w-20"
            />
          </TableCell>
          <TableCell className="text-right">{((total - subtotal) > 0 ? (total - subtotal).toLocaleString() : 0)}</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableHead>合計</TableHead>
          <TableHead className="text-right">{total.toLocaleString()} 円</TableHead>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
