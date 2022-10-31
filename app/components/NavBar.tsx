import React, { FC, useMemo } from "react";
import { NavLink } from "react-router-dom";

const navLists = [
  {
    to: "view",
    title: "Просмотр",
  },
  {
    to: "control",
    title: "Управление",
  },
];

export const NavBar: FC = () => {
  return (
    <ul>
      {navLists.map(({ to, title }) => (
        <li key={title}>
          <NavLink to={to}>{title}</NavLink>
        </li>
      ))}
    </ul>
  );
};
