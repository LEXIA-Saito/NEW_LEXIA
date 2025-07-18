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

export default function HomepageRunningCost() {
  const [server, setServer] = useState(1000)
  const [domain, setDomain] = useState(1000)
  const [form, setForm] = useState(0)

  const serverYear = server * 12
  const domainYear = domain * 12
  const formYear = form * 12
  const total = serverYear + domainYear + formYear

  return (
    <Table className="mt-8">
      <TableHeader>
        <TableRow>
          <TableHead>項目</TableHead>
          <TableHead className="text-right">年間費用(円)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            サーバー(月額)
            <Input
              type="number"
              min={0}
              value={server}
              onChange={(e) => setServer(parseInt(e.target.value) || 0)}
              className="w-20"
            />
          </TableCell>
          <TableCell className="text-right">{serverYear.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            ドメイン(月額)
            <Input
              type="number"
              min={0}
              value={domain}
              onChange={(e) => setDomain(parseInt(e.target.value) || 0)}
              className="w-20"
            />
          </TableCell>
          <TableCell className="text-right">{domainYear.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            フォーム(月額)
            <Input
              type="number"
              min={0}
              value={form}
              onChange={(e) => setForm(parseInt(e.target.value) || 0)}
              className="w-20"
            />
          </TableCell>
          <TableCell className="text-right">{formYear.toLocaleString()}</TableCell>
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
