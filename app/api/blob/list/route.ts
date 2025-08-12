import { list } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const { blobs } = await list()

    const files = blobs.map((blob) => ({
      url: blob.url,
      pathname: blob.pathname,
      size: blob.size,
      uploadedAt: blob.uploadedAt,
      filename: blob.pathname.split("/").pop() || "unknown",
    }))

    return NextResponse.json({ files, total: files.length })
  } catch (error) {
    console.error("Error listing blob files:", error)
    return NextResponse.json({ error: "Failed to list files" }, { status: 500 })
  }
}
