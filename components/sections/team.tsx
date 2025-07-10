"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Chip } from "@/components/ui/chip"
import { Linkedin, Mail } from "lucide-react"
import Link from "next/link"

// Team member data
const teamMembers = [
  {
    id: 1,
    name: "Rafly Kurnia",
    role: "Principal Architect",
    bio: "With over 15 years of experience, Rafly leads our design vision with a focus on sustainable and contextual architecture.",
    image: "/team/person-1.png",
    linkedin: "https://www.linkedin.com/in/raflykurnia72/",
    email: "rafly@lexia.design",
  },
  {
    id: 2,
    name: "Maya Wijaya",
    role: "Interior Designer",
    bio: "Maya specializes in creating harmonious interior spaces that complement the architectural vision.",
    image: "/team/person-2.png",
    linkedin: "#",
    email: "maya@lexia.design",
  },
  {
    id: 3,
    name: "Daniel Hartono",
    role: "Project Manager",
    bio: "Daniel ensures our projects run smoothly from concept to completion, with meticulous attention to detail.",
    image: "/team/person-3.png",
    linkedin: "#",
    email: "daniel@lexia.design",
  },
  {
    id: 4,
    name: "Aisha Putri",
    role: "Landscape Architect",
    bio: "Aisha creates outdoor spaces that seamlessly integrate with our architectural designs.",
    image: "/team/person-4.png",
    linkedin: "#",
    email: "aisha@lexia.design",
  },
]

export default function Team() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeIn}
        >
          <Chip>Our Team</Chip>
          <h2 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mt-4 mb-6">
            Meet the Team
          </h2>
          <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
            Our talented team of architects and designers brings diverse expertise and a shared passion for creating
            exceptional spaces.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.id}
            className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            variants={fadeIn}
            whileHover={{ y: -10 }}
          >
            <div className="aspect-[3/4] relative overflow-hidden">
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 w-full">
                  <div className="flex justify-center space-x-3">
                    <Link
                      href={`mailto:${member.email}`}
                      className="bg-white/90 dark:bg-neutral-900/90 p-2 rounded-full text-neutral-900 dark:text-neutral-100 hover:scale-110 transition-transform duration-300"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="h-5 w-5" />
                    </Link>
                    <Link
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/90 dark:bg-neutral-900/90 p-2 rounded-full text-neutral-900 dark:text-neutral-100 hover:scale-110 transition-transform duration-300"
                      aria-label={`${member.name}'s LinkedIn profile`}
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-1">{member.name}</h3>
              <p className="text-neutral-500 dark:text-neutral-400 mb-3">{member.role}</p>
              <p className="text-neutral-700 dark:text-neutral-300 text-sm">{member.bio}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        variants={fadeIn}
        className="text-center mt-12"
      >
        <p className="text-neutral-700 dark:text-neutral-300">
          Our collaborative approach ensures that each project benefits from our combined expertise and creative vision.
        </p>
      </motion.div>
    </div>
  )
}
