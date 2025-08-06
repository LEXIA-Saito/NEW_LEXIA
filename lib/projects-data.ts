export interface Project {
  id: string
  slug: string
  title: string
  description: string
  image: string
  categories: string[]
  featured: boolean
  year: string
  tags: string[]
  location: string
}

export const projectsData: Project[] = [
  {
    id: "1",
    slug: "mino-kenchiku-website",
    title: "美濃建築事務所 公式ウェブサイト",
    description:
      "愛知県を拠点とする建築事務所のコーポレートサイト。モダンなデザインと使いやすいインターフェースで、建築作品を美しく紹介。レスポンシブ対応で、どのデバイスからでも快適に閲覧できます。",
    image: "/placeholder.svg?height=400&width=600&text=美濃建築事務所",
    categories: ["website"],
    featured: true,
    year: "2024",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "レスポンシブデザイン"],
    location: "愛知県",
  },
  {
    id: "2",
    slug: "local-restaurant-app",
    title: "地域密着型レストラン予約アプリ",
    description:
      "碧南市の地元レストランと連携した予約管理システム。リアルタイム予約、メニュー表示、口コミ機能を搭載。地域の食文化を支援するプラットフォームとして設計されています。",
    image: "/placeholder.svg?height=400&width=600&text=レストラン予約アプリ",
    categories: ["system"],
    featured: true,
    year: "2024",
    tags: ["React Native", "Node.js", "MongoDB", "リアルタイム通信"],
    location: "愛知県碧南市",
  },
  {
    id: "3",
    slug: "manufacturing-dashboard",
    title: "製造業向けダッシュボードシステム",
    description:
      "愛知県の製造業企業向けに開発した生産管理ダッシュボード。リアルタイムでの生産状況監視、品質管理、在庫管理機能を統合。データ可視化により効率的な意思決定をサポートします。",
    image: "/placeholder.svg?height=400&width=600&text=製造業ダッシュボード",
    categories: ["system"],
    featured: false,
    year: "2023",
    tags: ["Vue.js", "Python", "PostgreSQL", "データ可視化"],
    location: "愛知県",
  },
  {
    id: "4",
    slug: "tourism-website",
    title: "碧南市観光情報サイト",
    description:
      "碧南市の観光スポット、イベント情報、グルメ情報を紹介する公式観光サイト。多言語対応により国際観光客にも対応。インタラクティブマップと写真ギャラリーで魅力を伝えます。",
    image: "/placeholder.svg?height=400&width=600&text=碧南市観光サイト",
    categories: ["website"],
    featured: false,
    year: "2023",
    tags: ["Next.js", "多言語対応", "CMS", "SEO最適化"],
    location: "愛知県碧南市",
  },
  {
    id: "5",
    slug: "ecommerce-platform",
    title: "地域特産品ECプラットフォーム",
    description:
      "愛知県の地域特産品を全国に販売するECサイト。農家や職人と直接つながる仕組みを構築。決済システム、在庫管理、配送管理を統合したフルスタックソリューション。",
    image: "/placeholder.svg?height=400&width=600&text=特産品ECサイト",
    categories: ["ecommerce"],
    featured: true,
    year: "2023",
    tags: ["Shopify", "React", "Stripe", "在庫管理"],
    location: "愛知県",
  },
  {
    id: "6",
    slug: "educational-app",
    title: "子ども向け学習アプリ",
    description:
      "地域の小学校と連携した教育支援アプリ。ゲーミフィケーション要素を取り入れた学習コンテンツで、子どもたちの学習意欲を向上。保護者向けの進捗確認機能も搭載。",
    image: "/placeholder.svg?height=400&width=600&text=学習アプリ",
    categories: ["system"],
    featured: false,
    year: "2024",
    tags: ["Flutter", "Firebase", "ゲーミフィケーション", "教育"],
    location: "愛知県碧南市",
  },
]
