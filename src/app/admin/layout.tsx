import type { Metadata } from 'next';
import { adminConfigStatus, isSignedIn, MIN_PASSWORD_LENGTH } from '@/lib/adminAuth';
import { LoginForm } from './LoginForm';
import { PaneHeader } from './PaneHeader';

export const metadata: Metadata = {
  title: 'Organizer',
  robots: { index: false, follow: false, nocache: true },
};

// Reads a cookie, so every admin page renders per request.
export const dynamic = 'force-dynamic';

/** Used only for the states before sign-in; the signed-in view supplies its own
 *  header per pane so each one scrolls with its page. */
function Gate({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-paper min-h-screen">
      <PaneHeader title="Organizer" />
      <div className="mx-auto max-w-5xl px-6 py-10">{children}</div>
    </div>
  );
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const status = adminConfigStatus();

  if (status === 'too-short') {
    return (
      <Gate>
        <div className="rounded-card border border-line bg-mist px-5 py-4 font-body text-sm text-ash">
          <p className="font-bold text-ink">This deploy can see ADMIN_PASSWORD, but it&rsquo;s too short.</p>
          <p className="mt-2">
            It needs at least {MIN_PASSWORD_LENGTH} characters — the same value signs your login
            cookie, so a short one weakens both. Set a longer one in Vercel and redeploy.
          </p>
        </div>
      </Gate>
    );
  }

  if (status === 'missing') {
    return (
      <Gate>
        <div className="rounded-card border border-line bg-mist px-5 py-4 font-body text-sm text-ash">
          <p className="font-bold text-ink">This deploy can&rsquo;t see ADMIN_PASSWORD.</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Is the variable ticked for <span className="text-ink">Production</span>?</li>
            <li>Has the site been <span className="text-ink">redeployed</span> since you added it?</li>
            <li>Is the key spelled exactly <code className="font-mono text-ink">ADMIN_PASSWORD</code>?</li>
          </ul>
        </div>
      </Gate>
    );
  }

  if (!(await isSignedIn())) {
    return (
      <Gate>
        <LoginForm />
      </Gate>
    );
  }

  return <div className="bg-paper min-h-screen">{children}</div>;
}
