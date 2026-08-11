import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { EVENT_DATE_ISO } from '@/config/site';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Age of majority — under this on race day, a guardian must accept the waiver. */
export const ADULT_AGE = 18;

/**
 * How old the athlete will be on race day, from a `YYYY-MM-DD` date of birth.
 * Compares calendar numbers rather than Date objects so the answer can't shift
 * by a day depending on the viewer's time zone. Returns null if unparseable.
 */
export function ageOnRaceDay(dobStr: string): number | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dobStr.trim());
  if (!match) return null;

  const [birthYear, birthMonth, birthDay] = match.slice(1).map(Number);
  const [raceYear, raceMonth, raceDay] = EVENT_DATE_ISO.slice(0, 10).split('-').map(Number);

  let age = raceYear - birthYear;
  if (raceMonth < birthMonth || (raceMonth === birthMonth && raceDay < birthDay)) age--;
  return age;
}

/** Rejects dates of birth that are in the future or implausibly old. */
export function isPlausibleDob(dobStr: string): boolean {
  const age = ageOnRaceDay(dobStr);
  return age !== null && age >= 0 && age <= 120;
}

export function isMinorOnRaceDay(dobStr: string): boolean {
  const age = ageOnRaceDay(dobStr);
  return age !== null && age < ADULT_AGE;
}

export function isReleased(releaseDateStr: string): boolean {
  const releaseDate = new Date(releaseDateStr + 'T00:00:00');
  const now = new Date();
  return now >= releaseDate;
}

export function formatReleaseDate(releaseDateStr: string): string {
  const date = new Date(releaseDateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
}
