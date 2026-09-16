import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

/** Manifestul aplicatiei: numele si iconitele cand site-ul e salvat pe telefon. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} - ${site.role}`,
    short_name: site.name,
    description: site.description,
    lang: 'ro',
    start_url: '/',
    display: 'standalone',
    background_color: '#fbfaf8',
    theme_color: '#3b2c23',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { src: '/icon-512.png', type: 'image/png', sizes: '512x512' },
      { src: '/icon-512.png', type: 'image/png', sizes: '512x512', purpose: 'maskable' },
    ],
  };
}
