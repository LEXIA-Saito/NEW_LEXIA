"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Check, Loader2 } from "lucide-react"

export function NewsletterSubscription() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address")
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    try {
      // In a real implementation, you would call your newsletter API here
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSuccess(true)
      setEmail("")
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-neutral-50 dark:bg-neutral-800 p-8 rounded-lg">
      <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-4">Subscribe to Our Newsletter</h3>
      <p className="text-neutral-700 dark:text-neutral-300 mb-6">
        Stay updated with our latest articles, projects, and insights. We'll send you a monthly digest of our best
        content.
      </p>

      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-4 rounded-md flex items-center"
        >
          <Check className="h-5 w-5 mr-2 flex-shrink-0" />
          <p>Thank you for subscribing! Please check your email to confirm your subscription.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              disabled={isSubmitting}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Subscribing...
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
          </div>
          {error && <p className="text-red-500 dark:text-red-400 text-sm mt-2">{error}</p>}
          <p className="text-neutral-500 dark:text-neutral-400 text-xs mt-3">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      )}
    </div>
  )
}
