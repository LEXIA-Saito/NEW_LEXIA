"use client"

import Link from "next/link"
import Image from "next/image"
import React from "react"
import { motion } from "framer-motion"
import {
  LOGO_URL,
  LOGO_WHITE_URL,
  LOGO_TEXT_URL,
  LOGO_TEXT_WHITE_URL,
} from "@/lib/config"
import { footerIcons, getRandomSpinDuration } from "@/lib/footerIcons"

export default function Footer() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const menuItems = [
    { name: "事業概要", href: "/company" },
    { name: "制作工程", href: "/company/process" },
    { name: "制作実績", href: "/projects" },
    { name: "チーム", href: "#team" },
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

  const randomDurations = React.useMemo(
    () => footerIcons.map(() => getRandomSpinDuration()),
    []
  )


  return (
    <footer className="bg-neutral-100 dark:bg-[#04070d] text-neutral-900 dark:text-white py-16">
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
            <div className="mb-8 flex items-center">
              <Image
                src={LOGO_URL}
                alt="LEXIA"
                width={120}
                height={24}
                className="mb-4 h-6 w-auto block dark:hidden"
              />
              <Image
                src={LOGO_TEXT_URL}
                alt="LEXIA text"
                width={120}
                height={24}
                className="mb-4 ml-2 h-6 w-auto block dark:hidden"
              />
              <Image
                src={LOGO_WHITE_URL}
                alt="LEXIA"
                width={120}
                height={24}
                className="mb-4 h-6 w-auto hidden dark:block"
              />
              <Image
                src={LOGO_TEXT_WHITE_URL}
                alt="LEXIA text"
                width={120}
                height={24}
                className="mb-4 ml-2 h-6 w-auto hidden dark:block"
              />
            </div>

            <h2 className="text-2xl font-bold mb-6">価値を伝わるカタチに</h2>
            <p className="text-sm leading-relaxed">
              企業のウェブサイトは"顔"であると同時に、ブランド価値を伝える最重要ポイントです。御社のウェブサイトを「成果を生む資産」へと進化させます。
            </p>
          </motion.div>

          {/* Center Section */}
          <motion.div
            className="lg:col-span-1 flex flex-col items-center justify-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variants={fadeIn}
          >
            {/* Text removed */}
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
            <ul className="space-y-3 text-transparent">
              {menuItems.map((item) => (
                <li className="text-sm leading-relaxed text-black" key={item.href}>
                  <Link
                    href={item.href}
                    className="space-y-3 text-black"
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
                      className="hover:text-white transition-colors duration-300 text-sm text-black"
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
                className="hover:text-white transition-colors duration-300 text-sm text-black"
              >
                lexia0web@gmail.com
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="mt-8 flex justify-center space-x-4">
          {footerIcons.map((icon, index) => (
            <motion.span
              key={index}
              className="w-6 h-6 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: randomDurations[index],
                ease: "linear",
              }}
            >
              <Image
                src={icon.light}
                alt="footer icon"
                width={24}
                height={24}
                className="block dark:hidden"
              />
              <Image
                src={icon.dark}
                alt="footer icon"
                width={24}
                height={24}
                className="hidden dark:block"
              />
            </motion.span>
          ))}
        </div>

      </div>
    </footer>
  )
}
