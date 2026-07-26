"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

type Package = {
  id: string
  name: string
  target: string
  price: string
  includes: string[]
  recommended?: boolean
}

// 課題解決パッケージ（作業単価の積み上げではなく、目的単位で提示する）
const PACKAGES: Package[] = [
  {
    id: "lp",
    name: "スタートLP",
    target: "まず1枚で集客をはじめたい",
    price: "25万円〜",
    includes: ["ランディングページ1枚", "GA4での計測設定", "公開後1ヶ月の伴走"],
  },
  {
    id: "corporate",
    name: "成果コーポレート",
    target: "会社の顔を「働く資産」にしたい",
    price: "45万円〜",
    includes: [
      "企業サイト一式",
      "問い合わせ・予約の導線設計",
      "多言語対応（1言語）",
      "GA4での計測設定",
    ],
    recommended: true,
  },
  {
    id: "growth",
    name: "集客・予約システム",
    target: "予約や多言語で仕組みをつくりたい",
    price: "80万円〜",
    includes: [
      "予約システム or 多言語（3言語）",
      "MEO・広告との連携",
      "管理画面の構築",
    ],
  },
  {
    id: "ec",
    name: "EC・業務システム",
    target: "ネットで売る／業務を自動化したい",
    price: "120万円〜",
    includes: [
      "ECサイト構築",
      "Stripeによる決済連携",
      "楽天・BASEの在庫／出品自動化",
    ],
  },
]

type MonthlyPlan = {
  name: string
  price: string
  includes: string
}

// 月額グロース運用（公開後の改善まで伴走するプラン）
const MONTHLY_PLANS: MonthlyPlan[] = [
  {
    name: "ライト",
    price: "月 2万円〜",
    includes: "保守・障害対応・軽微な修正",
  },
  {
    name: "スタンダード",
    price: "月 3.5万円〜",
    includes: "ライトの内容＋月次レポート・改善提案・小さな改修",
  },
  {
    name: "グロース",
    price: "月 5万円〜",
    includes: "スタンダードの内容＋SEO・広告・改善施策の伴走",
  },
]

export default function PackagePlans() {
  return (
    <div className="space-y-16">
      {/* 制作パッケージ */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-light text-neutral-900 dark:text-neutral-100">
            目的から選ぶ制作パッケージ
          </h2>
          <p className="mt-3 text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
            「何ページつくるか」ではなく「どの数字を動かしたいか」で選べる形にしています。
            金額は目安です。要件をお伺いした上で、正式なお見積りをお出しします。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-lg border p-6 flex flex-col ${
                pkg.recommended
                  ? "border-neutral-900 dark:border-neutral-100 shadow-sm"
                  : "border-neutral-200 dark:border-neutral-800"
              }`}
            >
              {pkg.recommended && (
                <span className="absolute -top-3 left-6 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs px-3 py-1 rounded-full">
                  よくご相談いただくプラン
                </span>
              )}
              <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">{pkg.name}</h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{pkg.target}</p>
              <p className="mt-4 text-2xl font-light text-neutral-900 dark:text-neutral-100">{pkg.price}</p>
              <ul className="mt-5 space-y-2 flex-1">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                    <Check className="h-4 w-4 mt-0.5 text-neutral-500 dark:text-neutral-400 flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                onClick={() => trackEvent("cta_click", { location: "pricing_package", label: pkg.id })}
                className="mt-6 inline-flex items-center justify-center rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-5 py-3 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
              >
                このプランを相談する
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 月額グロース運用 */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-light text-neutral-900 dark:text-neutral-100">
            月額グロース運用
          </h2>
          <p className="mt-3 text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
            サイトは公開してからが本番です。数字を見ながら改善を続ける部分を、月額でお任せいただけます。
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800">
                <th className="py-3 pr-4 text-sm font-medium text-neutral-900 dark:text-neutral-100">プラン</th>
                <th className="py-3 pr-4 text-sm font-medium text-neutral-900 dark:text-neutral-100">月額</th>
                <th className="py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">含まれるもの</th>
              </tr>
            </thead>
            <tbody>
              {MONTHLY_PLANS.map((plan) => (
                <tr key={plan.name} className="border-b border-neutral-100 dark:border-neutral-800/60">
                  <td className="py-4 pr-4 text-neutral-900 dark:text-neutral-100">{plan.name}</td>
                  <td className="py-4 pr-4 text-neutral-900 dark:text-neutral-100 whitespace-nowrap">{plan.price}</td>
                  <td className="py-4 text-sm text-neutral-700 dark:text-neutral-300">{plan.includes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
          ※ 表示はすべて税別の目安です。大きな機能追加・新規制作は別途お見積りとなります。
        </p>
      </section>
    </div>
  )
}
