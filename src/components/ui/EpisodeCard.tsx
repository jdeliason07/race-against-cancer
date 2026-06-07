'use client';
import { useState } from 'react';
import { Play, Lock } from 'lucide-react';
import { Episode } from '@/data/episodes';
import { isReleased, formatReleaseDate, cn } from '@/lib/utils';

interface EpisodeCardProps {
  episode: Episode;
}

function VideoEmbed({ episode }: { episode: Episode }) {
  const [loaded, setLoaded] = useState(false);
  const src =
    episode.videoProvider === 'youtube'
      ? `https://www.youtube.com/embed/${episode.videoId}?autoplay=1`
      : `https://player.vimeo.com/video/${episode.videoId}?autoplay=1`;

  if (!loaded) {
    const thumb =
      episode.videoProvider === 'youtube'
        ? `https://img.youtube.com/vi/${episode.videoId}/maxresdefault.jpg`
        : '/images/video-placeholder.jpg';
    return (
      <button
        onClick={() => setLoaded(true)}
        className="relative block w-full aspect-video bg-ink overflow-hidden group"
        aria-label={`Play episode ${episode.id}: ${episode.title}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumb} alt="" className="w-full h-full object-cover opacity-70 group-hover:opacity-85 transition-opacity" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-pink text-white shadow-lg group-hover:bg-raspberry transition-colors">
            <Play size={28} fill="currentColor" />
          </span>
        </span>
      </button>
    );
  }

  return (
    <iframe
      src={src}
      className="w-full aspect-video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title={`Episode ${episode.id}: ${episode.title}`}
    />
  );
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  const released = isReleased(episode.releaseDate);
  const releaseLabel = formatReleaseDate(episode.releaseDate);
  const isPlaceholder = episode.videoId.includes('[[');

  return (
    <article
      className={cn(
        'rounded-card border border-line overflow-hidden bg-paper transition-shadow',
        released ? 'hover:shadow-lg' : 'opacity-60',
      )}
      aria-label={`Episode ${episode.id}: ${episode.title} — ${released ? 'Available now' : `Available ${releaseLabel}`}`}
    >
      {/* Video / locked state */}
      <div className="relative aspect-video bg-mist flex items-center justify-center">
        {released && !isPlaceholder ? (
          <VideoEmbed episode={episode} />
        ) : released && isPlaceholder ? (
          <div className="flex flex-col items-center justify-center gap-3 p-6 text-center h-full">
            <Play size={32} className="text-petal" />
            <p className="font-body text-xs text-ash uppercase tracking-widest">Video coming soon — add ID to episodes.ts</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 p-6 text-center h-full">
            <Lock size={24} className="text-petal" />
            <p className="font-body text-xs font-bold uppercase tracking-widest text-ash">
              Coming {releaseLabel}
            </p>
          </div>
        )}
        {/* Episode number badge */}
        <span className="absolute top-3 left-3 rounded-chip bg-ink px-3 py-1 font-body text-xs font-bold uppercase tracking-widest text-white">
          Ep {String(episode.id).padStart(2, '0')}
        </span>
      </div>

      {/* Card body */}
      <div className="p-5">
        <p className="font-body text-xs font-bold uppercase tracking-widest text-pink mb-1">
          {episode.personName}
        </p>
        <h3 className="font-display text-lg uppercase text-ink leading-tight mb-2">
          {episode.title}
        </h3>
        <p className="font-body text-sm text-ash leading-relaxed">
          {episode.description}
        </p>
        {!released && (
          <p className="mt-4 font-body text-xs text-ash uppercase tracking-widest">
            Releases {releaseLabel}
          </p>
        )}
      </div>
    </article>
  );
}
