"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("lexia-ga-consent")
    if (!consent) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem("lexia-ga-consent", "accepted")
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem("lexia-ga-consent", "declined")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[90%] max-w-xl -translate-x-1/2 rounded-md border bg-background p-4 shadow-lg md:flex md:items-center md:gap-4">
      <p className="text-sm flex-1">
        当サイトではGoogle Analyticsを利用してサイトの利用状況を収集します。よろしいですか？
      </p>
      <div className="mt-3 flex justify-end gap-2 md:mt-0">
        <Button size="sm" onClick={accept}>
          同意する
        </Button>
        <Button size="sm" variant="secondary" onClick={decline}>
          拒否する
        </Button>
      </div>
    </div>
  )
}
