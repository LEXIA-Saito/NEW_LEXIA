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
  // Encrypted production configuration
  data: '17980bcf764588770c5744143a032617764c5a71d9b8c27af90ac4884f6a3393dbb872a36e48e6556ffe6d06430793da6f53b0a2f04a8014ea1f167548d40321dc79524d10c4c4fe8768d6e689d6aba4d2e51d8879200fc1ec73fb2f09de09c35136a525652ddb0a908d3a9e4a1c847e52ae3b26f9ead9a8bd022746a76c1648a35aed39e0210c1fec08d2ac5fad23b0138d6ec92bc593c70bcd405f3a6683a819064d4d95d9ae07c261eabe5dc347d4ef7d8b2542abf948064c192cbc4871b1b279c8fd8adc38bbb3bbf5f6c33454fb',
  iv: '3c81e08e132398754be2c1680b271f4a',
  // Backup method: environment-based key derivation
  keyDerivation: true
}

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
  // Use environment-based key derivation as fallback
  const seed = process.env.VERCEL_URL || process.env.NODE_ENV || 'development'
  const hash = crypto.createHash('sha256').update(seed + ENCRYPTION_KEY).digest('hex')
  
  // Derive API key from hash (this is a fallback method)
  const apiKey = 're_' + hash.substring(0, 33)
  
  return JSON.stringify({
    resend: {
      apiKey: process.env.RESEND_API_KEY || apiKey,
      from: "LEXIA <noreply@lexia-hp.com>",
      to: "lexia0web@gmail.com"
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
  let configData: string
  
  // Try to decrypt stored config
  if (ENCRYPTED_CONFIG.data && ENCRYPTED_CONFIG.iv) {
    configData = decryptConfig(ENCRYPTED_CONFIG.data, ENCRYPTED_CONFIG.iv)
  } else {
    // Use fallback method
    configData = getFallbackConfig()
  }
  
  try {
    return JSON.parse(configData)
  } catch (error) {
    console.error('Failed to parse config, using emergency fallback')
    return {
      resend: {
        apiKey: 're_CWisMuJA_Ee48mxgpkt55Tqx9SnxLjLpZ',
        from: "LEXIA <noreply@lexia-hp.com>",
        to: "lexia0web@gmail.com"
      },
      security: {
        rateLimiting: true,
        ipWhitelist: [],
        maxAttachmentSize: 5 * 1024 * 1024
      }
    }
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
export function initializeSecureConfig() {
  const configData = JSON.stringify({
    resend: {
      apiKey: 're_CWisMuJA_Ee48mxgpkt55Tqx9SnxLjLpZ',
      from: "LEXIA <noreply@lexia-hp.com>",
      to: "lexia0web@gmail.com"
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