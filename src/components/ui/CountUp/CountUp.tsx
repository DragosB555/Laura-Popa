'use client';

import { useEffect, useState } from 'react';
import { useReveal } from '@/lib/useReveal';

type CountUpProps = {
  /** Valoarea finala. */
  value: number;
  /** Durata numaratorii, in milisecunde. */
  duration?: number;
  className?: string;
};

/** Porneste repede si incetineste spre tinta, fara sa treaca peste ea. */
function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

/**
 * Numara de la zero pana la `value` cand intra in ecran.
 *
 * Randarea de pe server da direct valoarea finala, deci fara JavaScript
 * numarul e corect. La `prefers-reduced-motion` numaratoarea nu porneste.
 */
export function CountUp({ value, duration = 1100, className }: CountUpProps) {
  const { ref, isRevealed } = useReveal<HTMLSpanElement>();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!isRevealed) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Primul cadru pune deja aproape zero, deci nu resetam separat inainte.
    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(value * easeOutCubic(progress)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isRevealed, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
