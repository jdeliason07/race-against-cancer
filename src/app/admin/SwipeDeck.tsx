'use client';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * Two full-width panes on one horizontal scroller.
 *
 * Native CSS scroll-snap does the work — it inherits the platform's own
 * momentum and rubber-banding, which is what makes a swipe feel right on iOS.
 * A JS-driven transform never quite matches it.
 *
 * Height is the fiddly part. Left alone, a flex row is as tall as its tallest
 * child, which hangs a screen of empty space under the shorter pane. Setting an
 * explicit height fixes that but has a trap: when `overflow-x` is `auto` the
 * browser computes `overflow-y` to `auto` as well, and the deck quietly becomes
 * a nested vertical scroller that swallows the page scroll. So `overflow-y` is
 * pinned to `hidden`, and the height is interpolated between the two panes as
 * you drag — it tracks the finger instead of snapping after the fact.
 */
export function SwipeDeck({ panes }: { panes: Array<{ key: string; node: React.ReactNode }> }) {
  const scroller = useRef<HTMLDivElement>(null);
  const paneRefs = useRef<Array<HTMLElement | null>>([]);
  const heights = useRef<number[]>([]);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [active, setActive] = useState(0);

  /** Height for the current scroll position, blended across the gap. */
  const applyHeight = useCallback(() => {
    const el = scroller.current;
    if (!el || el.clientWidth === 0) return;

    const progress = el.scrollLeft / el.clientWidth;
    const from = Math.max(0, Math.min(panes.length - 1, Math.floor(progress)));
    const to = Math.min(panes.length - 1, from + 1);
    const frac = progress - from;

    const a = heights.current[from];
    const b = heights.current[to];
    if (!a && !b) return;

    setHeight(Math.round((a ?? b) + ((b ?? a) - (a ?? b)) * frac));
    setActive(Math.max(0, Math.min(panes.length - 1, Math.round(progress))));
  }, [panes.length]);

  const measure = useCallback(() => {
    heights.current = paneRefs.current.map((pane) => pane?.offsetHeight ?? 0);
    applyHeight();
  }, [applyHeight]);

  // Measure before paint so the deck never flashes at the tallest pane's height.
  useLayoutEffect(measure, [measure]);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(applyHeight);
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('scroll', onScroll);
    };
  }, [applyHeight]);

  // Panels stream in behind Suspense and the composer grows as it is used.
  useEffect(() => {
    const observer = new ResizeObserver(measure);
    paneRefs.current.forEach((pane) => pane && observer.observe(pane));
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  function goTo(index: number) {
    const el = scroller.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' });
  }

  return (
    <div className="relative">
      <div
        ref={scroller}
        // items-start stops the short pane being stretched to the tall one;
        // overscroll containment keeps a horizontal flick from turning into a
        // browser back gesture halfway through.
        className="flex snap-x snap-mandatory items-start overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          height,
          // Explicit, or `overflow-x: auto` silently promotes this to `auto`
          // and the page scroll gets trapped in here.
          overflowY: 'hidden',
        }}
      >
        {panes.map(({ key, node }, i) => (
          <section
            key={key}
            ref={(el) => {
              paneRefs.current[i] = el;
            }}
            className="w-full shrink-0 snap-start snap-always"
            aria-roledescription="slide"
          >
            {node}
          </section>
        ))}
      </div>

      {/* Dots: the affordance that says "there's another page", and a tap target
          for anyone who doesn't think to swipe.

          The wrapper is full-width and sticks above the bottom of the viewport,
          so without `pointer-events-none` it is an invisible bar that eats every
          tap landing in that band — which is where a thumb naturally reaches,
          and why the composer's buttons down there read as dead. Only the pill
          itself takes pointer events back. */}
      <div className="pointer-events-none sticky bottom-4 z-10 mt-2 flex justify-center gap-2">
        <div className="pointer-events-auto flex gap-2 rounded-pill border border-line bg-paper/90 px-3 py-2 shadow-sm backdrop-blur">
          {panes.map(({ key }, i) => (
            <button
              key={key}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to ${key}`}
              aria-current={active === i}
              className="h-2.5 rounded-pill transition-all duration-300"
              style={{
                width: active === i ? '28px' : '10px',
                backgroundColor: active === i ? '#F0307A' : '#ECE2E6',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
