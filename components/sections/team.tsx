"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Chip } from "@/components/ui/chip"
import SectionIcon from "@/components/section-icon"
import { Linkedin, Mail, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { t } from "@/lib/i18n"
import { allTeamMembers } from "@/lib/team-members"

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

      {/* 主要メンバー（横スクロール） */}
      <div className="overflow-x-auto pb-2 -mx-4 px-4">
        <div className="flex gap-6 snap-x snap-mandatory">
          {allTeamMembers
            .filter((m) => m.isPrimary)
            .map((member, index) => (
              <motion.div
                key={`${member.name}-${index}`}
                className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm group min-w-[260px] snap-start"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                variants={fadeIn}
                whileHover={{ y: -10 }}
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <Image
                    src={member.image || "/placeholder-user.svg"}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-1">{member.name}</h3>
                  <p className="text-neutral-500 dark:text-neutral-400 mb-3">{member.role}</p>
                  {member.message ? (
                    <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-3">{member.message}</p>
                  ) : null}
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* 既存カードグリッド（必要なら継続）: 主要外は省略か、少数表示に */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        {allTeamMembers
          .filter((m) => !m.isPrimary)
          .slice(0, 4)
          .map((member, index) => (
          <motion.div
            key={`${member.name}-${index}`}
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
                src={member.image || "/placeholder-user.svg"}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-1">{member.name}</h3>
              <p className="text-neutral-500 dark:text-neutral-400 mb-3">{member.role}</p>
              {member.message ? (
                <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-3">{member.message}</p>
              ) : null}
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
