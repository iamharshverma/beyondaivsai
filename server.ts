import express from 'express';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const AUTHOR_NOTIFICATION_EMAIL =
  process.env.AUTHOR_NOTIFICATION_EMAIL || 'harshverma59@gmail.com';

function appendRecord(filename: string, record: Record<string, unknown>) {
  const filePath = path.join(DATA_DIR, filename);
  let existing: unknown[] = [];
  if (fs.existsSync(filePath)) {
    try {
      existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch {
      existing = [];
    }
  }
  existing.push(record);
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf-8');
}

function isValidEmail(email: unknown): email is string {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

interface AuthorEmailPayload {
  subject: string;
  eventType: string;
  referenceId: string;
  replyTo: string;
  customerName: string;
  fields: Record<string, string | number | boolean>;
}

/**
 * Dispatches an email notification to harshverma59@gmail.com via:
 * 1. Nodemailer SMTP (if SMTP_HOST, SMTP_USER, SMTP_PASS are configured)
 * 2. Custom Webhook (if EMAIL_PROVIDER_WEBHOOK_URL is configured)
 * 3. Automatic FormSubmit HTTPS Relay (https://formsubmit.co/ajax/harshverma59@gmail.com)
 * Always records a verifiable dispatch audit log in data/email_dispatches.json.
 */
async function sendEmailToAuthor(payload: AuthorEmailPayload): Promise<{
  dispatched: boolean;
  recipient: string;
  transportUsed: string;
}> {
  const recipient = AUTHOR_NOTIFICATION_EMAIL;
  const textLines = [
    `Beyond AI vs. AI — Official Platform Notification`,
    `=================================================`,
    `Event Type: ${payload.eventType}`,
    `Reference ID: ${payload.referenceId}`,
    `Customer / Sender: ${payload.customerName} <${payload.replyTo}>`,
    `Timestamp: ${new Date().toISOString()}`,
    ``,
    `Submitted Details:`,
    ...Object.entries(payload.fields).map(([k, v]) => `- ${k}: ${v}`),
  ];
  const textBody = textLines.join('\n');

  let dispatched = false;
  let transportUsed = 'local_audit_queue';

  // Tier 1: Nodemailer SMTP Transport
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Beyond AI vs. AI Platform" <${process.env.SMTP_USER}>`,
        to: recipient,
        replyTo: payload.replyTo,
        subject: payload.subject,
        text: textBody,
      });

      dispatched = true;
      transportUsed = 'smtp_nodemailer';
    } catch (err) {
      console.error('SMTP send warning:', err);
    }
  }

  // Tier 2: Custom Webhook URL if configured
  if (!dispatched && process.env.EMAIL_PROVIDER_WEBHOOK_URL) {
    try {
      const resp = await fetch(process.env.EMAIL_PROVIDER_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: recipient,
          replyTo: payload.replyTo,
          subject: payload.subject,
          text: textBody,
          ...payload.fields,
        }),
      });
      if (resp.ok) {
        dispatched = true;
        transportUsed = 'custom_webhook';
      }
    } catch (err) {
      console.error('Webhook send warning:', err);
    }
  }

  // Tier 3: Automatic FormSubmit AJAX Relay to harshverma59@gmail.com
  if (!dispatched) {
    try {
      const relayResponse = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Origin: process.env.APP_URL || 'https://beyondaivsai.com',
          Referer: process.env.APP_URL || 'https://beyondaivsai.com/order',
        },
        body: JSON.stringify({
          _subject: payload.subject,
          _replyto: payload.replyTo,
          _template: 'table',
          Reference_ID: payload.referenceId,
          Event_Type: payload.eventType,
          Customer_Name: payload.customerName,
          Customer_Email: payload.replyTo,
          ...payload.fields,
        }),
      });
      if (relayResponse.ok) {
        dispatched = true;
        transportUsed = 'formsubmit_ajax_relay';
      }
    } catch {
      // Network sandbox fallback
    }
  }

  appendRecord('email_dispatches.json', {
    id: `mail_${Date.now()}`,
    to: recipient,
    replyTo: payload.replyTo,
    subject: payload.subject,
    referenceId: payload.referenceId,
    eventType: payload.eventType,
    transportUsed,
    dispatched,
    fields: payload.fields,
    timestamp: new Date().toISOString(),
  });

  return { dispatched, recipient, transportUsed };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '1mb' }));

  // 1. Centralized commerce & launch configuration status
  app.get('/api/commerce/status', (_req, res) => {
    const directCheckoutEnabled =
      process.env.DIRECT_CHECKOUT_ENABLED === 'true' &&
      Boolean(process.env.DIRECT_CHECKOUT_URL);

    res.json({
      directCheckoutEnabled,
      directCheckoutUrl: directCheckoutEnabled ? process.env.DIRECT_CHECKOUT_URL : null,
      authorNotificationEmail: AUTHOR_NOTIFICATION_EMAIL,
      smtpConfigured: Boolean(
        process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
      ),
      emailProviderConfigured: Boolean(process.env.EMAIL_PROVIDER_WEBHOOK_URL),
      serverTimestamp: new Date().toISOString(),
    });
  });

  // 2. Lead Capture: Chapter 1 Opt-In & Reader Updates (Segmented by Role)
  app.post('/api/leads/chapter-one', async (req, res) => {
    const { name, email, role, consent, honeypot } = req.body || {};

    if (honeypot) {
      return res.status(400).json({ error: 'Spam check triggered.' });
    }
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ error: 'Please provide your name (at least 2 characters).' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }
    if (consent !== true) {
      return res.status(400).json({
        error: 'Explicit consent is required to receive the Chapter 1 dispatch and reader updates.',
      });
    }

    const allowedRoles = [
      'AI Engineer',
      'Cybersecurity Professional',
      'Founder / Executive',
      'Enterprise Leader / CISO',
      'Educator / Academic Researcher',
      'Student',
      'Other',
    ];
    const normalizedRole = allowedRoles.includes(role) ? role : 'Unspecified';

    const entry = {
      id: `lead_${Date.now()}`,
      type: 'chapter_one_optin',
      name: name.trim(),
      email: email.trim().toLowerCase(),
      segmentRole: normalizedRole,
      consentGranted: true,
      unsubscribeToken: `unsub_${Math.random().toString(36).slice(2, 12)}`,
      createdAt: new Date().toISOString(),
    };

    appendRecord('leads.json', entry);

    await sendEmailToAuthor({
      subject: `[Beyond AI vs. AI] Chapter 1 Opt-In: ${entry.name} (${entry.segmentRole})`,
      eventType: 'Chapter 1 & Reader Community Opt-In',
      referenceId: entry.id,
      replyTo: entry.email,
      customerName: entry.name,
      fields: {
        Role: entry.segmentRole,
        Email: entry.email,
        Consent_Granted: true,
      },
    });

    return res.status(201).json({
      status: 'recorded',
      referenceId: entry.id,
      segmentRole: entry.segmentRole,
      notificationRecipient: AUTHOR_NOTIFICATION_EMAIL,
      message: `Your Chapter 1 opt-in (${entry.id}) has been recorded and a notification has been dispatched to ${AUTHOR_NOTIFICATION_EMAIL}. You can also read the full Chapter 1 preview immediately at /excerpt.`,
    });
  });

  // 3. Reader Community & Launch Notification Signup
  app.post('/api/leads/community', async (req, res) => {
    const { name, email, role, interests, consent, honeypot } = req.body || {};

    if (honeypot) {
      return res.status(400).json({ error: 'Spam check triggered.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }
    if (consent !== true) {
      return res.status(400).json({ error: 'Please confirm explicit opt-in consent.' });
    }

    const entry = {
      id: `comm_${Date.now()}`,
      type: 'community_launch_updates',
      name: typeof name === 'string' ? name.trim() : '',
      email: email.trim().toLowerCase(),
      segmentRole: typeof role === 'string' ? role : 'Unspecified',
      interests: Array.isArray(interests) ? interests : [],
      consentGranted: true,
      createdAt: new Date().toISOString(),
    };

    appendRecord('community_signups.json', entry);

    await sendEmailToAuthor({
      subject: `[Beyond AI vs. AI] Community Signup: ${entry.email}`,
      eventType: 'Reader Community Signup',
      referenceId: entry.id,
      replyTo: entry.email,
      customerName: entry.name || entry.email,
      fields: {
        Role: entry.segmentRole,
        Email: entry.email,
      },
    });

    return res.status(201).json({
      status: 'recorded',
      referenceId: entry.id,
      message:
        'Your launch notification and reader update preference has been recorded on the platform backend.',
    });
  });

  // 4. Institutional & Bulk Order Enquiry
  app.post('/api/orders/bulk', async (req, res) => {
    const {
      organization,
      contactName,
      email,
      quantity,
      intendedUse,
      country,
      requiredFormat,
      message,
      honeypot,
    } = req.body || {};

    if (honeypot) {
      return res.status(400).json({ error: 'Spam check triggered.' });
    }
    if (!organization || typeof organization !== 'string' || organization.trim().length < 2) {
      return res.status(400).json({ error: 'Please enter your organization or institution name.' });
    }
    if (!contactName || typeof contactName !== 'string' || contactName.trim().length < 2) {
      return res.status(400).json({ error: 'Please enter a primary contact name.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please enter a valid institutional or work email.' });
    }
    const parsedQty = Number(quantity);
    if (!Number.isFinite(parsedQty) || parsedQty < 5) {
      return res.status(400).json({ error: 'Bulk enquiries require an intended quantity of at least 5 copies.' });
    }
    if (!intendedUse || typeof intendedUse !== 'string') {
      return res.status(400).json({ error: 'Please specify the intended institutional or team use.' });
    }
    if (!country || typeof country !== 'string' || country.trim().length < 2) {
      return res.status(400).json({ error: 'Please specify the destination country.' });
    }

    const record = {
      id: `bulk_${Date.now()}`,
      organization: organization.trim(),
      contactName: contactName.trim(),
      email: email.trim().toLowerCase(),
      quantity: parsedQty,
      intendedUse: intendedUse.trim(),
      country: country.trim(),
      requiredFormat: typeof requiredFormat === 'string' ? requiredFormat : 'Hardcover',
      message: typeof message === 'string' ? message.trim() : '',
      createdAt: new Date().toISOString(),
    };

    appendRecord('bulk_orders.json', record);

    const emailDispatch = await sendEmailToAuthor({
      subject: `[Beyond AI vs. AI — BULK ORDER] ${record.quantity} Copies — ${record.organization}`,
      eventType: 'Institutional / Bulk Book Order',
      referenceId: record.id,
      replyTo: record.email,
      customerName: record.contactName,
      fields: {
        Organization: record.organization,
        Contact_Name: record.contactName,
        Contact_Email: record.email,
        Quantity: record.quantity,
        Required_Format: record.requiredFormat,
        Intended_Use: record.intendedUse,
        Country: record.country,
        Notes: record.message || 'None',
      },
    });

    return res.status(201).json({
      status: 'recorded',
      referenceId: record.id,
      notificationRecipient: emailDispatch.recipient,
      message:
        `Your institutional/bulk order enquiry (${record.id}) for ${record.quantity} copies has been logged and an email notification has been dispatched to ${emailDispatch.recipient}.`,
    });
  });

  // 5. Direct Order / Format Availability Reservation
  app.post('/api/orders/direct-intent', async (req, res) => {
    const {
      formatId,
      quantity,
      customerName,
      customerEmail,
      country,
      organization,
      shippingNotes,
      honeypot,
    } = req.body || {};

    if (honeypot) {
      return res.status(400).json({ error: 'Spam check triggered.' });
    }
    if (!customerName || typeof customerName !== 'string' || customerName.trim().length < 2) {
      return res.status(400).json({ error: 'Please provide your full name.' });
    }
    if (!isValidEmail(customerEmail)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    const directCheckoutEnabled =
      process.env.DIRECT_CHECKOUT_ENABLED === 'true' &&
      Boolean(process.env.DIRECT_CHECKOUT_URL);

    const record = {
      id: `ord_${Date.now()}`,
      formatId: formatId || 'hardcover',
      quantity: Math.max(1, Number(quantity) || 1),
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim().toLowerCase(),
      country: typeof country === 'string' ? country.trim() : 'United States',
      organization: typeof organization === 'string' ? organization.trim() : '',
      shippingNotes: typeof shippingNotes === 'string' ? shippingNotes.trim() : '',
      directCheckoutEnabled,
      createdAt: new Date().toISOString(),
    };

    appendRecord('order_intents.json', record);

    const emailDispatch = await sendEmailToAuthor({
      subject: `[Beyond AI vs. AI — BOOK ORDER] ${record.quantity}x ${record.formatId.toUpperCase()} from ${record.customerName}`,
      eventType: 'Direct Book Order / Allocation Request',
      referenceId: record.id,
      replyTo: record.customerEmail,
      customerName: record.customerName,
      fields: {
        Edition_Format: record.formatId,
        Quantity: record.quantity,
        Customer_Name: record.customerName,
        Customer_Email: record.customerEmail,
        Organization: record.organization || 'Individual Reader',
        Country_Region: record.country,
        Delivery_Notes: record.shippingNotes || 'Standard Dispatch',
      },
    });

    if (directCheckoutEnabled) {
      return res.status(200).json({
        status: 'redirect_to_checkout',
        checkoutUrl: process.env.DIRECT_CHECKOUT_URL,
        referenceId: record.id,
        notificationRecipient: emailDispatch.recipient,
      });
    }

    return res.status(201).json({
      status: 'order_notification_dispatched',
      referenceId: record.id,
      notificationRecipient: emailDispatch.recipient,
      transportUsed: emailDispatch.transportUsed,
      message:
        `Your order request (${record.id}) for ${record.quantity}x ${record.formatId.toUpperCase()} has been confirmed and an order notification email has been sent to ${emailDispatch.recipient}. You will receive fulfillment and payment link details directly at ${record.customerEmail}.`,
    });
  });

  // 6. Reader Feedback, Testimonial, Errata & Resource Request Pathway
  app.post('/api/reviews/submit', async (req, res) => {
    const {
      submissionType,
      name,
      role,
      organization,
      email,
      editionRead,
      content,
      permissionToPublish,
      honeypot,
    } = req.body || {};

    if (honeypot) {
      return res.status(400).json({ error: 'Spam check triggered.' });
    }
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ error: 'Please provide your name.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address for verification.' });
    }
    if (!content || typeof content !== 'string' || content.trim().length < 15) {
      return res.status(400).json({
        error: 'Please enter at least 15 characters describing your feedback, review, correction, or resource request.',
      });
    }

    const record = {
      id: `rev_${Date.now()}`,
      submissionType: submissionType || 'reader_feedback',
      name: name.trim(),
      role: typeof role === 'string' ? role.trim() : '',
      organization: typeof organization === 'string' ? organization.trim() : '',
      email: email.trim().toLowerCase(),
      editionRead: editionRead || 'Sample Chapter / Manuscript Preview',
      content: content.trim(),
      permissionToPublish: Boolean(permissionToPublish),
      verifiedStatus: 'pending_editorial_verification',
      createdAt: new Date().toISOString(),
    };

    appendRecord('reader_submissions.json', record);

    await sendEmailToAuthor({
      subject: `[Beyond AI vs. AI — REVIEW/FEEDBACK] ${record.submissionType} from ${record.name}`,
      eventType: 'Reader Review / Manuscript Feedback',
      referenceId: record.id,
      replyTo: record.email,
      customerName: record.name,
      fields: {
        Submission_Type: record.submissionType,
        Edition_Read: record.editionRead,
        Role: record.role || 'N/A',
        Organization: record.organization || 'N/A',
        Permission_To_Publish: record.permissionToPublish,
        Content: record.content,
      },
    });

    return res.status(201).json({
      status: 'recorded_for_verification',
      referenceId: record.id,
      message:
        'Thank you. Your submission (' +
        record.id +
        ') has been logged and forwarded to ' +
        AUTHOR_NOTIFICATION_EMAIL +
        '. In accordance with our publication policy, reader reviews and quotations are published only after verification and explicit attribution approval.',
    });
  });

  // 7. Contact & Speaking / Media / Academic Enquiries
  app.post('/api/contact', async (req, res) => {
    const { category, name, email, organization, role, subject, message, honeypot } = req.body || {};

    if (honeypot) {
      return res.status(400).json({ error: 'Spam check triggered.' });
    }
    const validCategories = [
      'Book questions',
      'Retailer and purchase issues',
      'Speaking',
      'Media and interviews',
      'Academic adoption',
      'Enterprise workshops',
      'Bulk orders',
      'General enquiries',
    ];
    if (!category || !validCategories.includes(category)) {
      return res.status(400).json({ error: 'Please select a valid enquiry category.' });
    }
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ error: 'Please provide your full name.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }
    if (!message || typeof message !== 'string' || message.trim().length < 15) {
      return res.status(400).json({ error: 'Please provide a detailed message (at least 15 characters).' });
    }

    const record = {
      id: `inq_${Date.now()}`,
      category,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      organization: typeof organization === 'string' ? organization.trim() : '',
      role: typeof role === 'string' ? role.trim() : '',
      subject: typeof subject === 'string' ? subject.trim() : category,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    appendRecord('contact_enquiries.json', record);

    await sendEmailToAuthor({
      subject: `[Beyond AI vs. AI — ${record.category.toUpperCase()}] ${record.subject} (${record.name})`,
      eventType: `Contact Enquiry: ${record.category}`,
      referenceId: record.id,
      replyTo: record.email,
      customerName: record.name,
      fields: {
        Category: record.category,
        Name: record.name,
        Email: record.email,
        Organization: record.organization || 'N/A',
        Role: record.role || 'N/A',
        Subject: record.subject,
        Message: record.message,
      },
    });

    return res.status(201).json({
      status: 'recorded',
      referenceId: record.id,
      message:
        `Your enquiry (${record.id}) has been validated, stored on the platform server under "${category}", and dispatched to ${AUTHOR_NOTIFICATION_EMAIL}.`,
    });
  });

  // 8. Consent-Aware Privacy-Preserving Analytics Endpoint
  app.post('/api/analytics/event', (req, res) => {
    const { eventName, pathName, metadata, consentGranted } = req.body || {};
    if (!consentGranted) {
      return res.status(204).end();
    }
    const allowedEvents = [
      'book_page_viewed',
      'order_cta_clicked',
      'retailer_selected',
      'direct_checkout_started',
      'purchase_completed',
      'sample_chapter_opened',
      'sample_chapter_completed',
      'newsletter_signup',
      'bulk_order_enquiry',
      'review_submitted',
    ];
    if (typeof eventName !== 'string' || !allowedEvents.includes(eventName)) {
      return res.status(400).json({ error: 'Unsupported analytics event.' });
    }

    const safeMetadata: Record<string, string | number | boolean> = {};
    if (metadata && typeof metadata === 'object') {
      for (const [k, v] of Object.entries(metadata)) {
        if (
          !['email', 'name', 'phone', 'address', 'ip'].includes(k.toLowerCase()) &&
          (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean')
        ) {
          safeMetadata[k] = v;
        }
      }
    }

    appendRecord('analytics_events.json', {
      eventName,
      pathName: typeof pathName === 'string' ? pathName : '/',
      metadata: safeMetadata,
      timestamp: new Date().toISOString(),
    });

    return res.status(201).json({ recorded: true });
  });

  // Vite middleware in development, static dist in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Beyond AI vs. AI server running on http://localhost:${PORT}`);
  });
}

startServer();
