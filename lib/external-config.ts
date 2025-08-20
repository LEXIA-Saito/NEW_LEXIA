// External configuration service
interface ExternalConfig {
  resendApiKey: string
  emailSettings: {
    from: string
    to: string
  }
}

let cachedConfig: ExternalConfig | null = null

export async function getExternalConfig(): Promise<ExternalConfig> {
  if (cachedConfig) {
    return cachedConfig
  }

  try {
    // Method 1: Fetch from your own secure API endpoint
    // const response = await fetch('https://your-config-api.com/config', {
    //   headers: { 'Authorization': 'Bearer your-internal-token' }
    // })
    // const config = await response.json()
    
    // Method 2: Fetch from GitHub (private repo)
    // const response = await fetch('https://api.github.com/repos/user/private-config/contents/config.json', {
    //   headers: { 'Authorization': 'token your-github-token' }
    // })
    
    // Method 3: Use a simple config object (for immediate implementation)
    const config: ExternalConfig = {
      resendApiKey: 're_CWisMuJA_Ee48mxgpkt55Tqx9SnxLjLpZ',
      emailSettings: {
        from: 'LEXIA <noreply@lexia-hp.com>',
        to: 'lexia0web@gmail.com'
      }
    }
    
    cachedConfig = config
    return config
    
  } catch (error) {
    console.error('Failed to fetch external config:', error)
    
    // Fallback configuration
    return {
      resendApiKey: 're_CWisMuJA_Ee48mxgpkt55Tqx9SnxLjLpZ',
      emailSettings: {
        from: 'LEXIA <noreply@lexia-hp.com>',
        to: 'lexia0web@gmail.com'
      }
    }
  }
}

// Clear cache (useful for testing)
export function clearConfigCache() {
  cachedConfig = null
}