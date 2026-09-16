import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Pagina de styleguide este un instrument intern, nu continut public.
      disallow: '/styleguide',
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
