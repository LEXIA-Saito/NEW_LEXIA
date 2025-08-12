"use client"

import { useState } from "react"
import Image from "next/image"

export default function ImageDebugPage() {
  const [testResults, setTestResults] = useState<Record<string, boolean>>({})

  const imageUrls = [
    {
      name: "LEXIA Team (sandy_beach_lexia.webp)",
      url: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/lexia_visual/sandy_beach_lexia.webp",
      usedIn: ["components/sections/about.tsx"],
    },
    {
      name: "Saito Profile (saito_profile.webp)",
      url: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/saito_profile/saito_profile.webp",
      usedIn: ["app/team/masato-saito/page.tsx", "components/sections/team.tsx"],
    },
  ]

  const testImageUrl = async (url: string, name: string) => {
    try {
      const response = await fetch(url, { method: "HEAD" })
      const isAccessible = response.ok
      setTestResults((prev) => ({ ...prev, [name]: isAccessible }))
      return isAccessible
    } catch (error) {
      setTestResults((prev) => ({ ...prev, [name]: false }))
      return false
    }
  }

  const testAllImages = async () => {
    for (const image of imageUrls) {
      await testImageUrl(image.url, image.name)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Vercel Blob画像テスト</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">画像アクセステスト</h2>
          <button onClick={testAllImages} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6">
            すべての画像をテスト
          </button>

          <div className="space-y-4">
            {imageUrls.map((image) => (
              <div key={image.name} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{image.name}</h3>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      testResults[image.name] === true
                        ? "bg-green-100 text-green-800"
                        : testResults[image.name] === false
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {testResults[image.name] === true
                      ? "アクセス可能"
                      : testResults[image.name] === false
                        ? "アクセス不可"
                        : "未テスト"}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-2">使用箇所: {image.usedIn.join(", ")}</p>

                <p className="text-xs text-gray-500 mb-3 break-all">URL: {image.url}</p>

                <div className="border rounded p-2 bg-gray-50">
                  <p className="text-sm font-medium mb-2">画像プレビュー:</p>
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.name}
                    width={200}
                    height={150}
                    className="rounded"
                    onLoad={() => setTestResults((prev) => ({ ...prev, [image.name]: true }))}
                    onError={() => setTestResults((prev) => ({ ...prev, [image.name]: false }))}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">解決方法</h2>
          <div className="space-y-4 text-sm">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
              <h3 className="font-medium text-yellow-800 mb-2">画像がアクセス不可の場合:</h3>
              <ol className="list-decimal list-inside space-y-1 text-yellow-700">
                <li>
                  <code>/debug/blob</code>ページでBlob storageの内容を確認
                </li>
                <li>不足している画像を正しいファイル名でアップロード</li>
                <li>新しいURLでコードを更新</li>
              </ol>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded">
              <h3 className="font-medium text-blue-800 mb-2">環境変数の確認:</h3>
              <p className="text-blue-700">
                <code>BLOB_READ_WRITE_TOKEN</code>が本番環境で正しく設定されているか確認してください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
