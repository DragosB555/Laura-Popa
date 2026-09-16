/* =========================================================================
   Acordul pentru cookie-uri de analiza (Google Analytics).

   Alegerea sta in `localStorage`, nu intr-un cookie: e strict necesara ca
   bannerul sa nu apara la fiecare vizita, deci nu cere ea insasi acord.
   Expira dupa un an, cand intrebam din nou.
   ========================================================================= */

import { useSyncExternalStore } from 'react';

export type ConsentValue = 'granted' | 'denied';
/** Pe server (si la prima randare) nu stim inca alegerea. */
export type ConsentState = ConsentValue | null | 'unknown';

const STORAGE_KEY = 'lp-cookie-consent';
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

/** Evenimente pe `window`: s-a schimbat alegerea / cineva cere bannerul inapoi. */
export const CONSENT_CHANGE_EVENT = 'lp-consent-change';
export const CONSENT_OPEN_EVENT = 'lp-consent-open';

export function readConsent(): ConsentValue | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw) as { value?: string; at?: number };
    if (stored.value !== 'granted' && stored.value !== 'denied') return null;
    if (typeof stored.at !== 'number' || Date.now() - stored.at > MAX_AGE_MS) return null;
    return stored.value;
  } catch {
    return null;
  }
}

export function writeConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ value, at: Date.now() }));
  } catch {
    /* Fara stocare alegerea tine doar pana la reincarcare. */
  }
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_CHANGE_EVENT, { detail: value }));
}

/** Redeschide bannerul, ca vizitatorul sa-si poata schimba alegerea. */
export function openConsentSettings() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

/** Alegerea curenta, sincronizata intre componente si taburi. */
export function useConsent(): ConsentState {
  return useSyncExternalStore(subscribe, readConsent, () => 'unknown');
}
