import { REGISTRATION_OPEN, REGISTRATION_OPENS_LABEL } from '@/config/site';
import { cn } from '@/lib/utils';

/**
 * "Registration opens soon" teaser, shown next to the waitlist CTAs.
 * Renders nothing once REGISTRATION_OPEN flips to true, so every placement
 * disappears on its own the day registration goes live.
 */
export function RegistrationTeaser({ className }: { className?: string }) {
  if (REGISTRATION_OPEN) return null;

  return (
    <p className={cn('font-body text-sm text-ash', className)}>
      <span className="font-bold text-pink">
        Registration opens {REGISTRATION_OPENS_LABEL}.
      </span>{' '}
      Join the waitlist and we&rsquo;ll email and text you the moment it does.
    </p>
  );
}
