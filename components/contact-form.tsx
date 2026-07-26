"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { trackEvent } from "@/lib/analytics"

interface Attachment {
  name: string
  content: string
  type: string
}

type ContactFormValues = {
  name: string
  company: string
  email: string
  phone: string
  inquiryType: string
  services: string[]
  otherService: string
  budget: string
  due: string
  url: string
  details: string
  attachment?: FileList
  privacy: boolean
  preferredContact: string[]
}

const INQUIRY_TYPE_OPTIONS = [
  { value: "new", label: "新規制作依頼" },
  { value: "update", label: "修正・更新依頼" },
  { value: "question", label: "相談・質問" }
] as const

const SERVICE_OPTIONS = [
  { value: "corporate", label: "コーポレートサイト" },
  { value: "ec", label: "ECサイト" },
  { value: "lp", label: "ランディングページ" },
  { value: "recruit", label: "採用サイト" },
  { value: "other", label: "その他" }
] as const

const CONTACT_METHOD_OPTIONS = [
  { value: "email", label: "メール" },
  { value: "phone", label: "電話" }
] as const

const PAGE_TYPE_LABELS: Record<string, string> = {
  static: "静的ページ",
  dynamic: "動的ページ",
  product: "EC商品ページ",
}

const DESIGN_LABELS: Record<string, string> = {
  simple: "シンプル",
  standard: "標準",
  high: "ハイエンド",
}

const MAINTENANCE_LABELS: Record<string, string> = {
  none: "なし",
  monthly: "月額",
  yearly: "年額",
}

const PRICING_SERVICE_LABELS: Record<string, string> = {
  corporate: "コーポレートサイト",
  ec: "ECサイト",
  system: "システム開発",
  design: "デザイン制作",
  pc: "PC教室",
  ai: "AI活用サポート",
}

function buildPricingSummary(params: URLSearchParams) {
  const estimateValue = params.get("estimate")
  if (estimateValue === null || estimateValue === "") return ""

  const estimate = Number(estimateValue)
  if (!Number.isFinite(estimate) || estimate < 0) return ""

  const pages = params.get("pages") || "未指定"
  const pageType = PAGE_TYPE_LABELS[params.get("pageType") || ""] || "未指定"
  const design = DESIGN_LABELS[params.get("design") || ""] || "未指定"
  const maintenance =
    MAINTENANCE_LABELS[params.get("maintenance") || ""] || "未指定"
  const cms = params.get("cms") === "true" ? "あり" : "なし"
  const ssr = params.get("ssr") === "true" ? "あり" : "なし"
  const schedule = params.get("schedule") === "rush" ? "短納期" : "標準"

  return [
    "料金シミュレーション結果をもとに相談したいです。",
    "",
    `概算合計：${estimate.toLocaleString("ja-JP")}円`,
    `ページ数：${pages}ページ`,
    `ページ種別：${pageType}`,
    `デザイン：${design}`,
    `CMS：${cms}`,
    `サーバーレンダリング：${ssr}`,
    `保守プラン：${maintenance}`,
    `納期：${schedule}`,
    "",
    "※シミュレーションは概算です。正式な見積もりを希望します。",
  ].join("\n")
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      inquiryType: "question",
      services: [],
      otherService: "",
      budget: "",
      due: "",
      url: "",
      details: "",
      privacy: false,
      preferredContact: ["email"]
    }
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const contactStartTracked = useRef(false)

  const services = watch("services") || []
  const showOther = services.includes("other")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const source = params.get("source")
    if (
      source !== "pricing-homepage" &&
      source !== "pricing"
    ) {
      return
    }

    const service = params.get("service")
    if (service) {
      if (service === "corporate" || service === "ec") {
        setValue("services", [service])
      } else {
        setValue("services", ["other"])
        setValue("otherService", PRICING_SERVICE_LABELS[service] || service)
      }
    }

    setValue("inquiryType", "new")

    const estimate = Number(params.get("estimate"))
    if (Number.isFinite(estimate) && estimate > 0) {
      setValue(
        "budget",
        estimate <= 500_000 ? "~50" : estimate <= 1_000_000 ? "50-100" : "100-",
      )
    }

    const summary = buildPricingSummary(params)
    if (summary) setValue("details", summary)

    trackEvent("contact_prefill", {
      source,
      service: service || "unknown",
      estimate: Number.isFinite(estimate) ? estimate : undefined,
    })
  }, [setValue])

  const handleContactStart = () => {
    if (contactStartTracked.current) return
    contactStartTracked.current = true
    trackEvent("contact_start", { form_id: "contact" })
  }

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitting(true)
    setError(null)
    trackEvent("contact_form_submit", {
      form_id: "contact",
      inquiry_type: data.inquiryType,
      service_count: data.services.length,
    })

    try {
      let attachment: Attachment | null = null
      const file: File | undefined = data.attachment?.[0]
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          throw new Error("添付ファイルは5MB以下にしてください")
        }
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(String(reader.result).split(",")[1])
          reader.onerror = () => reject(new Error("添付ファイルを読み込めませんでした"))
          reader.readAsDataURL(file)
        })
        attachment = { name: file.name, content: base64, type: file.type }
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, attachment })
      })
      if (!res.ok) {
        const responseBody = await res.json().catch(() => null)
        throw new Error(responseBody?.error || "送信に失敗しました")
      }
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "送信に失敗しました",
      )
      setSubmitting(false)
      return
    }

    setSubmitting(false)
    setSuccess(true)
    trackEvent("generate_lead", {
      form_id: "contact",
      inquiry_type: data.inquiryType,
      service_count: data.services.length,
    })
  }

  if (success) {
    return (
      <div
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center dark:border-emerald-900 dark:bg-emerald-950/30"
        role="status"
        aria-live="polite"
      >
        <h2 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100">
          送信が完了しました
        </h2>
        <p className="mt-3 leading-relaxed text-emerald-800 dark:text-emerald-200">
          お問い合わせありがとうございます。内容を確認し、2営業日以内にご連絡します。
          確認メールもお送りしました。
        </p>
        <Link
          href="/"
          className="mt-5 inline-flex rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900"
        >
          トップページへ戻る
        </Link>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onFocusCapture={handleContactStart}
      className="space-y-6"
    >
      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-600 dark:border-neutral-800 dark:bg-neutral-800/40 dark:text-neutral-300">
        必須項目は、お名前・メールアドレス・ご相談内容・プライバシーポリシーへの同意のみです。
        内容が固まっていない段階でもご相談いただけます。
      </div>
      <div>
        <Label htmlFor="contact-name">お名前 *</Label>
        <Input id="contact-name" autoComplete="name" {...register("name", { required: "必須項目です" })} />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <Label htmlFor="contact-email">メールアドレス *</Label>
        <Input
          id="contact-email"
          type="email"
          autoComplete="email"
          {...register("email", {
            required: "必須項目です",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "有効なメールアドレスを入力してください",
            },
          })}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <Label>お問い合わせ種別</Label>
        <Controller
          name="inquiryType"
          control={control}
          render={({ field }) => (
            <RadioGroup
              className="grid gap-2 sm:grid-cols-3"
              value={field.value || undefined}
              onValueChange={(value) => {
                field.onChange(value)
                field.onBlur()
              }}
            >
              {INQUIRY_TYPE_OPTIONS.map((option) => (
                <div key={option.value} className="flex items-center gap-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
        />
      </div>
      <div>
        <Label>ご希望の制作内容（複数選択可）</Label>
        <Controller
          name="services"
          control={control}
          render={({ field }) => {
            const selected = field.value ?? []

            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SERVICE_OPTIONS.map((option) => {
                  const isChecked = selected.includes(option.value)

                  return (
                    <label key={option.value} className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 dark:border-neutral-700">
                      <Checkbox
                        id={`service-${option.value}`}
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
        {showOther && (
          <Input className="mt-2" placeholder="その他の内容" {...register("otherService")} />
        )}
      </div>
      <div>
        <Label htmlFor="contact-details">お問い合わせ詳細 *</Label>
        <Textarea
          id="contact-details"
          rows={7}
          placeholder="目的やお困りごとをご記入ください。未定の項目は「相談して決めたい」で問題ありません。"
          {...register("details", {
            required: "ご相談内容を入力してください",
            maxLength: {
              value: 2000,
              message: "2000文字以内で入力してください",
            },
          })}
        />
        {errors.details && <p className="text-red-500 text-sm mt-1">{errors.details.message}</p>}
      </div>

      <details className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
        <summary className="cursor-pointer font-medium text-neutral-900 dark:text-neutral-100">
          会社名・予算・納期などを追加する（任意）
        </summary>
        <div className="mt-5 space-y-5">
          <div>
            <Label htmlFor="contact-company">会社名</Label>
            <Input id="contact-company" autoComplete="organization" {...register("company")} />
          </div>
          <div>
            <Label htmlFor="contact-phone">電話番号</Label>
            <Input id="contact-phone" type="tel" autoComplete="tel" {...register("phone")} />
          </div>
          <div>
            <Label>予算感</Label>
            <Controller
              name="budget"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value || undefined}
                  onValueChange={field.onChange}
                  onOpenChange={(open) => {
                    if (!open) field.onBlur()
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="~50">〜50万円</SelectItem>
                    <SelectItem value="50-100">50〜100万円</SelectItem>
                    <SelectItem value="100-">100万円以上</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <Label htmlFor="contact-due">希望納期</Label>
            <Input id="contact-due" {...register("due")} />
          </div>
          <div>
            <Label htmlFor="contact-url">現状のURL</Label>
            <Input id="contact-url" type="url" {...register("url")} />
          </div>
          <div>
            <Label htmlFor="contact-attachment">添付ファイル（PDF・画像／最大5MB）</Label>
            <Input id="contact-attachment" type="file" accept="image/*,application/pdf" {...register("attachment")} />
          </div>
          <div>
            <Label>希望連絡方法</Label>
            <Controller
              name="preferredContact"
              control={control}
              render={({ field }) => {
                const selected = field.value ?? []

                return (
                  <div className="flex gap-4">
                    {CONTACT_METHOD_OPTIONS.map((option) => {
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
          </div>
        </div>
      </details>

      <div>
        <Controller
          name="privacy"
          control={control}
          rules={{ validate: (value) => value || "必須項目です" }}
          render={({ field }) => (
            <label className="flex items-start gap-2">
              <Checkbox
                id="contact-privacy"
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked === true)
                }}
                onBlur={field.onBlur}
                ref={field.ref}
              />
              <span>
                <Link href="/privacy" className="underline underline-offset-4">
                  プライバシーポリシー
                </Link>
                に同意します *
              </span>
            </label>
          )}
        />
        {errors.privacy && <p className="text-red-500 text-sm mt-1">{errors.privacy.message}</p>}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "送信中..." : "送信"}
      </Button>
    </form>
  )
}
