'use server';
import { CONTACT_EMAIL, EVENT_NAME, ORG_NAME } from '@/config/site';
import { checkPassword, endSession, requireAdmin, startSession } from '@/lib/adminAuth';
import { getStripe, WAITLIST_SOURCE } from '@/lib/stripeRegistration';
import {
  createCampaign,
  isSenderConfigured,
  listGroups,
  sendCampaign,
  sendTransactional,
  upsertSubscriber,
  type SenderGroup,
} from '@/lib/senderNet';

export type ActionResult = { ok: true; message: string } | { error: string };

export async function signIn(password: string): Promise<{ ok: true } | { error: string }> {
  if (!checkPassword(password)) {
    return { error: 'Wrong password.' };
  }
  await startSession();
  return { ok: true };
}

export async function signOut(): Promise<void> {
  await endSession();
}

export async function fetchGroups(): Promise<{ groups: SenderGroup[] } | { error: string }> {
  await requireAdmin();
  if (!isSenderConfigured()) return { error: 'SENDER_API_TOKEN is not set.' };
  try {
    return { groups: await listGroups() };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Could not load groups.' };
  }
}

/**
 * Copies waitlist signups from Stripe into a Sender group.
 *
 * Sender is the list of record for sending: it owns unsubscribes, and bulk
 * email has to honour those. Stripe stays the list of record for who signed up.
 */
export async function syncWaitlistToGroup(groupId: string): Promise<ActionResult> {
  await requireAdmin();
  if (!isSenderConfigured()) return { error: 'SENDER_API_TOKEN is not set.' };
  if (!groupId) return { error: 'Choose a group to sync into.' };

  const stripe = getStripe();
  if (!stripe) return { error: 'Stripe is not configured.' };

  try {
    const people: Array<{ email: string; firstname: string; lastname: string; phone: string }> = [];

    await stripe.customers
      .search({
        query: `metadata['source']:'${WAITLIST_SOURCE}' AND metadata['event']:'${EVENT_NAME}'`,
        limit: 100,
      })
      .autoPagingEach((customer) => {
        if (!customer.email) return;
        const [firstname = '', ...rest] = (customer.name ?? '').trim().split(/\s+/);
        people.push({
          email: customer.email,
          firstname,
          lastname: rest.join(' '),
          phone: customer.phone ?? '',
        });
      });

    if (people.length === 0) {
      return { error: 'No waitlist signups found in Stripe.' };
    }

    let synced = 0;
    let failed = 0;
    let firstError = '';

    let phonesDropped = 0;

    for (const person of people) {
      try {
        await upsertSubscriber({ ...person, groups: [groupId] });
        synced++;
      } catch (firstAttempt) {
        // Phone is the field most likely to be rejected and the least
        // important here — email is what we're syncing for. Retry without it
        // before giving up on the person.
        if (person.phone) {
          try {
            await upsertSubscriber({ ...person, phone: '', groups: [groupId] });
            synced++;
            phonesDropped++;
            continue;
          } catch {
            // Fall through and report the original failure.
          }
        }
        const err = firstAttempt;
        failed++;
        // Keep whatever Sender said — without it a failed sync is unfixable.
        if (!firstError) firstError = err instanceof Error ? err.message : String(err);
        // A wrong token or a rejected payload fails identically for everyone,
        // so stop rather than making 24 doomed requests.
        if (synced === 0 && failed >= 3) {
          return {
            error: `Sender rejected the first ${failed} subscribers, so the rest were skipped. It said: ${firstError}`,
          };
        }
      }
    }

    if (synced === 0) {
      return { error: `None of the ${people.length} signups synced. Sender said: ${firstError}` };
    }

    const phoneNote = phonesDropped
      ? ` ${phonesDropped} went in without a phone number, which Sender rejected.`
      : '';
    if (failed > 0) {
      return {
        ok: true,
        message: `Synced ${synced} of ${people.length}.${phoneNote} ${failed} failed — Sender said: ${firstError}`,
      };
    }
    return { ok: true, message: `Synced all ${synced} waitlist signups.${phoneNote}` };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Sync failed.' };
  }
}

/** Plain text in, simple HTML out — so the composer stays a textarea and
 *  nobody has to hand-write markup. */
function toHtml(body: string): string {
  const escape = (value: string) =>
    value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const paragraphs = body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => `<p style="margin:0 0 16px;">${escape(block).replace(/\n/g, '<br />')}</p>`)
    .join('\n');

  return `<div style="font-family:system-ui,-apple-system,sans-serif;font-size:16px;line-height:1.6;color:#1C1719;max-width:600px;">
${paragraphs}
</div>`;
}

export async function sendTestEmail(data: {
  toEmail: string;
  subject: string;
  body: string;
}): Promise<ActionResult> {
  await requireAdmin();
  if (!isSenderConfigured()) return { error: 'SENDER_API_TOKEN is not set.' };
  if (!data.toEmail.trim()) return { error: 'Enter an email address to send the test to.' };
  if (!data.subject.trim() || !data.body.trim()) {
    return { error: 'Subject and message are both required.' };
  }

  try {
    await sendTransactional({
      toEmail: data.toEmail.trim(),
      fromEmail: process.env.SENDER_FROM_EMAIL?.trim() || CONTACT_EMAIL,
      fromName: ORG_NAME,
      subject: `[TEST] ${data.subject.trim()}`,
      html: toHtml(data.body),
      text: data.body,
    });
    return { ok: true, message: `Test sent to ${data.toEmail.trim()}.` };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Test send failed.' };
  }
}

/**
 * Creates the campaign in Sender and starts it. There is no undo once this
 * returns — the UI requires a typed confirmation before calling it.
 */
export async function sendCampaignToGroup(data: {
  groupId: string;
  subject: string;
  body: string;
  preheader: string;
}): Promise<ActionResult> {
  await requireAdmin();
  if (!isSenderConfigured()) return { error: 'SENDER_API_TOKEN is not set.' };
  if (!data.groupId) return { error: 'Choose a group to send to.' };
  if (!data.subject.trim()) return { error: 'Enter a subject line.' };
  if (!data.body.trim()) return { error: 'Write a message before sending.' };

  try {
    const campaignId = await createCampaign({
      title: `${data.subject.trim()} — ${new Date().toISOString().slice(0, 10)}`,
      subject: data.subject.trim(),
      from: ORG_NAME,
      replyTo: process.env.SENDER_FROM_EMAIL?.trim() || CONTACT_EMAIL,
      preheader: data.preheader.trim(),
      html: toHtml(data.body),
      groups: [data.groupId],
    });

    await sendCampaign(campaignId);
    return {
      ok: true,
      message: `Campaign ${campaignId} is sending. Delivery reports are in Sender.`,
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Send failed.' };
  }
}
