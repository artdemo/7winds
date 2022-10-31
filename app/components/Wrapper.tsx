import React, { FC, ReactNode } from "react";

type WrapperProps = {
  children: ReactNode;
};

export const Wrapper: FC<WrapperProps> = ({ children }) => {
  return <div>{children}</div>;
};
