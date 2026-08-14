'use client';
import { useState } from 'react';
import { CONTACT_EMAIL, ORG_SHORT_NAME } from '@/config/site';
import { isEmailValid } from '@/lib/utils';

export function SponsorForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  // A mailto: either opens a mail client or does nothing at all, and the page
  // is never told which. So once it fires we always show the address in plain
  // text — otherwise a visitor with no mail client configured clicks, sees
  // nothing happen, and the lead is lost silently.
  const [handedOff, setHandedOff] = useState(false);
  const [copied, setCopied] = useState(false);

  const subject = 'Sponsorship Inquiry';
  const body = `Hi, I'd like to learn about sponsoring ${ORG_SHORT_NAME}.\n\nYou can reach me at: ${email}`;
  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEmailValid(email)) {
      setError('Enter a valid email address so we can reach you.');
      return;
    }
    setError('');
    setHandedOff(true);
    window.location.href = mailtoHref;
  }

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be denied or unavailable; the address is already
      // on screen and selectable, so there is nothing to recover from.
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row" noValidate>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
          }}
          placeholder="your@email.com"
          aria-label="Your email"
          aria-invalid={!!error}
          aria-describedby={error ? 'sponsor-email-error' : undefined}
          className={`flex-1 rounded-pill border bg-paper px-6 py-4 font-body text-base text-ink placeholder:text-ash focus:outline-none ${
            error ? 'border-red-600 focus:border-red-600' : 'border-line focus:border-pink'
          }`}
        />
        <button type="submit" className="btn-primary py-4 px-7 text-sm">
          Reach Out
        </button>
      </form>

      {error && (
        <p id="sponsor-email-error" role="alert" className="mt-2 font-body text-sm text-red-700">
          {error}
        </p>
      )}

      {handedOff && (
        <div role="status" className="mt-4 rounded-card border border-petal bg-blush p-5">
          <p className="font-body text-sm text-ink">
            We&rsquo;ve opened a draft email for you. <strong>Didn&rsquo;t open?</strong> Some
            devices have no mail app set up — email us directly:
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="select-all font-body text-base font-bold text-pink underline underline-offset-2 hover:text-raspberry"
            >
              {CONTACT_EMAIL}
            </a>
            <button
              type="button"
              onClick={copyAddress}
              className="rounded-pill border border-pink px-4 py-1.5 font-body text-xs font-bold uppercase tracking-widest text-pink transition-colors hover:bg-pink hover:text-white"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <p className="mt-3 font-body text-xs text-ash">
            Mention the email you&rsquo;d like us to reply to and we&rsquo;ll be in touch with the
            sponsorship packet.
          </p>
        </div>
      )}
    </div>
  );
}
