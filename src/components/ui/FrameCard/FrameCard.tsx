import type { ElementType, ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { Reveal } from '@/components/ui/Reveal';
import styles from './FrameCard.module.css';

type FrameCardProps = {
  children: ReactNode;
  /** Elementul randat pentru rama exterioara. Implicit: `div`. */
  as?: ElementType;
  /** Intarzierea animatiei de intrare, in milisecunde. */
  delay?: number;
  className?: string;
  innerClassName?: string;
};

/**
 * Doua cutii translucide concentrice: cea de afara e doar o rama de 1em,
 * cea dinauntru poarta continutul. Diferenta de plan da adancimea, iar
 * fundalul sectiunii ramane vizibil prin amandoua.
 */
export function FrameCard({
  children,
  as = 'div',
  delay = 0,
  className,
  innerClassName,
}: FrameCardProps) {
  return (
    <Reveal as={as} delay={delay} className={cx(styles.frame, className)}>
      <div className={cx(styles.inner, innerClassName)}>{children}</div>
    </Reveal>
  );
}
