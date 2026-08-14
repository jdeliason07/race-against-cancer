import type { MetadataRoute } from 'next';
import { EVENT_NAME, META_DESCRIPTION, ORG_SHORT_NAME } from '@/config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: EVENT_NAME,
    short_name: ORG_SHORT_NAME,
    description: META_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#F0307A',
    icons: [
      // Served by src/app/icon.svg — scales to every size the OS asks for.
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
