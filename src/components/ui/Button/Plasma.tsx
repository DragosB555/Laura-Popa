import styles from './Button.module.css';

/** Numarul de blob-uri care orbiteaza peste corpul continuu. */
const BLOB_COUNT = 7;

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
          <span className={styles.blobBase} />
          {Array.from({ length: BLOB_COUNT }, (_, index) => (
            <span key={index} className={styles.blob} />
          ))}
        </span>
      </span>
    </span>
  );
}
