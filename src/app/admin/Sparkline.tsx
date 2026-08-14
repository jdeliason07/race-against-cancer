import { SERIES_DAYS } from '@/lib/adminStats';

// Single series, single hue. #F0307A is the site accent and validates clean
// against a white surface (lightness band, chroma floor, and 3:1 contrast), so
// there is no second colour to separate under colour-vision deficiency — the
// most recent day is marked by a label rather than a hue change.
const ACCENT = '#F0307A';
const BASELINE = '#ECE2E6';

const WIDTH = 240;
const HEIGHT = 40;
const GAP = 2; // surface gap between adjacent bars
const RADIUS = 2;

function dayLabel(indexFromEnd: number): string {
  const d = new Date(Date.now() - indexFromEnd * 24 * 60 * 60 * 1000);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function Sparkline({
  series,
  format = (n: number) => n.toLocaleString(),
  caption,
}: {
  series: number[];
  format?: (n: number) => string;
  caption: string;
}) {
  const max = Math.max(...series, 1);
  const barWidth = (WIDTH - GAP * (SERIES_DAYS - 1)) / SERIES_DAYS;
  const latest = series[series.length - 1] ?? 0;
  const hasAny = series.some((v) => v > 0);

  return (
    <figure className="mt-3 m-0">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        width="100%"
        height={HEIGHT}
        role="img"
        aria-label={`${caption}. Most recent day ${format(latest)}.`}
        preserveAspectRatio="none"
      >
        {/* Baseline, so an all-zero stretch still reads as "zero" not "missing" */}
        <line x1="0" y1={HEIGHT - 0.5} x2={WIDTH} y2={HEIGHT - 0.5} stroke={BASELINE} strokeWidth="1" />
        {series.map((value, i) => {
          const h = value === 0 ? 0 : Math.max(2, (value / max) * (HEIGHT - 3));
          const x = i * (barWidth + GAP);
          return (
            <rect
              key={i}
              x={x}
              y={HEIGHT - h}
              width={barWidth}
              height={h}
              rx={RADIUS}
              fill={ACCENT}
            >
              <title>{`${dayLabel(SERIES_DAYS - 1 - i)}: ${format(value)}`}</title>
            </rect>
          );
        })}
      </svg>
      <figcaption className="mt-1 font-body text-[11px] text-ash">
        {hasAny ? `${caption} · latest ${format(latest)}` : caption}
      </figcaption>
    </figure>
  );
}
