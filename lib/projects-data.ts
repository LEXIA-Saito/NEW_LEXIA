export interface Project {
  id: string
  slug: string
  title: string
  description: string
  image: string
  // Added images array for slideshow support
  images?: string[]
  categories: string[]
  featured: boolean
  year?: string
  tags: string[]
  location: string
  client?: string
  industry?: string
  services?: string[]
  challenges?: string[]
  solutions?: {
    design: string[]
    tech: string[]
    growth: string[]
  }
  kpi?: {
    metric: string
    value: string
    improvement: string
    icon?: string
  }[]
  testimonial?: {
    text: string
    author: string
    rating: number
  }
  techStack?: string[]
  url?: string
  isComingSoon?: boolean
}

export const projectsData: Project[] = [
  {
    id: "1",
    slug: "jalife-aichi",
    title: "株式会社JA.life様 物件検索サイト",
    description:
      "愛知県の地域密着型不動産会社の物件検索サイト。高速なモバイル表示と直感的な検索機能で、理想の物件探しをサポート。",
    image: "/images/projects/ja-life/ja-life-hero.jpg",
    // Added slideshow images for JA.life - hero image displayed first
    images: [
      "/images/projects/ja-life/ja-life-hero.jpg",
      "/images/projects/ja-life/ja-life-project.jpg",
      "/images/projects/ja-life/ja-life-property.jpg",
      "/images/projects/ja-life/ja-life-news.jpg",
    ],
    categories: ["system", "website"],
    featured: true,
    year: "2024",
    tags: ["物件検索", "高速検索", "モバイル最適化", "地図連動"],
    location: "愛知県",
    client: "株式会社JA.life様",
    url: "https://jalife-aichi.com",
    industry: "不動産",
    services: ["物件検索システム", "管理画面開発", "API開発"],
    challenges: ["大量の物件データの高速検索", "モバイルでの使いやすさ", "リアルタイム在庫管理"],
    solutions: {
      design: ["直感的な検索UI", "地図連動表示", "お気に入り機能"],
      tech: ["Elasticsearch導入", "PWA対応", "リアルタイム同期"],
      growth: ["SEO対策", "物件アラート機能", "SNSシェア機能"],
    },
    kpi: [
      { metric: "検索速度", value: "0.3秒", improvement: "検索レスポンス向上", icon: "⚡" },
      { metric: "モバイル利用", value: "+180%", improvement: "スマホ利用者増加", icon: "📱" },
      { metric: "成約率", value: "+45%", improvement: "物件成約率向上", icon: "🏠" },
    ],
    testimonial: {
      text: "検索機能が格段に向上し、お客様から「使いやすい」との声を多数いただいています。成約率も大幅に改善しました。",
      author: "JA.life 営業マネージャー",
      rating: 5,
    },
    techStack: ["Vue.js", "Laravel", "MySQL", "Elasticsearch", "Redis"],
  },
  {
    id: "2",
    slug: "minoken",
    title: "みの建築様 コーポレートサイト",
    description:
      "伝統的な手刻み技術を持つ建築会社のコーポレートサイト。職人の技術力と現代的なデザインを融合し、理想の住まいづくりを提案。",
    image: "/images/projects/minoken/minoken-hero.jpg",
    // Added slideshow images for Minoken - hero image displayed first
    images: [
      "/images/projects/minoken/minoken-hero.jpg",
      "/images/projects/minoken/minoken-gallery.jpg",
      "/images/projects/minoken/minoken-craftsmanship.jpg",
      "/images/projects/minoken/minoken-interior.jpg",
    ],
    categories: ["website"],
    featured: true,
    year: "2025",
    tags: ["企業サイト", "伝統×モダン", "職人技術", "施工事例"],
    location: "愛知県",
    client: "みの建築様",
    industry: "建築・リフォーム",
    services: ["コーポレートサイト制作", "写真撮影", "動画制作"],
    challenges: ["伝統技術の価値を分かりやすく伝える", "職人技術の可視化", "若い世代への訴求力向上"],
    solutions: {
      design: ["施工過程を見せるギャラリー", "職人の手仕事を伝える写真", "温かみのあるビジュアル表現"],
      tech: ["高速表示の実現", "モバイル最適化", "問い合わせフォーム改善"],
      growth: ["施工事例の充実", "お客様の声の掲載", "SEO対策"],
    },
    kpi: [
      { metric: "問い合わせ", value: "+250%", improvement: "設計相談増加", icon: "🏗️" },
      { metric: "滞在時間", value: "+400%", improvement: "サイト滞在時間延長", icon: "⏰" },
      { metric: "新規顧客", value: "+180%", improvement: "若い世代からの相談増", icon: "👥" },
    ],
    testimonial: {
      text: "私たちの技術と想いを的確に表現していただき、お客様からの信頼度が格段に向上しました。手刻みの価値を多くの方に伝えることができています。",
      author: "みの建築 代表",
      rating: 5,
    },
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS", "Vercel"],
  },
  {
    id: "3",
    slug: "nakamura-kenko",
    title: "中村健康院様 コーポレートサイト・予約システム",
    description:
      "地域密着型整体院のコーポレートサイト。高齢者にも使いやすい大きな文字とボタンのUI/UX設計。Coubic連携で24時間オンライン予約を実現。",
    image: "/images/projects/nakamura-kenko/nakamura-top.jpg",
    // Added slideshow images for Nakamura Kenko - top page image displayed first
    images: [
      "/images/projects/nakamura-kenko/nakamura-top.jpg",
      "/images/projects/nakamura-kenko/nakamura-hero.jpg",
      "/images/projects/nakamura-kenko/nakamura-menu.jpg",
      "/images/projects/nakamura-kenko/nakamura-detail.jpg",
    ],
    categories: ["website", "system"],
    featured: true,
    year: "2022",
    tags: ["高齢者対応UI", "予約システム", "大きな文字", "Coubic連携"],
    location: "愛知県",
    client: "中村健康院様",
    industry: "整体・治療院",
    services: ["コーポレートサイト制作", "予約システム導入", "シニア向けUI設計"],
    challenges: ["高齢者にも使いやすいUI設計", "電話予約のみによる機会損失", "予約管理の効率化"],
    solutions: {
      design: ["大きな文字とボタンで視認性向上", "シンプルで分かりやすいナビゲーション", "落ち着いた配色で安心感を演出"],
      tech: ["Coubic予約システム連携", "レスポンシブ対応", "アクセシビリティ最適化"],
      growth: ["24時間予約受付体制", "Google マイビジネス最適化", "リピーター向け機能"],
    },
    kpi: [
      { metric: "予約数", value: "+300%", improvement: "月間予約数向上", icon: "📅" },
      { metric: "高齢者利用率", value: "+65%", improvement: "60歳以上の利用者増加", icon: "👴" },
      { metric: "リピート率", value: "+25%", improvement: "顧客リピート率向上", icon: "🔄" },
    ],
    testimonial: {
      text: "高齢の患者様から「予約が簡単になった」と大変好評です。大きな文字とボタンで、スマートフォンでも迷わず予約できるようになりました。",
      author: "中村健康院 院長",
      rating: 5,
    },
    techStack: ["WordPress", "Coubic API", "PHP", "MySQL", "jQuery"],
  },
  {
    id: "4",
    slug: "asaoka-pack",
    title: "有限会社朝岡パック様 公式ウェブサイト",
    description:
      "愛知県西尾市の食品包装会社のコーポレートサイト。清潔感のある女性目線のデザインで、包装を通した価値提供を表現。",
    image: "/images/projects/ap_hero.jpg",
    // Added slideshow images for Asaoka Pack
    images: [
      "/images/projects/ap_hero.jpg",
      "/images/projects/ap_setubi.jpg",
      "/images/projects/ap_ceo.jpg",
      "/images/projects/ap_jigyounaiyou.jpg",
    ],
    categories: ["website"],
    featured: true,
    year: "2024",
    tags: ["レスポンシブデザイン", "企業サイト", "清潔感デザイン", "SEO対策"],
    location: "愛知県西尾市",
    client: "有限会社朝岡パック様",
    industry: "食品包装",
    services: ["Webリニューアル", "ロゴデザイン", "ブランディング"],
    challenges: ["古いサイトデザインによる信頼性の低下", "モバイル対応不備による機会損失", "競合他社との差別化不足"],
    solutions: {
      design: ["清潔感を重視したミニマルデザイン", "女性目線の親しみやすいUI", "食品安全をイメージした配色"],
      tech: ["Next.js による高速表示", "レスポンシブ対応", "SEO最適化"],
      growth: ["問い合わせフォーム改善", "事例紹介の充実", "信頼性向上施策"],
    },
    kpi: [
      { metric: "PV増加", value: "+150%", improvement: "月間ページビュー向上", icon: "📈" },
      { metric: "離脱率", value: "-40%", improvement: "ユーザー体験改善", icon: "⬇️" },
      { metric: "問い合わせ", value: "+60件/月", improvement: "コンバージョン向上", icon: "📞" },
    ],
    testimonial: {
      text: "LEXIAさんのおかげで、私たちの想いが形になりました。お客様からの反応も格段に良くなり、売上も向上しています。",
      author: "朝岡パック 代表取締役",
      rating: 5,
    },
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Google Analytics"],
  },
  {
    id: "5",
    slug: "chubu-kaihatsu",
    title: "中部開発株式会社様 コーポレートサイト",
    description:
      "人材派遣と不動産の2事業を展開する企業のWebサイト。事業の多様性を分かりやすく表現し、求職者と顧客双方にアプローチ。",
    // Updated image to use hardcoded image
    image: "/images/projects/ck_hero.jpg",
    // Added slideshow images for Chubu Kaihatsu
    images: [
      "/images/projects/ck_hero.jpg",
      "/images/projects/ck_haken.jpg",
      "/images/projects/ck_cycle.jpg",
      "/images/projects/ck_form.jpg",
    ],
    categories: ["website"],
    featured: true,
    year: "2023",
    tags: ["企業サイト", "2事業統合", "求人機能", "物件検索"],
    location: "愛知県",
    client: "中部開発株式会社様",
    industry: "人材派遣・不動産",
    services: ["Web制作", "ロゴデザイン", "パンフレット制作"],
    challenges: ["2つの異なる事業の統一的な表現", "求職者と顧客の異なるニーズへの対応", "地域密着性のアピール不足"],
    solutions: {
      design: ["事業別セクションの明確な分離", "ターゲット別導線設計", "地域性を活かしたビジュアル"],
      tech: ["CMS導入による更新性向上", "求人情報の動的表示", "物件検索機能"],
      growth: ["SEO対策による集客向上", "SNS連携", "メルマガ配信システム"],
    },
    kpi: [
      { metric: "応募数", value: "+200%", improvement: "求人応募数向上", icon: "👥" },
      { metric: "滞在時間", value: "+85%", improvement: "サイト滞在時間延長", icon: "⏱️" },
      { metric: "資料請求", value: "+120%", improvement: "不動産資料請求増加", icon: "📋" },
    ],
    testimonial: {
      text: "2つの事業を分かりやすく表現していただき、それぞれのターゲットに効果的にアプローチできるようになりました。",
      author: "中部開発株式会社 営業部長",
      rating: 5,
    },
    techStack: ["React", "Node.js", "PostgreSQL", "AWS", "Stripe"],
  },


  {
    id: "6",
    slug: "namix",
    title: "Namix Lure Works様 パッケージデザイン",
    description:
      "ハンドメイドルアーブランドのパッケージデザイン。職人の技術と製品の魅力を表現し、釣り具店での差別化を実現。",
    image: "/placeholder.svg?height=400&width=600&text=Namix+Lure",
    categories: ["design"],
    featured: false,
    year: "2023",
    tags: ["パッケージデザイン", "ブランディング", "印刷物"],
    location: "愛知県",
    client: "Namix Lure Works様",
    industry: "釣具・ハンドメイド",
    services: ["パッケージデザイン", "ブランディング", "印刷物制作"],
    challenges: ["ハンドメイド商品の価値の可視化", "釣り具店での差別化", "ターゲット層への訴求力向上"],
    solutions: {
      design: ["職人技術を表現するビジュアル", "高級感のあるパッケージデザイン", "ブランドアイデンティティの統一"],
      tech: ["印刷適性を考慮したデザイン", "コスト効率の良い仕様設計"],
      growth: ["ブランド認知度向上", "店頭での視認性向上", "リピート購入促進"],
    },
    kpi: [
      { metric: "売上増加", value: "+180%", improvement: "パッケージリニューアル後", icon: "💰" },
      { metric: "ブランド認知", value: "+120%", improvement: "SNSでの言及数増加", icon: "📢" },
      { metric: "リピート率", value: "+60%", improvement: "顧客リピート率向上", icon: "🔄" },
    ],
    testimonial: {
      text: "パッケージが変わってから、お客様の反応が全然違います。「これ、プロが作ったルアーですね」と言われることが増えました。",
      author: "Namix Lure Works 代表",
      rating: 5,
    },
    techStack: ["Adobe Illustrator", "Adobe Photoshop", "印刷技術"],
  },
]
