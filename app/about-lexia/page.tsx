"use client"

import Image from "next/image"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ContactForm from "@/components/contact-form"

export default function AboutLexiaPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <section className="relative h-80 md:h-96 w-full flex items-center justify-center overflow-hidden">
          <Image src="/about/about-1.png" alt="LEXIA" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-3xl md:text-5xl font-light text-white drop-shadow-lg">価値を伝わるカタチに</h1>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16 space-y-16">
          <section>
            <h2 className="text-3xl font-light text-neutral-900 dark:text-neutral-100 mb-4">事業概要</h2>
            <p className="text-neutral-700 dark:text-neutral-300 mb-2">事業名: LEXIA</p>
            <p className="text-neutral-700 dark:text-neutral-300 mb-2">設立: 2022年3月26日</p>
            <p className="text-neutral-700 dark:text-neutral-300 mb-2">代表: 齋藤雅人</p>
            <p className="text-neutral-700 dark:text-neutral-300 mb-2">所在地: 愛知県碧南市川端町1-45</p>
            <p className="text-neutral-700 dark:text-neutral-300 mb-2">連絡先: 090-1742-3456 / lexia0web@gmail.com</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-3xl font-light text-neutral-900 dark:text-neutral-100">LEXIAの理念・ミッション</h2>
            <p className="text-neutral-700 dark:text-neutral-300">「価値を後世に」──LEGEND×AXIA の精神で、WEB制作を通じクライアントの資産価値を高めます。</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-3xl font-light text-neutral-900 dark:text-neutral-100">サービス内容</h2>
            <ul className="list-disc pl-5 text-neutral-700 dark:text-neutral-300 space-y-1">
              <li>WEB制作（コーポレートサイト、EC、LPなど）</li>
              <li>システム開発・WEBアプリ開発</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-3xl font-light text-neutral-900 dark:text-neutral-100">チーム紹介</h2>
            <ul className="list-disc pl-5 text-neutral-700 dark:text-neutral-300 space-y-1">
              <li>代表: 齋藤雅人</li>
              <li>経理: 齋藤李保</li>
              <li>制作メンバー: アシスタント数名</li>
            </ul>
            <Link href="/authors" className="text-neutral-900 dark:text-neutral-100 underline">チームメンバーを見る</Link>
          </section>

          <section className="space-y-2">
            <h2 className="text-3xl font-light text-neutral-900 dark:text-neutral-100">実績・事例紹介</h2>
            <p className="text-neutral-700 dark:text-neutral-300">主要クライアントや代表的な案件をこちらでご紹介します。</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-3xl font-light text-neutral-900 dark:text-neutral-100">採用・求人情報</h2>
            <p className="text-neutral-700 dark:text-neutral-300">スタートアップにつき、やる気と熱意ある仲間を募集しています。</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-light text-neutral-900 dark:text-neutral-100">お問い合わせ・アクセス</h2>
            <ContactForm />
            <div className="mt-4 w-full h-64">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3242.397843751322!2d136.994!3d34.881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6004d05cd901!2z44CSNDc2LTAwMTMg5oSb55-l55yM5a6d5biC6ZW35bed5Yy65bed5pys55S677yR77yR77yS!5e0!3m2!1sja!2sjp!4v1710000000000!5m2!1sja!2sjp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
