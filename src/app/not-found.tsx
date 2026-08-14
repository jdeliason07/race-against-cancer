import Link from 'next/link';
import type { Metadata } from 'next';
import { CONTACT_EMAIL, REGISTRATION_OPEN } from '@/config/site';

export const metadata: Metadata = {
  title: 'Page Not Found',
};

const LINKS = [
  { href: '/race-details', label: 'Race Details' },
  { href: '/faq', label: 'FAQ' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/sponsor', label: 'Sponsor' },
  { href: '/about', label: 'About' },
];

export default function NotFound() {
  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-2xl px-6 py-24 text-center md:py-32">
        <p className="section-label mb-6">Error 404</p>

        <p className="font-display text-[clamp(72px,18vw,160px)] uppercase leading-none text-petal">
          404
        </p>

        <h1 className="mt-6 font-display text-4xl uppercase leading-[0.95] text-ink md:text-5xl">
          This page took a<br />
          <em className="not-italic text-pink">wrong turn.</em>
        </h1>

        <p className="mx-auto mt-6 max-w-md font-body text-base text-ash">
          We couldn&rsquo;t find that page. It may have moved, or the link that brought you here
          may be out of date.
        </p>

        <div className="mt-10">
          <Link href="/register" className="btn-primary px-10 py-5 text-base">
            {REGISTRATION_OPEN ? 'Register' : 'Join the Waitlist'}
          </Link>
        </div>

        <nav
          aria-label="Suggested pages"
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-line pt-10"
        >
          <Link
            href="/"
            className="font-body text-xs uppercase tracking-widest text-ash transition-colors hover:text-pink"
          >
            Home
          </Link>
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-xs uppercase tracking-widest text-ash transition-colors hover:text-pink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="mt-8 font-body text-sm text-ash/70">
          Still stuck? Email{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-pink underline underline-offset-2 hover:text-raspberry"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
