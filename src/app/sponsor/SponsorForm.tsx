'use client';
import { useState } from 'react';
import { CONTACT_EMAIL } from '@/config/site';

export function SponsorForm() {
  const [email, setEmail] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent('Sponsorship Inquiry');
    const body = encodeURIComponent(`Hi, I'd like to learn about sponsoring Race Against Cancers.\n\nYou can reach me at: ${email}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        aria-label="Your email"
        className="flex-1 rounded-pill border border-line bg-paper px-6 py-4 font-body text-base text-ink placeholder:text-ash focus:border-pink focus:outline-none"
      />
      <button type="submit" className="btn-primary py-4 px-7 text-sm">
        Reach Out
      </button>
    </form>
  );
}
