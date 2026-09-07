import styles from './SvgDefs.module.css';

/**
 * Definitii SVG globale, randate o singura data in layout.
 *
 * `#btn-goo` intareste canalul alfa (alfa x 22 - 10), astfel incat
 * formele neclarizate sa capete margini dure si sa se lipeasca intre ele
 * — efectul metaball al butonului primary.
 */
export function SvgDefs() {
  return (
    <svg className={styles.defs} aria-hidden="true" focusable="false">
      <defs>
        <filter id="btn-goo" x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 22 -10"
          />
        </filter>
      </defs>
    </svg>
  );
}
