import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { TextReveal } from '@/components/ui/TextReveal';
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
  /** Apare cuvant cu cuvant la scroll (fade + blur). Necesita `children` string. */
  reveal?: boolean;
  id?: string;
  className?: string;
};

export function Heading({
  children,
  level = 2,
  size = 'lg',
  sans = false,
  balance = true,
  reveal = false,
  id,
  className,
}: HeadingProps) {
  const Tag = `h${level}` as const;
  const classes = cx(styles.heading, sizeClass[size], sans && styles.sans, balance && 'u-balance', className);

  if (reveal && typeof children === 'string') {
    return (
      <TextReveal as={Tag} id={id} className={classes}>
        {children}
      </TextReveal>
    );
  }

  return (
    <Tag id={id} className={classes}>
      {children}
    </Tag>
  );
}
