import {
  type FC,
  type FormHTMLAttributes,
  type PropsWithChildren,
} from 'react';

import styles from './AuthForm.module.scss';

interface Props
  extends FormHTMLAttributes<HTMLFormElement>,
    PropsWithChildren {}

export const AuthForm: FC<Props> = ({
  children,
  noValidate = true,
  ...formProps
}) => {
  return (
    <form {...formProps} noValidate={noValidate} className={styles.form}>
      {children}
    </form>
  );
};
