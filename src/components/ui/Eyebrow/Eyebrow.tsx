import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import styles from './Eyebrow.module.css';

type EyebrowProps = {
  children: ReactNode;
  /** Ajusteaza culoarea pentru fundal inchis. */
  onInverse?: boolean;
  className?: string;
};

/** Eticheta mica de deasupra unui titlu de sectiune. */
export function Eyebrow({ children, onInverse = false, className }: EyebrowProps) {
  return <span className={cx(styles.eyebrow, onInverse && styles.inverse, className)}>{children}</span>;
}
