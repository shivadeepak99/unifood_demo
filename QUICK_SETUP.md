# 🚀 Quick Setup Guide - UniFood Critical Fixes

## ⚡ TL;DR - Get Started in 5 Minutes!

### 1️⃣ Install Dependencies (Already Done!)
```bash
npm install
```

### 2️⃣ Create Environment File
```bash
# Copy the example file
copy .env.example .env
```

### 3️⃣ Configure for Development (Demo Mode)
Edit `.env`:
```env
# Supabase (Get from your project)
VITE_SUPABASE_URL=https://tawnfndnhnrjttchtncd.supabase.co
VITE_SUPABASE_ANON_KEY=your-key-here

# Email - Demo Mode (OTP logged to console)
VITE_EMAIL_PROVIDER=demo

# Other defaults are fine for development
```

### 4️⃣ Start Development Server
```bash
npm run dev
```

### 5️⃣ Test the Fixes! 🎉

**Test OTP System:**
1. Register at: http://localhost:5173/
2. Open browser console (F12)
3. Look for your OTP code (6 digits)
4. Enter it to verify

**Test Delete Account:**
1. Login → Settings → Data & Privacy
2. Click "Delete Account"
3. Type "DELETE" when prompted
4. Account is completely removed!

**Test Password Reset:**
1. Forgot Password link
2. Check console for reset link (demo mode)
3. Click link to reset password

---

## 🌐 Production Setup (When Ready)

### Option 1: Resend (Recommended) ⭐
```env
VITE_EMAIL_PROVIDER=resend
VITE_RESEND_API_KEY=re_your_api_key

# Get API key from: https://resend.com
```

### Option 2: Gmail via Nodemailer 📧
```env
VITE_EMAIL_PROVIDER=nodemailer
VITE_SMTP_HOST=smtp.gmail.com
VITE_SMTP_PORT=587
VITE_SMTP_USER=your-email@gmail.com
VITE_SMTP_PASS=your-app-password

# Gmail App Password: https://myaccount.google.com/apppasswords
```

---

## ✅ What's Fixed?

### 1. Dynamic OTP System ✨
- ❌ Before: Static OTP (123456) for everyone
- ✅ After: Unique 6-digit OTP per user, 10-min expiry

### 2. Delete Account Feature 🗑️
- ❌ Before: Only cleared localStorage
- ✅ After: Deletes ALL data from database + auth account

### 3. Password Reset 🔐
- ❌ Before: Demo mode only (console logs)
- ✅ After: Real emails via Supabase in production

### 4. Quantity Validation 🛒
- ❌ Before: No protection against negative quantities
- ✅ After: Proper validation + auto-remove at 0

---

## 🔍 How to Verify Everything Works

### ✅ OTP Test
```bash
# Start server
npm run dev

# Register new account
# Expected: Console shows:
╔═══════════════════════════════════════════════════════╗
│         📧 EMAIL SENT (DEMO MODE)                    │
╚═══════════════════════════════════════════════════════╝
📧 To: student@iiitkottayam.ac.in
🔐 Your OTP Code: 123456
⏰ Valid for: 10 minutes
```

### ✅ Delete Account Test
```bash
# Login → Settings → Data & Privacy → Delete Account
# Type "DELETE"
# Expected: All data removed from Supabase
```

### ✅ Password Reset Test
```bash
# Forgot Password → Enter email
# Expected (demo): Console shows reset link
# Expected (prod): Email with reset link
```

---

## 🐛 Troubleshooting

### OTP Not Showing in Console?
- Open DevTools (F12)
- Check Console tab
- Look for box drawing characters (╔═══╗)

### Delete Account Not Working?
- Check browser console for errors
- Verify Supabase connection
- Check RLS policies allow deletion

### Emails Not Sending?
- Verify `VITE_EMAIL_PROVIDER` is set
- Check API keys are correct
- Look for errors in console
- Test with demo mode first

---

## 📁 Files Changed

```
src/
├── lib/
│   └── email.ts                 ← ✅ Multi-provider email system
├── components/
│   ├── common/
│   │   └── Settings.tsx         ← ✅ Proper delete account
│   └── student/
│       └── MenuBrowser.tsx      ← ✅ Quantity validation
└── contexts/
    └── AuthContext.tsx          ← ✅ Production password reset

.env.example                     ← ✅ New config template
CRITICAL_FIXES_CHANGELOG.md      ← ✅ Full documentation
```

---

## 🎯 Next Steps

1. ✅ Test all features in development
2. 📧 Set up email service (Resend recommended)
3. 🌐 Configure Supabase email templates
4. 🚀 Deploy to production
5. 🎉 Celebrate your working system!

---

## 💡 Pro Tips

- **Development**: Use demo mode to avoid email limits
- **Staging**: Use Resend test mode
- **Production**: Verify your domain for best deliverability
- **Security**: Never commit `.env` to git!

---

## 🆘 Need Help?

1. Check `CRITICAL_FIXES_CHANGELOG.md` for detailed docs
2. Review `.env.example` for all options
3. Check browser console for errors
4. Verify Supabase connection

---

## 🎉 You're All Set!

All critical issues are now fixed! Your UniFood system is production-ready! 🚀

**Happy Coding!** 💕✨

---

*Built with love by your dev waifu goddess* 😘
