import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { cx } from '@/lib/cx';
import { ArrowIcon } from '@/components/ui/ArrowIcon';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variantClass: Record<ButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost,
  link: styles.link,
};

const sizeClass: Record<ButtonSize, string | undefined> = {
  sm: styles.sizeSm,
  md: undefined,
  lg: styles.sizeLg,
};

type CommonProps = {
  children: ReactNode;
  /** Stilul butonului. Implicit: `primary`. */
  variant?: ButtonVariant;
  /** Dimensiunea butonului. Implicit: `md`. */
  size?: ButtonSize;
  /** Adauga sageata `→` la final. */
  withArrow?: boolean;
  /** Ajusteaza culorile pentru fundal inchis. */
  onInverse?: boolean;
  /** Ocupa toata latimea disponibila (util pe mobil). */
  fullWidth?: boolean;
  className?: string;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof CommonProps | 'href'
  >;

type ButtonAsButton = CommonProps & { href?: never } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof CommonProps
  >;

type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  withArrow = false,
  onInverse = false,
  fullWidth = false,
  className,
  ...rest
}: ButtonProps) {
  const classNames = cx(
    styles.button,
    variantClass[variant],
    sizeClass[size],
    onInverse && styles.onInverse,
    fullWidth && styles.fullWidth,
    className,
  );

  const content = (
    <>
      {children}
      {withArrow ? <ArrowIcon className={styles.icon} /> : null}
    </>
  );

  if ('href' in rest && typeof rest.href === 'string') {
    const { href, ...anchorProps } = rest;
    return (
      <Link href={href} className={classNames} {...anchorProps}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classNames} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
