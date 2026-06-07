import { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL.replace('[[YOUR-DOMAIN.com]]', 'raceagainstcancer.org')}/sitemap.xml`,
  };
}
