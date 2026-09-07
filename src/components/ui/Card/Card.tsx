import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import styles from './Card.module.css';

export type CardVariant = 'surface' | 'outline' | 'soft' | 'elevated' | 'plain';

const variantClass: Record<CardVariant, string | undefined> = {
  surface: undefined,
  outline: styles.outline,
  soft: styles.soft,
  elevated: styles.elevated,
  plain: styles.plain,
};

type CardProps = {
  children: ReactNode;
  /** Stilul cardului. Implicit: `surface`. */
  variant?: CardVariant;
  /** Padding mai generos. */
  padding?: 'md' | 'lg';
  className?: string;
};

export function Card({ children, variant = 'surface', padding = 'md', className }: CardProps) {
  return (
    <div className={cx(styles.card, variantClass[variant], padding === 'lg' && styles.padLg, className)}>
      {children}
    </div>
  );
}
