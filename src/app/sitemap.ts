import { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/site';

const base = SITE_URL.replace('[[YOUR-DOMAIN.com]]', 'raceagainstcancer.org');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base,                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 1   },
    { url: `${base}/register`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/course`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/race-details`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/sponsor`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/volunteer`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/about`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/faq`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];
}
