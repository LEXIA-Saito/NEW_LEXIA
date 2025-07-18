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

export default function SystemCalculator() {
  const [screens, setScreens] = useState(1)
  const [functions, setFunctions] = useState(1)
  const [users, setUsers] = useState(1)
  const [apis, setApis] = useState(0)
  const [complexity, setComplexity] = useState(1)
  const [security, setSecurity] = useState(1)
  const [uiFactor, setUiFactor] = useState(1)

  const baseCosts = {
    requirements: 100000,
    basic: 200000,
    custom: 100000,
    uiux: 100000,
    testing: 50000,
    maintenance: 50000,
    docs: 30000,
  }

  const screenCost = screens * 50000
  const functionCost = functions * 30000
  const userCost = users * 1000
  const apiCost = apis * 20000

  const baseTotal = Object.values(baseCosts).reduce((sum, v) => sum + v, 0)
  const variableTotal = screenCost + functionCost + userCost + apiCost

  const subtotal = baseTotal + variableTotal
  const coefficient = complexity * security * uiFactor
  const total = Math.round(subtotal * coefficient)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>項目</TableHead>
          <TableHead className="text-right">金額(円)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>要件定義・設計</TableCell>
          <TableCell className="text-right">{baseCosts.requirements.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>基本機能開発</TableCell>
          <TableCell className="text-right">{baseCosts.basic.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>カスタム機能開発</TableCell>
          <TableCell className="text-right">{baseCosts.custom.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>UI/UXデザイン</TableCell>
          <TableCell className="text-right">{baseCosts.uiux.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>テスト・品質保証</TableCell>
          <TableCell className="text-right">{baseCosts.testing.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>保守・運用サポート</TableCell>
          <TableCell className="text-right">{baseCosts.maintenance.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>ドキュメント作成</TableCell>
          <TableCell className="text-right">{baseCosts.docs.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            画面数
            <Input
              type="number"
              min={0}
              value={screens}
              onChange={(e) => setScreens(parseInt(e.target.value) || 0)}
              className="w-20"
            />
          </TableCell>
          <TableCell className="text-right">{screenCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            機能数
            <Input
              type="number"
              min={0}
              value={functions}
              onChange={(e) => setFunctions(parseInt(e.target.value) || 0)}
              className="w-20"
            />
          </TableCell>
          <TableCell className="text-right">{functionCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            ユーザー数
            <Input
              type="number"
              min={0}
              value={users}
              onChange={(e) => setUsers(parseInt(e.target.value) || 0)}
              className="w-20"
            />
          </TableCell>
          <TableCell className="text-right">{userCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            API連携数
            <Input
              type="number"
              min={0}
              value={apis}
              onChange={(e) => setApis(parseInt(e.target.value) || 0)}
              className="w-20"
            />
          </TableCell>
          <TableCell className="text-right">{apiCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            複雑度係数
            <Input
              type="number"
              step="0.1"
              min={1}
              value={complexity}
              onChange={(e) => setComplexity(parseFloat(e.target.value) || 1)}
              className="w-20"
            />
          </TableCell>
          <TableCell className="text-right">{complexity}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            セキュリティ係数
            <Input
              type="number"
              step="0.1"
              min={1}
              value={security}
              onChange={(e) => setSecurity(parseFloat(e.target.value) || 1)}
              className="w-20"
            />
          </TableCell>
          <TableCell className="text-right">{security}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            UI特殊度係数
            <Input
              type="number"
              step="0.1"
              min={1}
              value={uiFactor}
              onChange={(e) => setUiFactor(parseFloat(e.target.value) || 1)}
              className="w-20"
            />
          </TableCell>
          <TableCell className="text-right">{uiFactor}</TableCell>
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
