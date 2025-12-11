import Script from "next/script"
import { SITE_URL } from "@/lib/config"

interface FAQItem {
  question: string
  answer: string
}

interface ServiceSchemaProps {
  name: string
  description: string
  serviceType: string
  areaServed?: string
  url?: string
}

interface FAQSchemaProps {
  faqs: FAQItem[]
}

// Service Schema Component
export function ServiceSchema({ name, description, serviceType, areaServed = "愛知県", url }: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: "LEXIA",
      url: SITE_URL,
    },
    areaServed,
    serviceType,
    ...(url && { url }),
  }

  return (
    <Script
      id={`service-schema-${name.toLowerCase().replace(/\s+/g, "-")}`}
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// FAQ Schema Component
export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// How-To Schema for process pages
interface HowToStep {
  name: string
  text: string
  image?: string
}

interface HowToSchemaProps {
  name: string
  description: string
  steps: HowToStep[]
}

export function HowToSchema({ name, description, steps }: HowToSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  }

  return (
    <Script
      id="howto-schema"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Professional Service Schema (for consulting/agency services)
export function ProfessionalServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}#professionalservice`,
    name: "LEXIA",
    image: `${SITE_URL.replace(/\/$/, "")}/og/og-image.png`,
    url: SITE_URL,
    email: "lexia0web@gmail.com",
    description: "愛知県碧南市のホームページ制作・WEB制作会社。システム開発・AI活用・デザインまで一貫対応。",
    address: {
      "@type": "PostalAddress",
      streetAddress: "川端町1-45",
      addressLocality: "碧南市",
      addressRegion: "愛知県",
      postalCode: "447-0000",
      addressCountry: "JP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 34.8847,
      longitude: 136.9936,
    },
    priceRange: "¥¥",
    knowsAbout: [
      "Web制作",
      "ホームページ制作",
      "システム開発",
      "Next.js",
      "React",
      "動画制作",
      "グラフィックデザイン",
      "AI活用",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "LEXIAサービス一覧",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "WEB制作",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "コーポレートサイト制作" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "ランディングページ制作" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "ECサイト制作" } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "システム開発",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "予約システム開発" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "顧客管理システム開発" } },
          ],
        },
      ],
    },
  }

  return (
    <Script
      id="professional-service-schema"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
