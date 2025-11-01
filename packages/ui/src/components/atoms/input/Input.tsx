import { type InputHTMLAttributes, forwardRef } from 'react';

import { cn } from '../../../utils/classnames';

import styles from './Input.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, error, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(styles.input, error && styles.error, className)}
      {...props}
    />
  ),
);

Input.displayName = 'Input';
