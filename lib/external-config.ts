export interface ExternalConfig {
  resendApiKey: string
  emailSettings: {
    from: string
    to: string
  }
}

export async function getExternalConfig(): Promise<ExternalConfig> {
  return {
    resendApiKey: process.env.RESEND_API_KEY || 're_CWisMuJA_Ee48mxgpkt55Tqx9SnxLjLpZ',
    emailSettings: {
      from: 'LEXIA <noreply@lexia-hp.com>',
      to: 'lexia0web@gmail.com'
    }
  }
}
