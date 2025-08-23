"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Linkedin, ExternalLink } from "lucide-react"
import Breadcrumbs from "@/components/breadcrumbs"
import { Chip } from "@/components/ui/chip"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import Script from "next/script"
import { SITE_URL } from "@/lib/config"

export default function MasatoSaitoProfile() {
  const qualifications = [
    {
      no: 1,
      name: "Google アナリティクス認定資格",
      provider: "Google",
      evidence: "https://skillshop.credential.net/32cb0472-08eb-4cb0-a397-0ee66cd3061c#acc.ERNX8itG",
    },
    {
      no: 2,
      name: "コンバージョン最適化認定資格試験",
      provider: "Google",
      evidence: "https://skillshop.credential.net/4064cb8b-8082-459f-8e59-8222694e91bc#acc.Rm4TUPGI",
    },
    {
      no: 3,
      name: "AIを活用したパフォーマンス広告の認定資格",
      provider: "Google",
      evidence: "https://skillshop.credential.net/5decfe3e-c5fd-46dd-8628-370f1a4c35f8#acc.evltk7nA",
    },
    {
      no: 4,
      name: "インバウンドマーケティング認定資格",
      provider: "HubSpot Academy",
      evidence: "https://app-na2.hubspot.com/academy/achievements/szzz05jb/ja/1/-/",
    },
    {
      no: 5,
      name: "ソーシャルメディアマーケティング認定資格",
      provider: "HubSpot Academy",
      evidence: "https://app-na2.hubspot.com/academy/achievements/q7vxjrt4/ja/1/-/-",
    },
    {
      no: 6,
      name: "インバウンド認定資格",
      provider: "HubSpot Academy",
      evidence: "https://app-na2.hubspot.com/academy/achievements/tsc1yz5h/ja/1/-/",
    },
    {
      no: 7,
      name: "フリクションレスセールス認定資格",
      provider: "HubSpot Academy",
      evidence: "https://app-na2.hubspot.com/academy/achievements/pf4v135z/ja/1/-/",
    },
    {
      no: 8,
      name: "Data Science Tools（DS0105EN）",
      provider: "IBM / Cognitive Class",
      evidence: "https://courses.cognitiveclass.ai/certificates/730adef9c7af426bbb10ac188eb3879f",
    },
    {
      no: 9,
      name: "Data Science Methodology（DS0103EN）",
      provider: "IBM / Cognitive Class",
      evidence: "https://courses.cognitiveclass.ai/certificates/0e14469b2bc34f6e97df22d4d6a6f39e",
    },
    {
      no: 10,
      name: "Data Science 101（DS0101EN）",
      provider: "IBM / Cognitive Class",
      evidence: "https://courses.cognitiveclass.ai/certificates/40225d1628b945d69fc49bc598173220",
    },
    {
      no: 11,
      name: "Data Science Foundations – Level 2 (V2)",
      provider: "IBM / Credly",
      evidence: "https://www.credly.com/badges/a3e9242a-bc70-40be-a9a6-88412c7aa68e/public_url",
    },
    {
      no: 12,
      name: "Deep Learning Fundamentals（ML0115EN）",
      provider: "IBM / Cognitive Class",
      evidence: "https://courses.cognitiveclass.ai/certificates/23f3f8d8c8624cbfa9e48662b0eda5bf",
    },
    {
      no: 13,
      name: "Deep Learning with TensorFlow（ML0120EN）",
      provider: "IBM / Cognitive Class",
      evidence: "https://courses.cognitiveclass.ai/certificates/a0f516d166be4e528687e67d6252f2c4",
    },
    {
      no: 14,
      name: "Accelerating Deep Learning with GPUs（ML0122ENv3）",
      provider: "IBM / Cognitive Class",
      evidence: "https://courses.cognitiveclass.ai/certificates/876eee6671a943a3a3aedacae0d66f80",
    },
    {
      no: 15,
      name: "Deep Learning（Credlyバッジ）",
      provider: "IBM",
      evidence: "https://www.credly.com/badges/5610114e-2780-4610-b18f-dc997f0214a4/public_url",
    },
    {
      no: 16,
      name: "オフライン販売促進の認定資格",
      provider: "Google",
      evidence: "https://skillshop.credential.net/fe542ad1-d431-4a8f-9dd2-481922de271d#acc.hXES5HOF",
    },
    {
      no: 17,
      name: "キャンペーン マネージャー 360 認定資格試験",
      provider: "Google",
      evidence: "https://skillshop.credential.net/fbc2d357-1bd6-44e9-8407-b1640c5a0a80#acc.BiNpVYsM",
    },
  ]

  const badges = [
    {
      name: "HubSpot Marketing Software Certified",
      href: "https://academy.hubspot.com/",
      img: "https://hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/hubspot-marketing-software-certification.png",
    },
    {
      name: "HubSpot Email Marketing Certified",
      href: "https://academy.hubspot.com/",
      img: "https://hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/hubspot-email-marketing-certification.png",
    },
    {
      name: "Frictionless Sales Certified",
      href: "https://app-na2.hubspot.com/academy/achievements/pf4v135z/ja/1/-/",
      img: "https://hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/frictionless-sales-certification.png",
    },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
              <Image
                src="/images/saito_profile.webp"
                alt="齋藤雅人"
                fill
                className="object-cover"
                priority
                sizes="128px"
              />
            </div>
            <Chip className="mb-2">代表・WEBディレクター</Chip>
            <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-4">齋藤雅人</h1>
            <Breadcrumbs />
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              最新の制作技術を駆使し、WEB制作歴5年の経験を基にクライアントの期待を超える成果を追求します。愛知県安城市生まれ、愛知県碧南市育ちで、地域密着の視点から価値あるサイトを届けます。
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="mailto:msms12120614@gmail.com"
                className="bg-white dark:bg-neutral-700 p-2 rounded-full text-neutral-900 dark:text-neutral-100 hover:scale-110 transition-transform duration-300 shadow-sm"
                aria-label="Email 齋藤雅人"
              >
                <Mail className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/lexia-saito/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-neutral-700 p-2 rounded-full text-neutral-900 dark:text-neutral-100 hover:scale-110 transition-transform duration-300 shadow-sm"
                aria-label="齋藤雅人's LinkedIn profile"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-6 text-center">
              取得資格一覧
            </h2>
            <Table className="bg-white dark:bg-neutral-800">
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>資格名</TableHead>
                  <TableHead>提供元</TableHead>
                  <TableHead>証明書</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {qualifications.map((q) => (
                  <TableRow key={q.no}>
                    <TableCell>{q.no}</TableCell>
                    <TableCell>{q.name}</TableCell>
                    <TableCell>{q.provider}</TableCell>
                    <TableCell className="text-center">
                      {q.evidence ? (
                        <Link
                          href={q.evidence}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${q.name} の証明書`}
                          className="inline-flex p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-6 text-center">取得バッジ</h2>
            <ul className="space-y-4 max-w-md mx-auto">
              {badges.map((badge) => (
                <li key={badge.name}>
                  <a
                    href={badge.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-sm"
                  >
                    <img
                      src={badge.img}
                      alt={badge.name}
                      className="w-12 h-12"
                    />
                    <span className="flex-1 text-neutral-900 dark:text-neutral-100">
                      {badge.name}
                    </span>
                    <ExternalLink className="w-4 h-4 text-neutral-500" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </main>
      <Footer />
      <Script
        id="person-masato-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "齋藤雅人",
            jobTitle: "代表・WEBディレクター",
            url: `${SITE_URL.replace(/\/$/, "")}/team/masato-saito`,
            image: `${SITE_URL.replace(/\/$/, "")}/images/saito_profile.webp`,
            worksFor: { "@type": "Organization", name: "LEXIA", url: SITE_URL },
            sameAs: [
              "https://www.linkedin.com/in/lexia-saito/",
              "https://www.instagram.com/lexia_web/"
            ],
          }),
        }}
      />
    </>
  )
}
