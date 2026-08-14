import { Suspense } from 'react';
import Link from 'next/link';
import { REGISTRATION_OPEN, REGISTRATION_OPENS_LABEL } from '@/config/site';
import { getStripe } from '@/lib/stripeRegistration';
import { buildAdminStats, type PersonRow } from '@/lib/adminStats';
import { buildReferralReport } from '@/lib/referralReport';
import { isSenderConfigured, listCampaigns } from '@/lib/senderNet';

function money(cents: number): string {
  return `$${Math.round(cents / 100).toLocaleString()}`;
}

function when(value: string | null): string {
  if (!value) return '';
  const ms = Date.parse(value);
  if (!Number.isFinite(ms)) return '';
  return new Date(ms).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function pct(part: number, whole: number): string {
  if (!whole) return '—';
  return `${Math.round((part / whole) * 100)}%`;
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-card border border-line p-5">
      <p className="section-label mb-2">{label}</p>
      <p className="font-display text-3xl uppercase leading-none text-ink">{value}</p>
      {sub && <p className="mt-2 font-body text-xs text-ash">{sub}</p>}
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="mb-4 font-display text-2xl uppercase text-ink">{title}</h2>
      {children}
    </section>
  );
}

function PeopleList({ rows, empty }: { rows: PersonRow[]; empty: string }) {
  if (rows.length === 0) {
    return <p className="font-body text-sm text-ash">{empty}</p>;
  }
  return (
    <ul className="divide-y divide-line rounded-card border border-line">
      {rows.map((row) => (
        <li key={row.email} className="flex items-baseline justify-between gap-4 px-4 py-3">
          <span className="min-w-0 font-body text-sm text-ink">
            <span className="font-bold">{row.name}</span>
            <span className="ml-2 break-all text-ash">{row.email}</span>
          </span>
          <span className="shrink-0 font-body text-xs text-ash">{when(row.at)}</span>
        </li>
      ))}
    </ul>
  );
}

async function StripePanels() {
  const stripe = getStripe();
  if (!stripe) {
    return <p className="font-body text-sm text-ash">Stripe is not configured.</p>;
  }

  // A Stripe outage should cost this panel, not the whole dashboard.
  let stats;
  let referrals;
  try {
    [stats, referrals] = await Promise.all([
      buildAdminStats(stripe),
      buildReferralReport(stripe).catch(() => null),
    ]);
  } catch (err) {
    return (
      <p className="rounded-card border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-red-700">
        Could not load Stripe numbers: {err instanceof Error ? err.message : 'unknown error'}
      </p>
    );
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Waitlist"
          value={stats.waitlist.total.toLocaleString()}
          sub={`${stats.waitlist.newThisWeek} joined this week`}
        />
        <Stat
          label="Registered"
          value={stats.registrations.total.toLocaleString()}
          sub={
            stats.registrations.athletes !== stats.registrations.total
              ? `${stats.registrations.athletes} athletes in total`
              : `${stats.registrations.newThisWeek} this week`
          }
        />
        <Stat
          label="Raised"
          value={money(stats.money.totalCents)}
          sub={`${money(stats.money.thisWeekCents)} this week`}
        />
        <Stat
          label="Average gift"
          value={
            stats.money.payingRegistrations
              ? money(stats.money.totalCents / stats.money.payingRegistrations)
              : '—'
          }
          sub={`over ${stats.money.payingRegistrations} paid registrations`}
        />
      </div>

      {stats.registrations.total > 0 && (
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Stat label="10K" value={stats.registrations.tenK.toLocaleString()} />
          <Stat label="Fun Run" value={stats.registrations.funRun.toLocaleString()} />
          <Stat
            label="Covered entries"
            value={stats.registrations.covered.toLocaleString()}
            sub="claimed via invite link"
          />
        </div>
      )}

      <Panel title="Newest waitlist signups">
        <PeopleList rows={stats.waitlist.recent} empty="Nobody on the waitlist yet." />
      </Panel>

      {stats.registrations.total > 0 && (
        <Panel title="Newest registrations">
          <PeopleList rows={stats.registrations.recent} empty="No registrations yet." />
        </Panel>
      )}

      {referrals && referrals.rows.length > 0 && (
        <Panel title="Referrals">
          <ul className="divide-y divide-line rounded-card border border-line">
            {referrals.rows.slice(0, 8).map((row) => (
              <li key={row.name} className="flex items-baseline justify-between gap-4 px-4 py-3">
                <span className="font-body text-sm font-bold text-ink">{row.name}</span>
                <span className="font-body text-xs text-ash">
                  {row.newCount} this week · {row.totalCount} total
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 font-body text-xs text-ash">
            Names are typed by registrants and aren&rsquo;t verified.
          </p>
        </Panel>
      )}
    </>
  );
}

async function EmailPanel() {
  if (!isSenderConfigured()) {
    return <p className="font-body text-sm text-ash">SENDER_API_TOKEN is not set.</p>;
  }

  let campaigns;
  try {
    campaigns = await listCampaigns(8);
  } catch (err) {
    return (
      <p className="rounded-card border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-red-700">
        {err instanceof Error ? err.message : 'Could not load campaigns.'}
      </p>
    );
  }

  const sent = campaigns.filter((c) => c.sent > 0 || c.status === 'SENT');
  if (sent.length === 0) {
    return (
      <p className="font-body text-sm text-ash">
        Nothing sent yet. <Link href="/admin/email" className="text-pink underline underline-offset-2">Write your first email</Link>.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse font-body text-sm">
        <thead>
          <tr className="text-left">
            {['Campaign', 'Sent', 'Delivered', 'Opens', 'Clicks', 'Bounces'].map((h) => (
              <th key={h} className="border-b-2 border-pink px-3 py-2 text-xs uppercase tracking-widest text-ash">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sent.map((c) => (
            <tr key={c.id}>
              <td className="border-b border-line px-3 py-3">
                <span className="font-bold text-ink">{c.subject || c.title}</span>
                {c.sentAt && <span className="block text-xs text-ash">{when(c.sentAt)}</span>}
              </td>
              <td className="border-b border-line px-3 py-3 text-ash">{c.recipients.toLocaleString()}</td>
              <td className="border-b border-line px-3 py-3 text-ash">{c.sent.toLocaleString()}</td>
              <td className="border-b border-line px-3 py-3 text-ink">
                {c.opens.toLocaleString()} <span className="text-xs text-ash">({pct(c.opens, c.sent)})</span>
              </td>
              <td className="border-b border-line px-3 py-3 text-ink">
                {c.clicks.toLocaleString()} <span className="text-xs text-ash">({pct(c.clicks, c.sent)})</span>
              </td>
              <td className="border-b border-line px-3 py-3 text-ash">{c.bounces.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Skeleton({ lines = 1 }: { lines?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: lines * 4 }).map((_, i) => (
        <div key={i} className="h-24 animate-pulse rounded-card border border-line bg-mist" />
      ))}
    </div>
  );
}

export default function AdminOverview() {
  return (
    <div>
      <p className="mb-6 font-body text-sm text-ash">
        {REGISTRATION_OPEN
          ? 'Registration is open.'
          : `Registration is closed — the site says it opens ${REGISTRATION_OPENS_LABEL}.`}
      </p>

      <Suspense fallback={<Skeleton />}>
        <StripePanels />
      </Suspense>

      <Panel title="Email campaigns">
        <Suspense
          fallback={<div className="h-24 animate-pulse rounded-card border border-line bg-mist" />}
        >
          <EmailPanel />
        </Suspense>
      </Panel>
    </div>
  );
}
