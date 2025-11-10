import { supabase } from './supabase'

// 🔥 EMAIL SERVICE CONFIGURATION
// Set to 'demo', 'nodemailer', or 'resend'
const EMAIL_PROVIDER = (import.meta.env.VITE_EMAIL_PROVIDER || 'demo') as 'demo' | 'nodemailer' | 'resend';

// ✨ Nodemailer configuration (for SMTP services like Gmail, Outlook, etc.)
const SMTP_CONFIG = {
  host: import.meta.env.VITE_SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(import.meta.env.VITE_SMTP_PORT || '587'),
  secure: import.meta.env.VITE_SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: import.meta.env.VITE_SMTP_USER || '',
    pass: import.meta.env.VITE_SMTP_PASS || ''
  }
};

// 💌 Resend API configuration (modern email service)
const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY || '';

// 📧 Email sender configuration
const FROM_EMAIL = import.meta.env.VITE_FROM_EMAIL || 'noreply@unifood.iiitkottayam.ac.in';
const FROM_NAME = import.meta.env.VITE_FROM_NAME || 'UniFood IIIT Kottayam';

/**
 * Send OTP email using configured email service
 * Supports: Demo mode, Nodemailer (SMTP), and Resend
 */
export const sendOTPEmail = async (email: string, otp: string): Promise<boolean> => {
  try {
    // Store OTP in database first
    const { error } = await supabase
      .from('otp_verifications')
      .insert({
        email,
        otp,
        expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes
        verified: false
      })

    if (error) {
      console.error('Error storing OTP:', error)
      return false
    }

    // Send email based on configured provider
    switch (EMAIL_PROVIDER) {
      case 'nodemailer':
        return await sendEmailViaNodemailer(email, otp);
      
      case 'resend':
        return await sendEmailViaResend(email, otp);
      
      case 'demo':
      default:
        // 🎯 DEMO MODE: Log OTP to console for testing
        console.log('\n╔═══════════════════════════════════════════════════════╗');
        console.log('│         📧 EMAIL SENT (DEMO MODE)                    │');
        console.log('╚═══════════════════════════════════════════════════════╝');
        console.log(`📧 To: ${email}`);
        console.log(`🔐 Your OTP Code: ${otp}`);
        console.log(`⏰ Valid for: 10 minutes`);
        console.log(`💡 Use this OTP to verify your email\n`);
        
        // Simulate email sending delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return true;
    }
  } catch (error) {
    console.error('Error sending OTP email:', error)
    return false
  }
}

/**
 * Send email via Nodemailer (SMTP)
 * Works with Gmail, Outlook, custom SMTP servers
 */
async function sendEmailViaNodemailer(email: string, otp: string): Promise<boolean> {
  try {
    // Check if running in browser (Nodemailer only works in Node.js)
    if (typeof window !== 'undefined') {
      console.error('❌ Nodemailer cannot run in browser. Use serverless function or backend API.');
      return false;
    }

    // Dynamic import for Node.js environment only
    const nodemailer = await import('nodemailer');
    
    const transporter = nodemailer.default.createTransport(SMTP_CONFIG);

    const mailOptions = {
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: email,
      subject: '🔐 Your UniFood Verification Code',
      html: getOTPEmailTemplate(otp)
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent to ${email} via Nodemailer`);
    return true;
  } catch (error) {
    console.error('Nodemailer error:', error);
    return false;
  }
}

/**
 * Send email via Resend API
 * Modern, developer-friendly email service
 */
async function sendEmailViaResend(email: string, otp: string): Promise<boolean> {
  try {
    if (!RESEND_API_KEY) {
      console.error('❌ Resend API key not configured');
      return false;
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: email,
        subject: '🔐 Your UniFood Verification Code',
        html: getOTPEmailTemplate(otp)
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Resend API error:', error);
      return false;
    }

    console.log(`✅ OTP sent to ${email} via Resend`);
    return true;
  } catch (error) {
    console.error('Resend error:', error);
    return false;
  }
}

/**
 * Beautiful HTML email template for OTP
 */
function getOTPEmailTemplate(otp: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>UniFood Verification Code</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <tr>
                  <td style="padding: 40px; text-align: center;">
                    <h1 style="color: #2563eb; margin: 0 0 20px 0; font-size: 28px;">🍽️ UniFood</h1>
                    <p style="color: #4b5563; font-size: 16px; margin: 0 0 30px 0;">
                      Welcome to IIIT Kottayam Canteen Management System
                    </p>
                    
                    <div style="background-color: #eff6ff; border: 2px dashed #2563eb; border-radius: 8px; padding: 30px; margin: 0 0 30px 0;">
                      <p style="color: #1f2937; font-size: 14px; margin: 0 0 15px 0; font-weight: 600;">
                        Your Verification Code
                      </p>
                      <div style="font-size: 36px; font-weight: bold; color: #2563eb; letter-spacing: 8px; margin: 10px 0;">
                        ${otp}
                      </div>
                      <p style="color: #6b7280; font-size: 12px; margin: 15px 0 0 0;">
                        Valid for 10 minutes
                      </p>
                    </div>
                    
                    <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
                      Enter this code to verify your email address and complete your registration.
                      If you didn't request this code, please ignore this email.
                    </p>
                    
                    <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; text-align: left;">
                      <p style="color: #92400e; font-size: 13px; margin: 0; line-height: 1.5;">
                        <strong>⚠️ Security Tip:</strong> Never share this code with anyone. 
                        UniFood staff will never ask for your verification code.
                      </p>
                    </div>
                    
                    <p style="color: #9ca3af; font-size: 12px; margin: 30px 0 0 0;">
                      © 2025 UniFood - IIIT Kottayam<br>
                      Canteen Management System
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

export const verifyOTP = async (email: string, otp: string): Promise<boolean> => {
  try {
    // 🔍 Check if user is already verified
    const { data: userData } = await supabase
      .from('users')
      .select('is_verified')
      .eq('email', email)
      .single()
    
    if (userData?.is_verified) {
      // User already verified, return false to show appropriate message
      console.log('User already verified')
      return false
    }

    const { data, error } = await supabase
      .from('otp_verifications')
      .select('*')
      .eq('email', email)
      .eq('otp', otp)
      .eq('verified', false)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error || !data) {
      return false
    }

    // Mark OTP as verified
    await supabase
      .from('otp_verifications')
      .update({ verified: true })
      .eq('id', data.id)

    return true
  } catch (error) {
    console.error('Error verifying OTP:', error)
    return false
  }
}

export const generateOTP = (): string => {
  // 🎲 Generate secure 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString()
}