#!/usr/bin/env node
// Who earned referral rewards, and how many.
//
//   node --env-file=.env.local scripts/referral-report.mjs
//
// Counts completed registrations that name a referrer, so the numbers are
// derived from the records themselves — nothing is tallied as it goes, and
// re-running never double-counts.
import Stripe from 'stripe';

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error('STRIPE_SECRET_KEY is not set. Try: node --env-file=.env.local scripts/referral-report.mjs');
  process.exit(1);
}

const stripe = new Stripe(key);

// Referred registrants, keyed by the code that referred them.
const byCode = new Map();
// Every code we've seen belongs to someone — used to name the referrer.
const ownerOfCode = new Map();

await stripe.customers
  .search({ query: "metadata['registered']:'true'", limit: 100 })
  .autoPagingEach((customer) => {
    const code = customer.metadata?.referralCode;
    if (code) ownerOfCode.set(code, customer);

    const referredBy = customer.metadata?.referredByCode;
    if (!referredBy) return;
    if (!byCode.has(referredBy)) byCode.set(referredBy, []);
    byCode.get(referredBy).push(customer);
  });

if (byCode.size === 0) {
  console.log('No referrals recorded yet.');
  process.exit(0);
}

const rows = [...byCode.entries()]
  .map(([code, referred]) => {
    // Falls back to the email captured on the referred registration, so a
    // referrer who hasn't registered themselves is still identifiable.
    const owner = ownerOfCode.get(code);
    const fallbackEmail = referred.find((c) => c.metadata?.referredByEmail)?.metadata
      ?.referredByEmail;
    return {
      code,
      name: owner?.name ?? '(not registered)',
      email: owner?.email ?? fallbackEmail ?? '(unknown)',
      count: referred.length,
      referred,
    };
  })
  .sort((a, b) => b.count - a.count);

const totalRewards = rows.reduce((sum, r) => sum + r.count, 0);

console.log(`\nReferral report — ${rows.length} referrer(s), ${totalRewards} reward(s) owed\n`);
for (const row of rows) {
  console.log(`${row.count}×  ${row.name} <${row.email}>  [code ${row.code}]`);
  for (const person of row.referred) {
    console.log(`      ← ${person.name ?? '(no name)'} <${person.email ?? ''}>`);
  }
}
console.log('');
