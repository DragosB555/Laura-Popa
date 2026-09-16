'use client';

import { useEffect, useRef } from 'react';
import animationData from './scroll-hint.json';
import styles from './ScrollHint.module.css';

type ScrollHintProps = {
  className?: string;
};

/**
 * Indicatorul de derulare: un mouse cu rotita care coboara, animat cu Lottie.
 *
 * Conturul si rotita iau culoarea din `color` (vezi CSS-ul), deci se potrivesc
 * cu textul din jur. Playerul se incarca doar in browser. La
 * `prefers-reduced-motion` ramane un cadru static.
 */
export function ScrollHint({ className }: ScrollHintProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    let cancelled = false;
    let destroy = () => {};

    import('lottie-web/build/player/lottie_light').then(({ default: lottie }) => {
      if (cancelled) return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const animation = lottie.loadAnimation({
        container,
        renderer: 'svg',
        loop: !reduced,
        autoplay: !reduced,
        animationData,
      });
      if (reduced) animation.goToAndStop(20, true);
      destroy = () => animation.destroy();
    });

    return () => {
      cancelled = true;
      destroy();
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className={`${styles.hint} ${className ?? ''}`} />;
}
