// CliniMedia · contact form → SMTP
// Receives JSON POST from the contact form, validates, sends two emails
// via SMTP credentials provided as Vercel environment variables, and
// returns a structured JSON response.
//
// Required env vars (set in Vercel → Settings → Environment Variables):
//   SMTP_HOST   e.g. smtp.zoho.com / smtp.gmail.com / smtp.office365.com
//   SMTP_PORT   587 (STARTTLS) or 465 (SSL)
//   SMTP_USER   the SMTP login user (typically the from-address mailbox)
//   SMTP_PASS   the SMTP password / app password
// Optional:
//   CONTACT_TO         override the destination address (default info@clinimedia.ca)
//   CONTACT_FROM       override the from address (default SMTP_USER)
//   CONTACT_REPLY_TO   override the reply-to (default the submitter's email)

const nodemailer = require('nodemailer');

const DEST = process.env.CONTACT_TO || 'info@clinimedia.ca';
const FROM = process.env.CONTACT_FROM || process.env.SMTP_USER;

function escapeHtml(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isEmail(s) {
  return typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 254;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === 'object') return resolve(req.body);
    let raw = '';
    req.on('data', (c) => {
      raw += c;
      if (raw.length > 32 * 1024) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', 'https://clinimedia.ca');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '86400');
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  // Origin allow-list — protects against form-spam from third-party domains.
  const origin = req.headers.origin || '';
  const allowedOrigins = [
    'https://clinimedia.ca',
    'https://www.clinimedia.ca',
  ];
  // Allow Vercel preview deployments (*.vercel.app) so previews work too.
  const isPreview = /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);
  const isLocal = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);
  if (origin && !allowedOrigins.includes(origin) && !isPreview && !isLocal) {
    return res.status(403).json({ ok: false, error: 'Forbidden origin' });
  }

  let body;
  try {
    body = await readBody(req);
  } catch {
    return res.status(400).json({ ok: false, error: 'Invalid body' });
  }

  // Honeypot — if the hidden `website` field is filled, treat it as spam
  // and silently 200-OK so the bot thinks it succeeded.
  if (body.website) {
    return res.status(200).json({ ok: true });
  }

  const clinic = (body.clinic || '').toString().trim().slice(0, 200);
  const name = (body.name || '').toString().trim().slice(0, 200);
  const email = (body.email || '').toString().trim().slice(0, 254);
  const phone = (body.phone || '').toString().trim().slice(0, 64);
  const plan = (body.plan || '').toString().trim().slice(0, 64);
  const notes = (body.notes || '').toString().trim().slice(0, 4000);

  if (!clinic || !name || !email) {
    return res.status(400).json({ ok: false, error: 'Missing required fields (clinic, name, email).' });
  }
  if (!isEmail(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email address.' });
  }

  // Env sanity — fail loudly if SMTP isn't configured.
  const missing = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'].filter((k) => !process.env[k]);
  if (missing.length) {
    console.error('SMTP env vars missing:', missing.join(', '));
    return res.status(500).json({ ok: false, error: 'Email service is not configured.' });
  }

  const port = parseInt(process.env.SMTP_PORT, 10);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465, // true for 465, false for 587 (STARTTLS)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const submittedAt = new Date().toISOString();
  const subject = `New inquiry from ${clinic} — CliniMedia.ca`;
  const textBody =
    `New clinic inquiry via clinimedia.ca\n\n` +
    `Clinic:  ${clinic}\n` +
    `Name:    ${name}\n` +
    `Email:   ${email}\n` +
    `Phone:   ${phone || '(not provided)'}\n` +
    `Plan:    ${plan || '(not selected)'}\n` +
    `Notes:\n${notes || '(none)'}\n\n` +
    `Submitted: ${submittedAt}\n` +
    `User-Agent: ${(req.headers['user-agent'] || '').slice(0, 256)}\n`;

  const htmlBody = `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#0E1418;background:#FBFAF6;padding:24px">
<table cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;padding:24px;max-width:560px;margin:0 auto;border:1px solid #E5E9ED">
<tr><td>
<p style="font-family:JetBrains Mono,monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#3F7E99;margin:0 0 12px">New clinic inquiry · clinimedia.ca</p>
<h1 style="font-size:22px;font-weight:700;margin:0 0 16px;color:#0E1418">${escapeHtml(clinic)}</h1>
<table cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;line-height:1.5">
<tr><td style="color:#5C6B77;padding:8px 0;width:90px">Name</td><td style="padding:8px 0"><strong>${escapeHtml(name)}</strong></td></tr>
<tr><td style="color:#5C6B77;padding:8px 0">Email</td><td style="padding:8px 0"><a href="mailto:${escapeHtml(email)}" style="color:#3F7E99">${escapeHtml(email)}</a></td></tr>
<tr><td style="color:#5C6B77;padding:8px 0">Phone</td><td style="padding:8px 0">${escapeHtml(phone) || '<em style="color:#A5B0BA">(not provided)</em>'}</td></tr>
<tr><td style="color:#5C6B77;padding:8px 0">Plan</td><td style="padding:8px 0">${escapeHtml(plan) || '<em style="color:#A5B0BA">(not selected)</em>'}</td></tr>
</table>
${notes ? `<div style="margin-top:16px;padding-top:16px;border-top:1px solid #E5E9ED"><p style="color:#5C6B77;font-size:12px;font-family:JetBrains Mono,monospace;letter-spacing:.15em;text-transform:uppercase;margin:0 0 8px">Notes</p><p style="font-size:14px;line-height:1.55;color:#0E1418;margin:0;white-space:pre-wrap">${escapeHtml(notes)}</p></div>` : ''}
<p style="margin-top:24px;font-size:11px;color:#A5B0BA;font-family:JetBrains Mono,monospace;letter-spacing:.1em">Submitted ${escapeHtml(submittedAt)}</p>
</td></tr></table>
</body></html>`;

  try {
    await transporter.sendMail({
      from: FROM,
      to: DEST,
      replyTo: process.env.CONTACT_REPLY_TO || email,
      subject,
      text: textBody,
      html: htmlBody,
      headers: {
        'X-Source': 'clinimedia.ca contact form',
      },
    });
  } catch (err) {
    console.error('SMTP send failed:', err && err.message);
    return res.status(502).json({ ok: false, error: 'Could not send your message. Please email info@clinimedia.ca directly.' });
  }

  return res.status(200).json({ ok: true });
};
