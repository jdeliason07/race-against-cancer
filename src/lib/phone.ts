// Stripe stores `phone` as free text, so normalize to E.164 before saving —
// that's the format the Dashboard, SMS tools, and exports all expect.
// Bare 10-digit (or 1 + 10-digit) input is treated as US/Canada; anything else
// must be entered with a leading + and country code.
export function normalizePhone(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const digits = trimmed.replace(/\D/g, '');

  if (trimmed.startsWith('+')) {
    // E.164 allows 8–15 digits including the country code
    return digits.length >= 8 && digits.length <= 15 ? `+${digits}` : null;
  }
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return null;
}
