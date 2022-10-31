import React, { FC, ReactNode, useMemo, useState } from "react";
import { NavBar } from "./NavBar";

type Menu = {
  children: ReactNode;
};

export const Menu: FC<ReactNode> = ({ children }) => {
  return <div>{children}</div>;
};
