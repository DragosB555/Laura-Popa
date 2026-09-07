'use client';

import { GradientWaves } from '@/components/ui';
import { useMediaQuery } from '@/lib/useMediaQuery';
import styles from './Hero.module.css';

/**
 * Fundalul de valuri al hero-ului.
 *
 * Raymarch-ul este scump, asa ca pe ecrane mici ramanem pe treapta de
 * calitate joasa; pe desktop urcam la `medium`. Efectul este pur decorativ.
 */
export function HeroWaves() {
  const isDesktop = useMediaQuery('(min-width: 64rem)');

  return (
    <div className={styles.waves} aria-hidden="true">
      <GradientWaves
        horizonColor="#d7e2d3"
        waveColor="#6b8a69"
        crestColor="#ffffff"
        speed={0.25}
        amplitude={1.6}
        waveScale={0.6}
        waveRatio={0.9}
        swell={35}
        turbulence={20}
        tilt={1.11}
        zoom={0.95}
        height={5.5}
        fogDepth={26}
        detail={isDesktop ? 'medium' : 'low'}
        brightness={1}
        opacity={0.9}
        mouseInteraction={isDesktop}
        parallaxStrength={0.35}
        grain
        grainIntensity={0.035}
      />
    </div>
  );
}
