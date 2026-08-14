import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CHARITY_NAME,
  ORG_NAME,
  ORG_SHORT_NAME,
  REGISTRATION_TRANSFER_DEADLINE,
  SITE_URL,
} from '@/config/site';
import { WAIVER_PARAGRAPHS, WAIVER_TITLE, WAIVER_VERSION } from '@/data/waiver';

export const metadata: Metadata = {
  title: 'Terms & Waiver',
  description: `Participant waiver, code of conduct, and website terms for the ${ORG_SHORT_NAME} 10K & Fun Run. Read the release of liability before you register.`,
};

function Section({ id, heading, children }: {
  id: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="mb-4 font-display text-2xl uppercase text-ink">{heading}</h2>
      <div className="space-y-4 font-body text-base leading-relaxed text-ash">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <div className="bg-paper">
      <section className="bg-mist py-20 border-b border-line">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="section-label mb-4">Legal</p>
          <h1 className="font-display text-5xl uppercase text-ink md:text-7xl">Terms &amp; Waiver</h1>
          <p className="mt-4 font-body text-sm text-ash">Last updated: August 2026</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-20 space-y-12">
        <p className="font-body text-base leading-relaxed text-ash">
          These terms cover taking part in the {ORG_SHORT_NAME}{' '}10K &amp; Fun Run and using this
          website. The {WAIVER_TITLE} below is the same agreement you accept during registration —
          it is published here so you can read it in full before you decide to register.
          Questions? Email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-pink hover:text-raspberry underline underline-offset-2">
            {CONTACT_EMAIL}
          </a>.
        </p>

        {/* ============================================================
            The waiver. Rendered from @/data/waiver — the same source the
            registration form uses, so the two can never say different things.
            ============================================================ */}
        <Section id="waiver" heading={WAIVER_TITLE}>
          <div className="rounded-card border border-line bg-mist/40 p-6 space-y-4 text-sm">
            {WAIVER_PARAGRAPHS.map((para, i) => (
              <p key={i} className={para.emphasis ? 'font-bold uppercase text-ink' : ''}>
                {para.text}
              </p>
            ))}
          </div>
          <p className="font-body text-xs text-ash/70">
            Waiver version {WAIVER_VERSION}. The version you accepted is recorded with your
            registration.
          </p>
        </Section>

        {/* REVIEW: Drafted starting language — not reviewed by a lawyer.
            Read and adjust before launch, especially the removal/refusal
            language, which should match how you actually intend to run the event. */}
        <Section id="code-of-conduct" heading="Code of Conduct">
          <p>
            This is a charity race with families and children on the course. Taking part means
            agreeing to the following.
          </p>
          <ul className="space-y-3 list-disc pl-5">
            <li>
              <strong className="text-ink">Follow course officials and marshals.</strong> Their
              instructions exist for participant safety and for the agreements we hold with Provo
              City and Utah County. They are not optional.
            </li>
            <li>
              <strong className="text-ink">Treat everyone with respect.</strong> Harassment,
              intimidation, slurs, or abusive behaviour toward participants, volunteers,
              spectators, staff, or residents along the route is not tolerated.
            </li>
            <li>
              <strong className="text-ink">Run under your own registration.</strong> Do not run
              with another person&rsquo;s bib or let someone else use yours. Bibs identify you to
              medical staff in an emergency, so a mismatch is a safety problem, not a technicality.
            </li>
            <li>
              <strong className="text-ink">Respect the course and the neighbourhood.</strong> Stay
              on the marked route, use the bins provided, and leave private property alone.
            </li>
            <li>
              <strong className="text-ink">Wheels, headphones, and animals.</strong> Bicycles,
              skates, and scooters are not permitted on the course. Please keep headphone volume
              low enough to hear marshals and traffic. Service animals are welcome; other animals
              are not permitted on the 10K course.
            </li>
          </ul>
          <p>
            {ORG_NAME} may refuse entry to, or remove from the course, anyone whose conduct
            endangers others or seriously disrupts the event. Because registration is a charitable
            donation, removal does not create a right to a refund.
          </p>
        </Section>

        {/* REVIEW: Drafted starting language — not reviewed by a lawyer. */}
        <Section id="registration" heading="Registration, Donations & Transfers">
          <p>
            Your registration fee is a <strong className="text-ink">charitable donation</strong> to{' '}
            {CHARITY_NAME}. As set out in the waiver above, donations are{' '}
            <strong className="text-ink">non-refundable</strong>, including if you are unable to
            attend, and including if the event is delayed, modified, or cancelled for reasons
            beyond our control.
          </p>
          <p>
            A registration may be transferred to another participant until{' '}
            <strong className="text-ink">{REGISTRATION_TRANSFER_DEADLINE}</strong> by contacting us
            at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-pink hover:text-raspberry underline underline-offset-2">
              {CONTACT_EMAIL}
            </a>. The incoming participant must accept the waiver in their own name before race day.
            No transfers are processed after that date.
          </p>
          <p>
            Payments are processed by Stripe. We never see or store your card number. See our{' '}
            <Link href="/privacy" className="text-pink hover:text-raspberry underline underline-offset-2">
              Privacy Policy
            </Link>{' '}
            for how registration details are handled.
          </p>
          <p>
            One person may register and pay for a group. Where they do, they are responsible for
            making sure every athlete they registered — or that athlete&rsquo;s parent or legal
            guardian — accepts the waiver before race day.
          </p>
        </Section>

        {/* REVIEW: Drafted starting language — not reviewed by a lawyer. */}
        <Section id="website" heading="Website Terms of Use">
          <p>
            You may use this website to learn about the event, join the waitlist, register, and
            contact us. Please do not attempt to disrupt the site or the services behind it, access
            areas you have not been granted access to, scrape it by automated means, or use it to
            send unsolicited messages.
          </p>
          <p>
            The content of this site — text, layout, graphics, and the {ORG_SHORT_NAME} name and
            marks — belongs to {ORG_NAME} unless otherwise credited, and may not be reproduced for
            commercial purposes without permission. Logos of our charity partner and sponsors
            remain the property of their respective owners.
          </p>
          <p>
            Course maps, elevation profiles, start times, and similar details are published in good
            faith and may change. We will announce material changes by email to registered
            participants. Where this site links to a third party — Stripe, our charity partner, a
            mapping provider — we are not responsible for the content or practices of those sites.
          </p>
          <p>
            The site is provided on an &ldquo;as is&rdquo; basis, without warranty that it will be
            uninterrupted or error-free. To the fullest extent permitted by law, {ORG_NAME} is not
            liable for indirect or consequential loss arising from your use of this site. Nothing
            here limits liability that cannot lawfully be limited.
          </p>
          <p>
            These terms are governed by the laws of the State of Utah. We may update them; the
            &ldquo;last updated&rdquo; date above will change when we do, and material changes will
            be communicated to registered participants.
          </p>
        </Section>

        <Section id="contact" heading="Contact">
          <p>
            {ORG_NAME}<br />
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-pink hover:text-raspberry underline underline-offset-2">
              {CONTACT_EMAIL}
            </a>
            <br />
            <a href={`tel:${CONTACT_PHONE.replace(/-/g, '')}`} className="text-pink hover:text-raspberry underline underline-offset-2">
              {CONTACT_PHONE}
            </a>
            <br />
            <a href={SITE_URL} className="text-pink hover:text-raspberry underline underline-offset-2">
              {SITE_URL.replace(/^https?:\/\//, '')}
            </a>
          </p>
        </Section>
      </div>
    </div>
  );
}
