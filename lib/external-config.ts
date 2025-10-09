export interface ExternalConfig {
  resendApiKey: string
  emailSettings: {
    from: string
    to: string
  }
}

export async function getExternalConfig(): Promise<ExternalConfig> {
  return {
    resendApiKey: process.env.RESEND_API_KEY ?? '',
    emailSettings: {
      from: 'LEXIA <noreply@lexia-hp.com>',
      to: 'lexia0web@gmail.com'
    }
  }
}
