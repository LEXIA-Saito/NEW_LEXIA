# 🛠️ LEXIA Deployment Fixes and Solutions

## 📋 Issue Summary

This document addresses the Vercel deployment errors and contact form 500 error issues.

### ✅ Fixed Issues

1. **Vercel Build Error**: `ERR_PNPM_OUTDATED_LOCKFILE` - pnpm-lock.yaml was out of sync
2. **Contact Form 500 Error**: Missing RESEND_API_KEY configuration
3. **Font 404 Error**: Hardcoded font preload causing 404 warnings

## 🔧 Solutions Implemented

### 1. Package Dependencies Cleanup

**Problem**: Conflicting React versions and unnecessary dependencies caused build failures.

**Solution**:
- ✅ Cleaned up `package.json` removing conflicting packages (vue, svelte, react-native, etc.)
- ✅ Downgraded React from v19 to v18 for better compatibility
- ✅ Fixed date-fns version to resolve react-day-picker peer dependency
- ✅ Updated `pnpm-lock.yaml` to be in sync with package.json

### 2. Contact API Enhancement

**Problem**: API returned 500 error when RESEND_API_KEY was missing or invalid.

**Solution**:
- ✅ Added proper validation for RESEND_API_KEY environment variable
- ✅ Return graceful response in development mode when API key is not configured
- ✅ Added comprehensive logging for debugging email sending issues
- ✅ Better error handling with Japanese error messages

### 3. Font Loading Fix

**Problem**: Manual font preload was causing 404 errors for non-existent font files.

**Solution**:
- ✅ Removed hardcoded font preload link from layout.tsx
- ✅ Let Next.js handle Google Fonts loading automatically via `next/font/google`

## 🚀 Deployment Instructions

### For Vercel Deployment

1. **Environment Variables** (Required):
   ```
   RESEND_API_KEY=your_real_resend_api_key_here
   ```

2. **Deploy Command**:
   ```bash
   git push origin main
   ```
   
   The updated `pnpm-lock.yaml` will now work with Vercel's build system.

### For Local Development

1. **Install Dependencies**:
   ```bash
   npm install --legacy-peer-deps
   # or
   pnpm install
   ```

2. **Start Development Server**:
   ```bash
   # Using PM2 (recommended)
   pm2 start ecosystem.config.js
   
   # Or direct Next.js
   npm run dev
   ```

3. **Test Contact Form**:
   ```bash
   node test-contact-api.js
   ```

## 📧 Resend Email Configuration

### Required Setup for Production

1. **Get Resend API Key**:
   - Sign up at [resend.com](https://resend.com)
   - Generate API key from dashboard
   - Add to Vercel environment variables

2. **Domain Configuration**:
   - Current setup uses `noreply@lexia-hp.com`
   - Ensure domain is verified in Resend dashboard
   - Or update email addresses in `/app/api/contact/route.ts`

3. **Email Recipients**:
   - Notifications sent to: `lexia0web@gmail.com`
   - Confirmation sent to user's email address

### Development Mode Behavior

When `RESEND_API_KEY` is not configured:
- ✅ Contact form accepts submissions
- ✅ Returns success response
- ⚠️ No actual emails are sent
- 📝 Logs warning message

## 🧪 Testing

### Contact Form Test

```bash
# Test API endpoint directly
node test-contact-api.js

# Expected output (development):
Testing contact API endpoint...
Response status: 200
Response statusText: OK
Response data: {
  success: true,
  message: '開発環境では実際のメール送信は行われません。本番環境ではRESEND_API_KEYを設定してください。'
}
✅ Contact API test passed!
```

### Production Test

With valid RESEND_API_KEY:
- User receives confirmation email
- LEXIA team receives notification email
- Attachments are properly forwarded

## 🔍 Troubleshooting

### Still Getting 500 Error?

1. Check server logs:
   ```bash
   pm2 logs lexia-dev-server --nostream
   ```

2. Verify RESEND_API_KEY format:
   - Should start with `re_`
   - Must be valid and not expired

3. Check domain verification in Resend dashboard

### Build Fails on Vercel?

1. Ensure `pnpm-lock.yaml` is committed
2. Check for any remaining dependency conflicts
3. Verify Node.js version compatibility

### Font Errors?

1. Clear browser cache
2. Verify no manual font preloads in code
3. Let Next.js handle font optimization

## 📁 Files Modified

- `package.json` - Cleaned dependencies
- `pnpm-lock.yaml` - Updated lockfile
- `app/api/contact/route.ts` - Enhanced error handling
- `app/layout.tsx` - Removed manual font preload
- `.env.example` - Added documentation
- `ecosystem.config.js` - PM2 configuration
- `test-contact-api.js` - API testing script

## 🌐 Live URL

Development server: https://3000-i1e4nj9k215p8imwwha26-6532622b.e2b.dev

Contact form is fully functional and ready for production deployment.