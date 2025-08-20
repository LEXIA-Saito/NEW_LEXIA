// Rate limiting and security middleware
interface RateLimitEntry {
  count: number
  resetTime: number
  blocked: boolean
}

class RateLimiter {
  private limits: Map<string, RateLimitEntry> = new Map()
  private readonly maxRequests: number
  private readonly windowMs: number
  private readonly blockDurationMs: number

  constructor(
    maxRequests: number = 5, // 5 requests per window
    windowMs: number = 15 * 60 * 1000, // 15 minutes
    blockDurationMs: number = 60 * 60 * 1000 // 1 hour block
  ) {
    this.maxRequests = maxRequests
    this.windowMs = windowMs
    this.blockDurationMs = blockDurationMs
    
    // Clean up old entries every 10 minutes
    setInterval(() => this.cleanup(), 10 * 60 * 1000)
  }

  /**
   * Check if request is allowed
   */
  isAllowed(identifier: string): { allowed: boolean; resetTime?: number; remaining?: number } {
    const now = Date.now()
    const entry = this.limits.get(identifier)

    if (!entry) {
      // First request from this identifier
      this.limits.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
        blocked: false
      })
      return { allowed: true, remaining: this.maxRequests - 1 }
    }

    // Check if currently blocked
    if (entry.blocked && now < entry.resetTime) {
      return { allowed: false, resetTime: entry.resetTime }
    }

    // Reset window if expired
    if (now >= entry.resetTime) {
      entry.count = 1
      entry.resetTime = now + this.windowMs
      entry.blocked = false
      return { allowed: true, remaining: this.maxRequests - 1 }
    }

    // Check if limit exceeded
    if (entry.count >= this.maxRequests) {
      entry.blocked = true
      entry.resetTime = now + this.blockDurationMs
      return { allowed: false, resetTime: entry.resetTime }
    }

    // Allow request and increment counter
    entry.count++
    return { 
      allowed: true, 
      remaining: this.maxRequests - entry.count,
      resetTime: entry.resetTime
    }
  }

  /**
   * Clean up expired entries
   */
  private cleanup() {
    const now = Date.now()
    for (const [key, entry] of this.limits.entries()) {
      if (now >= entry.resetTime && !entry.blocked) {
        this.limits.delete(key)
      }
    }
  }

  /**
   * Get current status for identifier
   */
  getStatus(identifier: string) {
    const entry = this.limits.get(identifier)
    if (!entry) return null
    
    return {
      count: entry.count,
      resetTime: entry.resetTime,
      blocked: entry.blocked,
      remaining: Math.max(0, this.maxRequests - entry.count)
    }
  }
}

// Global rate limiter instance
export const contactRateLimiter = new RateLimiter(3, 15 * 60 * 1000, 60 * 60 * 1000) // 3 requests per 15 minutes

/**
 * Get client identifier for rate limiting
 */
export function getClientIdentifier(request: Request): string {
  // Try to get real IP from headers (Vercel)
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }
  
  if (realIp) {
    return realIp
  }
  
  // Fallback to user agent + timestamp hash for development
  const userAgent = request.headers.get('user-agent') || 'unknown'
  return `fallback-${Buffer.from(userAgent).toString('base64').substring(0, 10)}`
}

/**
 * Security validation for contact form data
 */
export function validateContactData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  // Required fields
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 1) {
    errors.push('名前は必須です')
  }
  
  if (!data.email || typeof data.email !== 'string') {
    errors.push('メールアドレスは必須です')
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (data.email && !emailRegex.test(data.email)) {
    errors.push('有効なメールアドレスを入力してください')
  }
  
  // Length limits
  if (data.name && data.name.length > 100) {
    errors.push('名前は100文字以内で入力してください')
  }
  
  if (data.details && data.details.length > 2000) {
    errors.push('詳細は2000文字以内で入力してください')
  }
  
  // XSS protection - basic HTML tag detection
  const htmlTagRegex = /<[^>]*>/g
  const fieldsToCheck = ['name', 'company', 'details']
  fieldsToCheck.forEach(field => {
    if (data[field] && htmlTagRegex.test(data[field])) {
      errors.push(`${field}にHTMLタグは使用できません`)
    }
  })
  
  // Attachment validation
  if (data.attachment) {
    if (!data.attachment.name || !data.attachment.content) {
      errors.push('添付ファイルの形式が正しくありません')
    }
    
    // Check file size (base64 encoded, so roughly 4/3 of actual size)
    if (data.attachment.content && data.attachment.content.length > 7 * 1024 * 1024) {
      errors.push('添付ファイルは5MB以下にしてください')
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}