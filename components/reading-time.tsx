import { Clock } from "lucide-react"
import { formatReadingTime } from "@/lib/blog-utils"

interface ReadingTimeProps {
  minutes: number
  className?: string
}

export function ReadingTime({ minutes, className = "" }: ReadingTimeProps) {
  return (
    <div className={`flex items-center text-neutral-500 dark:text-neutral-400 ${className}`}>
      <Clock className="h-4 w-4 mr-1" />
      <span className="text-sm">{formatReadingTime(minutes)}</span>
    </div>
  )
}
