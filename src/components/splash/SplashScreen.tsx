'use client';

import { useEffect, useState, type ReactNode } from 'react';
import styles from './SplashScreen.module.css';

/** Cumulative upward travel, in px, that counts as a "significant" scroll-up. */
const SCROLL_UP_THRESHOLD = 60;

/** Must stay in step with the opacity transitions in SplashScreen.module.css. */
const FADE_MS = 2500;

type Phase = 'active' | 'leaving' | 'gone';

/**
 * Fullscreen splash for Race Against Cancers. Renders the breathing gradient
 * and the wordmark over `children`, then cross-fades to them on the first
 * click, keypress or scroll-up.
 */
export function SplashScreen({ children }: { children?: ReactNode }) {
  const [phase, setPhase] = useState<Phase>('active');

  // Dismissal triggers. Bound to the window rather than the splash element so
  // a keypress counts wherever focus happens to be.
  useEffect(() => {
    if (phase !== 'active') return;

    const dismiss = () => setPhase('leaving');

    const onPointerDown = () => dismiss();

    const onKeyDown = (event: KeyboardEvent) => {
      // A bare modifier press isn't an intent to move on.
      if (['Shift', 'Control', 'Alt', 'Meta'].includes(event.key)) return;
      dismiss();
    };

    let upward = 0;
    const onWheel = (event: WheelEvent) => {
      // Reset on any downward nudge, so only a sustained scroll-up counts.
      upward = event.deltaY < 0 ? upward - event.deltaY : 0;
      if (upward >= SCROLL_UP_THRESHOLD) dismiss();
    };

    let touchStartY: number | null = null;
    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (event: TouchEvent) => {
      const y = event.touches[0]?.clientY;
      if (touchStartY === null || y === undefined) return;
      // Dragging the finger down is the touch equivalent of scrolling up.
      if (y - touchStartY >= SCROLL_UP_THRESHOLD) dismiss();
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [phase]);

  // Retire the element once the cross-fade has finished, so it can't sit on
  // top of the page.
  useEffect(() => {
    if (phase !== 'leaving') return;

    // globals.css collapses every transition for reduced-motion users, so the
    // fade is already over by the time we get here.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(() => setPhase('gone'), reduced ? 0 : FADE_MS);

    return () => window.clearTimeout(timer);
  }, [phase]);

  // Hold the viewport still for as long as the splash is on screen.
  useEffect(() => {
    if (phase === 'gone') return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previous;
    };
  }, [phase]);

  return (
    <>
      <div className={styles.splash} data-phase={phase} aria-hidden={phase === 'gone' || undefined}>
        <div className={styles.stage} aria-hidden="true">
          <div className={styles.waves}>
            <div className={`${styles.wave} ${styles.w1}`} />
            <div className={`${styles.wave} ${styles.w2}`} />
            <div className={`${styles.wave} ${styles.w3}`} />
          </div>
        </div>

        <div className={styles.logo}>
          {/* Written in title case and uppercased in CSS: screen readers read
              it as words rather than spelling out three all-caps strings. */}
          <h1 className={styles.wordmark}>
            <span className={styles.race}>Race</span>{' '}
            <span className={styles.against}>Against</span>{' '}
            <span className={styles.cancers}>Cancers</span>
          </h1>
        </div>
      </div>

      <div className={styles.content} data-phase={phase} inert={phase === 'active'}>
        {children}
      </div>

      {/* Without JS nothing can dismiss the splash, so don't show it at all. */}
      <noscript>
        <style>
          {`.${styles.splash}{display:none!important}.${styles.content}{opacity:1!important}`}
        </style>
      </noscript>
    </>
  );
}
