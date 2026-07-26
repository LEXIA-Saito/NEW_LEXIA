"use client"

import Link from "next/link"
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { trackEvent } from "@/lib/analytics"

export default function HomepageCalculator() {
  const [pages, setPages] = useState(5)
  const [pageType, setPageType] = useState<"static" | "dynamic" | "product">(
    "static",
  )
  const [cms, setCms] = useState(false)
  const [ssr, setSsr] = useState(false)
  const [loginType, setLoginType] = useState<"standard" | "sns">("standard")
  const [formType, setFormType] = useState<"simple" | "custom" | "multi">(
    "simple",
  )
  const [images, setImages] = useState(0)
  const [photos, setPhotos] = useState(0)
  const [videos, setVideos] = useState(0)
  const [designLevel, setDesignLevel] = useState<
    "simple" | "standard" | "high"
  >("standard")
  const [testRange, setTestRange] = useState<"basic" | "detail">("basic")
  const [maintenance, setMaintenance] = useState<"none" | "monthly" | "yearly">(
    "none",
  )
  const [schedule, setSchedule] = useState<"normal" | "rush">("normal")
  const [discountType, setDiscountType] = useState<"amount" | "percent">(
    "amount",
  )
  const [discount, setDiscount] = useState(0)

  const pageTypeCostMap = {
    static: 0,
    dynamic: 5000,
    product: 8000,
  } as const
  const pageCost = pages * (10000 + pageTypeCostMap[pageType])
  const directionCost = 50000
  const planningCost = images * 500 + photos * 1000 + videos * 5000
  const designCost =
    30000 + (designLevel === "standard" ? 10000 : designLevel === "high" ? 30000 : 0)
  const codingCost = 30000 + pages * 5000
  const cmsCost = cms ? 20000 : 0
  const ssrCost = ssr ? 20000 : 0
  const loginCost = loginType === "sns" ? 10000 : 0
  const formCost = formType === "simple" ? 0 : formType === "custom" ? 5000 : 15000
  const testCost = testRange === "detail" ? 10000 : 0
  const maintenanceCost =
    maintenance === "monthly" ? 5000 : maintenance === "yearly" ? 50000 : 0

  const subtotal =
    pageCost +
    directionCost +
    planningCost +
    cmsCost +
    ssrCost +
    loginCost +
    formCost +
    codingCost +
    designCost +
    testCost +
    maintenanceCost
  const managementCost = Math.ceil(subtotal * 0.1)
  let total = subtotal + managementCost
  if (schedule === "rush") {
    total = Math.ceil(total * 1.2)
  }
  const discountAmount =
    discountType === "percent" ? Math.floor((total * discount) / 100) : discount
  total = Math.max(0, total - discountAmount)

  const quoteParams = new URLSearchParams({
    source: "pricing-homepage",
    service: "corporate",
    estimate: String(total),
    pages: String(pages),
    pageType,
    cms: String(cms),
    ssr: String(ssr),
    design: designLevel,
    maintenance,
    schedule,
  })
  const quoteHref = `/contact?${quoteParams.toString()}`

  const handleQuoteClick = () => {
    trackEvent("pricing_complete", {
      calculator: "homepage",
      estimate: total,
      pages,
      cms,
      maintenance,
    })
    trackEvent("service_cta_click", {
      location: "pricing_homepage_calculator",
      service: "web_production",
      estimate: total,
    })
  }

  return (
    <>
      <Table>
      <TableHeader>
        <TableRow>
          <TableHead>項目</TableHead>
          <TableHead className="text-right">金額(円)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            ページ数
            <Input
              type="number"
              min={1}
              max={100}
              value={pages}
              onChange={(e) =>
                setPages(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))
              }
              className="w-20"
            />
          </TableCell>
          <TableCell className="text-right">{pageCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            ページ種別
            <Select value={pageType} onValueChange={(v) => setPageType(v as any)}>
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="static">静的</SelectItem>
                <SelectItem value="dynamic">動的</SelectItem>
                <SelectItem value="product">EC商品</SelectItem>
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell className="text-right">+{(pageTypeCostMap[pageType] * pages).toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>ディレクション費用</TableCell>
          <TableCell className="text-right">{directionCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex flex-col gap-1">
            設計費用
            <div className="flex items-center gap-1 text-sm">
              <span>画像</span>
              <Input
                type="number"
                min={0}
                value={images}
                onChange={(e) => setImages(parseInt(e.target.value) || 0)}
                className="w-14"
              />
              <span className="text-xs text-muted-foreground">×500円</span>
              <span>写真</span>
              <Input
                type="number"
                min={0}
                value={photos}
                onChange={(e) => setPhotos(parseInt(e.target.value) || 0)}
                className="w-14"
              />
              <span className="text-xs text-muted-foreground">×1,000円</span>
              <span>動画</span>
              <Input
                type="number"
                min={0}
                value={videos}
                onChange={(e) => setVideos(parseInt(e.target.value) || 0)}
                className="w-14"
              />
              <span className="text-xs text-muted-foreground">×5,000円</span>
            </div>
          </TableCell>
          <TableCell className="text-right">{planningCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            CMS導入
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-help">?</span>
                </TooltipTrigger>
                <TooltipContent>microCMS を使用します</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Checkbox checked={cms} onCheckedChange={() => setCms(!cms)} />
          </TableCell>
          <TableCell className="text-right">{cmsCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            サーバーレンダリング
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-help">?</span>
                </TooltipTrigger>
                <TooltipContent>Supabase で SSR を行います</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Checkbox checked={ssr} onCheckedChange={() => setSsr(!ssr)} />
          </TableCell>
          <TableCell className="text-right">{ssrCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex flex-col gap-1">
            ログイン方式
            <RadioGroup
              className="flex gap-4"
              value={loginType}
              onValueChange={(v) => setLoginType(v as any)}
            >
              <div className="flex items-center gap-1">
                <RadioGroupItem value="standard" id="login-standard" />
                <label htmlFor="login-standard" className="text-sm">標準</label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value="sns" id="login-sns" />
                <label htmlFor="login-sns" className="text-sm">SNS</label>
              </div>
            </RadioGroup>
          </TableCell>
          <TableCell className="text-right">{loginCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex flex-col gap-1">
            フォームタイプ
            <Select value={formType} onValueChange={(v) => setFormType(v as any)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simple">シンプル</SelectItem>
                <SelectItem value="custom">カスタム</SelectItem>
                <SelectItem value="multi">多言語</SelectItem>
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell className="text-right">{formCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>コーディング費用</TableCell>
          <TableCell className="text-right">{codingCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex flex-col gap-1">
            デザインレベル
            <RadioGroup
              className="flex gap-4"
              value={designLevel}
              onValueChange={(v) => setDesignLevel(v as any)}
            >
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
          <TableCell className="flex flex-col gap-1">
            テスト範囲
            <RadioGroup
              className="flex gap-4"
              value={testRange}
              onValueChange={(v) => setTestRange(v as any)}
            >
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
          <TableCell className="flex flex-col gap-1">
            保守プラン
            <RadioGroup
              className="flex gap-4"
              value={maintenance}
              onValueChange={(v) => setMaintenance(v as any)}
            >
              <div className="flex items-center gap-1">
                <RadioGroupItem value="none" id="mnt-none" />
                <label htmlFor="mnt-none" className="text-sm">なし</label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value="monthly" id="mnt-month" />
                <label htmlFor="mnt-month" className="text-sm">月額</label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value="yearly" id="mnt-year" />
                <label htmlFor="mnt-year" className="text-sm">年額</label>
              </div>
            </RadioGroup>
          </TableCell>
          <TableCell className="text-right">{maintenanceCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>プロジェクト管理費</TableCell>
          <TableCell className="text-right">{managementCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex flex-col gap-1">
            納期
            <RadioGroup
              className="flex gap-4"
              value={schedule}
              onValueChange={(v) => setSchedule(v as any)}
            >
              <div className="flex items-center gap-1">
                <RadioGroupItem value="normal" id="sc-normal" />
                <label htmlFor="sc-normal" className="text-sm">標準</label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value="rush" id="sc-rush" />
                <label htmlFor="sc-rush" className="text-sm">短納期</label>
              </div>
            </RadioGroup>
          </TableCell>
          <TableCell className="text-right">
            {schedule === "rush" ? Math.ceil((subtotal + managementCost) * 0.2).toLocaleString() : 0}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex flex-col gap-1">
            割引
            <RadioGroup
              className="flex gap-4"
              value={discountType}
              onValueChange={(v) => setDiscountType(v as any)}
            >
              <div className="flex items-center gap-1">
                <RadioGroupItem value="amount" id="discount-amount" />
                <label htmlFor="discount-amount" className="text-sm">固定額</label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value="percent" id="discount-percent" />
                <label htmlFor="discount-percent" className="text-sm">％</label>
              </div>
            </RadioGroup>
            <Input
              type="number"
              min={0}
              value={discount}
              onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
              className="w-24 mt-1"
            />
          </TableCell>
          <TableCell className="text-right">-{discountAmount.toLocaleString()}</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableHead>合計</TableHead>
          <TableHead className="text-right">{total.toLocaleString()} 円</TableHead>
        </TableRow>
      </TableFooter>
      </Table>
      <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-center dark:border-neutral-800 dark:bg-neutral-800/40">
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          計算結果と選択内容を問い合わせフォームへ自動入力します。
        </p>
        <Link
          href={quoteHref}
          onClick={handleQuoteClick}
          className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 sm:w-auto dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          概算 {total.toLocaleString("ja-JP")}円で相談する
        </Link>
        <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
          シミュレーションは目安です。正式な金額は要件確認後にご案内します。
        </p>
      </div>
    </>
  )
}
