/// <reference path="../deno.d.ts" />
import { createClient } from 'npm:@supabase/supabase-js@2';
import nodemailer from 'npm:nodemailer@6.9.10';

type WebsiteMailPayload =
  | {
      type: 'contact';
      firstName: string;
      lastName?: string;
      email: string;
      message?: string;
    }
  | {
      type: 'subscribe';
      email: string;
    };

type MailContent = {
  html: string;
  text: string;
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const brandName = 'Advesa Trust';
const adminEmail = Deno.env.get('ADMIN_EMAIL') || 'advesatrust@hotmail.com';
const smtpFrom = Deno.env.get('SMTP_FROM') || `${brandName} <${adminEmail}>`;

const sanitize = (value = '') =>
  value
    .replaceAll('&', '\x26amp;')
    .replaceAll('<', '\x26lt;')
    .replaceAll('>', '\x26gt;')
    .replaceAll('"', '\x26quot;')
    .replaceAll("'", '\x26#039;');

const normalizeEmail = (value = '') => value.trim().toLowerCase();
const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const parseSecure = (value: string | undefined) => ['1', 'true', 'yes'].includes((value || '').toLowerCase());
const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const parsePayload = (value: unknown): WebsiteMailPayload | null => {
  if (!isRecord(value) || typeof value.email !== 'string') {
    return null;
  }

  if (value.type === 'subscribe') {
    return { type: 'subscribe', email: value.email };
  }

  if (value.type === 'contact' && typeof value.firstName === 'string') {
    return {
      type: 'contact',
      firstName: value.firstName,
      lastName: typeof value.lastName === 'string' ? value.lastName : '',
      email: value.email,
      message: typeof value.message === 'string' ? value.message : '',
    };
  }

  return null;
};

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });

const getServiceRoleKey = () => {
  const legacyKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_SECRET_KEY');
  if (legacyKey) return legacyKey;

  const secretKeys = Deno.env.get('SUPABASE_SECRET_KEYS');
  if (!secretKeys) return '';

  try {
    const parsed = JSON.parse(secretKeys) as Record<string, string>;
    return parsed.default || Object.values(parsed)[0] || '';
  } catch {
    return '';
  }
};

const requireConfig = () => {
  const missing = [
    ['SUPABASE_URL', Deno.env.get('SUPABASE_URL')],
    ['SUPABASE_SERVICE_ROLE_KEY', getServiceRoleKey()],
    ['SMTP_HOSTNAME', Deno.env.get('SMTP_HOSTNAME')],
    ['SMTP_USERNAME', Deno.env.get('SMTP_USERNAME')],
    ['SMTP_PASSWORD', Deno.env.get('SMTP_PASSWORD')],
  ].flatMap(([name, value]) => (value ? [] : [name]));

  if (missing.length > 0) {
    throw new Error(`Missing server configuration: ${missing.join(', ')}`);
  }
};

const transport = () => {
  const secure = parseSecure(Deno.env.get('SMTP_SECURE'));

  return nodemailer.createTransport({
    host: Deno.env.get('SMTP_HOSTNAME')!,
    port: Number(Deno.env.get('SMTP_PORT') || (secure ? 465 : 587)),
    secure,
    auth: {
      user: Deno.env.get('SMTP_USERNAME')!,
      pass: Deno.env.get('SMTP_PASSWORD')!,
    },
  });
};

const baseTemplate = (title: string, body: string) => `
  <div style="margin:0;background:#f4f7f5;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#1f2937;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      <div style="background:#101820;padding:24px 28px;border-top:4px solid #68B581;">
        <p style="margin:0;color:#b9d8c5;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">${brandName}</p>
        <h1 style="margin:10px 0 0;color:#ffffff;font-size:24px;line-height:1.3;">${title}</h1>
      </div>
      <div style="padding:28px;">
        ${body}
      </div>
      <div style="padding:18px 28px;background:#f8faf9;color:#64748b;font-size:12px;line-height:1.6;">
        <strong>${brandName}</strong><br />
        Flat 5, Block 2, Third Floor, Pace Prana Apartment, Padikuppam Road, Chennai 600040<br />
        advesatrust@hotmail.com
      </div>
    </div>
  </div>
`;

const adminTemplate = (payload: WebsiteMailPayload): MailContent => {
  if (payload.type === 'subscribe') {
    const email = sanitize(payload.email);
    return {
      html: baseTemplate(
        'New newsletter subscription',
        `
          <p style="font-size:16px;line-height:1.7;margin:0 0 18px;">A visitor subscribed to website updates.</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr>
              <td style="padding:10px;border:1px solid #e5e7eb;background:#f8faf9;font-weight:700;width:140px;">Email</td>
              <td style="padding:10px;border:1px solid #e5e7eb;">${email}</td>
            </tr>
          </table>
        `,
      ),
      text: `New newsletter subscription\n\nEmail: ${payload.email}`,
    };
  }

  const fullName = `${payload.firstName} ${payload.lastName || ''}`.trim();

  return {
    html: baseTemplate(
      'New website enquiry',
      `
        <p style="font-size:16px;line-height:1.7;margin:0 0 18px;">A visitor submitted the contact form.</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr>
            <td style="padding:10px;border:1px solid #e5e7eb;background:#f8faf9;font-weight:700;width:140px;">Name</td>
            <td style="padding:10px;border:1px solid #e5e7eb;">${sanitize(fullName)}</td>
          </tr>
          <tr>
            <td style="padding:10px;border:1px solid #e5e7eb;background:#f8faf9;font-weight:700;">Email</td>
            <td style="padding:10px;border:1px solid #e5e7eb;">${sanitize(payload.email)}</td>
          </tr>
          <tr>
            <td style="padding:10px;border:1px solid #e5e7eb;background:#f8faf9;font-weight:700;vertical-align:top;">Message</td>
            <td style="padding:10px;border:1px solid #e5e7eb;white-space:pre-wrap;">${sanitize(payload.message || 'No message provided')}</td>
          </tr>
        </table>
      `,
    ),
    text: `New website enquiry\n\nName: ${fullName}\nEmail: ${payload.email}\nMessage: ${payload.message || 'No message provided'}`,
  };
};

const userEnquiryTemplate = (payload: Extract<WebsiteMailPayload, { type: 'contact' }>): MailContent => ({
  html: baseTemplate(
    'Thank you for contacting us',
    `
      <p style="font-size:16px;line-height:1.7;margin:0 0 16px;">Dear ${sanitize(payload.firstName)},</p>
      <p style="font-size:16px;line-height:1.7;margin:0 0 16px;">
        Thank you for reaching out to ${brandName}. We have received your message and our team will get back to you shortly.
      </p>
      <div style="border-left:4px solid #68B581;background:#f8faf9;padding:14px 16px;margin-top:20px;color:#475569;">
        ${sanitize(payload.message || 'Your enquiry has been received.')}
      </div>
    `,
  ),
  text: `Dear ${payload.firstName},\n\nThank you for reaching out to ${brandName}. We have received your message and our team will get back to you shortly.\n\nYour message:\n${payload.message || 'Your enquiry has been received.'}`,
});

const subscriptionTemplate = (email: string): MailContent => ({
  html: baseTemplate(
    'You are subscribed',
    `
      <p style="font-size:16px;line-height:1.7;margin:0 0 16px;">Thank you for subscribing to ${brandName} updates.</p>
      <p style="font-size:16px;line-height:1.7;margin:0 0 16px;">
        We will share news about our events, activities, and impact stories with this email address:
      </p>
      <p style="font-size:16px;font-weight:700;color:#1f7a3a;margin:0;">${sanitize(email)}</p>
    `,
  ),
  text: `Thank you for subscribing to ${brandName} updates.\n\nSubscribed email: ${email}`,
});

const sendMail = async (
  to: string,
  subject: string,
  content: MailContent,
  replyTo?: string,
) => {
  await transport().sendMail({
    from: smtpFrom,
    to,
    subject,
    html: content.html,
    text: content.text,
    replyTo,
  });
};

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return jsonResponse({ ok: false, message: 'Method not allowed' }, 405);
  }

  let payload: WebsiteMailPayload | null;

  try {
    payload = parsePayload(await request.json());
  } catch (error) {
    return jsonResponse({ ok: false, message: error instanceof Error ? error.message : 'Invalid request' }, 400);
  }

  if (!payload) {
    return jsonResponse({ ok: false, message: 'Invalid request.' }, 400);
  }

  try {
    requireConfig();
  } catch {
    return jsonResponse({ ok: false, message: 'Email service is not configured.' }, 500);
  }

  const email = normalizeEmail(payload.email);

  if (!isEmail(email)) {
    return jsonResponse({ ok: false, message: 'Please enter a valid email address.' }, 400);
  }

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, getServiceRoleKey());

  if (payload.type === 'subscribe') {
    const record = {
      email,
      status: 'subscribed',
      updated_at: new Date().toISOString(),
      email_error: null,
    };

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .upsert(record, { onConflict: 'email' })
      .select('id')
      .single();

    if (error) {
      return jsonResponse({ ok: false, message: 'Could not save subscription.' }, 500);
    }

    try {
      await sendMail(adminEmail, `New newsletter subscription - ${email}`, adminTemplate({ type: 'subscribe', email }));
      await sendMail(email, `${brandName} newsletter subscription`, subscriptionTemplate(email));

      await supabase
        .from('newsletter_subscribers')
        .update({
          admin_notified_at: new Date().toISOString(),
          confirmation_sent_at: new Date().toISOString(),
          email_error: null,
        })
        .eq('id', data!.id);
    } catch (error) {
      await supabase
        .from('newsletter_subscribers')
        .update({ email_error: error instanceof Error ? error.message : 'Email delivery failed' })
        .eq('id', data!.id);

      return jsonResponse({ ok: false, message: 'Subscription saved, but email delivery failed.' }, 500);
    }

    return jsonResponse({ ok: true, message: 'Subscription received.' });
  }

  if (payload.type === 'contact') {
    const firstName = payload.firstName.trim();
    const lastName = (payload.lastName || '').trim();
    const message = (payload.message || '').trim();

    if (!firstName) {
      return jsonResponse({ ok: false, message: 'First name is required.' }, 400);
    }

    const contactPayload = { type: 'contact' as const, firstName, lastName, email, message };

    const { data, error } = await supabase
      .from('contact_enquiries')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        message,
        email_error: null,
      })
      .select('id')
      .single();

    if (error) {
      return jsonResponse({ ok: false, message: 'Could not save enquiry.' }, 500);
    }

    try {
      await sendMail(adminEmail, `New website enquiry - ${firstName}`, adminTemplate(contactPayload), email);
      await sendMail(email, `We received your enquiry - ${brandName}`, userEnquiryTemplate(contactPayload));

      await supabase
        .from('contact_enquiries')
        .update({
          admin_notified_at: new Date().toISOString(),
          user_notified_at: new Date().toISOString(),
          email_error: null,
        })
        .eq('id', data!.id);
    } catch (error) {
      await supabase
        .from('contact_enquiries')
        .update({ email_error: error instanceof Error ? error.message : 'Email delivery failed' })
        .eq('id', data!.id);

      return jsonResponse({ ok: false, message: 'Enquiry saved, but email delivery failed.' }, 500);
    }

    return jsonResponse({ ok: true, message: 'Enquiry received.' });
  }

  return jsonResponse({ ok: false, message: 'Unknown request type.' }, 400);
});