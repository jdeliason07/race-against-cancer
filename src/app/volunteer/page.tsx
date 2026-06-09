import { VOLUNTEER_FORM_URL, EVENT_DATE_DISPLAY } from '@/config/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Become a Volunteer',
  description: `Volunteer at Race Against Cancer 2026 on ${EVENT_DATE_DISPLAY}. Help make race day happen.`,
};

export default function VolunteerPage() {
  const formReady = VOLUNTEER_FORM_URL && !VOLUNTEER_FORM_URL.includes('[[');
  const embedUrl = formReady ? `${VOLUNTEER_FORM_URL}?embedded=true` : null;

  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="border-b border-line bg-mist py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="section-label mb-4">Join the crew</p>
          <h1 className="font-display text-5xl uppercase text-ink md:text-7xl">
            Become a Volunteer
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-ash">
            You don&apos;t have to run to make race day happen. Volunteers are the engine behind
            every aid station, every cheering section, and everything that makes this event go.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-20 space-y-16">

        {/* Volunteer info meeting */}
        <section>
          <h2 className="mb-6 font-display text-3xl uppercase text-ink">Volunteer Info Meeting</h2>
          <div className="rounded-card border border-line bg-paper p-8">
            <p className="font-body text-base leading-relaxed text-ash">
              Before race day we&apos;re hosting a volunteer info meeting where we&apos;ll go over
              all assignments, roles, and logistics. Attendance is required — we look forward to seeing you there.
            </p>
            <dl className="mt-6 space-y-3">
              <div className="flex gap-4">
                <dt className="w-20 shrink-0 font-body text-xs font-bold uppercase tracking-widest text-ash">Date</dt>
                <dd className="font-body text-sm text-ink">Friday, November 6, 2026</dd>
              </div>
              <div className="flex gap-4">
                <dt className="w-20 shrink-0 font-body text-xs font-bold uppercase tracking-widest text-ash">Time</dt>
                <dd className="font-body text-sm text-ink">10:00 AM</dd>
              </div>
              <div className="flex gap-4">
                <dt className="w-20 shrink-0 font-body text-xs font-bold uppercase tracking-widest text-ash">Location</dt>
                <dd className="font-body text-sm text-ink">Details coming soon</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Embedded form */}
        <section>
          <h2 className="mb-6 font-display text-3xl uppercase text-ink">Sign Up to Volunteer</h2>
          {embedUrl ? (
            <div className="rounded-card border border-line overflow-hidden">
              <iframe
                src={embedUrl}
                width="100%"
                height="800"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Volunteer Sign-Up Form"
                className="block"
              >
                Loading…
              </iframe>
            </div>
          ) : (
            <div className="flex h-40 items-center justify-center rounded-card border-2 border-dashed border-petal bg-mist">
              <p className="font-body text-sm text-ash">Volunteer sign-up form coming soon.</p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
