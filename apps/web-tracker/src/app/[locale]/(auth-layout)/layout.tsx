import { type FC, type PropsWithChildren } from 'react';

import styles from './layout.module.scss';

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>{children}</div>
    </div>
  );
};

export default AuthLayout;
