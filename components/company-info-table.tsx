"use client"

import { FC } from "react"

const CompanyInfoTable: FC = () => {
  const thClass = "py-2 pr-4 text-left font-semibold text-neutral-900 dark:text-neutral-100 align-top whitespace-nowrap"
  const tdClass = "py-2 whitespace-nowrap"

  const companyData = [
    { label: "事業名", value: "LEXIA（レキシア）" },
    { label: "所在地", value: "愛知県碧南市川端町1-45" },
    { label: "設立", value: "2022年3月26日" },
    { label: "代表者", value: "齋藤 雅人" },
    { 
      label: "事業内容", 
      value: (
        <ul className="list-disc pl-5 space-y-1">
          <li>WEB制作（コーポレートサイト・ECサイト・ポートフォリオサイト・ランディングページ・採用サイト）</li>
          <li>システム開発（社内ツール作成）</li>
          <li>WEBアプリ開発</li>
        </ul>
      )
    },
    { label: "電話番号", value: "090-1742-3456" },
    { label: "メール", value: "lexia0web@gmail.com" }
  ]

  return (
    <table className="w-full text-sm text-neutral-700 dark:text-neutral-300">
      <tbody>
        {companyData.map(({ label, value }) => (
          <tr key={label}>
            <th className={thClass}>{label}</th>
            <td className={label === "事業内容" ? "py-2" : tdClass}>
              {value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CompanyInfoTable

