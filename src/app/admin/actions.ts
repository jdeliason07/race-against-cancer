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
  addSubscribersToGroup,
  createSubscriber,
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

    // Two paths, because Sender separates them: creating a subscriber it has
    // never seen, and adding one it already knows to another group. Anyone
    // synced into a previous group falls into the second case, so trying only
    // the first fails for every one of them.
    let created = 0;
    const alreadyExist: string[] = [];
    let phonesDropped = 0;
    let firstCreateError = '';

    for (const person of people) {
      try {
        await createSubscriber({ ...person, groups: [groupId] });
        created++;
        continue;
      } catch (err) {
        if (!firstCreateError) firstCreateError = err instanceof Error ? err.message : String(err);
      }

      // Phone is the field most likely to be refused and the least important
      // here, so retry without it before treating them as pre-existing.
      if (person.phone) {
        try {
          await createSubscriber({ ...person, phone: '', groups: [groupId] });
          created++;
          phonesDropped++;
          continue;
        } catch {
          // fall through
        }
      }

      alreadyExist.push(person.email);
    }

    let addedToGroup = 0;
    let groupAddError = '';
    if (alreadyExist.length > 0) {
      // Batched — Sender takes a list of emails per call.
      const BATCH = 100;
      for (let i = 0; i < alreadyExist.length; i += BATCH) {
        const batch = alreadyExist.slice(i, i + BATCH);
        try {
          await addSubscribersToGroup(groupId, batch);
          addedToGroup += batch.length;
        } catch (err) {
          if (!groupAddError) groupAddError = err instanceof Error ? err.message : String(err);
        }
      }
    }

    const total = created + addedToGroup;
    if (total === 0) {
      return {
        error:
          `None of the ${people.length} signups synced. ` +
          `Creating them failed with: ${firstCreateError || 'unknown error'}. ` +
          `Adding the existing ones to the group failed with: ${groupAddError || 'not attempted'}.`,
      };
    }

    const parts = [`${total} of ${people.length} waitlist signups are now in this group`];
    if (created) parts.push(`${created} newly created`);
    if (addedToGroup) parts.push(`${addedToGroup} already existed and were added`);
    if (phonesDropped) parts.push(`${phonesDropped} without a phone number Sender would accept`);
    const remaining = people.length - total;
    if (remaining > 0) parts.push(`${remaining} failed: ${groupAddError || firstCreateError}`);

    return { ok: true, message: `${parts.join(' — ')}.` };
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
