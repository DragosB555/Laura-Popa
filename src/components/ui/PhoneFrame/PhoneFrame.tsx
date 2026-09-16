import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import styles from './PhoneFrame.module.css';

type PhoneFrameProps = {
  /** Ce se vede pe ecran. */
  children?: ReactNode;
  /** Bara fixa din capul ecranului (ex. antetul unei conversatii). */
  header?: ReactNode;
  /** Bara fixa din josul ecranului (ex. campul de scris). */
  footer?: ReactNode;
  className?: string;
};

/** Carcasa de telefon, folosita ca suport vizual pentru continut de tip chat. */
export function PhoneFrame({ children, header, footer, className }: PhoneFrameProps) {
  return (
    <div className={cx(styles.phone, className)}>
      <div className={styles.screen}>
        <span aria-hidden="true" className={styles.notch} />
        {header ? <div className={styles.header}>{header}</div> : null}
        {children ? <div className={styles.body}>{children}</div> : null}
        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </div>
    </div>
  );
}
