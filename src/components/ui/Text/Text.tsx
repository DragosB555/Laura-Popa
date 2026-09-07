import type { ElementType, ReactNode } from 'react';
import { cx } from '@/lib/cx';
import styles from './Text.module.css';

export type TextSize = 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl';
export type TextTone = 'default' | 'muted' | 'soft' | 'inverseMuted';

const sizeClass: Record<TextSize, string> = {
  xs: styles.xs,
  sm: styles.sm,
  base: styles.base,
  md: styles.md,
  lg: styles.lg,
  xl: styles.xl,
};

const toneClass: Record<TextTone, string> = {
  default: styles.toneDefault,
  muted: styles.toneMuted,
  soft: styles.toneSoft,
  inverseMuted: styles.toneInverseMuted,
};

type TextProps = {
  children: ReactNode;
  /** Marimea textului. Implicit: `base`. */
  size?: TextSize;
  /** Culoarea textului. Implicit: `muted`. */
  tone?: TextTone;
  /** Elementul HTML randat. Implicit: `p`. */
  as?: ElementType;
  /** Limiteaza latimea randului pentru lizibilitate. */
  measure?: 'narrow' | 'default' | 'wide' | false;
  className?: string;
};

const measureClass = {
  narrow: 'u-measure-narrow',
  default: 'u-measure',
  wide: 'u-measure-wide',
} as const;

export function Text({
  children,
  size = 'base',
  tone = 'muted',
  as: Tag = 'p',
  measure = 'default',
  className,
}: TextProps) {
  return (
    <Tag
      className={cx(
        styles.text,
        sizeClass[size],
        toneClass[tone],
        measure ? measureClass[measure] : undefined,
        'u-pretty',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
