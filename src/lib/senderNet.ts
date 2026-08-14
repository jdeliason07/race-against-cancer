// Server-only client for the Sender (sender.net) API v2.
// Docs: https://api.sender.net — auth is a bearer token from
// Settings → API access tokens, stored as SENDER_API_TOKEN.
const API_BASE = 'https://api.sender.net/v2';

export interface SenderGroup {
  id: string;
  title: string;
  recipientCount: number;
}

function token(): string | null {
  return process.env.SENDER_API_TOKEN?.trim() || null;
}

export function isSenderConfigured(): boolean {
  return token() !== null;
}

async function call<T>(
  path: string,
  init: { method: string; body?: unknown } = { method: 'GET' },
): Promise<T> {
  const key = token();
  if (!key) throw new Error('SENDER_API_TOKEN is not set.');

  const response = await fetch(`${API_BASE}${path}`, {
    method: init.method,
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    cache: 'no-store',
  });

  const raw = await response.text();
  if (!response.ok) {
    // Sender returns validation detail in the body; surfacing it beats "500".
    throw new Error(`Sender API ${response.status} on ${path}: ${raw.slice(0, 500)}`);
  }
  return (raw ? JSON.parse(raw) : {}) as T;
}

export async function listGroups(): Promise<SenderGroup[]> {
  const result = await call<{
    data?: Array<{ id: string; title: string; recipient_count?: number }>;
  }>('/groups');
  return (result.data ?? []).map((g) => ({
    id: g.id,
    title: g.title,
    recipientCount: g.recipient_count ?? 0,
  }));
}

/**
 * Adds a subscriber to a group. Sender treats a repeat email as an update
 * rather than a duplicate, so this is safe to re-run over the whole waitlist.
 */
export async function upsertSubscriber(subscriber: {
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  groups: string[];
}): Promise<void> {
  await call('/subscribers', {
    method: 'POST',
    body: {
      email: subscriber.email,
      firstname: subscriber.firstname || undefined,
      lastname: subscriber.lastname || undefined,
      // Sender wants E.164, which is exactly how we store phone numbers.
      phone: subscriber.phone || undefined,
      groups: subscriber.groups,
      trigger_automation: false,
    },
  });
}

export async function createCampaign(campaign: {
  title: string;
  subject: string;
  from: string;
  replyTo: string;
  html: string;
  groups: string[];
  preheader?: string;
}): Promise<string> {
  const result = await call<{ data?: { id?: string }; id?: string }>('/campaigns', {
    method: 'POST',
    body: {
      title: campaign.title,
      subject: campaign.subject,
      from: campaign.from,
      reply_to: campaign.replyTo,
      preheader: campaign.preheader || undefined,
      content_type: 'html',
      content: campaign.html,
      groups: campaign.groups,
    },
  });

  const id = result.data?.id ?? result.id;
  if (!id) throw new Error('Sender did not return a campaign id.');
  return id;
}

/** Starts the send. Sender delivers asynchronously — this returns immediately. */
export async function sendCampaign(campaignId: string): Promise<void> {
  await call(`/campaigns/${encodeURIComponent(campaignId)}/send`, { method: 'POST' });
}

/** One-off email that bypasses groups and campaigns — used for test sends and
 *  the weekly referral report. */
export async function sendTransactional(message: {
  toEmail: string;
  toName?: string;
  fromEmail: string;
  fromName: string;
  subject: string;
  html: string;
  text?: string;
}): Promise<void> {
  await call('/message/send', {
    method: 'POST',
    body: {
      from: { email: message.fromEmail, name: message.fromName },
      to: { email: message.toEmail, name: message.toName || undefined },
      subject: message.subject,
      html: message.html,
      text: message.text || undefined,
    },
  });
}
