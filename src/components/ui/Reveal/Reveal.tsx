'use client';

import type { ElementType, ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { useReveal } from '@/lib/useReveal';

type RevealProps = {
  /** Optional: cutia poate fi si doar decor, fara continut. */
  children?: ReactNode;
  /** Intarziere in milisecunde, pentru efect de cascada. */
  delay?: number;
  /** Elementul HTML randat. Implicit: `div`. */
  as?: ElementType;
  className?: string;
};

/** Animatie discreta de intrare la scroll. Se dezactiveaza la `prefers-reduced-motion`. */
export function Reveal({ children, delay = 0, as: Tag = 'div', className }: RevealProps) {
  const { ref, isRevealed } = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      data-revealed={isRevealed}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cx('u-reveal', className)}
    >
      {children}
    </Tag>
  );
}
