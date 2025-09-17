"use client"

import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

export default function ContactForm() {
  const { register, handleSubmit, watch, control, formState: { errors, isSubmitSuccessful } } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      inquiryType: "",
      services: [],
      otherService: "",
      budget: "",
      due: "",
      url: "",
      details: "",
      privacy: false,
      preferredContact: []
    }
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const services = watch("services") || []
  const showOther = services.includes("other")

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitting(true)
    setError(null)

    let attachment: Attachment | null = null
    const file: File | undefined = data.attachment?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be under 5MB")
        setSubmitting(false)
        return
      }
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(String(reader.result).split(",")[1])
        reader.onerror = () => reject()
        reader.readAsDataURL(file)
      })
      attachment = { name: file.name, content: base64, type: file.type }
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, attachment })
      })
      if (!res.ok) throw new Error("Request failed")
    } catch (e) {
      setError("送信に失敗しました")
      setSubmitting(false)
      return
    }

    setSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label>お名前 *</Label>
        <Input {...register("name", { required: "必須項目です" })} />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <Label>会社名</Label>
        <Input {...register("company")} />
      </div>
      <div>
        <Label>メールアドレス *</Label>
        <Input type="email" {...register("email", { required: "必須項目です" })} />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <Label>電話番号</Label>
        <Input {...register("phone")} />
      </div>
      <div>
        <Label>お問い合わせ種別 *</Label>
        <Controller
          name="inquiryType"
          control={control}
          rules={{ required: "必須項目です" }}
          render={({ field }) => (
            <RadioGroup
              className="flex flex-col gap-2"
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
        {errors.inquiryType && <p className="text-red-500 text-sm mt-1">{errors.inquiryType.message}</p>}
      </div>
      <div>
        <Label>ご希望の制作内容 *</Label>
        <Controller
          name="services"
          control={control}
          rules={{ validate: (value) => (value?.length ?? 0) > 0 || "必須項目です" }}
          render={({ field }) => {
            const selected = field.value ?? []

            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SERVICE_OPTIONS.map((option) => {
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
        {showOther && (
          <Input className="mt-2" placeholder="その他の内容" {...register("otherService")}/>
        )}
        {errors.services && <p className="text-red-500 text-sm mt-1">{errors.services.message}</p>}
      </div>
      <div>
        <Label>予算感</Label>
        <Controller
          name="budget"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value || undefined}
              onValueChange={(value) => {
                field.onChange(value)
              }}
              onOpenChange={(open) => {
                if (!open) {
                  field.onBlur()
                }
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
        <Label>希望納期</Label>
        <Input {...register("due")} />
      </div>
      <div>
        <Label>現状のURL</Label>
        <Input {...register("url")} />
      </div>
      <div>
        <Label>お問い合わせ詳細</Label>
        <Textarea {...register("details")} />
      </div>
      <div>
        <Label>添付ファイル (PDF/画像 最大5MB)</Label>
        <Input type="file" accept="image/*,application/pdf" {...register("attachment")} />
      </div>
      <div>
        <Controller
          name="privacy"
          control={control}
          rules={{ validate: (value) => value || "必須項目です" }}
          render={({ field }) => (
            <label className="flex items-center gap-2">
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked === true)
                }}
                onBlur={field.onBlur}
                ref={field.ref}
              />
              プライバシーポリシーに同意します
            </label>
          )}
        />
        {errors.privacy && <p className="text-red-500 text-sm mt-1">{errors.privacy.message}</p>}
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
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {isSubmitSuccessful && !error && (
        <p className="text-green-600 text-sm">送信が完了しました。ありがとうございました。</p>
      )}
      <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? "送信中..." : "送信"}
      </Button>
    </form>
  )
}
