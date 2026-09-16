import type { Metadata, Viewport } from 'next';
import { Mulish } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { StructuredData } from '@/components/layout/StructuredData';
import { FinalCta } from '@/components/sections';
import { anchors, seo, site } from '@/content/site';
import './globals.css';

/* Un singur font pe tot site-ul: titluri, texte, navigatie si butoane. */
const serif = Mulish({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-serif-loaded',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: seo.title,
    template: `%s - ${site.name}`,
  },
  description: site.description,
  keywords: seo.keywords,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: 'coaching',
  alternates: { canonical: '/' },
  /* Imaginea vine din `opengraph-image.tsx`; Next o adauga singur aici. */
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    url: '/',
    siteName: site.name,
    title: seo.title,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  /* Codul din Google Search Console (metoda „Etichetă HTML”), pus in Vercel ca
     variabila de mediu. Fara el, eticheta nu apare. */
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: '#fbfaf8',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={serif.variable}>
      <body>
        <a href="#continut" className="u-skip-link">
          Sari la conținut
        </a>
        <StructuredData />
        <SmoothScroll />
        <Header />
        {/* Pagina aluneca peste contact, care sta fixat dedesubt. */}
        <main id="continut" className="u-page">
          {children}
        </main>

        {/* Deschide spatiul in care urca pagina si serveste drept linie de
            timp pentru rotunjirea colturilor. */}
        <div aria-hidden="true" className="u-page-spacer">
          {/* Tinta linkurilor spre contact. Contactul e fixat, deci nu are o
              pozitie in pagina la care sa sari; capatul distantierului e locul
              unde el se vede intreg. */}
          <span id={anchors.final} className="u-page-spacer-anchor" />
        </div>

        <FinalCta />
      </body>
    </html>
  );
}
