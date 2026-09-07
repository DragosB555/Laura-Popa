import Image from 'next/image';
import { cx } from '@/lib/cx';
import styles from './MediaPlaceholder.module.css';

export type MediaRatio = '1/1' | '3/4' | '4/5' | '4/3' | '3/2' | '16/9';
export type MediaShape = 'default' | 'rounded' | 'circle';

type MediaPlaceholderProps = {
  /** Proportia zonei de imagine. Implicit: `4/5`. */
  ratio?: MediaRatio;
  /** Forma coltului. Implicit: `rounded`. */
  shape?: MediaShape;
  /** Text afisat cat timp nu exista o imagine reala. */
  label?: string;
  /** Calea imaginii reale (ex. `/images/portret.jpg`). Cand lipseste, se afiseaza placeholderul. */
  src?: string;
  /** Text alternativ, obligatoriu cand exista `src`. */
  alt?: string;
  /** Incarca imaginea cu prioritate (doar pentru imaginea din hero). */
  priority?: boolean;
  /** Atributul `sizes` pentru next/image. */
  sizes?: string;
  className?: string;
};

export function MediaPlaceholder({
  ratio = '4/5',
  shape = 'rounded',
  label = 'Zona imagine',
  src,
  alt = '',
  priority = false,
  sizes = '(max-width: 900px) 100vw, 50vw',
  className,
}: MediaPlaceholderProps) {
  return (
    <div
      className={cx(styles.media, shape === 'rounded' && styles.rounded, shape === 'circle' && styles.circle, className)}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={styles.image} />
      ) : (
        <span className={styles.label}>{label}</span>
      )}
    </div>
  );
}
