import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json([
    { name: "Web制作", url: "/services/web" },
    { name: "システム開発", url: "/services/system" },
    { name: "デザイン制作", url: "/services/design" },
    { name: "PC教室", url: "/services/pc" },
    { name: "動画制作", url: "/services/movie" },
  ])
}
