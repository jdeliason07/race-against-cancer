import type { Metadata } from 'next';
import { CONTACT_EMAIL } from '@/config/site';
import { isAdminConfigured, isSignedIn } from '@/lib/adminAuth';
import { LoginForm } from './LoginForm';
import { EmailComposer } from './EmailComposer';

export const metadata: Metadata = {
  title: 'Email the Waitlist',
  robots: { index: false, follow: false, nocache: true },
};

// Reads a cookie, so it must render per request.
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const configured = isAdminConfigured();
  const signedIn = configured && (await isSignedIn());

  return (
    <div className="bg-paper min-h-screen">
      <section className="border-b border-line bg-mist py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="section-label mb-3">Organizer only</p>
          <h1 className="font-display text-4xl uppercase text-ink md:text-5xl">
            Email the Waitlist
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-6 py-12">
        {!configured ? (
          <p className="rounded-card border border-line bg-mist px-5 py-4 font-body text-sm text-ash">
            Set <code className="font-mono text-ink">ADMIN_PASSWORD</code> in Vercel (at least 12
            characters) and redeploy to enable this page.
          </p>
        ) : signedIn ? (
          <EmailComposer defaultEmail={CONTACT_EMAIL} />
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
}
