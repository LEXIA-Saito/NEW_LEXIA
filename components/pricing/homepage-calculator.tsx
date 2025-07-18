"use client"

import { useState } from "react"
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function HomepageCalculator() {
  const [pages, setPages] = useState(5)
  const [cms, setCms] = useState(false)
  const [ssr, setSsr] = useState(false)
  const [login, setLogin] = useState(false)
  const [images, setImages] = useState(0)
  const [photos, setPhotos] = useState(0)
  const [videos, setVideos] = useState(0)
  const [designRevisions, setDesignRevisions] = useState(1)

  const pageCost = pages * 10000
  const directionCost = 50000
  const designCost = designRevisions <= 2 ? 30000 : 30000 + (designRevisions - 2) * 20000
  const codingCost = pages <= 5 ? 30000 : 30000 + (pages - 5) * 10000
  const cmsCost = cms ? 10000 : 0
  const ssrCost = ssr ? 20000 : 0
  const loginCost = login ? 10000 : 0
  const planningCost = pages * 5000 + images * 1000 + photos * 1000 + videos * 5000

  const subtotal = pageCost + directionCost + planningCost + cmsCost + ssrCost + loginCost + codingCost + designCost
  const managementCost = Math.ceil(subtotal * 0.1)
  const total = subtotal + managementCost

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
          <TableCell className="flex items-center gap-2">
            ページ数
            <Input
              type="number"
              min={1}
              value={pages}
              onChange={(e) => setPages(parseInt(e.target.value) || 0)}
              className="w-20"
            />
          </TableCell>
          <TableCell className="text-right">{pageCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>ディレクション費用</TableCell>
          <TableCell className="text-right">{directionCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
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
              <span>写真</span>
              <Input
                type="number"
                min={0}
                value={photos}
                onChange={(e) => setPhotos(parseInt(e.target.value) || 0)}
                className="w-14"
              />
              <span>動画</span>
              <Input
                type="number"
                min={0}
                value={videos}
                onChange={(e) => setVideos(parseInt(e.target.value) || 0)}
                className="w-14"
              />
            </div>
          </TableCell>
          <TableCell className="text-right">{planningCost.toLocaleString()}</TableCell>
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
            サーバーレンダリング
            <Checkbox checked={ssr} onCheckedChange={() => setSsr(!ssr)} />
          </TableCell>
          <TableCell className="text-right">{ssrCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            ログイン機能構築
            <Checkbox checked={login} onCheckedChange={() => setLogin(!login)} />
          </TableCell>
          <TableCell className="text-right">{loginCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>コーディング費用</TableCell>
          <TableCell className="text-right">{codingCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            デザイン費用(回数)
            <Input
              type="number"
              min={1}
              value={designRevisions}
              onChange={(e) => setDesignRevisions(parseInt(e.target.value) || 0)}
              className="w-16"
            />
          </TableCell>
          <TableCell className="text-right">{designCost.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>プロジェクト管理費</TableCell>
          <TableCell className="text-right">{managementCost.toLocaleString()}</TableCell>
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
