import React, { FC, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './navBar.modules.scss';
import { Button } from '../Button';
import { ReactComponent as AppIcon } from '../../assets/svg/apps.svg';
import { ReactComponent as ReplyIcon } from '../../assets/svg/reply.svg';

const links = [
  {
    to: 'view',
    title: 'Просмотр',
  },
  {
    to: 'control',
    title: 'Управление',
  },
];

export const NavBar: FC = () => {
  const navList = useMemo(
    () =>
      links.map(({ to, title }, index) => {
        return (
          <li className={styles.item} key={index}>
            <NavLink key={to} className={styles.link} to={to}>
              {title}
            </NavLink>
          </li>
        );
      }),
    []
  );

  return (
    <ul className={styles.list}>
      <li className={styles.item}>
        <Button onClick={() => {}} className={styles.icon}>
          <AppIcon />
        </Button>
      </li>
      <li className={styles.item}>
        <Button onClick={() => {}} className={styles.icon}>
          <ReplyIcon />
        </Button>
      </li>
      {navList}
    </ul>
  );
};
