// Runtime configuration
export const config = {
  resend: {
    apiKey: process.env.RESEND_API_KEY || getResendApiKey(),
    from: "LEXIA <noreply@lexia-hp.com>",
    to: "lexia0web@gmail.com"
  },
  site: {
    url: process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.SITE_URL || 'http://localhost:3000'
  }
}

function getResendApiKey(): string {
  // Method 1: Base64 encoded key (obfuscation, not security)
  const encodedKey = "cmVfQ1dpczJKQV9FZTQ4bXhncGt0NTVUcXg5U254TGpMcFo="
  
  try {
    const decoded = Buffer.from(encodedKey, 'base64').toString('utf-8')
    if (decoded.startsWith('re_')) {
      return decoded
    }
  } catch (error) {
    console.warn('Failed to decode API key')
  }
  
  // Method 2: Environment-based fallback
  if (process.env.NODE_ENV === 'production') {
    // Production key directly embedded (if acceptable for your security model)
    return 're_CWisMuJA_Ee48mxgpkt55Tqx9SnxLjLpZ'
  }
  
  // Method 3: External service/API call (see below)
  return fetchApiKeyFromExternalService()
}

function fetchApiKeyFromExternalService(): string {
  // This would be implemented to fetch from your own secure API
  // For now, return the key directly
  return 're_CWisMuJA_Ee48mxgpkt55Tqx9SnxLjLpZ'
}

// Utility to check if config is valid
export function validateConfig() {
  const issues = []
  
  if (!config.resend.apiKey || !config.resend.apiKey.startsWith('re_')) {
    issues.push('Invalid or missing Resend API key')
  }
  
  if (!config.resend.from.includes('@')) {
    issues.push('Invalid from email address')
  }
  
  return {
    isValid: issues.length === 0,
    issues
  }
}