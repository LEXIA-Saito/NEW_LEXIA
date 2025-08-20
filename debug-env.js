// Debug script to check environment variables in different contexts
console.log('=== Environment Variable Debug ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('VERCEL:', process.env.VERCEL);
console.log('VERCEL_ENV:', process.env.VERCEL_ENV);
console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
console.log('RESEND_API_KEY length:', process.env.RESEND_API_KEY?.length || 0);
console.log('RESEND_API_KEY starts with re_:', process.env.RESEND_API_KEY?.startsWith('re_') || false);

// Test Resend initialization
try {
  const { Resend } = require('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  console.log('✅ Resend initialization successful');
} catch (error) {
  console.log('❌ Resend initialization failed:', error.message);
}

console.log('=== End Debug ===');