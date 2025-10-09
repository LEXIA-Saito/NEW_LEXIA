import { BlogPost } from "./blog-posts.types"

import { BlogPost } from "./blog-posts.types"

export const fallbackBlogPosts: BlogPost[] = [
  {
    slug: "infisical-introduction",
    title: "Infisical: オープンソースのシークレット管理プラットフォーム",
    description: "GitHubでトレンドになっているInfisicalは、開発チームとインフラストラクチャ全体でシークレットを同期し、シークレットの漏洩を防ぐためのオープンソースプラットフォームです。この記事では、Infisicalの主な機能と始め方について解説します。",
    genre: "tech",
    tags: ["Infisical", "セキュリティ", "オープンソース"],
    date: "2025-10-09",
    readingTime: "5分", // Placeholder, will be recalculated
    sections: [
      {
        heading: "はじめに",
        body: [
          "開発プロセスにおいて、APIキーやデータベースの認証情報などの「シークレット」の管理は、セキュリティを確保する上で非常に重要です。これらの情報を安全に、かつ効率的にチームやインフラ間で共有するためのツールとして、オープンソースのシークレット管理プラットフォーム「Infisical」が注目を集めています。",
          "Infisicalは、GitHubのトレンドリポジトリにも登場するほど人気があり、開発者体験全体を再設計することで、セキュリティツールを誰もが利用しやすいものにすることを目指しています。"
        ]
      },
      {
        heading: "Infisicalの主な機能",
        body: [
          "Infisicalは、シークレット管理を容易にするための多くの機能を提供しています。"
        ],
        list: [
          "ダッシュボードによる一元管理: 使いやすいダッシュボードで、プロジェクトや環境ごとにシークレットを一元管理できます。",
          "ネイティブ統合: GitHub ActionsやVercel、AWSなどのプラットフォームとネイティブに統合できます。",
          "バージョン管理とポイントインタイムリカバリ: シークレットの変更履歴を記録し、必要に応じて復元できます。",
          "シークレットローテーションと動的シークレット: 定期的なローテーションや一時的なシークレットの生成が可能です。",
          "シークレットのスキャンと漏洩防止: Gitリポジトリへのシークレットのコミットを防ぎます。"
        ]
      },
      {
        heading: "始め方",
        body: [
          "Infisicalを始めるには、いくつかの方法があります。"
        ],
        list: [
          "Infisical Cloud: 最も手軽な方法で、無料で利用を開始できます。",
          "セルフホスティング: 自身のインフラで運用することも可能です。Dockerを使って簡単にセットアップできます。"
        ]
      },
      {
        heading: "まとめ",
        body: [
          "Infisicalは、開発者にとって非常に強力なシークレット管理プラットフォームです。オープンソースであるため、誰でも利用でき、コミュニティによる活発な開発も行われています。シークレット管理に課題を感じている方は、ぜひ一度試してみてはいかがでしょうか。"
        ]
      }
    ]
  },
  {
    slug: "studio-ai-status-2025",
    title: "STUDIOアップデート総点検：あの「STUDIO AI」は今どこに？",
    description:
      "Studio（旧STUDIO）のプロダクト刷新とAI機能の現在地を一次情報から整理します。",
    genre: "tech",
    tags: ["Studio", "ノーコード", "AI"],
    date: "2025-10-08",
    readingTime: "6分",
    heroImage:
      "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/studio-ai-status-2025/STUDIO%20AI%E5%85%AC%E5%BC%8F%E7%99%BA%E8%A1%A8%E7%94%BB%E5%83%8F.webp",
    sections: [
      {
        body: [
          "Studio（旧STUDIO）の最新アップデートを追跡し、長らく動向が気になっていた「STUDIO AI」がどこに位置付けられているのかを確認しました。",
          "2025年10月時点で公開されている一次情報に絞り、プロダクトの刷新状況と利用可能なAI機能を整理します。",
        ],
      },
      {
        heading: "いまの「Studio」で起きていること",
        body: [
          "公式の更新履歴では2025年秋にEditor 5.0 Betaが公開され、CMSリストのAND条件フィルタ対応など月次の改善が続いています。",
          "2024年10月にはブランド名をSTUDIOからStudioへ正式に刷新し、料金体系とビジュアルIDのアップデートが発表されています。",
        ],
        list: [
          "Editor 5.0 Betaのロールアウト（2025年秋）",
          "CMSリストのAND条件フィルタなど継続的な改善",
          "ブランド名・料金・ビジュアルIDのリニューアル（2024年10月）",
        ],
        image:
          "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/studio-ai-status-2025/Editor%205.0%20Beta%20Web%E3%82%A8%E3%83%86%E3%82%99%E3%82%A3%E3%82%BF%E3%83%BC%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9.webp",
      },
      {
        heading: "“STUDIO AI”の足跡",
        body: [
          "2023年3月の公式記事では「STUDIO AI」のアーリーアクセス募集が行われ、自然言語によるアニメーション設定や自動レスポンシブ生成など4つの予定機能が紹介されました。",
          "2025年9月に発表されたEditor 5.0 Betaの記事では、将来的に「Studio AI」と連携していくことが明記され、構想が継続していることが示唆されています。",
        ],
        list: [
          "2023年3月：アーリーアクセス募集と4機能の予告",
          "2025年9月：Editor 5.0 Beta記事で将来的な連携を言及",
          "一般提供の正式リリース告知は未確認",
        ],
        image:
          "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/studio-ai-status-2025/STUDIO%20AI%E5%85%AC%E5%BC%8F%E7%99%BA%E8%A1%A8%E7%94%BB%E5%83%8F.webp",
      },
      {
        heading: "現在使えるAI機能：SEO Writing Assist",
        body: [
          "現時点で誰でも利用できるAI機能として、テキストコンテンツを解析しmetaタイトルとディスクリプションを提案・生成する「SEO Writing Assist」が正式に案内されています。",
          "デザイン自動生成ではなくSEO支援に特化したツールで、ヘルプセンターでは手順や活用方法が詳細に解説されています。",
        ],
        image:
          "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/studio-ai-status-2025/SEO%20Writing%20Assist%20%E3%81%AE%E8%A8%AD%E5%AE%9A%E7%94%BB%E9%9D%A2.webp",
      },
      {
        heading: "タイムライン早見表",
        list: [
          "2023/03：STUDIO AIのEA募集を公式発表（4機能を予定）",
          "2024/10：STUDIOからStudioへリブランディング（社名・ロゴ・料金刷新）",
          "2025/01：SEO Writing Assistを新機能として案内",
          "2025/09：Editor 5.0 Beta公開。将来的にStudio AIと連携と記載",
        ],
      },
      {
        heading: "結論",
        body: [
          "「STUDIO AI」は公式に発表された構想として存続しており、Editor 5.0の基盤を通じて今後の連携が示されていますが、一般提供の確定情報はまだ確認できません。",
          "現状で触れられるAI機能はSEO Writing Assistのみで、ページのmeta生成に特化した実用的な支援ツールとして提供されています。",
        ],
      },
      {
        heading: "一次公式ソース一覧",
        list: [
          "Studio “What’s New / Updates”ページ",
          "https://studio.design/updates",
          "“Studio Design Refresh / ブランディング刷新”記事",
          "https://studio.design/updates/thenewstudio",
          "SEO Writing AssistのAI meta生成ヘルプ",
          "https://help.studio.design/en/articles/10472120-automatically-generate-titles-and-descriptions-with-ai",
          "Studio Help（ヘルプセンター）トップ",
          "https://help.studio.design/en/",
          "バージョン管理機能のヘルプ記事",
          "https://help.studio.design/en/articles/7793727-manage-site-versions",
        ],
      },
    ],
  },
  {
    slug: "what-is-onlook",
    title: "Onlookとは？ReactとTailwindを直感的に操る“デザイナー向けCursor”の全貌",
    description:
      "コードとデザインの境界を溶かす次世代ビジュアルエディタ「Onlook」の特徴、アーキテクチャ、利点と課題をLEXIA視点で解説します。",
    genre: "tech",
    tags: ["Onlook", "React", "Tailwind"],
    date: "2025-10-06",
    readingTime: "8分",
    heroImage:
      "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/onlook-article-images/onlook-hero-cursor-for-designers.avif",
    sections: [
      {
        body: [
          "Cursorがエンジニアの作業を変えたように、Onlookはデザイナーの手に“コードの自由”を与えます。ReactとTailwindのプロジェクトを“見た目で編集→即コード反映”できる点で注目を集めており、Y Combinator参加やオープンソースという背景も相まって急速に話題になっています。",
          "FramerやFigmaと似たUI面の編集体験を持ちながら、Onlookが異なるのは“リアルな開発コード”をそのまま扱う点です。デザイン上の操作が直接JSX/TSXに反映されるため、プロダクションコードとデザインの乖離を大幅に減らせます。",
        ],
        image:
          "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/onlook-article-images/onlook-desktop-app-main-interface.webp",
      },
      {
        heading: "Onlookの基本コンセプト",
        body: [
          "Onlookはしばしば“Cursor for Designers”と表現されます。Figmaのような直感的なUI編集体験とReactの実装を直結させる思想があり、デザインとコードが双方向に同期する点が最大の革新です。",
          "公式ドキュメントでは、コンポーネント編集・スタイル編集・プロジェクト読み込みのワークフローを重視しており、既存のNext.js＋Tailwindプロジェクトをそのまま取り込んで作業を開始できる点が強みとして挙げられています。",
        ],
        image:
          "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/onlook-article-images/onlook-figma-like-visual-editor.avif",
      },
      {
        heading: "主要機能①：Figmaライクなビジュアルエディタ",
        body: [
          "OnlookのWeb版エディタでは要素をドラッグ＆ドロップで配置し、色・余白・フォントなどを直感的に編集できます。編集結果は即座にJSX/TSXに反映され、コードを意識せずに見た目を調整できます。",
          "また既存のNext.js + Tailwindプロジェクトを読み込んで、その上で編集できるため、デザインから実装への移行コストが小さく済みます。",
        ],
        image:
          "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/onlook-article-images/onlook-realtime-editing-demo.gif",
      },
      {
        heading: "主要機能②：AIによる自然言語デザイン",
        body: [
          "Onlookは自然言語での指示を受け付け、Tailwindクラスやテーマ設定を理解した差分提案を生成します。例えば「このカードをシャドウ付きにして」や「フォームを2カラムにして」といった指示で、AIが適切なTailwindユーティリティやスタイルを当ててくれます。",
          "生成された結果はその場で微調整でき、デザイナーが短時間でプロダクション品質に近いUIを構築する助けになります。",
        ],
        image:
          "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/onlook-article-images/onlook-what-can-you-do-prompt.png",
      },
      {
        heading: "主要機能③：Figmaインポートとデザインシステム管理",
        body: [
          "Figmaファイルの取り込みを通じて、コンポーネントごとにReact実装へと再構築できます。デザイントークン（色・フォント・スペーシング等）を一元管理し、デザインシステムを運用するための仕組みも用意されています。",
          "これにより、デザインから実装までのブリッジがスムーズになり、チームの整合性が高まります。",
        ],
        image:
          "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/onlook-article-images/onlook-project-creation-workflow.webp",
      },
      {
        heading: "アーキテクチャと技術構成",
        body: [
          "Onlookはオープンソース（Apache 2.0）で公開されており、モノレポ構成（apps / packages / tooling / plugins）で管理されています。技術スタックにはReact、Next.js、TailwindCSS、Supabase、Drizzle、Bunなどが含まれます。",
          "デスクトップ向けにはElectronベースのアプリも存在しますが、現在はWeb版が主に開発・利用されています。",
        ],
      },
      {
        heading: "現行プラン・料金体系",
        body: [
          "OnlookはFree（無料）プランのほか、Pro（$25/月）やEnterpriseプランを提供しています。無料プランにはプロジェクト数やAIの利用回数に制限があり、Proではそれらの上限が緩和されます。",
          "注意点として、コミュニティの情報には旧来の価格や回数制限が混在しているため、公式のPricingページで最新情報を確認してください。",
        ],
        image:
          "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/onlook-article-images/onlook-pricing-plans.jpg",
      },
      {
        heading: "実際の使い心地と課題",
        body: [
          "β段階のプロダクトであるため、動作の不安定さやAIの応答精度の問題が報告されています。しかしながら、デザイナーが直接コードに触れられる体験としては非常に革新的です。",
          "FramerやV0、Cursorと比較すると、Onlookは“実際の開発コードをそのまま扱える”点で差別化されており、特にTailwind×Next.jsに慣れた開発者には恩恵が大きいでしょう。",
        ],
      },
      {
        heading: "LEXIA視点で見るOnlookの可能性",
        body: [
          "LEXIAのようにデザインと実装を一気通貫で行う制作体制にはOnlookが非常にマッチしています。コード直結ゆえの柔軟性は、デザインと実装が分断されがちな現場のボトルネックを解消できます。",
          "将来的には、AIを活用したデザイン提案と人による微調整を組み合わせたハイブリッド制作ワークフローの一部としてOnlookを組み込むことが可能です。",
        ],
      },
      {
        heading: "まとめ：デザイナーが“コードを書く”時代の幕開け",
        body: [
          "Onlookはノーコードでもローコードでもない、“デザイン実装融合ツール”としての位置付けを目指しています。デザイナーがReactを直感的に扱うためのツールとして、今後の制作ワークフローに大きな影響を与える可能性があります。",
          "公式ドキュメントやHacker Newsのコミュニティ議論を合わせて参照することで、Onlookの最新動向を追いかけることをおすすめします。",
        ],
      },
      {
        heading: "参考リンク",
        list: [
          "公式サイト / プロダクト紹介ページ",
          "https://onlook.com",
          "https://onlook.com/features",
          "https://onlook.com/features/ai-for-frontend",
          "https://onlook.com/pricing",
          "",
          "公式ドキュメント（Docs）",
          "https://docs.onlook.com",
          "https://docs.onlook.com/getting-started/core-features",
          "",
          "GitHubリポジトリ",
          "https://github.com/onlook-dev/onlook",
          "https://github.com/onlook-dev/onlook/discussions",
          "https://github.com/onlook-dev/onlook/wiki",
          "https://github.com/onlook-dev/desktop",
          "",
          "開発・技術関連情報",
          "https://news.ycombinator.com/item?id=44127653",
          "https://www.ycombinator.com/companies/onlook",
          "",
          "LEXIA技術スタックとの関連（補足参照用）",
          "https://nextjs.org/",
          "https://tailwindcss.com/",
          "https://supabase.com/",
        ],
      },
    ],
  },
  {
    slug: "stremio-web-overview",
    title: "Stremio / stremio-web とは？技術的価値と合法性・リスクを徹底解説 — 将来性も含めて",
    description:
      "動画体験の統合を実現するStremioとstremio-webの技術的構造、合法性、安全対策、そして将来性を包括的に解説します。",
    genre: "tech",
    tags: ["Stremio", "stremio-web", "ストリーミング", "オープンソース", "セキュリティ"],
    date: "2025-10-08",
    readingTime: "約10分",
    sections: [
      {
        heading: "はじめに：動画体験の分散を統合したいニーズ",
        body: [
          "YouTube、Netflix、Amazon Prime、Disney+…現代では動画配信サービスが乱立し、「どこで観られるのか」を探すだけでも一苦労です。",
          "そんな中、複数サービスをひとつにまとめて視聴できたらという発想から生まれたのが Stremio（ストレミオ） です。特にそのWeb版インターフェースを担う stremio-web は、動画視聴体験を統合する次世代のUIとして注目を集めています。",
        ],
      },
      {
        heading: "Stremio / stremio-web の基本構造と役割",
        body: [
          "Stremioは、映画やドラマなどのメタデータ（作品情報・配信先リンクなど）を収集し、「どのサービスで視聴できるのか」を一覧化するコンテンツ・アグリゲータ（統合プラットフォーム）です。",
          "💡 Wikipediaでは \"semi–open-source content aggregator\" と紹介されており、部分的にオープンソースとして開発が進められています。",
          "一方で、stremio-web はStremioのフロントエンド（Web UI）を構成するリポジトリです。作品リスト表示、検索、詳細画面、アドオンとの通信など、ユーザーが実際に操作する部分を担当しています。",
          "Stremio自体は動画データをホストせず、あくまで「情報をまとめる・ストリーム元へ橋渡しする」仕組みを提供しています。この中立的な設計が、合法的な利用を可能にしています。",
        ],
      },
      {
        heading: "できること・実際の機能",
        table: {
          headers: ["機能", "説明", "利用者にとっての価値"],
          rows: [
            [
              "複数ソース統合",
              "YouTube、Twitch、公式VODサービス、Add-on経由の独自ソースを統合",
              "配信先を探す時間を削減",
            ],
            [
              "作品検索とレコメンド",
              "タイトル検索・関連作品表示",
              "見逃し防止・新作発見",
            ],
            [
              "視聴履歴／ライブラリ管理",
              "観た作品・お気に入りの登録・再開",
              "デバイスをまたいでも管理できる",
            ],
            [
              "ブラウザアクセス対応",
              "Web上で直接再生可能（インストール不要）",
              "利便性・軽快な操作",
            ],
            [
              "拡張Add-on対応",
              "外部開発者が新ソースを追加可能",
              "柔軟な拡張性・コミュニティ貢献",
            ],
            [
              "字幕・メタデータ取得",
              "作品情報・字幕ファイルの取得",
              "視聴体験の向上",
            ],
          ],
        },
      },
      {
        heading: "技術的価値と恩恵：開発者・社会にとっての可能性",
        body: [
          "【開発者にとっての意義】",
          "・構造設計の学習素材 - stremio-webはUI層とバックエンド（データ処理・Add-on連携）を明確に分離しており、モジュール設計の良い教材になります。",
          "・拡張性の高いアーキテクチャ - Add-onによるプラグイン形式の拡張は、新しい配信サービスやAPI統合を容易にし、スケールしやすい構造です。",
          "・ハイブリッド設計の参考 - Web UIとネイティブアプリを組み合わせた構成は、モバイル・PC間のUI統一にも応用可能です。",
          "・セキュリティ設計の意識向上 - 後述の字幕脆弱性問題「Hacked in Translation」など、現代のストリーミング開発に欠かせない安全設計の重要性を示しています。",
        ],
        list: [
          "動画プラットフォームの統合体験を提供し、視聴効率を改善",
          "合法なコンテンツ連携を進めることで、正規ストリーミング利用の普及を促進",
          "ブラウザ対応による誰でも使いやすいUXの提供",
          "各国・地域の配信サービスをアドオンで追加する柔軟性により、ローカル文化にも対応可能",
        ],
      },
      {
        heading: "合法性・リスク：使う上での注意点と安全対策",
        body: [
          "【1. 合法性のポイント】",
          "Stremio自体は合法ですが、利用するアドオンが配信元の著作権を侵害する可能性があるため注意が必要です。アドオンによっては非公式なコンテンツを扱う場合もあるため、信頼できるソースの利用が推奨されます。",
          "",
          "【2. Stremioの免責構造】",
          "Stremio公式の利用規約では「提供するのはコンテンツのメタデータ・リンク情報であり、ストリーム元の責任は負わない」と明記されています。このため、違法配信を扱うAdd-onを利用する場合はユーザーの自己責任となります。",
          "",
          "【3. 地域ごとの法規制】",
          "著作権法は国によって異なります。たとえば、海外では視聴が認められる作品でも、日本国内では違法となるケースもあります。",
          "",
          "【4. 推奨される安全な使い方】",
        ],
        list: [
          "公式Add-onのみ使用",
          "信頼できる字幕ソースのみ利用",
          "ソフトウェアを常に最新に保つ",
          "VPN利用でプライバシーを保護する",
        ],
      },
      {
        heading: "セキュリティ視点：「Hacked in Translation」脆弱性とは",
        body: [
          "2024年に公開された研究論文 \"Hacked in Translation — From Subtitles to Complete Takeover\" により、悪意ある字幕ファイルを読み込むことでメディアプレイヤーが乗っ取られる脆弱性が報告されました。StremioやVLCなど複数のプレイヤーが対象とされ、字幕取得プロセスのセキュリティ強化が求められています。",
          "",
          "この問題を防ぐには以下の対策が有効です：",
        ],
        list: [
          "信頼できる字幕リポジトリを利用する",
          "外部字幕の自動取得を無効化する",
          "定期的なソフトウェアアップデートを行う",
          "研究元： https://arxiv.org/abs/2408.00502 (arXiv.org \"Hacked in Translation\")",
        ],
      },
      {
        heading: "将来性・展望：Stremioが描く次のフェーズ",
        list: [
          "公式Add-onの拡充 - 正規配信サービス（Netflix, Disney+, Huluなど）との連携が進めば、合法的統合プラットフォームとしての地位が高まる。",
          "AIレコメンド機能の強化 - 視聴履歴を活用したAIによる自動おすすめ機能が実装されれば、ユーザーエクスペリエンスがさらに向上する。",
          "セキュリティ・ガバナンスの進化 - 字幕攻撃や不正Add-on対策を継続し、安全性を高めたエコシステムの確立が期待される。",
          "地域連携・ローカル化対応 - 各国独自の配信文化に合わせたAdd-on展開で、グローバルかつローカルな両軸の発展が見込まれる。",
        ],
      },
      {
        heading: "まとめ：Stremio / stremio-web をどう扱うか",
        body: [
          "Stremio / stremio-web は、「動画視聴をもっとシンプルに、もっと自由に」するための新しいメディア統合基盤です。",
          "",
          "ただし、その自由さゆえに利用の仕方を誤ると違法視聴やセキュリティリスクを招く恐れもあります。記事として扱う際、また利用する際は以下の点を守ることが重要です。",
        ],
        list: [
          "Stremio自体は合法であるが、Add-on利用には注意が必要",
          "違法コンテンツを推奨・誘導しない",
          "安全性（字幕・VPN・更新）を確保して利用する",
          "正規Add-on・オープンソース文化を尊重する",
        ],
      },
      {
        heading: "",
        body: [
          "Stremio / stremio-web は、「合法的で安全なメディア統合の未来」を示すオープンソースの好例です。開発者にとっても、ユーザーにとっても、\"次世代の動画体験\" の可能性を探る学びのプラットフォームと言えるでしょう。",
        ],
      },
      {
        heading: "参考リンク",
        list: [
          "Stremio 公式サイト",
          "https://www.stremio.com/",
          "",
          "Stremio / stremio-web GitHub リポジトリ",
          "https://github.com/Stremio/stremio-web",
          "",
          "Stremio Wikipedia 記事",
          "https://en.wikipedia.org/wiki/Stremio",
          "",
          "arXiv: Hacked in Translation (2024)",
          "https://arxiv.org/abs/2408.00502",
          "",
          "Stremio 利用規約",
          "https://www.stremio.com/tos",
        ],
      },
    ],
  },
  
]
