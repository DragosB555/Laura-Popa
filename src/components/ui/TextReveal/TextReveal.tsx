'use client';

import { Fragment, type CSSProperties, type ElementType } from 'react';
import { cx } from '@/lib/cx';
import { useReveal } from '@/lib/useReveal';
import styles from './TextReveal.module.css';

type TextRevealProps = {
  /** Textul animat. Se imparte in cuvinte, deci trebuie sa fie string. */
  children: string;
  /** Elementul HTML randat. Implicit: `p`. */
  as?: ElementType;
  /** Intarzierea dinaintea primului cuvant, in milisecunde. */
  delay?: number;
  /** Decalajul dintre cuvinte, in milisecunde. Implicit: 55. */
  stagger?: number;
  id?: string;
  className?: string;
};

/**
 * Titlu care apare cuvant cu cuvant (fade + blur), la intrarea in viewport.
 * Se dezactiveaza la `prefers-reduced-motion` si fara JavaScript.
 */
export function TextReveal({
  children,
  as: Tag = 'p',
  delay = 0,
  stagger = 55,
  id,
  className,
}: TextRevealProps) {
  const { ref, isRevealed } = useReveal<HTMLElement>();
  const words = children.split(/\s+/).filter(Boolean);

  return (
    <Tag
      ref={ref}
      id={id}
      data-revealed={isRevealed}
      aria-label={children}
      style={{ '--stagger': `${stagger}ms`, '--delay': `${delay}ms` } as CSSProperties}
      className={cx(styles.root, className)}
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span
            aria-hidden="true"
            className={styles.word}
            style={{ '--i': index } as CSSProperties}
          >
            {word}
          </span>
          {index < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  );
}
