// Block-print sunrise — the brand's signature mark.
// Gold sun + rays over Deep Water waves. Treat it like a stamp.

export function SunStamp({
  className,
  gold = '#F7DF75',
  ink = 'currentColor',
}: {
  className?: string;
  gold?: string;
  ink?: string;
}) {
  // 9 rays across the top semicircle
  const rays = Array.from({ length: 9 }, (_, i) => {
    const a = Math.PI + (i / 8) * Math.PI;
    const x1 = 50 + Math.cos(a) * 22;
    const y1 = 52 + Math.sin(a) * 22;
    const x2 = 50 + Math.cos(a) * 30;
    const y2 = 52 + Math.sin(a) * 30;
    return (
      <line
        key={i}
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={gold} strokeWidth={3.2} strokeLinecap="round"
      />
    );
  });

  return (
    <svg viewBox="0 0 100 90" className={className} role="img" aria-label="Sunny Tides">
      {rays}
      <path d="M30 52 A20 20 0 0 1 70 52 Z" fill={gold} />
      <path
        d="M14 64 q9 -7 18 0 t18 0 t18 0"
        fill="none" stroke={ink} strokeWidth={3.4} strokeLinecap="round"
      />
      <path
        d="M14 76 q9 -7 18 0 t18 0 t18 0"
        fill="none" stroke={ink} strokeWidth={3.4} strokeLinecap="round"
      />
    </svg>
  );
}
