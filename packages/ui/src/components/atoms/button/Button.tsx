import { type ButtonHTMLAttributes, forwardRef } from 'react';

import { cn } from '../../../utils/classnames';

import styles from './Button.module.scss';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', type = 'button', ...props },
    ref,
  ) => {
    const variantClass = styles[variant];
    const sizeClass = styles[size];

    return (
      <button
        ref={ref}
        type={type}
        className={cn(styles.button, variantClass, sizeClass, className)}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
