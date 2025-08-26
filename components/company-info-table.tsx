"use client"

import { FC } from "react"

const CompanyInfoTable: FC = () => {
  return (
    <table className="w-full text-sm text-neutral-700 dark:text-neutral-300">
      <tbody>
        <tr>
          <th className="py-2 pr-4 text-left font-semibold text-neutral-900 dark:text-neutral-100 align-top">会社名</th>
          <td className="py-2">LEXIA（レキシア）</td>
        </tr>
        <tr>
          <th className="py-2 pr-4 text-left font-semibold text-neutral-900 dark:text-neutral-100 align-top">所在地</th>
          <td className="py-2">愛知県碧南市川端町1-45</td>
        </tr>
        <tr>
          <th className="py-2 pr-4 text-left font-semibold text-neutral-900 dark:text-neutral-100 align-top">設立</th>
          <td className="py-2">2022年3月26日</td>
        </tr>
        <tr>
          <th className="py-2 pr-4 text-left font-semibold text-neutral-900 dark:text-neutral-100 align-top">代表者</th>
          <td className="py-2">齋藤 雅人</td>
        </tr>
        <tr>
          <th className="py-2 pr-4 text-left font-semibold text-neutral-900 dark:text-neutral-100 align-top">事業内容</th>
          <td className="py-2">
            <ul className="list-disc pl-5 space-y-1">
              <li>WEB制作（コーポレートサイト・ECサイト・ポートフォリオサイト・ランディングページ・採用サイト）</li>
              <li>システム開発（社内ツール作成）</li>
              <li>WEBアプリ開発</li>
            </ul>
          </td>
        </tr>
        <tr>
          <th className="py-2 pr-4 text-left font-semibold text-neutral-900 dark:text-neutral-100 align-top">電話番号</th>
          <td className="py-2">090-1742-3456</td>
        </tr>
        <tr>
          <th className="py-2 pr-4 text-left font-semibold text-neutral-900 dark:text-neutral-100 align-top">メール</th>
          <td className="py-2">lexia0web@gmail.com</td>
        </tr>
      </tbody>
    </table>
  )
}

export default CompanyInfoTable

