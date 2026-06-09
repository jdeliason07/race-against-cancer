import Link from 'next/link';
import type { Metadata } from 'next';
import { isReleased, formatReleaseDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: '20 Stories',
  description:
    'Twenty cancer survivors. Twenty stories. One race. A new film drops every day for 20 days leading up to Race Against Cancers 2026.',
};

// 20 daily episodes: Oct 18 → Nov 6, 2026 (20 days before Nov 7 race day)
const SERIES_START = '2026-10-18';

function buildEpisodes() {
  const episodes = [];
  const start = new Date(SERIES_START + 'T00:00:00');
  for (let i = 0; i < 20; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const dateStr = d.toISOString().slice(0, 10);
    episodes.push({ number: i + 1, releaseDate: dateStr });
  }
  return episodes;
}

const episodes = buildEpisodes();

export default function DocumentaryPage() {
  const firstRelease = formatReleaseDate(SERIES_START);
  const anyReleased = episodes.some((e) => isReleased(e.releaseDate));

  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="bg-ink py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="section-label mb-4 text-petal">Documentary Series</p>
          <h1 className="font-display text-[clamp(56px,12vw,120px)] uppercase leading-none text-white">
            20 Stories
          </h1>
          <p className="mt-6 mx-auto max-w-2xl font-body text-lg text-white/60">
            Twenty cancer survivors. Twenty films. One drops every day for 20 days leading up
            to race day — November 7, 2026.
          </p>
          {!anyReleased && (
            <div className="mt-8 inline-block rounded-card border border-white/20 bg-white/10 px-6 py-4">
              <p className="font-body text-sm text-white/80">
                First episode releases <span className="font-bold text-white">{firstRelease}</span>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* About the series */}
      <section className="bg-blush py-16 border-b border-petal">
        <div className="mx-auto max-w-3xl px-6">
          <div className="grid gap-8 md:grid-cols-3 text-center">
            {[
              { number: '20', label: 'Cancer survivors' },
              { number: '20', label: 'Short films' },
              { number: '20', label: 'Days of release' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-6xl uppercase text-pink leading-none">{stat.number}</p>
                <p className="mt-2 font-body text-sm text-ash">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 font-body text-base leading-relaxed text-ash text-center">
            This is the reason we race. Every person in this series has been touched by cancer —
            and every one of them found a way to keep going. Watch their stories. Share them. Then
            lace up and run for them on November 7.
          </p>
        </div>
      </section>

      {/* Episode grid */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rule-line mb-12">
            <div className="h-px flex-1 bg-line" aria-hidden="true" />
            <span className="section-label">Episodes</span>
            <div className="h-px flex-1 bg-line" aria-hidden="true" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {episodes.map((ep) => {
              const released = isReleased(ep.releaseDate);
              const dateLabel = formatReleaseDate(ep.releaseDate);
              return (
                <div
                  key={ep.number}
                  className="rounded-card border border-line bg-paper p-6 flex flex-col gap-3"
                  style={{ opacity: released ? 1 : 0.65 }}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-display text-3xl uppercase text-pink leading-none">
                      {String(ep.number).padStart(2, '0')}
                    </span>
                    {released ? (
                      <span className="rounded-pill bg-pink px-3 py-1 font-body text-[10px] font-bold uppercase tracking-widest text-white">
                        Watch
                      </span>
                    ) : (
                      <span className="rounded-pill border border-line px-3 py-1 font-body text-[10px] font-bold uppercase tracking-widest text-ash">
                        {dateLabel}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-display text-base uppercase text-ink leading-snug">
                      {released ? 'Story Title' : 'Coming soon'}
                    </p>
                    <p className="mt-1 font-body text-xs text-ash">
                      {released ? 'Watch the full film →' : `Releases ${dateLabel}`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {!anyReleased && (
            <div className="mt-12 rounded-card border-2 border-dashed border-petal bg-mist p-10 text-center">
              <p className="font-display text-2xl uppercase text-ink mb-3">
                Films drop starting {firstRelease}
              </p>
              <p className="font-body text-sm text-ash mb-6">
                Follow us on social media or check back here daily once the series begins.
                Every film is a reason to run.
              </p>
              <Link href="/register" className="btn-primary">
                Register Now
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blush py-20 border-t border-petal">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="section-label mb-4">Race Against Cancers 2026</p>
          <p className="font-display text-4xl uppercase text-ink mb-6">
            Their stories are the reason we run.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register" className="btn-primary">
              Register
            </Link>
            <Link href="/donate" className="btn-ghost">
              Donate
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
