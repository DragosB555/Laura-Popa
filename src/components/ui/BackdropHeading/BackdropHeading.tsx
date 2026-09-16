'use client';

import { Heading, type HeadingSize } from '@/components/ui/Heading';
import { cx } from '@/lib/cx';
import { useReveal } from '@/lib/useReveal';
import styles from './BackdropHeading.module.css';

type BackdropHeadingProps = {
  /** Titlul vizibil, centrat. */
  children: string;
  /** Randurile mari din fundal. Sunt decorative, nu se citesc de screen readers. */
  backdrop: readonly string[];
  size?: HeadingSize;
  className?: string;
};

/** Titlu de sectiune centrat, peste doua randuri mari, estompate, in culoarea primara. */
export function BackdropHeading({ children, backdrop, size = 'xl', className }: BackdropHeadingProps) {
  /* Randurile mari se aprind si se sting ca restul paginii. Nu folosesc
     `.u-reveal`: acela animeaza `transform`, iar aici transformarea tine
     centrarea pe verticala si parallaxul. Ramane doar opacitatea. */
  const { ref, isRevealed } = useReveal<HTMLParagraphElement>();

  return (
    <div className={cx(styles.head, className)}>
      <p ref={ref} data-revealed={isRevealed} aria-hidden="true" className={styles.backdrop}>
        {backdrop.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>

      <Heading level={2} size={size} reveal className={styles.title}>
        {children}
      </Heading>
    </div>
  );
}
