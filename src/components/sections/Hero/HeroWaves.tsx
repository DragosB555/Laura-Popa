'use client';

import { GradientWaves } from '@/components/ui';
import { useMediaQuery } from '@/lib/useMediaQuery';
import styles from './Hero.module.css';

/**
 * Fundalul de valuri al hero-ului.
 *
 * Raymarch-ul este scump, asa ca pe ecrane mici ramanem pe treapta de
 * calitate joasa; pe desktop urcam la `medium`. Efectul este pur decorativ.
 *
 * Despre culori: in shader `alpha` este chiar factorul de ceata, deci acolo
 * unde s-ar vedea `horizonColor` transparenta e deja aproape totala.
 * Ce se vede efectiv este amestecul dintre `waveColor` si `crestColor` —
 * amandoua trebuie sa aiba ton, altfel efectul dispare pe fundal deschis.
 */
export function HeroWaves() {
  const isDesktop = useMediaQuery('(min-width: 64rem)');

  return (
    <div className={styles.waves} aria-hidden="true">
      <GradientWaves
        horizonColor="#e7eee5"
        waveColor="#6b7f6e"
        crestColor="#c8d4c6"
        speed={0.25}
        amplitude={2}
        waveScale={0.6}
        waveRatio={0.9}
        swell={35}
        turbulence={20}
        tilt={1.11}
        zoom={0.95}
        height={5.5}
        fogDepth={38}
        detail={isDesktop ? 'medium' : 'low'}
        brightness={1}
        opacity={1}
        mouseInteraction={isDesktop}
        parallaxStrength={0.35}
        grain
        grainIntensity={0.035}
      />
    </div>
  );
}
