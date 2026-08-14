'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from './actions';

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError('');
    const result = await signIn(password);
    setPending(false);
    if ('error' in result) {
      setError(result.error);
      setPassword('');
    } else {
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-sm">
      <label
        htmlFor="password"
        className="mb-1 block font-body text-xs font-bold uppercase tracking-widest text-ash"
      >
        Admin password
      </label>
      <input
        id="password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-card border border-line bg-paper px-4 py-3 font-body text-sm text-ink focus:border-pink focus:outline-none"
      />
      {error && (
        <p role="alert" className="mt-2 font-body text-sm text-red-700">
          {error}
        </p>
      )}
      <button type="submit" disabled={pending} className="btn-primary mt-4 w-full disabled:opacity-40">
        {pending ? 'Checking…' : 'Sign in'}
      </button>
    </form>
  );
}
