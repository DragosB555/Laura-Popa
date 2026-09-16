'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Scroll fluid, pe toata pagina.
 *
 * Se opreste la `prefers-reduced-motion`, unde miscarea in plus nu e dorita,
 * si atunci raman comportamentele native ale browserului.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;

    /* `anchors`: linkurile `#...` trec prin Lenis. Altfel browserul sare la
       tinta, dar derularea lina inca in curs trage pagina inapoi unde era. */
    const lenis = new Lenis({ duration: 1.1, anchors: true });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
