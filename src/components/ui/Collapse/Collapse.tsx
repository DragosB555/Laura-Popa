'use client';

import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '@/lib/cx';
import styles from './Collapse.module.css';

type CollapseProps = HTMLAttributes<HTMLDivElement> & {
  /** Starea deschis / inchis. */
  open: boolean;
  children: ReactNode;
  /** Clasa aplicata invelisului de continut. */
  contentClassName?: string;
};

/**
 * Deschide si inchide continut cu o tranzitie de inaltime, fara masurare in JavaScript.
 * Cand este inchis, continutul este scos din ordinea de tabulare (`inert`)
 * si ascuns pentru tehnologiile asistive.
 */
export function Collapse({ open, children, className, contentClassName, ...rest }: CollapseProps) {
  return (
    <div
      {...rest}
      data-open={open}
      aria-hidden={open ? undefined : true}
      inert={!open}
      className={cx(styles.collapse, className)}
    >
      <div className={styles.inner}>
        <div className={contentClassName}>{children}</div>
      </div>
    </div>
  );
}
