import React, { FC } from 'react';

type HeaderProps = {
  title?: string;
};

export const Header: FC<HeaderProps> = ({ title = '' }) => {
  return <h3>{title}</h3>;
};
