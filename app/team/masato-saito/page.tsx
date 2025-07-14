"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Mail, Linkedin } from "lucide-react"
import { Chip } from "@/components/ui/chip"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

export default function MasatoSaitoProfile() {
  const qualifications = [
    { no: 1, name: "Google アナリティクス認定資格", provider: "Google Skillshop" },
    { no: 2, name: "コンバージョン最適化認定資格試験", provider: "Google Skillshop" },
    { no: 3, name: "AIを活用したパフォーマンス広告の認定資格", provider: "Google" },
    { no: 4, name: "インバウンドマーケティング認定資格", provider: "HubSpot Academy" },
    { no: 5, name: "ソーシャルメディアマーケティング認定資格", provider: "HubSpot Academy" },
    { no: 6, name: "インバウンド認定資格", provider: "HubSpot Academy" },
    { no: 7, name: "フリクションレスセールス認定資格", provider: "HubSpot Academy" },
    { no: 8, name: "Data Science Tools（DS0105EN）", provider: "IBM / Cognitive Class" },
    { no: 9, name: "Data Science Methodology（DS0103EN）", provider: "IBM / Cognitive Class" },
    { no: 10, name: "Data Science 101（DS0101EN）", provider: "IBM / Cognitive Class" },
    { no: 11, name: "Data Science Foundations – Level 2 (V2)", provider: "IBM / Credly" },
    { no: 12, name: "Deep Learning Fundamentals（ML0115EN）", provider: "IBM / Cognitive Class" },
    { no: 13, name: "Deep Learning with TensorFlow（ML0120EN）", provider: "IBM / Cognitive Class" },
    { no: 14, name: "Accelerating Deep Learning with GPUs（ML0122ENv3）", provider: "IBM / Cognitive Class" },
    { no: 15, name: "Deep Learning（Credlyバッジ）", provider: "IBM" },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              ホームへ戻る
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
              <Image src="/team/person-1.png" alt="齋藤雅人" fill className="object-cover" />
            </div>
            <Chip className="mb-2">代表・WEBディレクター</Chip>
            <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-4">
              齋藤雅人
            </h1>
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              WEB業界歴5年。若さと情熱を武器に、最新のWEB技術を駆使してクライアントの期待を超えるサイト制作を実現します。
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="mailto:msms12120614@gmail.com"
                className="bg-white dark:bg-neutral-700 p-2 rounded-full text-neutral-900 dark:text-neutral-100 hover:scale-110 transition-transform duration-300 shadow-sm"
                aria-label="Email 齋藤雅人"
              >
                <Mail className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/lexia-saito/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-neutral-700 p-2 rounded-full text-neutral-900 dark:text-neutral-100 hover:scale-110 transition-transform duration-300 shadow-sm"
                aria-label="齋藤雅人's LinkedIn profile"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-6 text-center">
              取得資格一覧
            </h2>
            <Table className="bg-white dark:bg-neutral-800">
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>資格名</TableHead>
                  <TableHead>提供元</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {qualifications.map((q) => (
                  <TableRow key={q.no}>
                    <TableCell>{q.no}</TableCell>
                    <TableCell>{q.name}</TableCell>
                    <TableCell>{q.provider}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
