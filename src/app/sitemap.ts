import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

/** O singura pagina publica. `lastModified` e data build-ului. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
