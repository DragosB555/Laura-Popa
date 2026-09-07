import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { Container, type ContainerSize } from '@/components/ui/Container';
import styles from './Section.module.css';

export type SectionTone = 'default' | 'alt' | 'surface' | 'inverse' | 'accent';
export type SectionSize = 'sm' | 'md' | 'lg';

const toneClass: Record<SectionTone, string> = {
  default: styles.toneDefault,
  alt: styles.toneAlt,
  surface: styles.toneSurface,
  inverse: styles.toneInverse,
  accent: styles.toneAccent,
};

const sizeClass: Record<SectionSize, string | undefined> = {
  sm: styles.sizeSm,
  md: undefined,
  lg: styles.sizeLg,
};

type SectionProps = {
  children: ReactNode;
  /** Ancora pentru navigatie (ex. `#despre`). */
  id?: string;
  /** Fundalul sectiunii. Implicit: `default`. */
  tone?: SectionTone;
  /** Spatierea verticala. Implicit: `md`. */
  size?: SectionSize;
  /** Latimea containerului interior. Implicit: `lg`. */
  containerSize?: ContainerSize;
  /** Adauga o linie fina in partea de sus. */
  divided?: boolean;
  /** Titlu ascuns vizual, pentru structura semantica / screen readers. */
  ariaLabel?: string;
  className?: string;
};

export function Section({
  children,
  id,
  tone = 'default',
  size = 'md',
  containerSize = 'lg',
  divided = false,
  ariaLabel,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cx(styles.section, toneClass[tone], sizeClass[size], divided && styles.divided, className)}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}
