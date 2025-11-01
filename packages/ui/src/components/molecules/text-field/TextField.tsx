import { type InputHTMLAttributes, forwardRef, useId } from 'react';

import { cn } from '../../../utils/classnames';
import { Input } from '../../atoms/input/Input';
import { Label } from '../../atoms/label/Label';

import styles from './TextField.module.scss';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id?: string;
  label?: string;
  helperText?: string;
  error?: boolean;
  required?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, Props>(
  (
    {
      id: providedId,
      label,
      helperText,
      error = false,
      required = false,
      disabled = false,
      className,
      ...inputProps
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const helperTextId = helperText ? `${id}-helper-text` : undefined;

    return (
      <div className={cn(styles.textField, className)}>
        {label && (
          <Label htmlFor={id} required={required} disabled={disabled}>
            {label}
          </Label>
        )}
        <Input
          id={id}
          ref={ref}
          error={error}
          disabled={disabled}
          aria-describedby={helperTextId}
          aria-invalid={error}
          {...inputProps}
        />
        {helperText && (
          <span
            id={helperTextId}
            className={cn(styles.helperText, error && styles.error)}
          >
            {helperText}
          </span>
        )}
      </div>
    );
  },
);

TextField.displayName = 'TextField';
