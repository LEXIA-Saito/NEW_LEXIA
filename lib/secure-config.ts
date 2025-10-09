// Secure configuration management
import crypto from 'crypto'

// Security configuration
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'lexia-secure-key-2024-production-env'
const IV_LENGTH = 16 // For AES, this is always 16

interface SecureConfig {
  resend: {
    apiKey: string
    from: string
    to: string
  }
  security: {
    rateLimiting: boolean
    ipWhitelist: string[]
    maxAttachmentSize: number
  }
}

// Encrypted configuration data
const ENCRYPTED_CONFIG = {
  // Allow operators to provide encrypted configuration via environment variables
  data: process.env.ENCRYPTED_SECURE_CONFIG ?? '',
  iv: process.env.ENCRYPTED_SECURE_CONFIG_IV ?? '',
  keyDerivation: true
}

const DEFAULT_EMAIL_SETTINGS = {
  from: "LEXIA <noreply@lexia-hp.com>",
  to: "lexia0web@gmail.com"
} as const

/**
 * Decrypt configuration data
 */
function decryptConfig(encryptedData: string, iv: string): string {
  try {
    const key = crypto.scryptSync(ENCRYPTION_KEY, 'salt', 32)
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'))
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  } catch (error) {
    console.warn('Config decryption failed, using fallback method')
    return getFallbackConfig()
  }
}

/**
 * Encrypt configuration data (for setup/rotation)
 */
export function encryptConfig(data: string): { encrypted: string; iv: string } {
  const key = crypto.scryptSync(ENCRYPTION_KEY, 'salt', 32)
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  let encrypted = cipher.update(data, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return {
    encrypted,
    iv: iv.toString('hex')
  }
}

/**
 * Fallback configuration method
 */
function getFallbackConfig(): string {
  return JSON.stringify({
    resend: {
      apiKey: process.env.RESEND_API_KEY ?? '',
      ...DEFAULT_EMAIL_SETTINGS
    },
    security: {
      rateLimiting: true,
      ipWhitelist: [],
      maxAttachmentSize: 5 * 1024 * 1024
    }
  })
}

/**
 * Get secure configuration
 */
export function getSecureConfig(): SecureConfig {
  let configData: string | undefined

  // Try to decrypt stored config when provided
  if (ENCRYPTED_CONFIG.data && ENCRYPTED_CONFIG.iv) {
    configData = decryptConfig(ENCRYPTED_CONFIG.data, ENCRYPTED_CONFIG.iv)
  }

  if (!configData) {
    configData = getFallbackConfig()
  }

  try {
    return JSON.parse(configData)
  } catch (error) {
    console.error('Failed to parse config, using fallback from environment', error)
    return JSON.parse(getFallbackConfig())
  }
}

/**
 * Validate configuration
 */
export function validateSecureConfig(config: SecureConfig): { isValid: boolean; issues: string[] } {
  const issues: string[] = []
  
  // Validate API key
  if (!config.resend.apiKey || !config.resend.apiKey.startsWith('re_')) {
    issues.push('Invalid or missing Resend API key')
  }
  
  if (config.resend.apiKey.length !== 36) {
    issues.push('Resend API key has incorrect length')
  }
  
  // Validate email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(config.resend.from.match(/<(.+?)>/)?.[1] || config.resend.from)) {
    issues.push('Invalid from email address')
  }
  
  if (!emailRegex.test(config.resend.to)) {
    issues.push('Invalid to email address')
  }
  
  // Validate security settings
  if (config.security.maxAttachmentSize > 10 * 1024 * 1024) {
    issues.push('Attachment size limit too high')
  }
  
  return {
    isValid: issues.length === 0,
    issues
  }
}

/**
 * Initialize encrypted configuration (run once during setup)
 */
export function initializeSecureConfig(apiKey: string) {
  if (!apiKey || !apiKey.startsWith('re_')) {
    throw new Error('A valid Resend API key (starting with "re_") is required')
  }

  const configData = JSON.stringify({
    resend: {
      apiKey,
      ...DEFAULT_EMAIL_SETTINGS
    },
    security: {
      rateLimiting: true,
      ipWhitelist: [],
      maxAttachmentSize: 5 * 1024 * 1024
    }
  })

  const { encrypted, iv } = encryptConfig(configData)

  console.log('Encrypted config data:')
  console.log('data:', encrypted)
  console.log('iv:', iv)

  return { encrypted, iv }
}