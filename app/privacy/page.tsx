import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "プライバシーポリシー | LEXIA",
  description:
    "LEXIAのプライバシーポリシー。個人情報の定義・収集する情報・利用目的・第三者提供・クッキー利用・管理体制・開示等請求・法令遵守・お問い合わせ窓口について記載。",
  alternates: {
    canonical: `${SITE_URL.replace(/\/$/, "")}/privacy`,
  },
  openGraph: {
    title: "プライバシーポリシー | LEXIA",
    description:
      "LEXIAのプライバシーポリシー。個人情報の定義・収集する情報・利用目的・第三者提供・クッキー利用・管理体制・開示等請求・法令遵守・お問い合わせ窓口について記載。",
    type: "article",
    url: `${SITE_URL.replace(/\/$/, "")}/privacy`,
  },
  twitter: {
    card: "summary",
    title: "プライバシーポリシー | LEXIA",
    description:
      "LEXIAのプライバシーポリシー。個人情報の定義・収集する情報・利用目的・第三者提供・クッキー利用・管理体制・開示等請求・法令遵守・お問い合わせ窓口について記載。",
  },
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-900">
      <div className="container mx-auto max-w-3xl px-4 py-24 md:py-32">
        <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100">プライバシーポリシー</h1>
        <p className="mt-6 text-neutral-700 dark:text-neutral-300">
          LEXIA（以下「当事業」といいます）は、ホームページ制作やデジタルマーケティングに関するサービスを提供する企業として、お客様からお預かりする個人情報を適切に取り扱うため、以下のとおりプライバシーポリシーを定めます。
        </p>

        <section className="mt-12 space-y-6 text-neutral-800 dark:text-neutral-200">
          <div>
            <h2 className="text-2xl font-semibold">1. 個人情報の定義</h2>
            <p className="mt-2 leading-relaxed">
              本ポリシーにおける「個人情報」とは、氏名、住所、電話番号、メールアドレスなど特定の個人を識別できる情報、並びに他の情報と照合することで個人を識別できる情報を指します。
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">2. 収集する情報の種類</h2>
            <p className="mt-2 leading-relaxed">当事業は以下の情報を取得する場合があります。</p>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>お問い合わせフォーム・資料請求フォーム・お見積もり依頼フォームで入力された氏名、会社名、メールアドレス、電話番号、その他ご相談内容</li>
              <li>サービス提供時に必要となる請求先情報・契約情報</li>
              <li>アクセス解析ツールによる IP アドレス、クッキー情報、ブラウザ情報等のログデータ</li>
              <li>広告配信や SNS 連携の際に取得されるユーザー識別情報</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">3. 個人情報の利用目的</h2>
            <p className="mt-2 leading-relaxed">取得した個人情報は、以下の目的で利用します。</p>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>お問い合わせへの回答や資料送付、見積もりの作成など、お客様からのご依頼・ご相談への対応</li>
              <li>ご契約いただいたサービスの提供・アフターサポート・請求等の事務連絡</li>
              <li>メールマガジンの配信やセミナー・サービスのご案内など、当事業のマーケティング活動（ユーザーは配信停止を選択できます）</li>
              <li>当事業のウェブサイトやサービスの改善のためのアクセス解析、利便性向上のための統計データの作成</li>
              <li>法令や利用規約に違反する行為への対応、利用規約の変更等重要なお知らせの通知</li>
              <li>その他、事前にご本人の同意を得た利用目的</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">4. 第三者への提供</h2>
            <p className="mt-2 leading-relaxed">
              当事業は以下の場合を除き、取得した個人情報を第三者に提供しません。
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>本ポリシーに記載した利用目的の範囲内で、外部の業務委託先（サーバー運営会社、決済事業者、配送業者、広告配信事業者など）に委託する場合</li>
              <li>法令に基づく場合、または人命・財産保護のために緊急に必要でありご本人の同意を得ることが困難な場合</li>
              <li>事前にご本人の同意を得た場合</li>
            </ul>
            <p className="mt-2 leading-relaxed">業務委託先に対しては、個人情報の厳重な管理を義務付け、適切に監督します。</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">5. クッキー等の利用</h2>
            <p className="mt-2 leading-relaxed">
              当事業のウェブサイトでは、利便性向上やアクセス解析、広告配信のためにクッキーや類似の技術を使用します。これらは個人を特定しない形で閲覧履歴などの情報を収集し、サイト改善や広告の最適化に用いられます。ブラウザの設定によりクッキーの受け取りを拒否することも可能ですが、サイトの一部機能がご利用いただけなくなる場合があります。
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">6. 個人情報の管理</h2>
            <p className="mt-2 leading-relaxed">当事業は、個人情報を安全に管理するため、以下の対策を実施します。</p>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>個人情報への不正アクセス、漏えい、紛失、改ざん等を防止するための適切な安全対策（アクセス権限管理、データ暗号化、ファイアウォール等）</li>
              <li>個人情報を取り扱う従業者への教育と監督</li>
              <li>個人情報の取り扱いに関する内部規程の整備と定期的な見直し</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">7. 個人情報の開示・訂正・削除等の請求</h2>
            <p className="mt-2 leading-relaxed">
              当事業は、ご本人から自己の個人情報の開示・訂正・追加・削除・利用停止・消去・第三者提供の停止等の請求があった場合、個人情報保護法その他の法令に基づき、適切に対応します。請求方法や手続きにつきましては、下記連絡先までご連絡ください。
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">8. 未成年者の個人情報</h2>
            <p className="mt-2 leading-relaxed">
              未成年の方が当事業のサービスをご利用される場合、必ず保護者の方の同意を得てください。未成年者から個人情報を取得した際には保護者の方からのお問い合わせにも対応いたします。
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">9. 法令遵守と改善</h2>
            <p className="mt-2 leading-relaxed">
              当事業は、個人情報保護法その他の関係法令・ガイドラインを遵守し、プライバシーポリシーの内容を継続的に見直して改善に努めます。重要な変更がある場合は、本ウェブサイト上で告知します。
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">10. お問い合わせ窓口</h2>
            <p className="mt-2 leading-relaxed">個人情報の取り扱いに関するご質問やご相談、開示等の請求については、下記連絡先までご連絡ください。</p>
            <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm leading-relaxed dark:border-neutral-800 dark:bg-neutral-900/60">
              <p>LEXIA 連絡先</p>
              <p>住所：〒447-0817 愛知県碧南市川端町1-45</p>
              <p>
                メールアドレス：
                <a className="underline" href="mailto:lexia0web@gmail.com">lexia0web@gmail.com</a>
              </p>
              <p>電話番号：090-1742-3456（受付時間：平日8:00〜17:00）</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
