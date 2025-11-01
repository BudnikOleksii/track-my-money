import { type LabelHTMLAttributes, forwardRef } from 'react';

import { cn } from '../../../utils/classnames';

import styles from './Label.module.scss';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  disabled?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, Props>(
  ({ className, required, disabled, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(styles.label, disabled && styles.disabled, className)}
      {...props}
    >
      {children}
      {required && <span className={styles.required}>*</span>}
    </label>
  ),
);

Label.displayName = 'Label';
