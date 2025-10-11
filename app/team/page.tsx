// import Navigation from "@/components/navigation"
// import Footer from "@/components/footer"
// import Breadcrumbs from "@/components/breadcrumbs"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { allTeamMembers } from "@/lib/team-members"

export const metadata: Metadata = {
  title: "チーム | LEXIA",
  description: "LEXIAのメンバー紹介。代表・制作・サポートのプロフィールと担当領域をご覧いただけます。",
  alternates: {
    canonical: `${SITE_URL.replace(/\/$/, "")}/team`,
  },
  openGraph: {
    title: "チーム | LEXIA",
    description: "LEXIAのメンバー紹介。代表・制作・サポートのプロフィールと担当領域をご覧いただけます。",
    type: "website",
    url: `${SITE_URL.replace(/\/$/, "")}/team`,
  },
  twitter: {
    card: "summary_large_image",
    title: "チーム | LEXIA",
    description: "LEXIAのメンバー紹介。代表・制作・サポートのプロフィールと担当領域をご覧いただけます。",
  },
}

const members = allTeamMembers

export default function TeamIndexPage() {
  return (
    <>
      {/* <Navigation /> */}
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-4 text-center">
            チーム
          </h1>
          {/* <Breadcrumbs /> */}
          <p className="text-center text-neutral-700 dark:text-neutral-300 mb-12">
            LEXIAを支えるメンバーをご紹介します。
          </p>

          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((m, idx) => {
                const img = m.image || "/placeholder-user.svg"
                const href = m.slug ? `/team/${m.slug}` : undefined
                const CardInner = (
                  <>
                    <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                      <Image
                        src={img}
                        alt={`${m.name}のプロフィール写真`}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <h2 className="text-xl font-light text-neutral-900 dark:text-neutral-100">{m.name}</h2>
                    {m.role ? (
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">{m.role}</p>
                    ) : null}
                    {m.experienceYearsText ? (
                      <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">経験: {m.experienceYearsText}</p>
                    ) : null}
                    {m.message ? (
                      <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-2 line-clamp-2">{m.message}</p>
                    ) : null}
                  </>
                )
                return href ? (
                  <Link
                    href={href}
                    key={`${m.name}-${idx}`}
                    className="group rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 hover:shadow-md transition-shadow bg-white/60 dark:bg-neutral-900/60"
                  >
                    {CardInner}
                    <span className="mt-4 inline-block text-sm text-neutral-900 dark:text-neutral-100 group-hover:underline">
                      プロフィールを見る →
                    </span>
                  </Link>
                ) : (
                  <div
                    key={`${m.name}-${idx}`}
                    className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 bg-white/60 dark:bg-neutral-900/60"
                  >
                    {CardInner}
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </main>
      {/* <Footer /> */}
      <Script
        id="team-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "LEXIA",
            url: `${SITE_URL.replace(/\/$/, "")}/team`,
            member: members.map((m) => ({
              "@type": "Person",
              name: m.name,
              jobTitle: m.role,
              url: m.slug
                ? `${SITE_URL.replace(/\/$/, "")}/team/${m.slug}`
                : `${SITE_URL.replace(/\/$/, "")}/team`,
              image: `${SITE_URL.replace(/\/$/, "")}${m.image || "/placeholder-user.svg"}`,
            })),
          }),
        }}
      />
    </>
  )
}
