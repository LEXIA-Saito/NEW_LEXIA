"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
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

export default function ContactForm() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitSuccessful } } = useForm()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const services = watch("services") || []
  const showOther = services.includes("other")

  const onSubmit = async (data: any) => {
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
        <Input {...register("name", { required: true })} />
        {errors.name && <p className="text-red-500 text-sm mt-1">必須項目です</p>}
      </div>
      <div>
        <Label>会社名</Label>
        <Input {...register("company")} />
      </div>
      <div>
        <Label>メールアドレス *</Label>
        <Input type="email" {...register("email", { required: true })} />
        {errors.email && <p className="text-red-500 text-sm mt-1">必須項目です</p>}
      </div>
      <div>
        <Label>電話番号</Label>
        <Input {...register("phone")} />
      </div>
      <div>
        <Label>お問い合わせ種別 *</Label>
        <RadioGroup className="flex flex-col gap-2" {...register("inquiryType", { required: true })}>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="new" id="new" />
            <Label htmlFor="new">新規制作依頼</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="update" id="update" />
            <Label htmlFor="update">修正・更新依頼</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="question" id="question" />
            <Label htmlFor="question">相談・質問</Label>
          </div>
        </RadioGroup>
        {errors.inquiryType && <p className="text-red-500 text-sm mt-1">必須項目です</p>}
      </div>
      <div>
        <Label>ご希望の制作内容 *</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <label className="flex items-center gap-2">
            <Checkbox value="corporate" {...register("services", { required: true })} />コーポレートサイト
          </label>
          <label className="flex items-center gap-2">
            <Checkbox value="ec" {...register("services", { required: true })} />ECサイト
          </label>
          <label className="flex items-center gap-2">
            <Checkbox value="lp" {...register("services", { required: true })} />ランディングページ
          </label>
          <label className="flex items-center gap-2">
            <Checkbox value="recruit" {...register("services", { required: true })} />採用サイト
          </label>
          <label className="flex items-center gap-2">
            <Checkbox value="other" {...register("services", { required: true })} />その他
          </label>
        </div>
        {showOther && (
          <Input className="mt-2" placeholder="その他の内容" {...register("otherService")}/>
        )}
        {errors.services && <p className="text-red-500 text-sm mt-1">必須項目です</p>}
      </div>
      <div>
        <Label>予算感</Label>
        <Select {...register("budget") as any}>
          <SelectTrigger>
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="~50">〜50万円</SelectItem>
            <SelectItem value="50-100">50〜100万円</SelectItem>
            <SelectItem value="100-">100万円以上</SelectItem>
          </SelectContent>
        </Select>
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
        <label className="flex items-center gap-2">
          <Checkbox {...register("privacy", { required: true })} />プライバシーポリシーに同意します
        </label>
        {errors.privacy && <p className="text-red-500 text-sm mt-1">必須項目です</p>}
      </div>
      <div>
        <Label>希望連絡方法</Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <Checkbox value="email" {...register("preferredContact")} />メール
          </label>
          <label className="flex items-center gap-2">
            <Checkbox value="phone" {...register("preferredContact")} />電話
          </label>
        </div>
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

