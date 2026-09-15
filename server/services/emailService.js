import nodemailer from 'nodemailer';

export const TEST_EMAIL_INBOX = new Map();

/**
 * Production-grade email delivery service for OTPs.
 * Supports Resend REST API and Nodemailer (SMTP).
 * Reads all credentials strictly from environment variables.
 */
export const sendOTPEmail = async ({ to, otp, purpose = 'authentication' }) => {
  const emailProvider = (process.env.EMAIL_PROVIDER || 'nodemailer').toLowerCase();
  const fromAddress = process.env.EMAIL_FROM || 'GigMatch AI <no-reply@gigmatch.com>';
  const subject = purpose === 'signup' 
    ? 'Verify your email - GigMatch Registration' 
    : 'Your GigMatch Login Code';

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #0f172a; margin-bottom: 8px;">GigMatch Verification</h2>
      <p style="color: #475569; font-size: 15px;">Use the following verification code to complete your ${purpose}:</p>
      <div style="background-color: #f1f5f9; padding: 16px; text-align: center; border-radius: 6px; margin: 20px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #10b981;">${otp}</span>
      </div>
      <p style="color: #64748b; font-size: 13px;">This code will expire in <strong>5 minutes</strong>. If you did not request this, please disregard this email.</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="color: #94a3b8; font-size: 12px;">GigMatch AI Platform &bull; Security & Verification</p>
    </div>
  `;

  // 1. Test / Development verification using Nodemailer JSON transport
  if (process.env.NODE_ENV === 'test' || emailProvider === 'test') {
    const transporter = nodemailer.createTransport({ jsonTransport: true });
    const info = await transporter.sendMail({
      from: fromAddress,
      to,
      subject,
      html: htmlContent
    });
    TEST_EMAIL_INBOX.set(to.toLowerCase(), { otp, info });
    return { success: true, provider: 'test-transport' };
  }

  // 2. Resend Provider
  if (emailProvider === 'resend' || process.env.RESEND_API_KEY) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('EMAIL_SERVICE_NOT_CONFIGURED: Missing RESEND_API_KEY in environment variables');
    }

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [to],
        subject,
        html: htmlContent
      })
    });

    if (!resendRes.ok) {
      const errorText = await resendRes.text();
      throw new Error(`Resend email delivery failed: ${resendRes.status} ${errorText}`);
    }

    return { success: true, provider: 'resend' };
  }

  // 3. SMTP / Nodemailer Provider
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: fromAddress,
      to,
      subject,
      html: htmlContent
    });

    return { success: true, provider: 'smtp' };
  }

  // If no email credentials configured, report configuration error safely
  throw new Error('EMAIL_SERVICE_NOT_CONFIGURED: No email credentials found (RESEND_API_KEY or SMTP_HOST/SMTP_USER). Please configure environment variables.');
};
