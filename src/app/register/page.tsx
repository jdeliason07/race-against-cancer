import { RegisterFlow } from './RegisterFlow';
import type { Metadata } from 'next';
import { CHARITY_NAME, MIN_DONATION_AMOUNT, MIN_DONATION_FUN_RUN } from '@/config/site';

export const metadata: Metadata = {
  title: 'Register',
  description: `Register for Race Against Cancers 2026 — 10K & Fun Run on November 7, 2026. Your registration is a direct donation to ${CHARITY_NAME}.`,
};

export default function RegisterPage() {
  return (
    <div className="bg-paper min-h-screen">
      <section className="border-b border-line bg-mist py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="section-label mb-4">November 7, 2026</p>
          <h1 className="font-display text-5xl uppercase text-ink md:text-7xl">Register</h1>
          <p className="mt-4 font-body text-base text-ash">
            10K from ${MIN_DONATION_AMOUNT} · Fun Run from ${MIN_DONATION_FUN_RUN} — every dollar goes to {CHARITY_NAME}
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-2xl px-6 py-16">
        <RegisterFlow />
      </div>
    </div>
  );
}
