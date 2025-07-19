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
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function SystemCalculator() {
  const [pages, setPages] = useState(1)
  const [design, setDesign] = useState<"simple" | "standard" | "high">("standard")
  const [responsive, setResponsive] = useState(true)
  const [formType, setFormType] = useState<"simple" | "custom">("simple")
  const [cms, setCms] = useState(false)
  const [api, setApi] = useState(false)
  const [server, setServer] = useState(false)
  const [login, setLogin] = useState(false)
  const [db, setDb] = useState(false)
  const [testRange, setTestRange] = useState<"basic" | "detail">("basic")
  const [maintenance, setMaintenance] = useState<"none" | "1year" | "2year">("none")
  const [revision, setRevision] = useState(0)
  const [rush, setRush] = useState(false)

  const pageCost = pages * 5000
  const designCost = design === "simple" ? 20000 : design === "standard" ? 40000 : 80000
  const responsiveCost = responsive ? 20000 : 0
  const formCost = formType === "simple" ? 10000 : 30000
  const cmsCost = cms ? 60000 : 0
  const apiCost = api ? 80000 : 0
  const serverCost = server ? 50000 : 0
  const loginCost = login ? 60000 : 0
  const dbCost = db ? 70000 : 0
  const testCost = testRange === "basic" ? 30000 : 60000
  const maintenanceCost = maintenance === "none" ? 0 : maintenance === "1year" ? 60000 : 110000
  const revisionCost = revision * 10000
  const rushCost = rush ? 70000 : 0

  const total =
    pageCost +
    designCost +
    responsiveCost +
    formCost +
    cmsCost +
    apiCost +
    serverCost +
    loginCost +
    dbCost +
    testCost +
    maintenanceCost +
    revisionCost +
    rushCost

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
            ページ数
            <Input type="number" min={1} value={pages} onChange={(e) => setPages(parseInt(e.target.value) || 0)} className="w-20" />
          </TableCell>
          <TableCell className="text-right">{pageCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex flex-col gap-1">
            デザインレベル
            <RadioGroup className="flex gap-4" value={design} onValueChange={(v) => setDesign(v as "simple" | "standard" | "high") }>
              <div className="flex items-center gap-1">
                <RadioGroupItem value="simple" id="design-simple" />
                <label htmlFor="design-simple" className="text-sm">シンプル</label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value="standard" id="design-standard" />
                <label htmlFor="design-standard" className="text-sm">標準</label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value="high" id="design-high" />
                <label htmlFor="design-high" className="text-sm">ハイエンド</label>
              </div>
            </RadioGroup>
          </TableCell>
          <TableCell className="text-right">{designCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            レスポンシブ対応
            <Switch checked={responsive} onCheckedChange={() => setResponsive(!responsive)} />
          </TableCell>
          <TableCell className="text-right">{responsiveCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            フォームの種類
            <Select value={formType} onValueChange={(v) => setFormType(v as "simple" | "custom") }>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simple">簡易フォーム</SelectItem>
                <SelectItem value="custom">カスタムフォーム</SelectItem>
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell className="text-right">{formCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            CMS導入
            <Checkbox checked={cms} onCheckedChange={() => setCms(!cms)} />
          </TableCell>
          <TableCell className="text-right">{cmsCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            API連携
            <Checkbox checked={api} onCheckedChange={() => setApi(!api)} />
          </TableCell>
          <TableCell className="text-right">{apiCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            サーバー構築費用
            <Checkbox checked={server} onCheckedChange={() => setServer(!server)} />
          </TableCell>
          <TableCell className="text-right">{serverCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            ログイン機能
            <Checkbox checked={login} onCheckedChange={() => setLogin(!login)} />
          </TableCell>
          <TableCell className="text-right">{loginCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            データベース設計
            <Checkbox checked={db} onCheckedChange={() => setDb(!db)} />
          </TableCell>
          <TableCell className="text-right">{dbCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            テスト範囲
            <RadioGroup className="flex gap-4" value={testRange} onValueChange={(v) => setTestRange(v as "basic" | "detail") }>
              <div className="flex items-center gap-1">
                <RadioGroupItem value="basic" id="test-basic" />
                <label htmlFor="test-basic" className="text-sm">基本</label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value="detail" id="test-detail" />
                <label htmlFor="test-detail" className="text-sm">詳細</label>
              </div>
            </RadioGroup>
          </TableCell>
          <TableCell className="text-right">{testCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            保守プラン
            <RadioGroup className="flex gap-4" value={maintenance} onValueChange={(v) => setMaintenance(v as "none" | "1year" | "2year") }>
              <div className="flex items-center gap-1">
                <RadioGroupItem value="none" id="maint-none" />
                <label htmlFor="maint-none" className="text-sm">なし</label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value="1year" id="maint-1" />
                <label htmlFor="maint-1" className="text-sm">1年</label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value="2year" id="maint-2" />
                <label htmlFor="maint-2" className="text-sm">2年</label>
              </div>
            </RadioGroup>
          </TableCell>
          <TableCell className="text-right">{maintenanceCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            デザイン修正回数
            <Input type="number" min={0} value={revision} onChange={(e) => setRevision(parseInt(e.target.value) || 0)} className="w-20" />
          </TableCell>
          <TableCell className="text-right">{revisionCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            納期短縮オプション
            <Checkbox checked={rush} onCheckedChange={() => setRush(!rush)} />
          </TableCell>
          <TableCell className="text-right">{rushCost.toLocaleString()}</TableCell>
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
