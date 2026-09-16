'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { analytics } from '@/content/site';
import { useConsent } from '@/lib/consent';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Sterge cookie-urile Google Analytics (`_ga`, `_ga_<ID>`) de pe domeniu. */
function clearAnalyticsCookies() {
  const host = window.location.hostname;
  const domains = ['', host, `.${host}`, `.${host.replace(/^www\./, '')}`];
  document.cookie.split(';').forEach((entry) => {
    const name = entry.split('=')[0]?.trim();
    if (!name || !name.startsWith('_ga')) return;
    domains.forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
    });
  });
}

/** Opreste sau porneste masurarea fara reincarcarea paginii. */
function setMeasurementDisabled(id: string, disabled: boolean) {
  (window as unknown as Record<string, unknown>)[`ga-disable-${id}`] = disabled;
}

/**
 * Google Analytics 4, incarcat doar dupa acord.
 *
 * Pana la „Accept” nu se incarca niciun script Google si nu se pune niciun
 * cookie. La „Refuz” dupa un acord anterior, masurarea se opreste pe loc si
 * cookie-urile `_ga` se sterg. In dezvoltare (localhost) nu masoara nimic.
 */
export function Analytics() {
  const consent = useConsent();
  const id = analytics.gaId;

  /* Daca scriptul e deja incarcat, schimbarea alegerii se aplica pe loc. */
  useEffect(() => {
    if (consent === 'unknown' || !window.gtag) return;
    const denied = consent !== 'granted';
    setMeasurementDisabled(id, denied);
    window.gtag('consent', 'update', { analytics_storage: denied ? 'denied' : 'granted' });
    if (denied) clearAnalyticsCookies();
  }, [consent, id]);

  if (process.env.NODE_ENV !== 'production' || consent !== 'granted') return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'granted'
});
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
