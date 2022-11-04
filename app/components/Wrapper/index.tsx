import React, { FC, ReactNode } from 'react';
import styles from './wrapper.modules.scss';

type WrapperProps = {
  children: ReactNode;
};

export const Wrapper: FC<WrapperProps> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
