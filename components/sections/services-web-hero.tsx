import Image from "next/image"
import ServicesWebHeroCTA from "@/components/cta/services-web-hero-cta"

export default function ServicesWebHero() {
  return (
    <section className="relative min-h-[60vh] w-full flex items-center justify-center overflow-hidden">
      <Image
        src="/images/services-web-hero-new.jpg"
        alt="LEXIAのWeb制作サービス。レスポンシブ対応の美しいサイトを構築"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-white mb-4">WEB制作</h1>
          <p className="text-neutral-100/95 md:text-xl mb-8">
            コーポレート、EC、ランディング、採用、キャンペーンまで。Next.jsを活用し、成果につながるサイトをスピーディに構築します。
          </p>
          <ServicesWebHeroCTA />
        </div>
      </div>
    </section>
  )
}
