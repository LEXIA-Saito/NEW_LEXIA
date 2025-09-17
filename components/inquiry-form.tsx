"use client"

import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

type InquiryFormValues = {
  name: string
  nameKana: string
  company: string
  position: string
  email: string
  phone: string
  existingWebsite: string
  purposes: string[]
  purposeDetails: string
  targetAudience: string
  currentChallenges: string
  contents: string[]
  designImage: string
  referencesite1: string
  referencesite1Details: string
  referencesite2: string
  referencesite2Details: string
  referencesite3: string
  referencesite3Details: string
  budget: string
  serverDomain: string
  materials: string
  additionalRequests: string
}

const PURPOSE_OPTIONS = [
  { value: "lead-generation", label: "集客・見込み顧客獲得" },
  { value: "sales", label: "商品・サービスの販売" },
  { value: "branding", label: "ブランディング・認知度向上" },
  { value: "recruitment", label: "採用活動" },
  { value: "information", label: "情報提供・発信" },
  { value: "other", label: "その他" }
] as const

const CONTENT_OPTIONS = [
  { value: "company-overview", label: "会社概要" },
  { value: "business-services", label: "事業・サービス紹介" },
  { value: "product-list", label: "商品一覧" },
  { value: "customer-voice", label: "お客様の声" },
  { value: "case-studies", label: "実績紹介" },
  { value: "blog-news", label: "ブログ・お知らせ" },
  { value: "contact-form", label: "お問い合わせフォーム" },
  { value: "recruitment", label: "採用情報" },
  { value: "faq", label: "よくある質問" },
  { value: "document-download", label: "資料ダウンロード" },
  { value: "member-login", label: "会員登録・ログイン" },
  { value: "reservation-system", label: "予約システム" },
  { value: "other", label: "その他" }
] as const

export default function InquiryForm() {
  const { register, handleSubmit, control, formState: { errors, isSubmitSuccessful } } = useForm<InquiryFormValues>({
    defaultValues: {
      name: "",
      nameKana: "",
      company: "",
      position: "",
      email: "",
      phone: "",
      existingWebsite: "",
      purposes: [],
      purposeDetails: "",
      targetAudience: "",
      currentChallenges: "",
      contents: [],
      designImage: "",
      referencesite1: "",
      referencesite1Details: "",
      referencesite2: "",
      referencesite2Details: "",
      referencesite3: "",
      referencesite3Details: "",
      budget: "",
      serverDomain: "",
      materials: "",
      additionalRequests: ""
    }
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (data: InquiryFormValues) => {
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      if (!res.ok) throw new Error("Request failed")
    } catch {
      setError("送信に失敗しました")
    } finally {
      setSubmitting(false)
    }
  }

  const sectionHeaderClass = "text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-2"
  const requiredLabelClass = "flex items-center gap-1"
  const optionalLabelClass = "text-neutral-500 text-sm ml-2"
  const errorClass = "text-red-500 text-sm mt-1"
  const descriptionClass = "text-sm text-neutral-600 dark:text-neutral-400 mb-3"

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* お客様情報 */}
      <section>
        <h2 className={sectionHeaderClass}>
          お客様情報
        </h2>

        <div className="space-y-6">
          <div>
            <Label className={requiredLabelClass}>
              お名前（担当者様）
              <span className="text-red-500 text-sm">必須</span>
            </Label>
            <Input {...register("name", { required: "必須項目です" })} placeholder="歴史有 太郎" />
            {errors.name && <p className={errorClass}>{errors.name.message}</p>}
          </div>

          <div>
            <Label className={requiredLabelClass}>
              おなまえ（ふりがな）
              <span className="text-red-500 text-sm">必須</span>
            </Label>
            <Input {...register("nameKana", { required: "必須項目です" })} placeholder="れきしあ たろう" />
            {errors.nameKana && <p className={errorClass}>{errors.nameKana.message}</p>}
          </div>

          <div>
            <Label>
              会社名・団体名
              <span className={optionalLabelClass}>任意</span>
            </Label>
            <Input {...register("company")} placeholder="LEXIA" />
          </div>

          <div>
            <Label>
              役職・部署名
              <span className={optionalLabelClass}>任意</span>
            </Label>
            <Input {...register("position")} placeholder="CEO" />
          </div>

          <div>
            <Label className={requiredLabelClass}>
              メールアドレス
              <span className="text-red-500 text-sm">必須</span>
            </Label>
            <Input type="email" {...register("email", { required: "必須項目です" })} placeholder="info@lexia.com" />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>

          <div>
            <Label className={requiredLabelClass}>
              電話番号
              <span className="text-red-500 text-sm">必須</span>
            </Label>
            <Input {...register("phone", { required: "必須項目です" })} placeholder="09012345678" />
            {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
          </div>

          <div>
            <Label>
              既存のウェブサイト・既にお持ちの場合
              <span className={optionalLabelClass}>任意</span>
            </Label>
            <Input {...register("existingWebsite")} placeholder="lexia@lexia.com" />
          </div>
        </div>
      </section>

      {/* 制作されたいホームページについて */}
      <section>
        <h2 className={sectionHeaderClass}>
          制作されたいホームページについて
        </h2>

        <div className="space-y-6">
          <div>
            <Label className={requiredLabelClass}>
              ホームページの目的・ゴール
              <span className="text-red-500 text-sm">必須</span>
            </Label>
            <p className={descriptionClass}>
              ホームページを通じて何を達成したいか、具体的に教えてください。
            </p>
            <Controller
              name="purposes"
              control={control}
              rules={{ validate: (value) => (value?.length ?? 0) > 0 || "必須項目です" }}
              render={({ field }) => {
                const selected = field.value ?? []

                return (
                  <div className="space-y-2">
                    {PURPOSE_OPTIONS.map((option) => {
                      const isChecked = selected.includes(option.value)

                      return (
                        <label key={option.value} className="flex items-center gap-2">
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={(checked) => {
                              const shouldSelect = checked === true
                              const next = shouldSelect
                                ? Array.from(new Set([...selected, option.value]))
                                : selected.filter((item) => item !== option.value)
                              field.onChange(next)
                              field.onBlur()
                            }}
                          />
                          {option.label}
                        </label>
                      )
                    })}
                  </div>
                )
              }}
            />
            {errors.purposes && <p className={errorClass}>{errors.purposes.message}</p>}
          </div>

          <div>
            <Label>
              ホームページの目的・ゴール自由記述
              <span className={optionalLabelClass}>任意</span>
            </Label>
            <Textarea {...register("purposeDetails")} placeholder="見た人が誰かに紹介しちゃうようなサイトにしたい" />
          </div>

          <div>
            <Label>
              ターゲット層
              <span className="text-neutral-500 text-sm ml-2">任意</span>
            </Label>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
              どのような方にホームページを見てほしいですか？
            </p>
            <Textarea {...register("targetAudience")} placeholder="20代女性、都内在住の経営者、〇〇に興味があるシニア層など" />
          </div>

          <div>
            <Label>
              現在の課題やお悩み
              <span className="text-neutral-500 text-sm ml-2">任意</span>
            </Label>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
              もしあれば、現状で抱えている課題を教えてください。
            </p>
            <Textarea {...register("currentChallenges")} placeholder="集客がうまくいかない、自社の強みが伝わっていない、デザインが古いなど" />
          </div>

          <div>
            <Label className="flex items-center gap-1">
              掲載したい主な内容・必要な機能
              <span className="text-red-500 text-sm">必須</span>
            </Label>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              具体的にどのようなページや機能が必要か教えてください。
            </p>
            <Controller
              name="contents"
              control={control}
              rules={{ validate: (value) => (value?.length ?? 0) > 0 || "必須項目です" }}
              render={({ field }) => {
                const selected = field.value ?? []

                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {CONTENT_OPTIONS.map((option) => {
                      const isChecked = selected.includes(option.value)

                      return (
                        <label key={option.value} className="flex items-center gap-2">
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={(checked) => {
                              const shouldSelect = checked === true
                              const next = shouldSelect
                                ? Array.from(new Set([...selected, option.value]))
                                : selected.filter((item) => item !== option.value)
                              field.onChange(next)
                              field.onBlur()
                            }}
                          />
                          {option.label}
                        </label>
                      )
                    })}
                  </div>
                )
              }}
            />
            {errors.contents && <p className={errorClass}>{errors.contents.message}</p>}
          </div>

          <div>
            <Label>
              デザインのイメージ・雰囲気
              <span className={optionalLabelClass}>任意</span>
            </Label>
            <p className={descriptionClass.replace("mb-3", "mb-2")}>
              イメージしているサイトの雰囲気やデザインを教えてください<br />
              言葉で表現しにくい場合は、後述の参考サイトでカバーできます。
            </p>
            <Textarea {...register("designImage")} placeholder="シンプルで洗練された感じ、温かみがあり親しみやすい感じ、高級感のある感じ、特定のテーマカラー（例：青系）など" />
          </div>

          <div>
            <Label>
              参考サイト
              <span className={optionalLabelClass}>任意</span>
            </Label>
            <p className={descriptionClass.replace("mb-3", "mb-4")}>
              イメージに近いサイト、デザインや構成が好きなサイト、逆に苦手なサイトなどがあれば教えてください。
            </p>

            <div className="space-y-4">
              <div>
                <Input {...register("referencesite1")} placeholder="https://lexia-hp.com/" />
                <Textarea className="mt-2" {...register("referencesite1Details")} placeholder="参考サイト1詳細：サイトの構造は参考サイト1のログイン機能を抜いた感じが良い" />
              </div>
              <div>
                <Input {...register("referencesite2")} placeholder="https://lexia-hp.com/" />
                <Textarea className="mt-2" {...register("referencesite2Details")} placeholder="参考サイト2詳細：色味はこのサイトのように暖色系で温かみのあるサイトにしたい" />
              </div>
              <div>
                <Input {...register("referencesite3")} placeholder="https://lexia-hp.com/" />
                <Textarea className="mt-2" {...register("referencesite3Details")} placeholder="参考サイト3詳細：このように奇抜なサイトは苦手" />
              </div>
            </div>
          </div>

          <div>
            <Label>
              ご予算感
              <span className={optionalLabelClass}>任意</span>
            </Label>
            <p className={descriptionClass}>
              差し支えなければ、おおよそのご予算をお聞かせください。ご予算に応じて最適なプランをご提案します。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label className="flex items-center gap-2">
                <input type="radio" value="~5" {...register("budget")} />
                ~5万円
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="5-10" {...register("budget")} />
                5~10万円
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="10-15" {...register("budget")} />
                10~15万円
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="15-30" {...register("budget")} />
                15~30万円
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="30-50" {...register("budget")} />
                30~50万円
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="50-100" {...register("budget")} />
                50~100万円
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="100+" {...register("budget")} />
                100万～
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="consultation" {...register("budget")} />
                具体的な相談がしたい
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="other" {...register("budget")} />
                その他
              </label>
            </div>
          </div>

          <div>
            <Label>
              サーバー・ドメインの準備状況
              <span className="text-neutral-500 text-sm ml-2">任意</span>
            </Label>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              ホームページを公開するためのサーバーやドメインについてです。
            </p>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" value="have-both" {...register("serverDomain")} />
                既に持っている
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="have-none" {...register("serverDomain")} />
                持っていない
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="will-get" {...register("serverDomain")} />
                これから取得する
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="server-only" {...register("serverDomain")} />
                サーバーのみ持っている
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="domain-only" {...register("serverDomain")} />
                ドメインのみ持っている
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="need-consultation" {...register("serverDomain")} />
                よくわからない・相談したい
              </label>
            </div>
          </div>

          <div>
            <Label>
              ロゴや写真素材の準備状況
              <span className="text-neutral-500 text-sm ml-2">任意</span>
            </Label>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              ホームページに使用するロゴデータや写真素材についてです。
            </p>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" value="all-ready" {...register("materials")} />
                全て準備してある
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="partial-ready" {...register("materials")} />
                一部準備してある
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="will-prepare" {...register("materials")} />
                これから用意する
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="need-help" {...register("materials")} />
                全くない・依頼したい
              </label>
            </div>
          </div>

          <div>
            <Label>
              その他ご要望・ご質問など
              <span className={optionalLabelClass}>任意</span>
            </Label>
            <p className={descriptionClass.replace("mb-3", "mb-2")}>
              上記以外に伝えたいこと、事前に聞いておきたいことなどがあればご自由にご記入ください。
            </p>
            <Textarea {...register("additionalRequests")} rows={4} />
          </div>
        </div>
      </section>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {isSubmitSuccessful && !error && (
        <p className="text-green-600 text-sm">送信が完了しました。ありがとうございました。</p>
      )}

      <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
        <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? "送信中..." : "送信"}
        </Button>
      </div>
    </form>
  )
}
