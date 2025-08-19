"use client"

import Link from "next/link"
import { trackEvent } from "@/lib/analytics"
import { motion } from "framer-motion"
import { ArrowRight, MessageCircle, Coins, Briefcase } from "lucide-react"

export default function ServicesWebHeroCTA() {
  const buttons = [
    {
      href: "/contact",
      label: "無料相談する",
      icon: MessageCircle,
      variant: "primary",
      trackLabel: "contact",
    },
    {
      href: "/pricing",
      label: "料金を見る",
      icon: Coins,
      variant: "secondary",
      trackLabel: "pricing",
    },
    {
      href: "/projects",
      label: "実績を見る",
      icon: Briefcase,
      variant: "tertiary",
      trackLabel: "projects",
    },
  ]

  const getButtonStyles = (variant: string) => {
    switch (variant) {
      case "primary":
        return "bg-white text-neutral-900 shadow-lg shadow-black/30 hover:bg-white/90 hover:scale-105"
      case "secondary":
        return "bg-neutral-900/90 text-white ring-1 ring-white/40 shadow-lg hover:bg-neutral-900 hover:scale-105"
      case "tertiary":
        return "bg-white/10 text-white ring-1 ring-white/40 hover:bg-white/20 hover:scale-105"
      default:
        return ""
    }
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {buttons.map((button, index) => {
        const Icon = button.icon
        return (
          <motion.div
            key={button.href}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 200
            }}
          >
            <Link
              href={button.href}
              onClick={() => trackEvent("cta_click", { location: "services_web_hero", label: button.trackLabel })}
              className={`
                inline-flex items-center justify-center gap-2 
                rounded-lg px-6 py-3.5 
                text-sm font-medium 
                transition-all duration-300 
                group
                ${getButtonStyles(button.variant)}
              `}
            >
              <Icon className="w-4 h-4" />
              <span>{button.label}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}

