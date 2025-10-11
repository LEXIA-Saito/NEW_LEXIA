export type TeamMember = {
  name: string
  role?: string
  experienceYearsText?: string
  message?: string
  specialties?: string[]
  certifications?: string[]
  image?: string
  slug?: string
  isPrimary?: boolean
}

export const allTeamMembers: TeamMember[] = [
  {
    name: "平松 良太",
    role: "代表取締役社長",
    experienceYearsText: "33年",
    message:
      "「あなたに任せて良かった」と言ってもらえることがなによりの喜びです。",
    specialties: ["経営戦略", "損保全般", "生命保険全般"],
    certifications: ["損保大学・コンサルティングコース", "生保専門"],
    isPrimary: true,
  },
  {
    name: "鋤柄 大悟",
    role: "代表取締役副社長",
    experienceYearsText: "11年",
    message:
      "お客様の「今」と向き合い「未来の自分」が喜ぶ選択のお手伝いをさせていただきます。",
    specialties: ["企業リスクマネジメント", "法人生命保険"],
    certifications: ["損保大学・コンサルティングコース", "生保専門"],
    isPrimary: true,
  },
  {
    name: "榊原 祐愛",
    role: "専務取締役",
    experienceYearsText: "25年",
    message:
      "自助・共助・公助、相互扶助が保険の本質だと信じて日々営業活動をしております。",
    specialties: ["損外保険全般", "事故対応", "運送保険", "企業賠償責任"],
    certifications: ["損保大学・コンサルティングコース", "生保専門"],
    isPrimary: true,
  },
  {
    name: "栁本 大輔",
    role: "常務取締役",
    experienceYearsText: "17年",
    message: "一人でも多くの方とお会いできるのを楽しみにしています！",
    specialties: ["自動車保険", "火災保険", "企業保険"],
    certifications: ["損保大学・コンサルティングコース", "生保専門"],
    isPrimary: true,
  },
  {
    name: "中根 隆二",
    role: "営業",
    experienceYearsText: "10年",
    message: "笑顔で暮らせる世の中にしたいと思っています！",
    specialties: ["自動車保険", "火災保険"],
    certifications: ["損保大学・コンサルティングコース", "生保専門"],
  },
  {
    name: "中村 直行",
    role: "営業",
    experienceYearsText: "8年",
    message:
      "チームcotnas.がお客様の安心と幸せを全力でサポートいたします！",
    specialties: ["火災保険", "新種保険"],
    certifications: ["損保大学・専門コース", "生保専門"],
  },
  {
    name: "筒井 登志樹",
    role: "営業",
    experienceYearsText: "10年超",
    message: "老体にムチ打って頑張っております、よろしくお願いいたします。",
    specialties: ["傷害保険"],
    certifications: ["損保一般", "生保応用"],
  },
  {
    name: "岩堀 祐司",
    role: "営業",
    experienceYearsText: "32年",
    message: "一つひとつ丁寧に仕事をさせていただきます。",
    specialties: ["自動車保険", "火災保険"],
    certifications: ["損保大学・専門コース", "生保専門"],
  },
  {
    name: "鋤柄 敬史",
    role: "営業事務",
    experienceYearsText: "25年",
    specialties: ["損保全般"],
    certifications: ["損保大学・コンサルティングコース", "生保専門"],
  },
  {
    name: "武田 雅子",
    role: "営業事務",
    certifications: ["損保大学・専門コース", "生保一般"],
  },
  {
    name: "榊原 美和子",
    role: "営業事務",
    experienceYearsText: "17年",
    specialties: ["損保全般", "事故対応"],
    certifications: ["損保大学・専門コース", "生保一般"],
  },
  {
    name: "早川 千晴",
    role: "事務",
    experienceYearsText: "4年",
    message: "明るく笑顔で対応させていただきます！",
    certifications: ["損保一般"],
  },
  {
    name: "吉元 彩美",
    role: "事務",
    experienceYearsText: "3年",
    certifications: ["損保一般", "生保一般"],
  },
  {
    name: "八木 優美",
    role: "生保事務",
    specialties: ["生命保険全般"],
    certifications: ["損保一般", "生保一般"],
  },
  {
    name: "榊原 ひとみ",
    experienceYearsText: "40年",
    specialties: ["損保全般"],
    certifications: ["損保一般", "生保一般"],
  },
  {
    name: "長谷 収一",
    role: "顧問",
    experienceYearsText: "36年",
  },
  {
    name: "鋤柄 浩史",
    role: "顧問",
    experienceYearsText: "37年",
    message:
      "引退間近ですが、経験を活かして後世に繋げていきたいと思います。",
    certifications: [
      "損保大学・専門コース（特級資格・損害SA全種目）",
      "生保一般",
    ],
  },
  {
    name: "榊原 次好",
    role: "相談役",
    experienceYearsText: "41年",
    certifications: ["損保一般"],
  },
]

