# 🍽️ UniFood - IIIT Kottayam Canteen Management System

**Version 1.1.0** | **Status: Production Ready** ✅

A modern, full-stack canteen management system built with React, TypeScript, and Supabase.

---

## 🌟 Features

### For Students 👨‍🎓
- ✅ Secure authentication with email verification
- 🍕 Browse menu with advanced filtering
- 🛒 Smart cart management
- 💳 Multiple payment options
- 📦 Real-time order tracking
- ⭐ Rate and review items
- 👤 Profile management with preferences

### For Managers 👨‍💼
- 📊 Comprehensive dashboard
- 📋 Order management system
- 📦 Inventory tracking
- 🍴 Menu management
- 📈 Analytics & insights
- 👥 Customer feedback overview

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

```bash
# Clone repository
git clone https://github.com/pavan-charan/unifood_demo.git
cd unifood_demo

# Install dependencies
npm install

# Set up environment
copy .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app! 🎉

---

## 🔧 Configuration

### Email Service Setup

Choose one of three email providers:

**1. Demo Mode (Development)**
```env
VITE_EMAIL_PROVIDER=demo
```
OTP codes logged to console - perfect for testing!

**2. Resend (Recommended for Production)**
```env
VITE_EMAIL_PROVIDER=resend
VITE_RESEND_API_KEY=re_your_api_key
```
Get your API key at [resend.com](https://resend.com)

**3. Nodemailer (SMTP)**
```env
VITE_EMAIL_PROVIDER=nodemailer
VITE_SMTP_HOST=smtp.gmail.com
VITE_SMTP_PORT=587
VITE_SMTP_USER=your-email@gmail.com
VITE_SMTP_PASS=your-app-password
```

For complete setup instructions, see [QUICK_SETUP.md](./QUICK_SETUP.md)

---

## 📚 Documentation

- 📖 [Quick Setup Guide](./QUICK_SETUP.md) - Get started in 5 minutes
- 📋 [Critical Fixes Changelog](./CRITICAL_FIXES_CHANGELOG.md) - Detailed changes
- ✨ [Fixes Summary](./FIXES_SUMMARY.md) - Complete overview
- 🔧 [Environment Template](./.env.example) - All configuration options

---

## 🔥 Recent Updates (v1.1.0)

### ✅ Critical Fixes Implemented

1. **Dynamic OTP System** 🔐
   - Real email integration with Resend/Nodemailer
   - 6-digit OTP with 10-minute expiration
   - Beautiful HTML email templates

2. **Complete Delete Account** 🗑️
   - Full database cleanup
   - GDPR compliant
   - Double confirmation for safety

3. **Production Password Reset** 🔒
   - Secure token-based flow
   - Real email via Supabase
   - 1-hour link expiration

4. **Cart Quantity Validation** ✨
   - Prevents negative values
   - Auto-remove at zero
   - Enhanced UX

See [CRITICAL_FIXES_CHANGELOG.md](./CRITICAL_FIXES_CHANGELOG.md) for details.

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Lucide Icons** - Icon library
- **React Hot Toast** - Notifications

### Backend & Services
- **Supabase** - Database & Auth
- **PostgreSQL** - Data storage
- **Resend/Nodemailer** - Email service
- **Stripe** - Payment processing

### Testing
- **Jest** - Test runner
- **React Testing Library** - Component testing

---

## 📁 Project Structure

```
unifood_demo/
├── src/
│   ├── components/       # React components
│   │   ├── auth/        # Authentication components
│   │   ├── student/     # Student interface
│   │   ├── manager/     # Manager interface
│   │   └── common/      # Shared components
│   ├── contexts/        # React Context providers
│   ├── lib/             # Utility libraries
│   └── types/           # TypeScript types
├── supabase/
│   └── migrations/      # Database migrations
├── .env.example         # Environment template
└── docs/                # Documentation
```

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

---

## 🚀 Deployment

### Build for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

### Environment Variables for Production

Required environment variables:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `VITE_EMAIL_PROVIDER` - Email service (resend/nodemailer)
- `VITE_RESEND_API_KEY` or SMTP credentials

See [.env.example](./.env.example) for complete list.

---

## 🐛 Troubleshooting

### Common Issues

**OTP not showing?**
- Check browser console (F12)
- Verify EMAIL_PROVIDER is set
- Ensure Supabase connection

**Delete account fails?**
- Check Supabase RLS policies
- Verify authentication

**Emails not sending?**
- Confirm API keys are correct
- Try demo mode first
- Check email service logs

For more help, see [QUICK_SETUP.md](./QUICK_SETUP.md)

---

## 📊 System Status

| Feature | Status | Version |
|---------|--------|---------|
| Authentication | ✅ Ready | 1.1.0 |
| OTP System | ✅ Ready | 1.1.0 |
| Password Reset | ✅ Ready | 1.1.0 |
| Menu Management | ✅ Ready | 1.0.0 |
| Order System | ✅ Ready | 1.0.0 |
| Payment | ✅ Ready | 1.0.0 |
| Analytics | ✅ Ready | 1.0.0 |
| Delete Account | ✅ Ready | 1.1.0 |

---

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines before submitting PRs.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Team

Built with ❤️ by the IIIT Kottayam development team.

---

## 📞 Support

- 📧 Email: support@unifood.iiitkottayam.ac.in
- 🐛 Issues: [GitHub Issues](https://github.com/pavan-charan/unifood_demo/issues)
- 📚 Docs: [Documentation](./QUICK_SETUP.md)

---

## 🎉 Acknowledgments

Special thanks to:
- IIIT Kottayam for the opportunity
- Supabase for the amazing backend platform
- The open-source community

---

**Made with 💕 for IIIT Kottayam students and staff**

*Last updated: November 5, 2025*
