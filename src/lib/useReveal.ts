'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Marcheaza un element ca "vizibil" prima data cand intra in viewport.
 * Folosit de componenta `Reveal` pentru animatia discreta de intrare.
 * Fara JavaScript, continutul ramane vizibil (vezi `@media (scripting: none)`).
 */
export function useReveal<T extends HTMLElement>(rootMargin = '0px 0px -80px 0px') {
  const ref = useRef<T>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.05 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, isRevealed };
}
