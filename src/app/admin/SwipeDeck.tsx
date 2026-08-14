'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Two full-width panes on one horizontal scroller.
 *
 * Native CSS scroll-snap does the work — it inherits the platform's own
 * momentum and rubber-banding, which is what makes a swipe feel right on iOS.
 * A JS-driven transform never quite matches it.
 *
 * The scroller's height tracks the pane you're actually on. Left to itself a
 * flex row is as tall as its tallest child, which hangs a screen of empty space
 * under the shorter pane.
 */
export function SwipeDeck({ panes }: { panes: Array<{ key: string; node: React.ReactNode }> }) {
  const scroller = useRef<HTMLDivElement>(null);
  const paneRefs = useRef<Array<HTMLElement | null>>([]);
  const [active, setActive] = useState(0);
  const [height, setHeight] = useState<number | undefined>(undefined);

  const measure = useCallback((index: number) => {
    const pane = paneRefs.current[index];
    if (pane) setHeight(pane.offsetHeight);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const index = Math.round(el.scrollLeft / el.clientWidth);
        const clamped = Math.max(0, Math.min(panes.length - 1, index));
        setActive(clamped);
        measure(clamped);
      });
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('scroll', onScroll);
    };
  }, [panes.length, measure]);

  // Panels stream in behind Suspense and the composer grows as it is used, so
  // remeasure whenever a pane's own height changes rather than only on scroll.
  useEffect(() => {
    const observer = new ResizeObserver(() => measure(active));
    paneRefs.current.forEach((pane) => pane && observer.observe(pane));
    return () => observer.disconnect();
  }, [active, measure]);

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
          scrollBehavior: 'smooth',
          height,
          transition: 'height 250ms ease',
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
          for anyone who doesn't think to swipe. */}
      <div className="sticky bottom-4 z-10 mt-2 flex justify-center gap-2">
        <div className="flex gap-2 rounded-pill border border-line bg-paper/90 px-3 py-2 shadow-sm backdrop-blur">
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
