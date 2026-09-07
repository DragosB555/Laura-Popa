import type { ElementType, ReactNode } from 'react';
import { cx } from '@/lib/cx';
import styles from './Container.module.css';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl';

type ContainerProps = {
  children: ReactNode;
  /** Latimea maxima a continutului. Implicit: `lg`. */
  size?: ContainerSize;
  /** Elementul HTML randat. Implicit: `div`. */
  as?: ElementType;
  className?: string;
};

export function Container({ children, size = 'lg', as: Tag = 'div', className }: ContainerProps) {
  return <Tag className={cx(styles.container, styles[size], className)}>{children}</Tag>;
}
