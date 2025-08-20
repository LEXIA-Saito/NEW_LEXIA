// Check Resend domain configuration
const { Resend } = require('resend');

async function verifyResendSetup() {
  const apiKey = 're_CWisMuJA_Ee48mxgpkt55Tqx9SnxLjLpZ';
  const resend = new Resend(apiKey);

  console.log('🔍 Checking Resend API configuration...\n');

  try {
    // Test 1: Check API key validity
    console.log('1️⃣ Testing API key validity...');
    const testEmail = await resend.emails.send({
      from: 'LEXIA <noreply@lexia-hp.com>',
      to: ['lexia0web@gmail.com'],
      subject: 'API Key Verification Test',
      text: 'This is a test email to verify the Resend API key is working correctly.',
    });
    console.log('✅ API key is valid. Email ID:', testEmail.data?.id);

  } catch (error) {
    console.log('❌ API key test failed:', error.message);
    
    // Check for specific error types
    if (error.message.includes('domain')) {
      console.log('🚨 Domain verification issue detected!');
      console.log('📋 Next steps:');
      console.log('   1. Go to https://resend.com/domains');
      console.log('   2. Verify that lexia-hp.com is verified');
      console.log('   3. Check DNS settings if not verified');
      console.log('   4. Or use a verified domain like resend.dev');
    }
    
    if (error.message.includes('API key')) {
      console.log('🚨 API key issue detected!');
      console.log('📋 Check:');
      console.log('   1. API key is correct: re_CWisMuJA_Ee48mxgpkt55Tqx9SnxLjLpZ');
      console.log('   2. API key has not expired');
      console.log('   3. API key has email sending permissions');
    }

    return;
  }

  try {
    // Test 2: Check domains (if endpoint exists)
    console.log('\n2️⃣ Checking domain configuration...');
    // Note: Domain listing might not be available with all API keys
    console.log('ℹ️  Domain check skipped - use Resend dashboard to verify lexia-hp.com');
    
  } catch (error) {
    console.log('ℹ️  Domain API not accessible with this key type');
  }

  console.log('\n✅ Resend configuration appears to be working!');
  console.log('📧 Test email sent successfully to lexia0web@gmail.com');
  console.log('\n📋 For Vercel deployment:');
  console.log('   1. Ensure RESEND_API_KEY is set in Vercel environment variables');
  console.log('   2. Value: re_CWisMuJA_Ee48mxgpkt55Tqx9SnxLjLpZ');
  console.log('   3. Environment: Production, Preview, Development (all selected)');
  console.log('   4. Redeploy after setting environment variables');
}

verifyResendSetup().catch(console.error);