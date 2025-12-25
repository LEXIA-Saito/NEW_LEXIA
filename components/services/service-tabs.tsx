"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Monitor, Smartphone, Camera, Mail, FileText, ShoppingCart, Globe, MousePointerClick, Smile } from "lucide-react"

type ServiceKey = "web" | "design" | "system" | "movie" | "pc"

interface ServiceData {
  id: ServiceKey
  title: string
  shortTitle: string
  description: string
  content: React.ReactNode
  faqs: { q: string; a: string }[]
}

const servicesData: ServiceData[] = [
  {
    id: "web",
    title: "WEB制作",
    shortTitle: "WEB",
    description: "ホームページ制作、コーポレート、EC、ランディングページ等をトータルでサポートします。",
    faqs: [
      {
        q: "Webサイト制作の納期はどれくらいですか？",
        a: "一般的には1〜2ヶ月程度ですが、規模や要件によって異なります。",
      },
      {
        q: "既存サイトのリニューアルにも対応できますか？",
        a: "はい。現在の課題をヒアリングし、より効果的なサイトへ改善します。",
      },
      { q: "CMSの導入は可能ですか？", a: "WordPressやヘッドレスCMSなど、ご要望に合わせて構築いたします。" },
    ],
    content: (
      <div className="space-y-8">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg">
          <Image
            src="/images/web-services-hero.png"
            alt="WEB制作のイメージ"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">制作工程</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {[
              { step: "01", title: "ヒアリング", desc: "目的・ターゲット・要件を整理" },
              { step: "02", title: "設計・デザイン", desc: "ワイヤーフレーム作成、UIデザイン" },
              { step: "03", title: "開発・実装", desc: "コーディング、CMS構築" },
              { step: "04", title: "テスト", desc: "動作確認、修正対応" },
              { step: "05", title: "公開", desc: "サーバー設定、ドメイン設定" },
              { step: "06", title: "運用サポート", desc: "更新代行、改善提案" },
            ].map((item) => (
              <div key={item.step} className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
                <div className="text-xs text-neutral-500">STEP {item.step}</div>
                <div className="font-medium text-neutral-900 dark:text-neutral-100">{item.title}</div>
                <div className="text-sm text-neutral-700 dark:text-neutral-300">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "design",
    title: "デザイン制作",
    shortTitle: "デザイン",
    description: "名刺・チラシなどの印刷物やロゴデザインを制作します。",
    faqs: [
      {
        q: "ロゴや名刺など複数のデザインをまとめて依頼できますか？",
        a: "はい。ブランド全体のトーンを統一した形で一括制作が可能です。",
      },
      {
        q: "デザインの修正は何回まで対応してもらえますか？",
        a: "基本的に2回まで無料で対応し、それ以上はご相談の上進めます。",
      },
      { q: "印刷までお願いできますか？", a: "データ納品に加えて、提携印刷会社への手配も承ります。" },
    ],
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "ロゴデザイン", desc: "企業・サービスのブランドイメージを形に" },
            { title: "名刺デザイン", desc: "第一印象を左右する名刺を丁寧に制作" },
            { title: "チラシ・パンフレット", desc: "集客・販促に効果的な紙媒体" },
            { title: "バナー・SNS素材", desc: "WEB広告やSNS投稿用のビジュアル" },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-5">
              <h4 className="font-medium text-neutral-900 dark:text-neutral-100">{item.title}</h4>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "system",
    title: "システム開発",
    shortTitle: "システム",
    description: "予約システム、顧客管理システム、財務管理システム等の開発を行います。",
    faqs: [
      {
        q: "どのような開発言語やフレームワークに対応していますか？",
        a: "Next.jsやLaravelなどのモダンなWeb技術を中心に対応しています。",
      },
      {
        q: "開発後の保守・運用サポートはありますか？",
        a: "はい。運用フェーズの改善提案や機能追加にも継続的に対応します。",
      },
      {
        q: "小規模なツール開発も依頼できますか？",
        a: "もちろんです。自動化スクリプトなどの小規模案件もお気軽にご相談ください。",
      },
    ],
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "予約システム", desc: "オンライン予約・カレンダー連携" },
            { title: "顧客管理(CRM)", desc: "顧客情報の一元管理・分析" },
            { title: "業務効率化ツール", desc: "日常業務の自動化・省力化" },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-5">
              <h4 className="font-medium text-neutral-900 dark:text-neutral-100">{item.title}</h4>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">技術スタック</h3>
          <div className="flex flex-wrap gap-2 mt-4">
            {["Next.js", "React", "TypeScript", "Node.js", "Laravel", "PostgreSQL", "AWS", "Vercel"].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-neutral-200 dark:border-neutral-800 px-3 py-1 text-sm text-neutral-800 dark:text-neutral-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "movie",
    title: "動画制作",
    shortTitle: "動画",
    description: "企画から撮影・編集までワンストップで対応します。",
    faqs: [
      {
        q: "どのくらいの尺の動画まで制作できますか？",
        a: "数十秒のショート動画から10分程度のPR動画まで対応しています。",
      },
      { q: "撮影のみ、編集のみの依頼は可能ですか？", a: "はい。必要な工程だけを切り出してご依頼いただけます。" },
      {
        q: "ナレーションやBGMの追加にも対応していますか？",
        a: "プロのナレーター手配や著作権フリーBGMの選定・挿入も可能です。",
      },
      {
        q: "納期の目安はどれくらいですか？",
        a: "撮影ありの場合は2〜4週間、編集のみの場合は素材量により3〜10営業日が目安です。",
      },
    ],
    content: (
      <div className="space-y-8">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg">
          <Image
            src="/images/lexia-services-hero.webp"
            alt="動画制作のイメージ"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-4">用途に合わせたプラン</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "採用・会社紹介", pts: ["メッセージ設計", "インタビュー撮影", "字幕/テロップ"] },
              { name: "店舗/サービスPR", pts: ["商品/店舗撮影", "BGM/SE調整", "サムネ作成"] },
              { name: "SNSショート", pts: ["縦型最適化", "キャプション対応", "高速編集"] },
            ].map((p) => (
              <div key={p.name} className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-5">
                <h4 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">{p.name}</h4>
                <ul className="mt-3 space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
                  {p.pts.map((x) => (
                    <li key={x}>・{x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-4">オプション</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "ドローン撮影",
              "プロナレーション",
              "字幕/キャプション",
              "縦型/リール",
              "英語版",
              "モーショングラフィックス",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-neutral-200 dark:border-neutral-800 px-3 py-1 text-sm text-neutral-800 dark:text-neutral-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "pc",
    title: "PC教室",
    shortTitle: "PC教室",
    description: "パソコン初心者やシニアの方が、生活に役立つ使い方を楽しく学べる教室です。",
    faqs: [
      { q: "レッスンは個別指導ですか？", a: "基本はマンツーマン形式で、受講者のペースに合わせて進めます。" },
      { q: "オンラインでの受講は可能ですか？", a: "はい。Zoomなどを使ったオンラインレッスンにも対応しています。" },
      { q: "支払い方法には何がありますか？", a: "現金のほか、各種クレジットカードや銀行振込に対応しています。" },
    ],
    content: (
      <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-4">対象者</h3>
            <ul className="space-y-3 text-neutral-800 dark:text-neutral-200">
              <li className="flex items-start gap-3">
                <Monitor className="mt-1 h-5 w-5 text-neutral-500" aria-hidden />
                パソコン初心者の方
              </li>
              <li className="flex items-start gap-3">
                <Smartphone className="mt-1 h-5 w-5 text-neutral-500" aria-hidden />
                スマホは使えるけどパソコンは苦手な方
              </li>
              <li className="flex items-start gap-3">
                <Smile className="mt-1 h-5 w-5 text-neutral-500" aria-hidden />
                趣味や生活に役立てたいシニアの方
              </li>
            </ul>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg ring-1 ring-neutral-200 dark:ring-neutral-800">
            <Image
              src="/images/hero_cover.jpg"
              alt="PC教室のイメージ"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-4">学べる内容</h3>
          <div className="grid gap-3">
            {[
              {
                icon: <MousePointerClick className="h-5 w-5" />,
                text: "パソコンの基本操作（電源の入れ方、文字入力、マウス操作）",
              },
              { icon: <Globe className="h-5 w-5" />, text: "インターネット活用（検索・地図・YouTubeなど）" },
              { icon: <Camera className="h-5 w-5" />, text: "写真の整理と印刷（スマホやデジカメの写真管理）" },
              { icon: <Mail className="h-5 w-5" />, text: "メールの使い方（写真添付、孫や友人とのやり取り）" },
              { icon: <FileText className="h-5 w-5" />, text: "文書作成（お知らせ・会報・年賀状など）" },
              {
                icon: <ShoppingCart className="h-5 w-5" />,
                text: "日常に役立つ便利ワザ（ネットショッピング、旅行予約など）",
              },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-start gap-3 rounded-lg border border-neutral-200 dark:border-neutral-800 p-3"
              >
                <div className="mt-0.5 text-neutral-500" aria-hidden>
                  {item.icon}
                </div>
                <p className="text-neutral-800 dark:text-neutral-200 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
]

export default function ServiceTabs() {
  const [activeTab, setActiveTab] = useState<ServiceKey>("web")
  const activeService = servicesData.find((s) => s.id === activeTab)!

  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b border-neutral-200 dark:border-neutral-800">
        <nav className="flex overflow-x-auto -mb-px" aria-label="サービスタブ">
          {servicesData.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveTab(service.id)}
              className={cn(
                "flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                activeTab === service.id
                  ? "border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100"
                  : "border-transparent text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700",
              )}
              aria-selected={activeTab === service.id}
              role="tab"
            >
              <span className="hidden sm:inline">{service.title}</span>
              <span className="sm:hidden">{service.shortTitle}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="py-8" role="tabpanel" aria-label={activeService.title}>
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
            {activeService.title}
          </h2>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">{activeService.description}</p>
        </div>

        {/* Service specific content */}
        <div className="mb-8">{activeService.content}</div>

        {/* FAQ Section */}
        <div className="mt-10">
          <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-4">よくある質問</h3>
          <Accordion type="single" collapsible className="w-full">
            {activeService.faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`}>
                <AccordionTrigger className="text-left font-medium text-neutral-900 dark:text-neutral-100">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-neutral-700 dark:text-neutral-300">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-5 py-3 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
          >
            無料相談する
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 px-5 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
          >
            料金を見る
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 px-5 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
          >
            実績を見る
          </Link>
        </div>
      </div>
    </div>
  )
}
