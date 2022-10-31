import React, { FC, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

export const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};
