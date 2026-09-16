'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Marcheaza un element ca "vizibil" cat timp e in ecran. Marginile sunt
 * asimetrice intentionat: apare dupa ce a urcat 30% de la marginea de jos, dar
 * se stinge abia cand a iesit complet pe sus — altfel s-ar stinge text pe care
 * inca il citesti. La scroll invers reapare imediat ce reintra.
 * Fara JavaScript, continutul ramane vizibil (vezi `@media (scripting: none)`).
 */
export function useReveal<T extends HTMLElement>(rootMargin = '0px 0px -30% 0px') {
  const ref = useRef<T>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsRevealed(entry.isIntersecting);
      },
      { rootMargin, threshold: 0 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, isRevealed };
}
