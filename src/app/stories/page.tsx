import { EpisodeCard } from '@/components/ui/EpisodeCard';
import { episodes } from '@/data/episodes';
import { DOCUMENTARY_TITLE, DOCUMENTARY_DESCRIPTION, DONATION_URL } from '@/config/site';
import { isReleased } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Stories — 20 Documentary Films',
  description: DOCUMENTARY_DESCRIPTION,
};

export default function StoriesPage() {
  const released = episodes.filter((ep) => isReleased(ep.releaseDate));
  const upcoming = episodes.filter((ep) => !isReleased(ep.releaseDate));

  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="bg-ink py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="section-label mb-4 text-petal">The documentary</p>
          <h1 className="font-display text-6xl uppercase text-white md:text-8xl">
            {DOCUMENTARY_TITLE}
          </h1>
          <p className="mt-6 font-body text-lg text-white/60 max-w-2xl mx-auto">
            {DOCUMENTARY_DESCRIPTION}
          </p>
          <p className="mt-4 font-body text-sm text-white/40">
            One film released daily · October 18 – November 6, 2026
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* Available now */}
        {released.length > 0 && (
          <section className="mb-20">
            <div className="rule-line mb-10">
              <div className="h-px flex-1 bg-line" aria-hidden="true" />
              <span className="section-label">Watch now — {released.length} {released.length === 1 ? 'film' : 'films'} available</span>
              <div className="h-px flex-1 bg-line" aria-hidden="true" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {released.map((ep) => (
                <EpisodeCard key={ep.id} episode={ep} />
              ))}
            </div>
          </section>
        )}

        {/* Coming soon */}
        {upcoming.length > 0 && (
          <section>
            <div className="rule-line mb-10">
              <div className="h-px flex-1 bg-line" aria-hidden="true" />
              <span className="section-label">Coming soon — {upcoming.length} {upcoming.length === 1 ? 'story' : 'stories'} still to come</span>
              <div className="h-px flex-1 bg-line" aria-hidden="true" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {upcoming.map((ep) => (
                <EpisodeCard key={ep.id} episode={ep} />
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="mt-20 rounded-card bg-blush p-10 text-center">
          <h2 className="font-display text-3xl uppercase text-ink mb-4">Moved by a story?</h2>
          <p className="font-body text-sm text-ash mb-8 max-w-lg mx-auto">
            Run in their honor on November 7, or make a donation in their name. Every act of support goes directly to the cause.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={DONATION_URL} target="_blank" rel="noopener noreferrer" className="btn-donate">
              Donate Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
