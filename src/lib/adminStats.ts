// Server-only. Everything the admin dashboard shows from Stripe, gathered in
// two passes: one over customers, one over this event's PaymentIntents.
import type Stripe from 'stripe';
import { EVENT_NAME } from '@/config/site';
import { WAITLIST_SOURCE, eachEventIntent } from '@/lib/stripeRegistration';
import { COMP_SOURCE } from '@/lib/compRegistration';

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export interface PersonRow {
  name: string;
  email: string;
  at: string | null;
}

export interface AdminStats {
  waitlist: { total: number; newThisWeek: number; recent: PersonRow[] };
  registrations: {
    total: number;
    athletes: number;
    newThisWeek: number;
    tenK: number;
    funRun: number;
    covered: number;
    recent: PersonRow[];
  };
  money: { totalCents: number; thisWeekCents: number; payingRegistrations: number };
}

function parseDate(value: string | undefined): number | null {
  if (!value) return null;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms : null;
}

function toRow(customer: Stripe.Customer, at: string | undefined): PersonRow {
  return {
    name: customer.name ?? '(no name)',
    email: customer.email ?? '',
    at: at ?? null,
  };
}

function byNewest(a: PersonRow, b: PersonRow): number {
  return (parseDate(b.at ?? undefined) ?? 0) - (parseDate(a.at ?? undefined) ?? 0);
}

export async function buildAdminStats(stripe: Stripe): Promise<AdminStats> {
  const cutoff = Date.now() - WEEK_MS;

  const waitlist: PersonRow[] = [];
  const registrations: PersonRow[] = [];
  let waitlistNew = 0;
  let registrationsNew = 0;
  let athletes = 0;
  let tenK = 0;
  let funRun = 0;
  let covered = 0;

  const customerPass = stripe.customers
    .search({ query: `metadata['event']:'${EVENT_NAME}'`, limit: 100 })
    .autoPagingEach((customer) => {
      const meta = customer.metadata ?? {};

      if (meta.registered === 'true') {
        const row = toRow(customer, meta.registeredAt);
        registrations.push(row);
        if ((parseDate(meta.registeredAt) ?? 0) >= cutoff) registrationsNew++;

        const count = Number.parseInt(meta.participantCount ?? '1', 10);
        athletes += Number.isInteger(count) && count > 0 ? count : 1;

        if (meta.raceType === 'fun-run') funRun++;
        else if (meta.raceType === '10k') tenK++;
        if (meta.source === COMP_SOURCE) covered++;
        return;
      }

      if (meta.source === WAITLIST_SOURCE) {
        waitlist.push(toRow(customer, meta.submittedAt));
        if ((parseDate(meta.submittedAt) ?? 0) >= cutoff) waitlistNew++;
      }
    });

  let totalCents = 0;
  let thisWeekCents = 0;
  let payingRegistrations = 0;

  const intentPass = eachEventIntent(stripe, (intent) => {
    if (intent.status !== 'succeeded') return;
    const amount = intent.amount_received || intent.amount;
    totalCents += amount;
    payingRegistrations++;
    if (intent.created * 1000 >= cutoff) thisWeekCents += amount;
  });

  await Promise.all([customerPass, intentPass]);

  waitlist.sort(byNewest);
  registrations.sort(byNewest);

  return {
    waitlist: {
      total: waitlist.length,
      newThisWeek: waitlistNew,
      recent: waitlist.slice(0, 8),
    },
    registrations: {
      total: registrations.length,
      athletes,
      newThisWeek: registrationsNew,
      tenK,
      funRun,
      covered,
      recent: registrations.slice(0, 8),
    },
    money: { totalCents, thisWeekCents, payingRegistrations },
  };
}
