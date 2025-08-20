export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lexia-hp.com'

export const LOGO_URL = process.env.NEXT_PUBLIC_LOGO_URL || '/favicon/lexia_logo_square.png'
export const LOGO_WHITE_URL = process.env.NEXT_PUBLIC_LOGO_WHITE_URL || LOGO_URL
export const LOGO_TEXT_URL = process.env.NEXT_PUBLIC_LOGO_TEXT_URL || LOGO_URL
export const LOGO_TEXT_WHITE_URL = process.env.NEXT_PUBLIC_LOGO_TEXT_WHITE_URL || LOGO_URL

export const config = {
  resend: {
    apiKey: process.env.RESEND_API_KEY || 're_CWisMuJA_Ee48mxgpkt55Tqx9SnxLjLpZ',
    from: 'LEXIA <noreply@lexia-hp.com>',
    to: 'lexia0web@gmail.com'
  }
}

export function validateConfig() {
  const issues: string[] = []

  if (!config.resend.apiKey || !config.resend.apiKey.startsWith('re_')) {
    issues.push('Invalid or missing Resend API key')
  }
  if (!config.resend.from.includes('@')) {
    issues.push('Invalid from email address')
  }
  if (!config.resend.to.includes('@')) {
    issues.push('Invalid to email address')
  }

  return { isValid: issues.length === 0, issues }
}
