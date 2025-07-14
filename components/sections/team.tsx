"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Chip } from "@/components/ui/chip"
import { Linkedin, Mail, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { t } from "@/lib/i18n"

// Team member data
const teamMembers = [
  {
    id: 1,
    name: "齋藤雅人",
    role: "代表・WEBディレクター",
    bio: "最新の制作技術を駆使してクライアントの期待を超え、WEB上に価値を見出す制作を実現します。",
    image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/saito_profile/saito_profile.webp",
    linkedin: "https://www.linkedin.com/in/lexia-saito/",
    email: "msms12120614@gmail.com",
    slug: "masato-saito",
  },
  {
    id: 2,
    name: "齋藤李保",
    role: "経理",
    bio: "会社の資金管理や請求業務を担い、LEXIAの安定運営を支える縁の下の力持ちです。",
    image: "/team/person-2.png",
    linkedin: "",
    email: "",
    slug: "riho-saito",
  },
]

export default function Team() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeIn}
        >
          <Chip>{t('team.chip')}</Chip>
          <h2 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mt-4 mb-6">
            {t('team.heading')}
          </h2>
          <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
            {t('team.intro')}
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.id}
            className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            variants={fadeIn}
            whileHover={{ y: -10 }}
          >
            <div className="aspect-[3/4] relative overflow-hidden">
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 w-full">
                  <div className="flex justify-center space-x-3">
                    <Link
                      href={`mailto:${member.email}`}
                      className="bg-white/90 dark:bg-neutral-900/90 p-2 rounded-full text-neutral-900 dark:text-neutral-100 hover:scale-110 transition-transform duration-300"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="h-5 w-5" />
                    </Link>
                    <Link
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/90 dark:bg-neutral-900/90 p-2 rounded-full text-neutral-900 dark:text-neutral-100 hover:scale-110 transition-transform duration-300"
                      aria-label={`${member.name}'s LinkedIn profile`}
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-1">{member.name}</h3>
              <p className="text-neutral-500 dark:text-neutral-400 mb-3">{member.role}</p>
              <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-3">{member.bio}</p>
              {member.slug && (
                <Link
                  href={`/team/${member.slug}`}
                  className="inline-flex items-center text-neutral-900 dark:text-neutral-100 hover:underline group text-sm"
                >
                  プロフィールを見る
                  <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        variants={fadeIn}
        className="text-center mt-12"
      >
        <p className="text-neutral-700 dark:text-neutral-300">
          Our collaborative approach ensures that each web project benefits from our combined expertise and creative vision.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        variants={fadeIn}
        className="mt-12 space-y-4 text-neutral-700 dark:text-neutral-300"
      >
        <h3 className="text-2xl font-light text-neutral-900 dark:text-neutral-100">
          イシュー（課題提起）
        </h3>
        <p>
          企業のウェブサイトは“顔”であると同時に、ブランド価値を伝える最重要タッチポイントです。しかし、デザイン性だけでなく、ユーザビリティ、表示速度、SEO対策、多言語対応などを高いレベルで両立させることは、多くの企業にとって大きなハードル。
        </p>
        <p>
          LEXIAは代表・齋藤雅人が一貫してプロジェクトをリードし、これら複合的な課題をワンストップで解決。御社のウェブサイトを「成果を生む資産」へと進化させます。
        </p>

        <hr className="my-4 border-neutral-200 dark:border-neutral-700" />

        <h3 className="text-2xl font-light text-neutral-900 dark:text-neutral-100">
          LEXIA 社内チーム紹介
        </h3>
        <h4 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          齋藤雅人（さいとう まさと）／代表
        </h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>デジタル業界歴15年以上、これまでに200件以上のサイト立ち上げを指揮</li>
          <li>UXリサーチからデザイン、フロントエンド実装、SEO・アクセス解析まで一貫対応</li>
          <li>アジャイル開発による高速PDCAで、常に効果検証と改善を繰り返し成果を最大化</li>
        </ul>

        <hr className="my-4 border-neutral-200 dark:border-neutral-700" />

        <h3 className="text-2xl font-light text-neutral-900 dark:text-neutral-100">
          なぜLEXIAか？
        </h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>経営視点×技術視点の両輪で、ビジネスゴールを確実に達成</li>
          <li>グローバル＆ローカル市場に対応した多言語サイト構築</li>
          <li>SEO・パフォーマンス・セキュリティをトータルに最適化</li>
          <li>アジャイル手法で柔軟かつ迅速な開発を実現</li>
        </ul>

        <p className="mt-4">
          LEXIA代表・齋藤が直接窓口となり、御社の要望に密着。企画段階から運用まで、一貫した品質とスピードでご期待に応えます。まずはお気軽にご相談ください。
        </p>
      </motion.div>
    </div>
  )
}
