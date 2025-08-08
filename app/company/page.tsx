"use client"

import Image from "next/image"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ContactForm from "@/components/contact-form"
import { motion } from "framer-motion"
import LexiaLogoParticles from "@/components/lexia-logo-particles"
import { Card } from "@/components/ui/card"
import { Globe, Cpu, Film, Laptop, Palette } from "lucide-react"

export default function CompanyPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none select-none">
            <LexiaLogoParticles />
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-label="scroll down">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-6-6m6 6l6-6" />
            </svg>
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
            <p className="text-neutral-700 dark:text-neutral-300 mb-2">
              代表の齋藤雅人は生まれも育ちも愛知県碧南市。WEB制作歴5年の経験を生かし、地域の中小企業や個人事業主のホームページ制作をサポートしています。
            </p>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-light text-neutral-900 dark:text-neutral-100">LEXIAの理念・ミッション</h2>

            <div className="space-y-16">
              <motion.div
                className="grid md:grid-cols-2 gap-8 items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                variants={fadeIn}
              >
                <div className="space-y-4">
                  <h3 className="text-4xl font-semibold text-neutral-900 dark:text-neutral-100">LEGEND × AXIA</h3>
                  <p className="text-neutral-700 dark:text-neutral-300">
                    LEXIAの名前は、「LEGEND（伝説）」とギリシャ語の「AXIA（価値）」を掛け合わせた造語です。
                    これは単なる言葉の組み合わせではなく、私たちの事業哲学と強い使命感を表現しています。
                  </p>
                </div>
                <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden">
                  <Image src="/placeholder.svg" alt="Legend meets Axia" fill className="object-cover" />
                </div>
              </motion.div>

              <motion.div
                className="grid md:grid-cols-2 gap-8 items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                variants={fadeIn}
              >
                <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden md:order-2">
                  <Image src="/placeholder.svg" alt="Legend" fill className="object-cover" />
                </div>
                <div className="space-y-4 md:order-1">
                  <h3 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">LEGEND（伝説）</h3>
                  <p className="text-neutral-700 dark:text-neutral-300">
                    挑戦、努力、結果は伝えなきゃ、誰も知らないまま。
                    私たちは、クライアント様の物語を「伝説」になるまで共に創り上げ、後世へと語りつなげていくパートナーでありたいと考えています。
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="grid md:grid-cols-2 gap-8 items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                variants={fadeIn}
              >
                <div className="space-y-4">
                  <h3 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">AXIA（価値）</h3>
                  <p className="text-neutral-700 dark:text-neutral-300">
                    私たちが届けるのは、単なる「もの」や「サービス」ではなく、本質的な「価値」です。
                    価値は時代や環境とともに変化しますが、私たちはそれを正確に捉え、先進技術をもって最大限に引き出し、伝えたい人に伝わるカタチにします。
                  </p>
                </div>
                <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden">
                  <Image src="/placeholder.svg" alt="Axia" fill className="object-cover" />
                </div>
              </motion.div>

              <motion.div
                className="grid md:grid-cols-2 gap-8 items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                variants={fadeIn}
              >
                <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden md:order-2">
                  <Image src="/placeholder.svg" alt="Legend and Value" fill className="object-cover" />
                </div>
                <div className="space-y-4 md:order-1">
                  <h3 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">伝説×価値＝LEXIA</h3>
                  <p className="text-neutral-700 dark:text-neutral-300">
                    この２つの要素を掛け合わせることで、「価値を伝わるカタチに」という強い理念を掲げています。
                    私たちは、ただのWEB制作事業ではなく、クライアントの想いとビジョンを形にし、「伝説的な価値」を創造する事業です。
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-light text-neutral-900 dark:text-neutral-100">サービス紹介</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  href: "/services/web",
                  icon: Globe,
                  title: "WEB制作",
                  description: "コーポレートサイト、EC、LPなどをトータルで制作します。",
                },
                {
                  href: "/services/system",
                  icon: Cpu,
                  title: "システム開発",
                  description: "業務効率化やWEBアプリ開発を支援します。",
                },
                {
                  href: "/services/movie",
                  icon: Film,
                  title: "動画制作",
                  description:
                    "Rfilmと提携し、企画から撮影・編集まで一貫対応します。",
                },
                {
                  href: "/services/pc",
                  icon: Laptop,
                  title: "PC教室",
                  description: "初心者から応用まで丁寧にサポートします。",
                },
                {
                  href: "/services/design",
                  icon: Palette,
                  title: "デザイン各種",
                  description: "ロゴ・バナー・印刷物など幅広く対応します。",
                },
              ].map((service, index) => {
                const Icon = service.icon
                return (
                  <motion.div
                    key={service.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    variants={fadeIn}
                  >
                    <Link href={service.href} className="block h-full">
                      <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                        <Icon className="w-8 h-8 text-neutral-900 dark:text-neutral-100 mb-4" />
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                          {service.title}
                        </h3>
                        <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                          {service.description}
                        </p>
                      </Card>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-3xl font-light text-neutral-900 dark:text-neutral-100">チーム</h2>
            <ul className="list-disc pl-5 text-neutral-700 dark:text-neutral-300 space-y-1">
              <li>代表: 齋藤雅人</li>
              <li>経理: 齋藤李保</li>
              <li>制作メンバー: アシスタント数名</li>
            </ul>
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
