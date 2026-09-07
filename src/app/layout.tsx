import type { Metadata, Viewport } from 'next';
import { Inter, Lora } from 'next/font/google';
import { SvgDefs } from '@/components/ui';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { site } from '@/content/site';
import './globals.css';

const sans = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-sans-loaded',
});

const serif = Lora({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-serif-loaded',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    url: '/',
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#fbfaf8',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a href="#continut" className="u-skip-link">
          Sari la conținut
        </a>
        <SvgDefs />
        <Header />
        <main id="continut">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
