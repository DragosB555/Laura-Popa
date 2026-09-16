import { LOGO_PATHS, LOGO_VIEWBOX } from './paths';

type LogoProps = {
  className?: string;
};

/**
 * Semnatura „Laura Popa”, desenata ca SVG.
 *
 * Inlocuieste fontul de scris de mana: nu mai asteapta incarcarea unui font si
 * arata la fel peste tot. Culoarea vine din `color` (`currentColor`), iar
 * marimea din inaltime — latimea urmeaza proportia.
 */
export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
      fill="currentColor"
      role="img"
      aria-label="Laura Popa"
      className={className}
    >
      {LOGO_PATHS.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
