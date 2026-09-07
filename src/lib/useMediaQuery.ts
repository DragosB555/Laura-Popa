'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Urmareste un media query fara sa produca nepotriviri la hidratare:
 * pe server raspunsul este intotdeauna `false`, iar dupa hidratare
 * componenta se reasaza pe valoarea reala.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
