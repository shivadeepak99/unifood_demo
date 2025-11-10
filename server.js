// 🚀 Simple Express server for email sending
// Run this alongside your Vite dev server: node server.js

import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// SMTP Configuration from environment
const transporter = nodemailer.createTransport({
  host: process.env.VITE_SMTP_HOST,
  port: parseInt(process.env.VITE_SMTP_PORT || '587'),
  secure: process.env.VITE_SMTP_SECURE === 'true',
  auth: {
    user: process.env.VITE_SMTP_USER,
    pass: process.env.VITE_SMTP_PASS
  }
});

// Verify SMTP connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP connection failed:', error);
  } else {
    console.log('✅ SMTP server is ready to send emails');
  }
});

// 📧 Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, html, from } = req.body;

    if (!to || !subject || !html) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const info = await transporter.sendMail({
      from: from || `"${process.env.VITE_FROM_NAME}" <${process.env.VITE_FROM_EMAIL}>`,
      to,
      subject,
      html
    });

    console.log(`✅ Email sent to ${to}: ${info.messageId}`);
    
    res.json({ 
      success: true, 
      messageId: info.messageId 
    });

  } catch (error) {
    console.error('❌ Email sending error:', error);
    res.status(500).json({ 
      error: 'Failed to send email', 
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'UniFood Email Server' });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Email server running on http://localhost:${PORT}`);
  console.log(`📧 SMTP configured: ${process.env.VITE_SMTP_USER}`);
  console.log(`🔥 Ready to send emails!\n`);
});
