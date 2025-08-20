// Test all alternative configuration methods
const testMethods = [
  {
    name: 'Original (Environment Variable)',
    endpoint: '/api/contact',
    description: 'Uses process.env.RESEND_API_KEY'
  },
  {
    name: 'Runtime Config',
    endpoint: '/api/contact-v2',
    description: 'Uses lib/config.ts with embedded key'
  },
  {
    name: 'External Config',
    endpoint: '/api/contact-external',
    description: 'Uses lib/external-config.ts'
  }
]

const testData = {
  name: "環境変数テストユーザー",
  company: "テスト会社",
  email: "test-env@example.com",
  phone: "090-1234-5678",
  inquiryType: "question",
  services: ["corporate"],
  otherService: "",
  budget: "~50",
  due: "テスト用",
  url: "https://test.example.com",
  details: "環境変数の代替方法のテストです。",
  attachment: null,
  preferredContact: ["email"]
}

async function testAllMethods() {
  console.log('🧪 Testing all environment variable alternative methods...\n')
  
  for (const method of testMethods) {
    console.log(`📋 Testing: ${method.name}`)
    console.log(`📍 Endpoint: ${method.endpoint}`)
    console.log(`📝 Description: ${method.description}`)
    
    try {
      const response = await fetch(`http://localhost:3000${method.endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      })
      
      const result = await response.json()
      
      if (response.ok) {
        console.log(`✅ SUCCESS - Status: ${response.status}`)
        console.log(`📧 Response:`, result)
      } else {
        console.log(`❌ FAILED - Status: ${response.status}`)
        console.log(`💥 Error:`, result)
      }
    } catch (error) {
      console.log(`💥 REQUEST FAILED:`, error.message)
    }
    
    console.log('─'.repeat(60))
    console.log('')
  }
  
  console.log('🏁 All tests completed!')
  console.log('\n📊 Recommendations:')
  console.log('✨ Runtime Config: Best for immediate deployment without Vercel env vars')
  console.log('🔒 External Config: Best for multiple environments and security')
  console.log('🌍 Environment Variable: Best practice but requires Vercel dashboard setup')
}

testAllMethods().catch(console.error)