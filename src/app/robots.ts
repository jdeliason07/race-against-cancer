import { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Private sponsor-funded registration links, and the internal endpoints.
      disallow: ['/register/invite/', '/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
