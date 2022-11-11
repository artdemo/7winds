import React, { FC, ReactNode } from 'react';
import styles from './button.module.scss';
import cn from 'classnames';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({ children, onClick, className, disabled }) => {
  return (
    <button
      className={cn(styles.button, className, { [styles.isDisabled]: disabled })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
