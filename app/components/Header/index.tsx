import React, { FC } from 'react';
import styles from './header.modules.scss';

type HeaderProps = {
  title: string;
};

export const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
};
