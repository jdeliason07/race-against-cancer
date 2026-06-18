'use client';
import { useState } from 'react';
import { submitPreSignup } from './presignup-actions';
import { REGISTRATION_OPENS_DATE } from '@/config/site';

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  raceInterest: string;
};

export function PreSignupForm() {
  const [form, setForm] = useState<FormState>({
    firstName: '', lastName: '', email: '', phone: '', raceInterest: '',
  });
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  function update(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError('');
    const result = await submitPreSignup(form);
    setPending(false);
    if ('error' in result) {
      setError(result.error);
    } else {
      setSuccess(true);
    }
  }

  if (success) {
    return (
      <div className="rounded-card border-2 border-pink bg-blush p-10 text-center">
        <p className="font-display text-3xl uppercase text-ink mb-4">You&rsquo;re on the list!</p>
        <p className="font-body text-base text-ash">
          We&rsquo;ll email you as soon as registration opens
          {REGISTRATION_OPENS_DATE ? ` around ${REGISTRATION_OPENS_DATE}` : ''}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
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
            className="rounded-pill border border-line bg-paper px-6 py-4 font-body text-base text-ink placeholder:text-ash/60 focus:border-pink focus:outline-none focus:ring-2 focus:ring-pink/15"
          />
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
            className="rounded-pill border border-line bg-paper px-6 py-4 font-body text-base text-ink placeholder:text-ash/60 focus:border-pink focus:outline-none focus:ring-2 focus:ring-pink/15"
          />
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
          className="rounded-pill border border-line bg-paper px-6 py-4 font-body text-base text-ink placeholder:text-ash/60 focus:border-pink focus:outline-none focus:ring-2 focus:ring-pink/15"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="font-body text-xs font-semibold uppercase tracking-widest text-ash">
          Phone <span className="normal-case tracking-normal font-normal text-ash/60">(optional)</span>
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          placeholder="555-555-5555"
          value={form.phone}
          onChange={update('phone')}
          className="rounded-pill border border-line bg-paper px-6 py-4 font-body text-base text-ink placeholder:text-ash/60 focus:border-pink focus:outline-none focus:ring-2 focus:ring-pink/15"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="raceInterest" className="font-body text-xs font-semibold uppercase tracking-widest text-ash">
          Which race interests you? <span className="normal-case tracking-normal font-normal text-ash/60">(optional)</span>
        </label>
        <select
          id="raceInterest"
          value={form.raceInterest}
          onChange={update('raceInterest')}
          className="rounded-pill border border-line bg-paper px-6 py-4 font-body text-base text-ink focus:border-pink focus:outline-none focus:ring-2 focus:ring-pink/15"
        >
          <option value="">Select one…</option>
          <option value="10k">10K (6.2 mi)</option>
          <option value="fun-run">Fun Run (~2 mi)</option>
          <option value="not-sure">Not sure yet</option>
        </select>
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
