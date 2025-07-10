"use client"

import { useState } from "react"
import { Share2, Facebook, Twitter, Linkedin, Copy, Check, LinkIcon, Mail, Bookmark, BookmarkPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SocialShareProps {
  title: string
  url: string
  description?: string
  vertical?: boolean
}

export function SocialShare({ title, url, description = "", vertical = false }: SocialShareProps) {
  const [showOptions, setShowOptions] = useState(false)
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareViaNavigator = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        })
      } catch (error) {
        console.error("Error sharing:", error)
        setShowOptions(true)
      }
    } else {
      setShowOptions(true)
    }
  }

  const toggleSave = () => {
    setSaved(!saved)
    // In a real app, you would save this to user preferences
  }

  const shareButtons = [
    {
      name: "Facebook",
      icon: <Facebook className="h-4 w-4" />,
      color: "bg-[#1877F2] hover:bg-[#0E65D9]",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-4 w-4" />,
      color: "bg-[#1DA1F2] hover:bg-[#0C85D0]",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-4 w-4" />,
      color: "bg-[#0A66C2] hover:bg-[#084E96]",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      name: "Email",
      icon: <Mail className="h-4 w-4" />,
      color: "bg-neutral-700 hover:bg-neutral-800 dark:bg-neutral-600 dark:hover:bg-neutral-700",
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\n${url}`)}`,
    },
  ]

  return (
    <div className={`${vertical ? "flex flex-col items-center space-y-3" : "flex items-center space-x-3"}`}>
      {vertical && (
        <div className="space-y-2">
          <TooltipProvider>
            {shareButtons.map((button) => (
              <Tooltip key={button.name}>
                <TooltipTrigger asChild>
                  <a
                    href={button.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
                  >
                    {button.icon}
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share on {button.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
                >
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <LinkIcon className="h-4 w-4" />}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copied ? "Copied!" : "Copy Link"}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleSave}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
                >
                  {saved ? <Bookmark className="h-4 w-4" /> : <BookmarkPlus className="h-4 w-4" />}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{saved ? "Saved" : "Save for later"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}

      {!vertical && (
        <Button variant="outline" size="sm" className="rounded-full" onClick={shareViaNavigator}>
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      )}

      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`${vertical ? "static" : "absolute right-0 top-full mt-2"} bg-white dark:bg-neutral-800 shadow-lg rounded-lg p-3 z-10 ${vertical ? "w-full" : "w-48"}`}
          >
            <div className={`${vertical ? "flex justify-between" : "space-y-2"}`}>
              {shareButtons.map((button) => (
                <a
                  key={button.name}
                  href={button.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${vertical ? "flex-1 mx-1" : "block w-full"} text-white rounded-md text-center py-2 px-3 ${button.color}`}
                >
                  <div className="flex items-center justify-center">
                    {button.icon}
                    {!vertical && <span className="ml-2 text-sm">{button.name}</span>}
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-2 pt-2 border-t border-neutral-200 dark:border-neutral-700">
              <button
                onClick={copyToClipboard}
                className="flex items-center w-full text-left p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
              >
                {copied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
                <span className="text-sm">{copied ? "Copied!" : "Copy Link"}</span>
              </button>

              <button
                onClick={() => setShowOptions(false)}
                className="flex items-center w-full text-left p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded text-neutral-500"
              >
                <span className="text-sm">Cancel</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
