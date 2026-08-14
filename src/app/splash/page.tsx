import type { Metadata } from 'next';
import { SplashScreen } from '@/components/splash/SplashScreen';

export const metadata: Metadata = {
  title: 'Splash',
  robots: { index: false, follow: false },
};

/**
 * Standalone preview of the splash screen. The brief calls for a page holding
 * nothing but the animation and the logo, so the site's own header and footer
 * are suppressed for this route only — otherwise they sit behind the splash at
 * full opacity and show through the 2.5s cross-fade.
 */
const HIDE_SITE_CHROME = `body > *:not(main):not(next-route-announcer) { display: none; }`;

export default function SplashPage() {
  return (
    <>
      <style>{HIDE_SITE_CHROME}</style>
      <SplashScreen>
        {/* Stand-in for the real landing page. */}
        <div className="fixed inset-0 flex items-center justify-center bg-paper px-6">
          <p className="font-display text-center text-4xl uppercase tracking-wide text-ink sm:text-6xl">
            Main landing page content
          </p>
        </div>
      </SplashScreen>
    </>
  );
}
