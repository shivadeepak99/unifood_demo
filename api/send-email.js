// 📧 Backend API endpoint for sending emails via Nodemailer
// This runs on the server, not in the browser
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, subject, html, smtp, from } = req.body;

    // Validate required fields
    if (!to || !subject || !html || !smtp) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: {
        user: smtp.auth.user,
        pass: smtp.auth.pass
      }
    });

    // Send email
    const info = await transporter.sendMail({
      from: from,
      to: to,
      subject: subject,
      html: html
    });

    console.log(`✅ Email sent: ${info.messageId}`);
    
    return res.status(200).json({ 
      success: true, 
      messageId: info.messageId 
    });

  } catch (error) {
    console.error('❌ Email sending error:', error);
    return res.status(500).json({ 
      error: 'Failed to send email', 
      details: error.message 
    });
  }
}
