"use client"

import Link from "next/link"
import Image from "next/image"
import React from "react"
import { motion } from "framer-motion"
import { LOGO_URL, LOGO_WHITE_URL, LOGO_TEXT_URL, LOGO_TEXT_WHITE_URL } from "@/lib/config"

export default function Footer() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const footerNavigation = [
    {
      title: "LEXIAについて",
      links: [
        { name: "会社概要", href: "/company" },
        { name: "制作工程", href: "/company/process" },
        { name: "チーム", href: "/team" },
        { name: "プライバシーポリシー", href: "/privacy" },
      ],
    },
    {
      title: "サービス",
      links: [
        { name: "サービス一覧", href: "/services" },
        { name: "WEB制作", href: "/services/web" },
        { name: "デザイン制作", href: "/services/design" },
        { name: "システム開発", href: "/services/system" },
        { name: "動画制作", href: "/services/movie" },
        { name: "PC教室", href: "/services/pc" },
      ],
    },
    {
      title: "リソース",
      links: [
        { name: "制作実績", href: "/projects" },
        { name: "料金プラン", href: "/pricing" },
        { name: "LEXIA BLOG", href: "/blog" },
        { name: "お問い合わせ", href: "/contact" },
      ],
    },
    {
      // 別サブドメイン tools.lexia-hp.com の無料ツールへの内部リンク。
      // 全ページのフッターから個別ツールへ導線を張り、回遊とクロール誘導・権威移転を両立する。
      title: "無料ツール",
      links: [
        { name: "画像フォーマット変換", href: "https://tools.lexia-hp.com/image-converter" },
        { name: "画像リサイズ", href: "https://tools.lexia-hp.com/image-resizer" },
        { name: "ZIP圧縮・解凍", href: "https://tools.lexia-hp.com/zip-tool" },
        { name: "ファイル名一括変更", href: "https://tools.lexia-hp.com/file-renamer" },
        { name: "ツール一覧", href: "https://tools.lexia-hp.com" },
      ],
    },
  ]

  const contactChannels = [
    { label: "メール", value: "lexia0web@gmail.com", href: "mailto:lexia0web@gmail.com" },
    { label: "電話", value: "090-1742-3456", href: "tel:+819017423456" },
    { label: "Instagram", value: "@lexia_web", href: "https://www.instagram.com/lexia_web/" },
    { label: "LinkedIn", value: "LEXIA | Saito", href: "https://www.linkedin.com/in/lexia-saito/" },
  ]

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-100 dark:bg-[#04070d] text-neutral-900 dark:text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & CTA */}
          <motion.div
            className="lg:col-span-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeIn}
          >
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <Image
                  src={LOGO_URL || "/placeholder.svg"}
                  alt="LEXIA"
                  width={120}
                  height={24}
                  className="h-6 w-auto block dark:hidden"
                />
                <Image
                  src={LOGO_TEXT_URL || "/placeholder.svg"}
                  alt="LEXIA text"
                  width={120}
                  height={24}
                  className="ml-2 h-6 w-auto block dark:hidden"
                />
                <Image
                  src={LOGO_WHITE_URL || "/placeholder.svg"}
                  alt="LEXIA"
                  width={120}
                  height={24}
                  className="h-6 w-auto hidden dark:block"
                />
                <Image
                  src={LOGO_TEXT_WHITE_URL || "/placeholder.svg"}
                  alt="LEXIA text"
                  width={120}
                  height={24}
                  className="ml-2 h-6 w-auto hidden dark:block"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-neutral-900 dark:bg-white px-5 py-3 text-sm font-medium text-white dark:text-neutral-900 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-transform duration-200"
              >
                制作の相談をする
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700 px-5 py-3 text-sm font-medium text-neutral-900 dark:text-white hover:-translate-y-0.5 hover:shadow-md transition-transform duration-200"
              >
                制作実績を見る
              </Link>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            variants={fadeIn}
          >
            {footerNavigation.map((section) => (
              <div key={section.title}>
                <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          {/* Contact */}
          <motion.div
            className="lg:col-span-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            variants={fadeIn}
          >
            <h3 className="text-lg font-semibold mb-4">お問い合わせ</h3>
            <div className="space-y-3">
              {contactChannels.map((channel) => (
                <div key={channel.href} className="flex flex-col">
                  <span className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">{channel.label}</span>
                  <Link
                    href={channel.href}
                    className="text-sm text-neutral-900 dark:text-white hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
                  >
                    {channel.value}
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-neutral-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-neutral-900 shadow-sm hover:shadow transition-shadow duration-200"
              >
                フォームで問い合わせる
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 flex flex-col items-center space-y-2">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">© {currentYear} LEXIA</p>
        </div>
      </div>
    </footer>
  )
}
