import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    name: "LEXIA",
    representative: "齋藤",
    address: "愛知県碧南市川端町1-45",
    email: "lexia0web@gmail.com",
    phone: "+81-0000-000-000",
    services: [
      { name: "Web制作", description: "Next.jsを活用したWebサイト制作" },
      { name: "システム開発", description: "業務効率化のWebシステム開発" },
      { name: "デザイン制作", description: "ロゴや印刷物などのデザイン" },
      { name: "PC教室", description: "初心者向けパソコンレッスン" },
      { name: "動画制作", description: "企画から編集までワンストップ対応" },
    ],
  })
}
