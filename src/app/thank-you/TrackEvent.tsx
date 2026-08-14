'use client';
import { useEffect, useRef } from 'react';
import { track } from '@vercel/analytics';

/**
 * Fires the registration conversion once the confirmation actually renders.
 * Server Components can't call `track`, and the event has to be tied to a
 * confirmed payment rather than to a form submit — this is the only point
 * where both are true.
 */
export function TrackEvent() {
  const fired = useRef(false);

  useEffect(() => {
    // React runs effects twice in development's Strict Mode; the conversion
    // should be counted once either way.
    if (fired.current) return;
    fired.current = true;
    track('registration_complete');
  }, []);

  return null;
}
