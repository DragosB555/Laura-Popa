import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import styles from './Heading.module.css';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = 'display' | 'xl' | 'lg' | 'md' | 'sm';

const sizeClass: Record<HeadingSize, string> = {
  display: styles.display,
  xl: styles.xl,
  lg: styles.lg,
  md: styles.md,
  sm: styles.sm,
};

type HeadingProps = {
  children: ReactNode;
  /** Nivelul semantic (h1-h6). Alege-l dupa structura paginii, nu dupa marime. */
  level?: HeadingLevel;
  /** Marimea vizuala, independenta de nivelul semantic. Implicit: `lg`. */
  size?: HeadingSize;
  /** Foloseste fontul sans-serif in loc de serif. */
  sans?: boolean;
  /** Echilibreaza randurile (`text-wrap: balance`). Implicit: activ. */
  balance?: boolean;
  id?: string;
  className?: string;
};

export function Heading({
  children,
  level = 2,
  size = 'lg',
  sans = false,
  balance = true,
  id,
  className,
}: HeadingProps) {
  const Tag = `h${level}` as const;

  return (
    <Tag
      id={id}
      className={cx(styles.heading, sizeClass[size], sans && styles.sans, balance && 'u-balance', className)}
    >
      {children}
    </Tag>
  );
}
