'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { legal } from '@/content/site';
import {
  CONSENT_OPEN_EVENT,
  openConsentSettings,
  useConsent,
  writeConsent,
  type ConsentValue,
} from '@/lib/consent';
import styles from './CookieBanner.module.css';

/**
 * Bannerul de cookie-uri: un card lat, jos, cu fursec, text si butoane.
 *
 * Apare doar daca vizitatorul nu a ales inca (sau alegerea a expirat) si
 * revine din „Setări cookies”, in contact. Se randeaza abia in browser, ca
 * pagina generata la build sa nu-l contina deja deschis.
 */
export function CookieBanner() {
  const consent = useConsent();
  /* Redeschis din „Setări cookies”, desi exista deja o alegere. */
  const [isReopened, setIsReopened] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const copy = legal.banner;

  useEffect(() => {
    const onOpen = () => {
      setIsClosing(false);
      setIsReopened(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  /* Intai iese cardul, apoi se salveaza alegerea (care il scoate din pagina). */
  function choose(value: ConsentValue) {
    setIsClosing(true);
    window.setTimeout(() => {
      writeConsent(value);
      setIsReopened(false);
      setIsClosing(false);
    }, 400);
  }

  const isOpen = consent !== 'unknown' && (consent === null || isReopened);
  if (!isOpen) return null;

  return (
    <section aria-label={copy.label} className={`${styles.banner} u-squircle`} data-closing={isClosing}>
      <span aria-hidden="true" className={styles.cookie}>
        {'\u{1F36A}'}
      </span>

      <p className={styles.text}>
        {copy.before}
        <Link href={legal.privacyPath} className={styles.link}>
          {copy.privacyLink}
        </Link>
        {copy.between}
        <Link href={legal.cookiesPath} className={styles.link}>
          {copy.cookiesLink}
        </Link>
        {copy.after}
      </p>

      <div className={styles.actions}>
        <button type="button" className={`${styles.reject} u-squircle`} onClick={() => choose('denied')}>
          {copy.reject}
        </button>
        <button type="button" className={`${styles.accept} u-squircle`} onClick={() => choose('granted')}>
          {copy.accept}
        </button>
      </div>
    </section>
  );
}

/** „Setări cookies”: redeschide bannerul. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={openConsentSettings}>
      {legal.footer.settings}
    </button>
  );
}
