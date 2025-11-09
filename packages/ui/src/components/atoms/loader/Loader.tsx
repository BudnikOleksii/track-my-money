import { type FC } from 'react';

import { cn } from '../../../utils/classnames';

import styles from './Loader.module.scss';

interface Props {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Loader: FC<Props> = ({ className, size = 'md' }) => {
  const sizeClass = styles[size];

  return (
    <div
      className={cn(styles.loader, sizeClass, className)}
      aria-label="Loading"
    >
      <div className={styles.spinner} />
    </div>
  );
};
