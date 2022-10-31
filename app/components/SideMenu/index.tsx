import React, { FC, ReactNode } from 'react';

export const SideMenu: FC<ReactNode> = ({ children }) => {
  return <ul>{children}</ul>;
};
