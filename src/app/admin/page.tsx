import type { Metadata } from 'next';
import { CONTACT_EMAIL } from '@/config/site';
import { adminConfigStatus, isSignedIn, MIN_PASSWORD_LENGTH } from '@/lib/adminAuth';
import { LoginForm } from './LoginForm';
import { EmailComposer } from './EmailComposer';

export const metadata: Metadata = {
  title: 'Email the Waitlist',
  robots: { index: false, follow: false, nocache: true },
};

// Reads a cookie, so it must render per request.
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const status = adminConfigStatus();
  const signedIn = status === 'ok' && (await isSignedIn());

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
        {status === 'too-short' ? (
          <div className="rounded-card border border-line bg-mist px-5 py-4 font-body text-sm text-ash">
            <p className="font-bold text-ink">
              This deploy can see ADMIN_PASSWORD, but it&rsquo;s too short.
            </p>
            <p className="mt-2">
              It needs at least {MIN_PASSWORD_LENGTH} characters — the same value signs your login
              cookie, so a short one weakens both. Set a longer one in Vercel and redeploy.
            </p>
          </div>
        ) : status === 'missing' ? (
          <div className="rounded-card border border-line bg-mist px-5 py-4 font-body text-sm text-ash">
            <p className="font-bold text-ink">
              This deploy can&rsquo;t see ADMIN_PASSWORD.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Is the variable ticked for <span className="text-ink">Production</span>? Preview and
                Development are separate.
              </li>
              <li>
                Has the site been <span className="text-ink">redeployed</span> since you added it?
                Variables don&rsquo;t reach a deployment that already exists.
              </li>
              <li>
                Is the key spelled exactly{' '}
                <code className="font-mono text-ink">ADMIN_PASSWORD</code>?
              </li>
            </ul>
          </div>
        ) : signedIn ? (
          <EmailComposer defaultEmail={CONTACT_EMAIL} />
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
}
