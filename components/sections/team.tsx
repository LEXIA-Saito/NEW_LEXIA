"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Chip } from "@/components/ui/chip"
import SectionIcon from "@/components/section-icon"
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
    image: "/images/saito_profile.webp",
    linkedin: "https://www.linkedin.com/in/lexia-saito/",
    email: "msms12120614@gmail.com",
    slug: "masato-saito",
  },
  {
    id: 2,
    name: "齋藤李保",
    role: "経理",
    bio: "会社の資金管理や請求業務を担い、LEXIAの安定運営を支える縁の下の力持ちです。",
    image: "/images/riho-saito-profile.webp",
    linkedin: "",
    email: "",
    slug: "riho-saito",
  },
  {
    id: 3,
    name: "アシスタント",
    role: "アシスタント",
    bio: "日々の業務をサポートし、チームが円滑に動くよう支援しています。",
    image: "/placeholder-user.svg",
    linkedin: "",
    email: "",
    slug: "assistant",
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
          <Chip>{t("team.chip")}</Chip>
          <div className="flex flex-col items-center mt-4 mb-6">
            <SectionIcon index={3} className="mb-4" />
            <h2 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100">
              {t("team.heading")}
            </h2>
          </div>
          <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">{t("team.intro")}</p>
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
        <Link
          href="/team"
          className="inline-flex items-center justify-center rounded-md bg-neutral-900 text-white px-5 py-2.5 text-sm font-medium hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 transition-colors"
        >
          チーム一覧を見る
        </Link>
      </motion.div>
    </div>
  )
}
