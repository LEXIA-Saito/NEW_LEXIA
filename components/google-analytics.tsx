"use client"

import Script from "next/script"
import { useEffect, useState } from "react"

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-2L3TMWC2RQ"

export default function GoogleAnalytics() {
  const [consent, setConsent] = useState(false)

  useEffect(() => {
    const value = localStorage.getItem("lexia-ga-consent")
    if (value === "accepted") {
      setConsent(true)
    }
  }, [])

  if (!consent) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
