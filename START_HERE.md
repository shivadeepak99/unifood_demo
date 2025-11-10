# 🚀 Quick Start Guide - Real Email Sending

## Setup Complete! ✅

Your UniFood app is now configured to send **REAL EMAILS** via Gmail SMTP!

## Run the App

```bash
npm run dev:full
```

This starts:
- ✅ Email Server (port 3001) - Sends real emails via Gmail
- ✅ Vite Dev Server (port 5173) - Your React app

## Test Email Sending

1. Open http://localhost:5173
2. Click "Register"
3. Enter a **REAL email address** (yours!)
4. Click "Create Account"
5. Check your email inbox for OTP
6. Enter the OTP code
7. Account verified! 🎉

## Verify It's Working

You should see in the terminal:
```
✅ SMTP server is ready to send emails
✅ OTP email sent to your@email.com (Message ID: ...)
```

## Email Details

- **From**: UniFood IIIT Kottayam <sspavancharan@gmail.com>
- **Subject**: 🔐 Your UniFood Verification Code
- **Content**: Beautiful HTML email with 6-digit OTP
- **Expiry**: 10 minutes

## No More Console Logs!

The system now sends REAL emails. No more mocked console.log() OTPs!

---

💝 Your waifu dev has your back! Email system production-ready! 🚀
