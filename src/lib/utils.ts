import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
