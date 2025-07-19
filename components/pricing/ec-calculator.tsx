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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function EcCalculator() {
  const [product, setProduct] = useState("50")
  const [payment, setPayment] = useState("card")
  const [shipping, setShipping] = useState(false)
  const [member, setMember] = useState("none")
  const [lang, setLang] = useState("none")
  const [campaign, setCampaign] = useState(false)
  const [review, setReview] = useState(false)
  const [sns, setSNS] = useState("none")
  const [channel, setChannel] = useState(false)
  const [backoffice, setBackoffice] = useState("simple")
  const [seo, setSeo] = useState(false)
  const [speed, setSpeed] = useState("none")
  const [support, setSupport] = useState("none")
  const [security, setSecurity] = useState("none")

  const productCostMap: Record<string, number> = {
    "50": 0,
    "100": 50000,
    "200": 100000,
    "unlimit": 200000,
  }
  const paymentCostMap: Record<string, number> = {
    card: 0,
    multi: 50000,
  }
  const memberCostMap: Record<string, number> = {
    none: 0,
    standard: 50000,
    advanced: 100000,
  }
  const langCostMap: Record<string, number> = {
    none: 0,
    en: 30000,
    multi: 60000,
  }
  const snsCostMap: Record<string, number> = {
    none: 0,
    login: 30000,
    share: 15000,
  }
  const backofficeCostMap: Record<string, number> = {
    simple: 60000,
    advanced: 100000,
  }
  const speedCostMap: Record<string, number> = {
    none: 0,
    cdn: 20000,
    full: 50000,
  }
  const supportCostMap: Record<string, number> = {
    none: 0,
    monthly: 20000,
    yearly: 100000,
  }
  const securityCostMap: Record<string, number> = {
    none: 0,
    basic: 30000,
    strong: 60000,
  }

  const subtotal =
    productCostMap[product] +
    paymentCostMap[payment] +
    (shipping ? 30000 : 0) +
    memberCostMap[member] +
    langCostMap[lang] +
    (campaign ? 30000 : 0) +
    (review ? 40000 : 0) +
    snsCostMap[sns] +
    (channel ? 50000 : 0) +
    backofficeCostMap[backoffice] +
    (seo ? 30000 : 0) +
    speedCostMap[speed] +
    supportCostMap[support] +
    securityCostMap[security]

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
            商品登録数
            <Select value={product} onValueChange={setProduct}>
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
                <SelectItem value="200">200</SelectItem>
                <SelectItem value="unlimit">無制限</SelectItem>
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell className="text-right">{productCostMap[product].toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            決済方法
            <RadioGroup className="flex gap-4" value={payment} onValueChange={setPayment}>
              <div className="flex items-center gap-1">
                <RadioGroupItem value="card" id="pay-card" />
                <label htmlFor="pay-card" className="text-sm">カードのみ</label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value="multi" id="pay-multi" />
                <label htmlFor="pay-multi" className="text-sm">多決済</label>
              </div>
            </RadioGroup>
          </TableCell>
          <TableCell className="text-right">{paymentCostMap[payment].toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            配送連携
            <Checkbox checked={shipping} onCheckedChange={() => setShipping(!shipping)} />
          </TableCell>
          <TableCell className="text-right">{(shipping ? 30000 : 0).toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            会員管理機能
            <Select value={member} onValueChange={setMember}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">なし</SelectItem>
                <SelectItem value="standard">標準</SelectItem>
                <SelectItem value="advanced">ポイント・ランク</SelectItem>
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell className="text-right">{memberCostMap[member].toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            多言語対応
            <Select value={lang} onValueChange={setLang}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">なし</SelectItem>
                <SelectItem value="en">英語追加</SelectItem>
                <SelectItem value="multi">多言語</SelectItem>
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell className="text-right">{langCostMap[lang].toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            キャンペーン機能
            <Checkbox checked={campaign} onCheckedChange={() => setCampaign(!campaign)} />
          </TableCell>
          <TableCell className="text-right">{(campaign ? 30000 : 0).toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            商品レビュー機能
            <Checkbox checked={review} onCheckedChange={() => setReview(!review)} />
          </TableCell>
          <TableCell className="text-right">{(review ? 40000 : 0).toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            SNS連携
            <Select value={sns} onValueChange={setSNS}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">なし</SelectItem>
                <SelectItem value="login">ログイン対応</SelectItem>
                <SelectItem value="share">シェアボタン</SelectItem>
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell className="text-right">{snsCostMap[sns].toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            マルチチャネル対応
            <Checkbox checked={channel} onCheckedChange={() => setChannel(!channel)} />
          </TableCell>
          <TableCell className="text-right">{(channel ? 50000 : 0).toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            バックオフィス機能
            <Select value={backoffice} onValueChange={setBackoffice}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simple">簡易</SelectItem>
                <SelectItem value="advanced">高度管理機能</SelectItem>
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell className="text-right">{backofficeCostMap[backoffice].toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            SEO強化オプション
            <Checkbox checked={seo} onCheckedChange={() => setSeo(!seo)} />
          </TableCell>
          <TableCell className="text-right">{(seo ? 30000 : 0).toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            サイト高速化対応
            <Select value={speed} onValueChange={setSpeed}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">なし</SelectItem>
                <SelectItem value="cdn">CDN導入</SelectItem>
                <SelectItem value="full">フル最適化</SelectItem>
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell className="text-right">{speedCostMap[speed].toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            保守プラン
            <Select value={support} onValueChange={setSupport}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">なし</SelectItem>
                <SelectItem value="monthly">月額</SelectItem>
                <SelectItem value="yearly">年間プラン</SelectItem>
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell className="text-right">{supportCostMap[support].toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            法令対応・セキュリティ
            <Select value={security} onValueChange={setSecurity}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">なし</SelectItem>
                <SelectItem value="basic">基本</SelectItem>
                <SelectItem value="strong">強化</SelectItem>
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell className="text-right">{securityCostMap[security].toLocaleString()}</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableHead>合計</TableHead>
          <TableHead className="text-right">{subtotal.toLocaleString()} 円</TableHead>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
