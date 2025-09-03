"use client"

import { FC } from "react"

const CompanyInfoTable: FC = () => {
  return (
    <table className="w-full text-sm text-neutral-700 dark:text-neutral-300">
      <tbody>
        <tr>
          <th className="py-2 pr-4 text-left font-semibold text-neutral-900 dark:text-neutral-100 align-top whitespace-nowrap">事業名</th>
          <td className="py-2 md:whitespace-nowrap">LEXIA（レキシア）</td>
        </tr>
        <tr>
          <th className="py-2 pr-4 text-left font-semibold text-neutral-900 dark:text-neutral-100 align-top whitespace-nowrap">所在地</th>
          <td className="py-2 md:whitespace-nowrap">愛知県碧南市川端町1-45</td>
        </tr>
        <tr>
          <th className="py-2 pr-4 text-left font-semibold text-neutral-900 dark:text-neutral-100 align-top whitespace-nowrap">設立</th>
          <td className="py-2 md:whitespace-nowrap">2022年3月26日</td>
        </tr>
        <tr>
          <th className="py-2 pr-4 text-left font-semibold text-neutral-900 dark:text-neutral-100 align-top whitespace-nowrap">代表者</th>
          <td className="py-2 md:whitespace-nowrap">齋藤 雅人</td>
        </tr>
        <tr>
          <th className="py-2 pr-4 text-left font-semibold text-neutral-900 dark:text-neutral-100 align-top whitespace-nowrap">事業内容</th>
          <td className="py-2">
            <ul className="list-disc pl-5 space-y-1">
              <li>WEB制作（コーポレートサイト・ECサイト・ポートフォリオサイト・ランディングページ・採用サイト）</li>
              <li>システム開発（社内ツール作成）</li>
              <li>WEBアプリ開発</li>
            </ul>
          </td>
        </tr>
        <tr>
          <th className="py-2 pr-4 text-left font-semibold text-neutral-900 dark:text-neutral-100 align-top whitespace-nowrap">電話番号</th>
          <td className="py-2 md:whitespace-nowrap">090-1742-3456</td>
        </tr>
        <tr>
          <th className="py-2 pr-4 text-left font-semibold text-neutral-900 dark:text-neutral-100 align-top whitespace-nowrap">メール</th>
          <td className="py-2 md:whitespace-nowrap">lexia0web@gmail.com</td>
        </tr>
      </tbody>
    </table>
  )
}

export default CompanyInfoTable

