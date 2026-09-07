import styles from './Button.module.css';

/** Numarul de forme care orbiteaza si se lipesc intre ele. */
const BLOB_COUNT = 8;

/**
 * Suprafata animata a butonului primary.
 * Pur decorativa — ascunsa pentru tehnologiile asistive.
 * Depinde de filtrul SVG `#btn-goo`, randat o singura data in layout.
 */
export function Plasma() {
  return (
    <span aria-hidden="true" className={styles.plasma}>
      <span className={styles.goo}>
        <span className={styles.gooBlur}>
          {Array.from({ length: BLOB_COUNT }, (_, index) => (
            <span key={index} className={styles.blob} />
          ))}
        </span>
      </span>
    </span>
  );
}
