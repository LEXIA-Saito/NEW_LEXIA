"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function Footer() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const menuItems = [
    { name: "事業概要", href: "/about-lexia" },
    { name: "制作工程", href: "#process" },
    { name: "制作実績", href: "/projects" },
    { name: "チーム", href: "#team" },
    { name: "ブログ", href: "/blog" },
    { name: "お問い合わせ", href: "/contact" },
  ]

  const connectItems = [
    { name: "お問い合わせフォーム", href: "/contact" },
    { name: "メール", href: "mailto:lexia0web@gmail.com" },
    { name: "電話", href: "tel:+81-0000-000-000" },
  ]

  const decorativeIcons = [
    // 星型アイコン群のSVGパス
    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    "M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z",
    "M12 2l1.5 4.5h4.5l-3.5 2.5 1.5 4.5-3.5-2.5-3.5 2.5 1.5-4.5-3.5-2.5h4.5z",
  ]

  return (
    <footer className="bg-[#04070d] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Left Section - Logo and Description */}
          <motion.div
            className="lg:col-span-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeIn}
          >
            {/* LEXIA Logo */}
            <div className="mb-8">
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mb-4"
              >
                <path d="M15 15L45 45M45 15L15 45" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold mb-6">価値を伝わるカタチに</h2>
            <p className="text-sm leading-relaxed text-gray-300">
              企業のウェブサイトは"顔"であると同時に、ブランド価値を伝える最重要ポイントです。しかし、デザインだけでなく、ユーザビリティ、表示速度、多言語対応など多岐にわたる要素を高いレベルで両立させることは、多くの企業にとって大きなハードル。
              LEXIAは一貫してプロジェクトを管理し、これら複合的な課題をワンストップで解決。御社のウェブサイトを「成果を生む資産」へと進化させます。
            </p>
          </motion.div>

          {/* Center Section - LEGEND AXIA LEXIA Logo */}
          <motion.div
            className="lg:col-span-1 flex flex-col items-center justify-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variants={fadeIn}
          >
            <div className="text-center mb-8">
              <div className="text-xs tracking-widest mb-2">LEGEND AXIA</div>
              <div className="text-4xl font-bold tracking-wider">LEXIA</div>
            </div>
          </motion.div>

          {/* Menu Section */}
          <motion.div
            className="lg:col-span-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            variants={fadeIn}
          >
            <h3 className="text-lg font-semibold mb-6">MENU</h3>
            <ul className="space-y-3">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect and Get in touch Section */}
          <motion.div
            className="lg:col-span-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            variants={fadeIn}
          >
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-6">Connect</h3>
              <ul className="space-y-3">
                {connectItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Get in touch</h3>
              <Link
                href="mailto:lexia0web@gmail.com"
                className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
              >
                lexia0web@gmail.com
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          variants={fadeIn}
        >
          <p className="text-sm text-gray-400">© Copyright 2025. LEXIA. All rights reserved.</p>
        </motion.div>

        {/* Decorative Icons */}
        <motion.div
          className="flex justify-center items-center space-x-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          variants={fadeIn}
        >
          {/* 装飾的なアイコン群 */}
          <div className="flex space-x-6 opacity-60">
            {/* 星型アイコン */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>

            {/* 4つ星 */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
            </svg>

            {/* 8つ星 */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 1l1.5 4.5h4.5l-3.5 2.5 1.5 4.5-3.5-2.5-3.5 2.5 1.5-4.5-3.5-2.5h4.5z" />
            </svg>

            {/* 矢印 */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
            </svg>

            {/* 十字 */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 2v20M2 12h20" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>

            {/* X印 */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M6 6l12 12M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>

            {/* 三角 */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 2l10 20H2z" />
            </svg>

            {/* ダイヤモンド */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 2l6 10-6 10-6-10z" />
            </svg>

            {/* 花型 */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 2c2 0 4 2 4 4s-2 4-4 4-4-2-4-4 2-4 4-4zm0 8c2 0 4 2 4 4s-2 4-4 4-4-2-4-4 2-4 4-4z" />
            </svg>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
