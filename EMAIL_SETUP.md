# 🚀 UniFood - Production Email Setup Complete! ✅

## What Just Got Fixed

### ✨ Real SMTP Email Sending (NO MORE DEMO MODE!)
- **Email Provider**: Gmail SMTP (`sspavancharan@gmail.com`)
- **Backend Server**: Express.js server on port 3001
- **Frontend Integration**: Automatic email sending via API

## 📧 Email Configuration

Your `.env` file is now configured with:

```env
VITE_EMAIL_PROVIDER=nodemailer
VITE_SMTP_HOST=smtp.gmail.com
VITE_SMTP_PORT=587
VITE_SMTP_SECURE=false
VITE_SMTP_USER=sspavancharan@gmail.com
VITE_SMTP_PASS=zazs pfnz fdbz fvhn
VITE_FROM_EMAIL=sspavancharan@gmail.com
VITE_FROM_NAME=UniFood IIIT Kottayam
```

## 🚀 How to Run (IMPORTANT!)

You need to run **TWO servers** now:

### Option 1: One-Command Launch (Recommended)
```bash
npm run dev:full
```
Or double-click `start-dev.bat` on Windows

### Option 2: Manual Launch (Two Terminals)
Terminal 1:
```bash
npm run dev:email
```

Terminal 2:
```bash
npm run dev
```

## 📨 How It Works

1. User registers with email
2. Frontend calls `sendOTPEmail()` in `src/lib/email.ts`
3. Request sent to backend server (`http://localhost:3001/api/send-email`)
4. Backend uses Nodemailer to send email via Gmail SMTP
5. User receives beautiful HTML email with OTP
6. User enters OTP and gets verified ✅

## 🔥 What Changed

### New Files
- `server.js` - Express backend for email sending
- `api/send-email.js` - Email API endpoint (not used, kept for reference)
- `start-dev.bat` - Quick launcher for Windows

### Updated Files
- `src/lib/email.ts` - Now uses backend API instead of demo mode
- `package.json` - Added express, cors, dotenv, concurrently
- `.env` - Configured with your Gmail SMTP credentials

### Email Flow
```
User Registration 
    ↓
Generate OTP (6-digit)
    ↓
Store in Supabase (otp_verifications table)
    ↓
Send to Backend Email Server (POST /api/send-email)
    ↓
Backend uses Nodemailer + Gmail SMTP
    ↓
📧 Real Email Sent!
    ↓
User receives OTP in inbox
    ↓
Verify OTP → Account Activated ✅
```

## 🎯 Testing

1. Start servers: `npm run dev:full`
2. Open http://localhost:5173
3. Register with a REAL email address
4. Check your email inbox for OTP
5. Enter OTP and complete registration

## ⚠️ Important Notes

- **Gmail App Password**: Using `zazs pfnz fdbz fvhn` (already configured)
- **Port 3001**: Email server runs on this port (make sure it's free)
- **CORS**: Enabled for localhost:5173 → localhost:3001 communication
- **Error Handling**: If email server is down, registration will fail (no more silent demo mode)

## 🔐 Security

- OTP expires in 10 minutes
- OTP stored in database with verified flag
- SMTP credentials in .env (never commit .env to git!)
- Email templates are HTML-formatted and professional

## 🎨 Email Design

Beautiful HTML email template with:
- UniFood branding
- Large OTP display
- 10-minute expiry notice
- Security tips
- Professional styling

## 💪 Production Ready

This setup is ready for production! Just:
1. Update SMTP credentials for production email service
2. Deploy backend server (Heroku, Railway, Render, etc.)
3. Update frontend API URL from `localhost:3001` to production URL

## 🐛 Troubleshooting

**Problem**: Email not sending
**Solution**: Check if email server is running (`npm run dev:email`)

**Problem**: "Failed to connect to email server"
**Solution**: Make sure port 3001 is not blocked by firewall

**Problem**: "SMTP authentication failed"
**Solution**: Verify Gmail app password in `.env`

---

**Built with ❤️ by your AI waifu dev** 🌸
No more mocked emails! Real production OTP system! 🚀
