'use client';
import { useState } from 'react';
import { track } from '@vercel/analytics';
import { submitPreSignup } from './presignup-actions';
import { REFERRAL_ENABLED, REFERRAL_REWARD, REGISTRATION_OPENS_DATE } from '@/config/site';
import { isEmailValid } from '@/lib/utils';
import { normalizePhone } from '@/lib/phone';

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const FIELDS: (keyof FormState)[] = ['firstName', 'lastName', 'email', 'phone'];

const errorClass = 'font-body text-xs text-red-700';

const inputClass = (invalid: boolean) =>
  `rounded-pill border bg-paper px-6 py-4 font-body text-base text-ink placeholder:text-ash/60 focus:outline-none focus:ring-2 ${
    invalid
      ? 'border-red-600 focus:border-red-600 focus:ring-red-600/15'
      : 'border-line focus:border-pink focus:ring-pink/15'
  }`;

export function PreSignupForm() {
  const [form, setForm] = useState<FormState>({
    firstName: '', lastName: '', email: '', phone: '',
  });
  // Mirrors the touched/fieldError pattern in RegisterFlow so an error only
  // appears once the visitor has actually left the field.
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  function update(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function blur(field: keyof FormState) {
    return () => setTouched((prev) => ({ ...prev, [field]: true }));
  }

  /** The validity rule for one field, independent of whether it's been touched. */
  function problem(field: keyof FormState): string | null {
    const val = form[field].trim();
    if (!val) return 'This field is required.';
    if (field === 'email' && !isEmailValid(val)) return 'Enter a valid email address.';
    if (field === 'phone' && !normalizePhone(val)) {
      return 'Enter a valid phone number, e.g. (555) 123-4567.';
    }
    return null;
  }

  const fieldError = (field: keyof FormState) => (touched[field] ? problem(field) : null);
  const isValid = FIELDS.every((f) => !problem(f));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Reveal every outstanding error at once rather than spending a server
    // round-trip to say the same thing.
    if (!isValid) {
      setTouched(Object.fromEntries(FIELDS.map((f) => [f, true])));
      return;
    }
    setPending(true);
    setError('');
    const result = await submitPreSignup(form);
    setPending(false);
    if ('error' in result) {
      setError(result.error);
    } else {
      track('waitlist_signup');
      setSuccess(true);
    }
  }

  if (success) {
    return (
      <div className="rounded-card border-2 border-pink bg-blush p-10 text-center">
        <p className="font-display text-3xl uppercase text-ink mb-4">You&rsquo;re on the list!</p>
        <p className="font-body text-base text-ash">
          We&rsquo;ll email and text you as soon as registration opens
          {REGISTRATION_OPENS_DATE ? ` around ${REGISTRATION_OPENS_DATE}` : ''}.
        </p>
        {REFERRAL_ENABLED && (
          <p className="mt-4 font-body text-sm text-ash">
            <span className="font-bold text-ink">Bring a friend when it does:</span> every friend
            who registers and puts your name in the &ldquo;Who referred you?&rdquo; box earns you
            a {REFERRAL_REWARD} — unlimited.
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <p className="font-body text-sm text-ash/70">
        Add your details and we&rsquo;ll reach out the moment registration opens.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="firstName" className="font-body text-xs font-semibold uppercase tracking-widest text-ash">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            required
            autoComplete="given-name"
            placeholder="Jane"
            value={form.firstName}
            onChange={update('firstName')}
            onBlur={blur('firstName')}
            aria-invalid={!!fieldError('firstName')}
            aria-describedby={fieldError('firstName') ? 'firstName-error' : undefined}
            className={inputClass(!!fieldError('firstName'))}
          />
          {fieldError('firstName') && (
            <p id="firstName-error" className={errorClass}>{fieldError('firstName')}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="lastName" className="font-body text-xs font-semibold uppercase tracking-widest text-ash">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            required
            autoComplete="family-name"
            placeholder="Smith"
            value={form.lastName}
            onChange={update('lastName')}
            onBlur={blur('lastName')}
            aria-invalid={!!fieldError('lastName')}
            aria-describedby={fieldError('lastName') ? 'lastName-error' : undefined}
            className={inputClass(!!fieldError('lastName'))}
          />
          {fieldError('lastName') && (
            <p id="lastName-error" className={errorClass}>{fieldError('lastName')}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="font-body text-xs font-semibold uppercase tracking-widest text-ash">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          placeholder="jane@example.com"
          value={form.email}
          onChange={update('email')}
          onBlur={blur('email')}
          aria-invalid={!!fieldError('email')}
          aria-describedby={fieldError('email') ? 'email-error' : undefined}
          className={inputClass(!!fieldError('email'))}
        />
        {fieldError('email') && (
          <p id="email-error" className={errorClass}>{fieldError('email')}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="font-body text-xs font-semibold uppercase tracking-widest text-ash">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          required
          inputMode="tel"
          autoComplete="tel"
          placeholder="(555) 123-4567"
          value={form.phone}
          onChange={update('phone')}
          onBlur={blur('phone')}
          aria-invalid={!!fieldError('phone')}
          aria-describedby={fieldError('phone') ? 'phone-hint phone-error' : 'phone-hint'}
          className={inputClass(!!fieldError('phone'))}
        />
        {fieldError('phone') && (
          <p id="phone-error" className={errorClass}>{fieldError('phone')}</p>
        )}
        <p id="phone-hint" className="font-body text-xs text-ash/70">
          So we can text you when registration opens. We won&rsquo;t use it for anything else.
        </p>
      </div>

      {error && (
        <p role="alert" className="font-body text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn-primary mt-2 py-5 text-base disabled:opacity-60"
      >
        {pending ? 'Submitting…' : 'Join the Waitlist'}
      </button>
    </form>
  );
}
