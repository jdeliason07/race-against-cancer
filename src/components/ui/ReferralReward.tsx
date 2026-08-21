import Image from 'next/image';
import Link from 'next/link';
import {
  REFERRAL_ENABLED,
  REFERRAL_REWARD,
  REFERRAL_REWARD_LOGO,
  REFERRAL_REWARD_LOGO_ALT,
  REGISTRATION_OPEN,
} from '@/config/site';
import { cn } from '@/lib/utils';

/**
 * Referral incentive UI, in two placements: the callout wrapped around the
 * "Who referred you?" field at checkout, and the announcement banner on the
 * home page.
 *
 * Both render nothing when REFERRAL_REWARD is "", so switching the program off
 * in src/config/site.ts removes every placement without touching a page.
 */

/**
 * The sponsor mark. Rendered `unoptimized` because the asset is an SVG, and
 * boxed in white so a logo with its own light background still sits cleanly on
 * a tinted card. Renders nothing when REFERRAL_REWARD_LOGO is "".
 */
function RewardLogo({ className, width }: { className?: string; width: number }) {
  if (!REFERRAL_REWARD_LOGO) return null;

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-card bg-white p-3 ring-1 ring-line',
        className,
      )}
    >
      <Image
        src={REFERRAL_REWARD_LOGO}
        alt={REFERRAL_REWARD_LOGO_ALT}
        width={width}
        height={Math.round((width * 124) / 320)}
        className="h-auto w-auto object-contain"
        style={{ maxWidth: width }}
        unoptimized
      />
    </span>
  );
}

/**
 * Wraps the referral field at checkout. Takes the input as children so the
 * form keeps ownership of its own field styling.
 */
export function ReferralRewardCallout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  if (!REFERRAL_ENABLED) return null;

  return (
    <div className={cn('rounded-card border-2 border-petal bg-mist p-5', className)}>
      <div className="mb-3 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
        <RewardLogo width={104} />
        <div>
          <p className="font-display text-lg uppercase leading-tight text-ink">
            Get your friend a {REFERRAL_REWARD}
          </p>
          <p className="font-body text-sm text-ash">
            Name whoever told you about the race and we&rsquo;ll send them one.
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}

/**
 * Home page announcement. The copy adapts to the registration gate so it reads
 * correctly both while the waitlist is up and once registration is live.
 */
export function ReferralAnnouncement({ className }: { className?: string }) {
  if (!REFERRAL_ENABLED) return null;

  return (
    <section
      aria-labelledby="referral-announcement-heading"
      className={cn('rounded-card border-2 border-petal bg-paper p-8 md:p-10', className)}
    >
      <div className="flex flex-col items-center gap-6 text-center md:flex-row md:gap-8 md:text-left">
        <RewardLogo width={132} className="p-4" />
        <div className="flex-1">
          <span className="section-label">Refer a friend</span>
          <h2
            id="referral-announcement-heading"
            className="mt-2 font-display text-2xl uppercase leading-tight text-ink md:text-3xl"
          >
            Bring a friend, get a {REFERRAL_REWARD}
          </h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-ash md:text-base">
            {REGISTRATION_OPEN ? (
              <>
                Every friend who registers and puts your full name in the &ldquo;Who referred
                you?&rdquo; box earns you a {REFERRAL_REWARD}. No cap — refer ten friends, get ten
                gift cards.
              </>
            ) : (
              <>
                When registration opens, every friend who signs up and puts your full name in the
                &ldquo;Who referred you?&rdquo; box earns you a {REFERRAL_REWARD}. No cap — refer
                ten friends, get ten gift cards.
              </>
            )}
          </p>
        </div>
        <Link href="/register" className="btn-primary shrink-0">
          {REGISTRATION_OPEN ? 'Register' : 'Join the Waitlist'}
        </Link>
      </div>
    </section>
  );
}
