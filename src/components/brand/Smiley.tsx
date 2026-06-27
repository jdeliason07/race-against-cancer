// The hand-drawn smiley — the brand's informal signature.
// Loose and imperfect, never a perfect circle.

export function Smiley({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} role="img" aria-label="smiley" fill="none">
      {/* slightly wobbly face outline */}
      <path
        d="M30 5 C44 5 55 16 55 30 C55 45 43 55 30 55 C16 55 5 44 5 29 C5 15 17 5 30 5 Z"
        stroke="currentColor" strokeWidth={3} strokeLinecap="round"
      />
      <circle cx="22" cy="25" r="2.6" fill="currentColor" />
      <circle cx="38" cy="25" r="2.6" fill="currentColor" />
      <path d="M20 36 q10 11 21 1" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
    </svg>
  );
}
