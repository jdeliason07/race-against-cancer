import { CONTACT_EMAIL, EVENT_DATE_DISPLAY, EVENT_LOCATION_NAME } from '@/config/site';
import { Mail } from 'lucide-react';
import type { Metadata } from 'next';

// ============================================================
// VOLUNTEER PAGE — NEEDS YOUR CONTENT
// ============================================================
// Search for [[REPLACE: ...]] throughout this file.
// Every block marked that way needs real information before launch.
// The structure and layout are done — just fill in the details.
// ============================================================

export const metadata: Metadata = {
  title: 'Become a Volunteer',
  description: `Volunteer at Race Against Cancer 2026 on ${EVENT_DATE_DISPLAY}. Help make race day happen.`,
};

// ── EDIT THIS DATA ──────────────────────────────────────────
// Replace each role with real volunteer positions, times, and descriptions.
const volunteerRoles = [
  {
    role: '[[REPLACE: Role name, e.g. "Course Marshal"]]',
    time: '[[REPLACE: Shift time, e.g. "6:00 AM – 10:00 AM"]]',
    description:
      '[[REPLACE: What does this volunteer do? Where are they stationed? Any physical requirements?]]',
  },
  {
    role: '[[REPLACE: Role name, e.g. "Aid Station Crew"]]',
    time: '[[REPLACE: Shift time]]',
    description:
      '[[REPLACE: Describe this role — handing out water, electrolytes, encouraging runners, etc.]]',
  },
  {
    role: '[[REPLACE: Role name, e.g. "Finish Line Team"]]',
    time: '[[REPLACE: Shift time]]',
    description:
      '[[REPLACE: What does this team do at the finish? Medal hangers, food distribution, crowd management?]]',
  },
  {
    role: '[[REPLACE: Role name, e.g. "Packet Pickup Helper"]]',
    time: '[[REPLACE: Shift time — likely the day before the race]]',
    description:
      '[[REPLACE: Describe packet pickup volunteering — distributing bibs, shirts, answering questions, etc.]]',
  },
  {
    role: '[[REPLACE: Role name, e.g. "Registration Table"]]',
    time: '[[REPLACE: Shift time]]',
    description:
      '[[REPLACE: Race-morning check-in, answering questions from participants, directing runners to corrals.]]',
  },
];

// ── END EDITABLE DATA ───────────────────────────────────────

export default function VolunteerPage() {
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
            every aid station, every cheering section, and every medal placed around a
            finisher&apos;s neck.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-20">

        {/* What to expect — placeholder */}
        <section className="mb-16">
          <h2 className="mb-6 font-display text-3xl uppercase text-ink">What to expect</h2>

          {/* [[REPLACE: Fill in the three boxes below with real details before launch]] */}
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                heading: 'When',
                body: '[[REPLACE: Date(s) volunteers are needed — race morning, day before for packet pickup, or both. Include call-time.]]',
              },
              {
                heading: 'Where',
                body: `[[REPLACE: General location — ${EVENT_LOCATION_NAME} and any satellite locations (e.g. packet pickup venue).]]`,
              },
              {
                heading: 'What you get',
                body: '[[REPLACE: Volunteer perks — e.g. volunteer shirt, meal, post-race food access, etc.]]',
              },
            ].map((item) => (
              <div key={item.heading} className="rounded-card border border-line bg-paper p-6">
                <h3 className="mb-3 font-display text-xl uppercase text-ink">{item.heading}</h3>
                <p className="font-body text-sm leading-relaxed text-ash">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Volunteer roles */}
        <section className="mb-16">
          <div className="rule-line mb-10">
            <div className="h-px flex-1 bg-line" aria-hidden="true" />
            <span className="section-label">Volunteer roles</span>
            <div className="h-px flex-1 bg-line" aria-hidden="true" />
          </div>

          {/* [[REPLACE: Edit the volunteerRoles array at the top of this file]] */}
          <div className="space-y-4">
            {volunteerRoles.map((item, i) => (
              <div key={i} className="rounded-card border border-line bg-paper p-6">
                <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-display text-xl uppercase text-ink">{item.role}</h3>
                  <span className="font-body text-xs font-bold uppercase tracking-widest text-pink">
                    {item.time}
                  </span>
                </div>
                <p className="mt-2 font-body text-sm leading-relaxed text-ash">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Training / orientation — placeholder */}
        <section className="mb-16 rounded-card border border-line bg-mist p-8">
          <h2 className="mb-4 font-display text-2xl uppercase text-ink">
            Training & orientation
          </h2>
          {/* [[REPLACE: Describe volunteer orientation — is there a mandatory meeting? Online training? Day-of briefing?]] */}
          <p className="font-body text-base leading-relaxed text-ash">
            [[REPLACE: Will there be a volunteer orientation or training session before race day?
            If so, when, where, and is it required? Describe what new volunteers should know
            before showing up — e.g. wear comfortable shoes, arrive 30 minutes early for your
            shift briefing, etc.]]
          </p>
        </section>

        {/* Sign-up CTA */}
        <section className="rounded-card bg-ink p-12 text-center">
          <h2 className="mb-4 font-display text-3xl uppercase text-white">
            Ready to volunteer?
          </h2>
          {/* [[REPLACE: Either link to a volunteer sign-up form, or keep the email CTA below]] */}
          <p className="mx-auto mb-8 max-w-lg font-body text-sm text-white/60">
            [[REPLACE: Describe how to sign up — e.g. "Fill out the form below" if you embed
            one, or "Email us" to use the button below. If you use a third-party signup tool
            like SignUpGenius or Volunteer Local, paste the link or embed here.]]
          </p>
          {CONTACT_EMAIL && !CONTACT_EMAIL.includes('[[') ? (
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Volunteer Interest — Race Against Cancer 2026`}
              className="btn-primary"
            >
              <Mail size={16} />
              Email Us to Volunteer
            </a>
          ) : (
            <p className="font-body text-sm text-white/40">
              [[Set CONTACT_EMAIL in src/config/site.ts to enable this button]]
            </p>
          )}
        </section>

      </div>
    </div>
  );
}
