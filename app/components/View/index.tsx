import React, { FC, useMemo, useState, useCallback, KeyboardEventHandler, Key } from 'react';
import cn from 'classnames';
import { Select } from '../Select';
import { Header } from '../Header';
import { Table } from '../Table';
import { ReactComponent as Icon } from '../../assets/svg/default.svg';
import { MenuValues } from '../../types';
import styles from './view.modules.scss';
import { options, menuItems } from '../../constants/templates';

export const View: FC = () => {
  const [selectedMenuIndex, setSelectedMenuIndex] = useState<number | null>(4);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(1);

  const { title, value } =
    selectedMenuIndex !== null ? menuItems[selectedMenuIndex] : { title: '', value: null };

  const handleChangeProject = useCallback(
    (value: number) => {
      setSelectedProjectId(value);
    },
    [setSelectedProjectId]
  );

  const handleKeyPress = useCallback(
    (index: number): KeyboardEventHandler =>
      (e) => {
        if (e.code !== 'Enter') return;

        setSelectedMenuIndex(index);
      },
    [setSelectedMenuIndex]
  );

  const menuList = useMemo(() => {
    return (
      <ul className={styles.menuList}>
        {menuItems.map(({ label }, index) => {
          return (
            <li
              tabIndex={0}
              className={cn({
                [styles.menuItem]: true,
                [styles.menuItemSelected]: index === selectedMenuIndex,
              })}
              key={index}
              onClick={() => {
                setSelectedMenuIndex(index);
              }}
              onKeyPress={handleKeyPress(index)}
            >
              <Icon className={styles.icon} />
              <span className={styles.menuText}>{label}</span>
            </li>
          );
        })}
      </ul>
    );
  }, [setSelectedMenuIndex, selectedMenuIndex, handleKeyPress]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.aside}>
        <Select
          label={
            <div className={styles.label}>
              <p>Название проекта</p>
              <span>Аббревиатура</span>
            </div>
          }
          options={options}
          onChange={handleChangeProject}
        />
        {menuList}
      </div>
      <div className={styles.main}>
        <Header title={title} />
        <div className={styles.tableWrapper}>
          <Table projectId={selectedProjectId} menuValue={value as MenuValues} />
        </div>
      </div>
    </div>
  );
};
