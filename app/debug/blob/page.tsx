"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface BlobFile {
  url: string
  pathname: string
  size: number
  uploadedAt: string
  filename: string
}

export default function BlobDebugPage() {
  const [files, setFiles] = useState<BlobFile[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const fetchFiles = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/blob/list")
      const data = await response.json()
      setFiles(data.files || [])
    } catch (error) {
      console.error("Error fetching files:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/blob/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        await fetchFiles() // Refresh the list
        alert("File uploaded successfully!")
      } else {
        alert("Upload failed")
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Upload failed")
    } finally {
      setUploading(false)
    }
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  const requiredImages = [
    { name: "sandy_beach_lexia.webp", description: "LEXIA team discussing with clients" },
    { name: "saito_profile.webp", description: "齋藤雅人 profile image" },
  ]

  const foundImages = files.filter((file) =>
    requiredImages.some(
      (required) => file.filename.includes(required.name.replace(".webp", "")) || file.filename === required.name,
    ),
  )

  const missingImages = requiredImages.filter(
    (required) =>
      !files.some(
        (file) => file.filename.includes(required.name.replace(".webp", "")) || file.filename === required.name,
      ),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Vercel Blob Storage Debug</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Image Status Check</h2>

        {foundImages.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <h3 className="font-medium text-green-800 mb-2">✅ Found Images:</h3>
            {foundImages.map((file) => (
              <div key={file.url} className="mb-2">
                <div className="text-green-700 font-medium">{file.filename}</div>
                <div className="text-xs text-green-600 break-all">{file.url}</div>
                <img
                  src={file.url || "/placeholder.svg"}
                  alt={file.filename}
                  className="w-32 h-24 object-cover rounded mt-1"
                />
              </div>
            ))}
          </div>
        )}

        {missingImages.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <h3 className="font-medium text-red-800 mb-2">❌ Missing Images:</h3>
            {missingImages.map((image) => (
              <div key={image.name} className="text-red-700">
                • {image.name} - {image.description}
              </div>
            ))}
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 mb-2">Current Hardcoded URLs in Code:</h3>
          <div className="text-xs text-blue-700 space-y-1">
            <div>• https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/lexia_visual/sandy_beach_lexia.webp</div>
            <div>• https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/saito_profile/saito_profile.webp</div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload Missing Images</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <p className="text-yellow-800 text-sm">
            Upload the missing images here. Make sure to name them exactly as required:
            <strong> sandy_beach_lexia.webp</strong> and <strong>saito_profile.webp</strong>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {uploading && <span className="text-blue-600">Uploading...</span>}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold">All Files in Blob Storage ({files.length})</h2>
          <Button onClick={fetchFiles} disabled={loading}>
            {loading ? "Loading..." : "Refresh"}
          </Button>
        </div>

        {files.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">No files found in blob storage</p>
            <p className="text-sm text-gray-400 mt-2">This explains why images are not displaying in production</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {files.map((file) => (
              <div key={file.url} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium">{file.filename}</h3>
                    <p className="text-sm text-gray-500">
                      Size: {(file.size / 1024).toFixed(2)} KB | Uploaded:{" "}
                      {new Date(file.uploadedAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-400 break-all mt-1">{file.url}</p>
                  </div>
                  {(file.filename.includes("webp") ||
                    file.filename.includes("jpg") ||
                    file.filename.includes("png")) && (
                    <div className="ml-4">
                      <img
                        src={file.url || "/placeholder.svg"}
                        alt={file.filename}
                        className="w-20 h-20 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg"
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
