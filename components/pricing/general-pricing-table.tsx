import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell } from "@/components/ui/table"

export default function GeneralPricingTable() {
  const items = [
    { name: "ページ制作(基本)", cost: 50000 },
    { name: "デザイン", cost: 30000 },
    { name: "コーディング", cost: 30000 },
    { name: "お問い合わせフォーム", cost: 10000 },
  ]
  const total = items.reduce((sum, item) => sum + item.cost, 0)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>項目</TableHead>
          <TableHead className="text-right">料金(円)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.name}>
            <TableCell>{item.name}</TableCell>
            <TableCell className="text-right">{item.cost.toLocaleString()}</TableCell>
          </TableRow>
        ))}
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
