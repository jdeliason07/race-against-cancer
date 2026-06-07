export interface Episode {
  id: number;
  personName: string;
  title: string;
  description: string;
  videoId: string;       // YouTube or Vimeo ID
  videoProvider: 'youtube' | 'vimeo';
  releaseDate: string;   // ISO date string YYYY-MM-DD
}

// Release schedule: Oct 18 – Nov 6, 2026 (20 days, one per day)
// Replace videoId placeholders with real IDs from your documentary host
export const episodes: Episode[] = [
  { id: 1,  personName: "[[Person Name]]", title: "[[Episode Title]]", description: "[[A short, human description of this person's story — 1–2 sentences.]]", videoId: "[[YOUTUBE_OR_VIMEO_ID]]", videoProvider: "youtube", releaseDate: "2026-10-18" },
  { id: 2,  personName: "[[Person Name]]", title: "[[Episode Title]]", description: "[[A short, human description of this person's story — 1–2 sentences.]]", videoId: "[[YOUTUBE_OR_VIMEO_ID]]", videoProvider: "youtube", releaseDate: "2026-10-19" },
  { id: 3,  personName: "[[Person Name]]", title: "[[Episode Title]]", description: "[[A short, human description of this person's story — 1–2 sentences.]]", videoId: "[[YOUTUBE_OR_VIMEO_ID]]", videoProvider: "youtube", releaseDate: "2026-10-20" },
  { id: 4,  personName: "[[Person Name]]", title: "[[Episode Title]]", description: "[[A short, human description of this person's story — 1–2 sentences.]]", videoId: "[[YOUTUBE_OR_VIMEO_ID]]", videoProvider: "youtube", releaseDate: "2026-10-21" },
  { id: 5,  personName: "[[Person Name]]", title: "[[Episode Title]]", description: "[[A short, human description of this person's story — 1–2 sentences.]]", videoId: "[[YOUTUBE_OR_VIMEO_ID]]", videoProvider: "youtube", releaseDate: "2026-10-22" },
  { id: 6,  personName: "[[Person Name]]", title: "[[Episode Title]]", description: "[[A short, human description of this person's story — 1–2 sentences.]]", videoId: "[[YOUTUBE_OR_VIMEO_ID]]", videoProvider: "youtube", releaseDate: "2026-10-23" },
  { id: 7,  personName: "[[Person Name]]", title: "[[Episode Title]]", description: "[[A short, human description of this person's story — 1–2 sentences.]]", videoId: "[[YOUTUBE_OR_VIMEO_ID]]", videoProvider: "youtube", releaseDate: "2026-10-24" },
  { id: 8,  personName: "[[Person Name]]", title: "[[Episode Title]]", description: "[[A short, human description of this person's story — 1–2 sentences.]]", videoId: "[[YOUTUBE_OR_VIMEO_ID]]", videoProvider: "youtube", releaseDate: "2026-10-25" },
  { id: 9,  personName: "[[Person Name]]", title: "[[Episode Title]]", description: "[[A short, human description of this person's story — 1–2 sentences.]]", videoId: "[[YOUTUBE_OR_VIMEO_ID]]", videoProvider: "youtube", releaseDate: "2026-10-26" },
  { id: 10, personName: "[[Person Name]]", title: "[[Episode Title]]", description: "[[A short, human description of this person's story — 1–2 sentences.]]", videoId: "[[YOUTUBE_OR_VIMEO_ID]]", videoProvider: "youtube", releaseDate: "2026-10-27" },
  { id: 11, personName: "[[Person Name]]", title: "[[Episode Title]]", description: "[[A short, human description of this person's story — 1–2 sentences.]]", videoId: "[[YOUTUBE_OR_VIMEO_ID]]", videoProvider: "youtube", releaseDate: "2026-10-28" },
  { id: 12, personName: "[[Person Name]]", title: "[[Episode Title]]", description: "[[A short, human description of this person's story — 1–2 sentences.]]", videoId: "[[YOUTUBE_OR_VIMEO_ID]]", videoProvider: "youtube", releaseDate: "2026-10-29" },
  { id: 13, personName: "[[Person Name]]", title: "[[Episode Title]]", description: "[[A short, human description of this person's story — 1–2 sentences.]]", videoId: "[[YOUTUBE_OR_VIMEO_ID]]", videoProvider: "youtube", releaseDate: "2026-10-30" },
  { id: 14, personName: "[[Person Name]]", title: "[[Episode Title]]", description: "[[A short, human description of this person's story — 1–2 sentences.]]", videoId: "[[YOUTUBE_OR_VIMEO_ID]]", videoProvider: "youtube", releaseDate: "2026-10-31" },
  { id: 15, personName: "[[Person Name]]", title: "[[Episode Title]]", description: "[[A short, human description of this person's story — 1–2 sentences.]]", videoId: "[[YOUTUBE_OR_VIMEO_ID]]", videoProvider: "youtube", releaseDate: "2026-11-01" },
  { id: 16, personName: "[[Person Name]]", title: "[[Episode Title]]", description: "[[A short, human description of this person's story — 1–2 sentences.]]", videoId: "[[YOUTUBE_OR_VIMEO_ID]]", videoProvider: "youtube", releaseDate: "2026-11-02" },
  { id: 17, personName: "[[Person Name]]", title: "[[Episode Title]]", description: "[[A short, human description of this person's story — 1–2 sentences.]]", videoId: "[[YOUTUBE_OR_VIMEO_ID]]", videoProvider: "youtube", releaseDate: "2026-11-03" },
  { id: 18, personName: "[[Person Name]]", title: "[[Episode Title]]", description: "[[A short, human description of this person's story — 1–2 sentences.]]", videoId: "[[YOUTUBE_OR_VIMEO_ID]]", videoProvider: "youtube", releaseDate: "2026-11-04" },
  { id: 19, personName: "[[Person Name]]", title: "[[Episode Title]]", description: "[[A short, human description of this person's story — 1–2 sentences.]]", videoId: "[[YOUTUBE_OR_VIMEO_ID]]", videoProvider: "youtube", releaseDate: "2026-11-05" },
  { id: 20, personName: "[[Person Name]]", title: "[[Episode Title]]", description: "[[A short, human description of this person's story — 1–2 sentences.]]", videoId: "[[YOUTUBE_OR_VIMEO_ID]]", videoProvider: "youtube", releaseDate: "2026-11-06" },
];
