import React, { FC, ReactNode } from 'react';
import styles from './button.module.scss';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export const Button: FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
