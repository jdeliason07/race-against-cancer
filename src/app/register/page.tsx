import type { Metadata } from 'next';
import {
  CHARITY_NAME, MIN_DONATION_AMOUNT, MIN_DONATION_FUN_RUN,
  REGISTRATION_OPEN, REGISTRATION_OPENS_DATE,
} from '@/config/site';
import { getSpotsRemaining } from '@/lib/getSpotsRemaining';
import { RegisterFlow } from './RegisterFlow';
import { PreSignupForm } from './PreSignupForm';

export const revalidate = 60;

export const metadata: Metadata = REGISTRATION_OPEN
  ? {
      title: 'Register',
      description: `Register for Race Against Cancers 2026 — 10K & Fun Run on November 7, 2026. Your registration is a direct donation to ${CHARITY_NAME}.`,
    }
  : {
      title: 'Join the Waitlist',
      description: `Registration opens ${REGISTRATION_OPENS_DATE}. Join the waitlist to be notified the moment registration goes live for Race Against Cancers 2026.`,
    };

export default async function RegisterPage() {
  if (!REGISTRATION_OPEN) {
    const spotsRemaining = await getSpotsRemaining();
    return (
      <div className="bg-paper min-h-screen">
        <section className="border-b border-line bg-mist py-16">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="section-label mb-4">Registration opens {REGISTRATION_OPENS_DATE}</p>
            <h1 className="font-display text-5xl uppercase text-ink md:text-7xl">
              Join the Waitlist
            </h1>
            <p className="mt-4 font-body text-base text-ash">
              Be the first to know when registration opens — and lock in your spot.
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-2xl px-6 py-16">
          <PreSignupForm spotsRemaining={spotsRemaining} />
        </div>
      </div>
    );
  }

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
