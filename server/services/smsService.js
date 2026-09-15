export const TEST_SMS_INBOX = new Map();

/**
 * Production-grade SMS delivery service for OTPs.
 * Supports MSG91 (India) and Twilio.
 * Reads all credentials strictly from environment variables.
 */
export const sendOTPSMS = async ({ phone, otp, purpose = 'authentication' }) => {
  const provider = (process.env.SMS_PROVIDER || '').toLowerCase();

  // 1. Test verification mode when running automated tests
  if (process.env.NODE_ENV === 'test' || provider === 'test') {
    TEST_SMS_INBOX.set(phone, { otp, phone });
    return { success: true, provider: 'test-transport' };
  }

  // 2. MSG91 (India-compatible OTP API)
  if (provider === 'msg91' || process.env.MSG91_AUTH_KEY) {
    const authKey = process.env.MSG91_AUTH_KEY;
    if (!authKey) {
      throw new Error('SMS_SERVICE_NOT_CONFIGURED: Missing MSG91_AUTH_KEY in environment variables');
    }

    const templateId = process.env.MSG91_TEMPLATE_ID;
    const senderId = process.env.SMS_SENDER_ID || 'GIGMCH';

    // MSG91 OTP API
    const url = new URL('https://control.msg91.com/api/v5/otp');
    url.searchParams.append('template_id', templateId || '');
    url.searchParams.append('mobile', `91${phone}`);
    url.searchParams.append('authkey', authKey);
    url.searchParams.append('otp', otp);

    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`MSG91 SMS delivery failed: ${res.status} ${errText}`);
    }

    return { success: true, provider: 'msg91' };
  }

  // 3. Twilio Provider
  if (provider === 'twilio' || process.env.TWILIO_ACCOUNT_SID) {
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_PHONE_NUMBER;

    if (!sid || !token || !from) {
      throw new Error('SMS_SERVICE_NOT_CONFIGURED: Missing Twilio credentials (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER)');
    }

    const formattedTo = phone.startsWith('+') ? phone : `+91${phone}`;
    const messageBody = `Your GigMatch verification code is: ${otp}. Valid for 5 minutes. Do not share this code.`;

    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
    const formData = new URLSearchParams();
    formData.append('To', formattedTo);
    formData.append('From', from);
    formData.append('Body', messageBody);

    const res = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${sid}:${token}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Twilio SMS delivery failed: ${res.status} ${errText}`);
    }

    return { success: true, provider: 'twilio' };
  }

  throw new Error('SMS_SERVICE_NOT_CONFIGURED: No SMS provider credentials configured (MSG91_AUTH_KEY or TWILIO credentials missing).');
};
