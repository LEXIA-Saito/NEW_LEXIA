import { NextResponse } from 'next/server'
import { getProjects } from '@/lib/microcms'

// フォールバックプロジェクトデータ
const fallbackProjects = [
  {
    id: "fallback-1",
    slug: "mino-kenchiku-website",
    title: "美濃建築事務所 公式ウェブサイト",
    description: "愛知県を拠点とする建築事務所のコーポレートサイト。モダンなデザインと使いやすいインターフェースで、建築作品を美しく紹介。レスポンシブ対応で、どのデバイスからでも快適に閲覧できます。",
    image: "/placeholder.svg?height=400&width=600&text=美濃建築事務所",
    categories: ["Web開発", "コーポレートサイト"],
    featured: true,
    year: "2024",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "レスポンシブデザイン"],
    location: "愛知県",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "fallback-2",
    slug: "local-restaurant-app",
    title: "地域密着型レストラン予約アプリ",
    description: "碧南市の地元レストランと連携した予約管理システム。リアルタイム予約、メニュー表示、口コミ機能を搭載。地域の食文化を支援するプラットフォームとして設計されています。",
    image: "/placeholder.svg?height=400&width=600&text=レストラン予約アプリ",
    categories: ["アプリ開発", "予約システム"],
    featured: true,
    year: "2024",
    tags: ["React Native", "Node.js", "MongoDB", "リアルタイム通信"],
    location: "愛知県碧南市",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "fallback-3",
    slug: "manufacturing-dashboard",
    title: "製造業向けダッシュボードシステム",
    description: "愛知県の製造業企業向けに開発した生産管理ダッシュボード。リアルタイムでの生産状況監視、品質管理、在庫管理機能を統合。データ可視化により効率的な意思決定をサポートします。",
    image: "/placeholder.svg?height=400&width=600&text=製造業ダッシュボード",
    categories: ["システム開発", "ダッシュボード"],
    featured: false,
    year: "2023",
    tags: ["Vue.js", "Python", "PostgreSQL", "データ可視化"],
    location: "愛知県",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "fallback-4",
    slug: "tourism-website",
    title: "碧南市観光情報サイト",
    description: "碧南市の観光スポット、イベント情報、グルメ情報を紹介する公式観光サイト。多言語対応により国際観光客にも対応。インタラクティブマップと写真ギャラリーで魅力を伝えます。",
    image: "/placeholder.svg?height=400&width=600&text=碧南市観光サイト",
    categories: ["Web開発", "観光サイト"],
    featured: false,
    year: "2023",
    tags: ["Next.js", "多言語対応", "CMS", "SEO最適化"],
    location: "愛知県碧南市",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "fallback-5",
    slug: "ecommerce-platform",
    title: "地域特産品ECプラットフォーム",
    description: "愛知県の地域特産品を全国に販売するECサイト。農家や職人と直接つながる仕組みを構築。決済システム、在庫管理、配送管理を統合したフルスタックソリューション。",
    image: "/placeholder.svg?height=400&width=600&text=特産品ECサイト",
    categories: ["EC開発", "プラットフォーム"],
    featured: true,
    year: "2023",
    tags: ["Shopify", "React", "Stripe", "在庫管理"],
    location: "愛知県",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "fallback-6",
    slug: "educational-app",
    title: "子ども向け学習アプリ",
    description: "地域の小学校と連携した教育支援アプリ。ゲーミフィケーション要素を取り入れた学習コンテンツで、子どもたちの学習意欲を向上。保護者向けの進捗確認機能も搭載。",
    image: "/placeholder.svg?height=400&width=600&text=学習アプリ",
    categories: ["アプリ開発", "教育"],
    featured: false,
    year: "2024",
    tags: ["Flutter", "Firebase", "ゲーミフィケーション", "教育"],
    location: "愛知県碧南市",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
]

export async function GET() {
  try {
    console.log("API Route: Fetching projects...")
    
    // microCMSからプロジェクトを取得を試行
    const microCMSProjects = await getProjects()
    
    if (microCMSProjects && microCMSProjects.length > 0) {
      console.log(`API Route: Retrieved ${microCMSProjects.length} projects from microCMS`)
      
      // microCMSのデータを統一形式に変換
      const formattedProjects = microCMSProjects.map((project: any) => ({
        id: project.id,
        slug: project.slug || project.id,
        title: project.title || "",
        description: project.description || "",
        image: project.image?.url || project.image || "/placeholder.svg?height=400&width=600",
        categories: Array.isArray(project.categories) ? project.categories : [],
        featured: project.featured || false,
        year: project.year || new Date(project.createdAt || Date.now()).getFullYear().toString(),
        tags: Array.isArray(project.tags) ? project.tags : [],
        location: project.location || "",
        createdAt: project.createdAt || new Date().toISOString(),
        updatedAt: project.updatedAt || new Date().toISOString(),
      }))
      
      return NextResponse.json(formattedProjects, {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          "X-Data-Source": "microcms",
        },
      })
    }
    
    // microCMSが利用できない場合はフォールバックデータを使用
    console.log('API Route: Using fallback project data')
    return NextResponse.json(fallbackProjects, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        "X-Data-Source": "fallback",
      },
    })
    
  } catch (error) {
    console.error('API Route Error:', error)
    
    // エラーが発生した場合もフォールバックデータを返す
    console.log('API Route: Error occurred, using fallback data')
    return NextResponse.json(fallbackProjects, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        "X-Data-Source": "fallback-error",
        "X-Error-Message": error instanceof Error ? error.message : "Unknown error",
      },
    })
  }
}
