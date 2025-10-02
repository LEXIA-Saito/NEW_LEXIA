import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { SITE_URL } from "@/lib/config"
import type { LucideIcon } from "lucide-react"
import {
  Monitor,
  Smartphone,
  Heart,
  Globe,
  Camera,
  Mail,
  FileText,
  ShoppingCart,
  CheckCircle,
  Users,
  Laptop,
  Video,
  GraduationCap,
} from "lucide-react"

export const metadata: Metadata = {
  title: "LEXIA PC教室 | パソコン初心者・シニア向けレッスン",
  description:
    "パソコン初心者やシニアの方が、生活に役立つ使い方をやさしく学べるPC教室。安心感と学びやすさを兼ね備えたレッスンで、日常にすぐ役立つスキルを身につけましょう。",
  alternates: {
    canonical: `${SITE_URL.replace(/\/$/, "")}/services/pc`,
  },
  openGraph: {
    title: "LEXIA PC教室 | パソコン初心者・シニア向けレッスン",
    description:
      "パソコン初心者やシニアの方が、生活に役立つ使い方をやさしく学べるPC教室。安心感と学びやすさを兼ね備えたレッスンで、日常にすぐ役立つスキルを身につけましょう。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LEXIA PC教室 | パソコン初心者・シニア向けレッスン",
    description:
      "パソコン初心者やシニアの方が、生活に役立つ使い方をやさしく学べるPC教室。安心感と学びやすさを兼ね備えたレッスンで、日常にすぐ役立つスキルを身につけましょう。",
    images: [`${SITE_URL.replace(/\/$/, "")}/og/og-image.png`],
  },
}

type BulletItem = {
  label: string
  icon: LucideIcon
}

type FAQItem = {
  q: string
  a: string
}

export default function PcServicePage() {
  const targetAudiences: BulletItem[] = [
    { label: "パソコン初心者の方", icon: Monitor },
    { label: "スマホは使えるけどパソコンは苦手な方", icon: Smartphone },
    { label: "趣味や生活に役立てたいシニアの方", icon: Heart },
  ]

  const curriculum: BulletItem[] = [
    { label: "パソコンの基本操作（電源の入れ方、文字入力、マウス操作）", icon: Laptop },
    { label: "インターネット活用（検索・地図・YouTubeなど）", icon: Globe },
    { label: "写真の整理と印刷（スマホやデジカメの写真管理）", icon: Camera },
    { label: "メールの使い方（写真添付、孫や友人とのやり取り）", icon: Mail },
    { label: "文書作成（お知らせ・会報・年賀状など）", icon: FileText },
    { label: "日常に役立つ便利ワザ（ネットショッピング、旅行予約など）", icon: ShoppingCart },
  ]

  const features: BulletItem[] = [
    { label: "ゆっくり丁寧に、何度でも質問できる安心の環境", icon: CheckCircle },
    { label: "一人ひとりに合わせた学習内容（趣味・生活に直結）", icon: GraduationCap },
    { label: "実際に一緒に操作しながら学べる実践形式", icon: Laptop },
    { label: "少人数制（1〜3名）でアットホームな雰囲気", icon: Users },
    { label: "Zoomを使ったオンラインレッスンにも対応", icon: Video },
  ]

  const faqs: FAQItem[] = [
    {
      q: "まったくの初心者でも参加できますか？",
      a: "もちろんです。電源の入れ方やマウスの持ち方など、本当に基礎の基礎からやさしくサポートします。",
    },
    {
      q: "自分のパソコンを持ち込んでも大丈夫ですか？",
      a: "ご自身のパソコンでも教室のパソコンでもOKです。普段使っている環境で学ぶことで、練習した内容を日常に活かしやすくなります。",
    },
    {
      q: "オンラインレッスンはどうやって受講しますか？",
      a: "Zoomを使って丁寧にご案内します。事前に接続テストも行い、不安なく受講いただける体制を整えています。",
    },
  ]

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "LEXIA PC教室",
    description:
      "パソコン初心者やシニアの方に向けた、日常生活で使えるスキルを身につけるための少人数制PCレッスン。",
    serviceType: "ComputerTraining",
    url: `${SITE_URL.replace(/\/$/, "")}/services/pc`,
    areaServed: "JP",
    provider: {
      "@type": "Organization",
      name: "LEXIA",
      url: SITE_URL,
    },
    brand: { "@type": "Brand", name: "LEXIA" },
    offers: {
      "@type": "Offer",
      priceCurrency: "JPY",
      price: "5000",
      url: `${SITE_URL.replace(/\/$/, "")}/pricing`,
      availability: "https://schema.org/InStock",
    },
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <section className="bg-neutral-50 dark:bg-neutral-900/80 border-b border-neutral-200 dark:border-neutral-800">
          <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
            <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
                  <Link
                    href="/services"
                    className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:underline"
                  >
                    サービス一覧に戻る
                  </Link>
                </div>
                <Breadcrumbs />
                <span className="inline-flex items-center rounded-full bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 px-3 py-1 text-xs font-medium tracking-wider uppercase">
                  LEXIA PC CLASS
                </span>
                <h1 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 dark:text-neutral-100 leading-tight">
                  🖥️ LEXIA PC教室 サービス内容
                </h1>
                <p className="mt-4 text-lg md:text-xl text-neutral-700 dark:text-neutral-300">
                  パソコン初心者やシニアの方が、生活に役立つ使い方を楽しく学べる教室です。
                </p>
                <p className="mt-4 text-base md:text-lg text-neutral-600 dark:text-neutral-400">
                  「安心して質問できる」「自分のペースで学び続けられる」環境づくりにこだわり、身近な暮らしで活かせる操作を一緒に身につけていきます。
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="https://lexia-hp.com/pricing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md bg-neutral-900 text-white px-6 py-3 text-sm md:text-base font-medium shadow-sm transition-colors hover:bg-neutral-800"
                  >
                    料金を見る
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 px-6 py-3 text-sm md:text-base font-medium text-neutral-900 dark:text-neutral-100 transition-colors hover:bg-white dark:hover:bg-neutral-800"
                  >
                    体験やご相談を申し込む
                  </Link>
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white shadow-lg">
                <Image
                  src="/images/pc-class-senior.jpg"
                  alt="シニアの方が笑顔でパソコンを操作している様子"
                  fill
                  sizes="(min-width: 768px) 480px, 100vw"
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
          <section id="audience">
            <h2 className="text-2xl md:text-3xl font-light text-neutral-900 dark:text-neutral-100">こんな方におすすめ</h2>
            <p className="mt-3 text-base md:text-lg text-neutral-600 dark:text-neutral-300">
              パソコンへの不安をやわらげ、日常で役立つ使い方を身につけたい方を対象にしています。
            </p>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {targetAudiences.map((item) => {
                const Icon = item.icon
                return (
                  <li
                    key={item.label}
                    className="flex items-start gap-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-5 shadow-sm"
                  >
                    <Icon className="mt-1 h-6 w-6 text-neutral-900 dark:text-neutral-100" aria-hidden="true" />
                    <span className="text-lg leading-relaxed text-neutral-800 dark:text-neutral-100">{item.label}</span>
                  </li>
                )
              })}
            </ul>
          </section>

          <section id="curriculum" className="mt-16">
            <h2 className="text-2xl md:text-3xl font-light text-neutral-900 dark:text-neutral-100">学べる内容</h2>
            <p className="mt-3 text-base md:text-lg text-neutral-600 dark:text-neutral-300">
              生活の中でよく使う操作に焦点を当て、ひとつずつ実践しながら覚えていきます。
            </p>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {curriculum.map((item) => {
                const Icon = item.icon
                return (
                  <li
                    key={item.label}
                    className="flex items-start gap-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-5 shadow-sm"
                  >
                    <Icon className="mt-1 h-6 w-6 text-neutral-900 dark:text-neutral-100" aria-hidden="true" />
                    <span className="text-lg leading-relaxed text-neutral-800 dark:text-neutral-100">{item.label}</span>
                  </li>
                )
              })}
            </ul>
          </section>

          <section id="features" className="mt-16">
            <h2 className="text-2xl md:text-3xl font-light text-neutral-900 dark:text-neutral-100">LEXIA PC教室の特徴</h2>
            <p className="mt-3 text-base md:text-lg text-neutral-600 dark:text-neutral-300">
              安心して学んでいただくための仕組みとサポート体制をご用意しています。
            </p>
            <ul className="mt-8 space-y-4">
              {features.map((item) => {
                const Icon = item.icon
                return (
                  <li
                    key={item.label}
                    className="flex items-start gap-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-5 shadow-sm"
                  >
                    <Icon className="mt-1 h-6 w-6 text-neutral-900 dark:text-neutral-100" aria-hidden="true" />
                    <span className="text-lg leading-relaxed text-neutral-800 dark:text-neutral-100">{item.label}</span>
                  </li>
                )
              })}
            </ul>
          </section>

          <section id="pricing" className="mt-16">
            <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 px-6 py-8 md:px-10 md:py-12 text-center">
              <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-200">
                料金プランについては{' '}
                <Link
                  href="https://lexia-hp.com/pricing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-neutral-900 dark:text-neutral-100 underline decoration-neutral-400 hover:decoration-neutral-900"
                >
                  こちらのページ
                </Link>{' '}
                にてご案内しています。
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="https://lexia-hp.com/pricing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-neutral-900 text-white px-6 py-3 text-sm md:text-base font-medium shadow-sm transition-colors hover:bg-neutral-800"
                >
                  料金を見る
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 px-6 py-3 text-sm md:text-base font-medium text-neutral-900 dark:text-neutral-100 transition-colors hover:bg-white dark:hover:bg-neutral-800"
                >
                  体験レッスンについて相談する
                </Link>
              </div>
            </div>
          </section>

          <section id="faq" className="mt-16">
            <h2 className="text-2xl md:text-3xl font-light text-neutral-900 dark:text-neutral-100 text-center">よくあるご質問</h2>
            <div className="mt-8 space-y-6">
              {faqs.map((item) => (
                <div
                  key={item.q}
                  className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 shadow-sm"
                >
                  <p className="text-lg font-medium text-neutral-900 dark:text-neutral-100">{item.q}</p>
                  <p className="mt-2 text-base md:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  )
}
