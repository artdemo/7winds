import React, { FC, useMemo, useState, useCallback } from 'react';
import cn from 'classnames';

import { Select } from '../Select';
import { Header } from '../Header';
import { Table } from '../Table';
import { ReactComponent as Icon } from '../../assets/svg/default.svg';

import { MenuItemsProps, MenuValues } from '../../types';

import styles from './view.modules.scss';

const options = [
  { name: 'First name', value: 1 },
  { name: 'Second name', value: 2 },
  { name: 'Third name', value: 3 },
];

const menuItems = [
  { label: 'По проекту', value: 'placeholder', title: 'По проекту' },
  { label: 'Объекты', value: 'placeholder', title: 'Объекты' },
  { label: 'РД', value: 'placeholder', title: 'РД' },
  { label: 'МТО', value: 'placeholder', title: 'МТО' },
  { label: 'СМР', value: 'ciw', title: 'Строительно-монтажные работы' },
  { label: 'График', value: 'placeholder', title: 'График' },
  { label: 'МиМ', value: 'placeholder', title: 'МиМ' },
  { label: 'Рабочие', value: 'placeholder', title: 'Рабочие' },
  { label: 'Капвложения', value: 'placeholder', title: 'Капвложения' },
  { label: 'Бюджет', value: 'placeholder', title: 'Бюджет' },
  { label: 'Финансирование', value: 'placeholder', title: 'Финансирование' },
  { label: 'Панорамы', value: 'placeholder', title: 'Панорамы' },
  { label: 'Камеры', value: 'placeholder', title: 'Камеры' },
  { label: 'Поручения', value: 'placeholder', title: 'Поручения' },
  { label: 'Контрагенты', value: 'placeholder', title: 'Контрагенты' },
];

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

  const menuList = useMemo(() => {
    return (
      <ul className={styles.menuList}>
        {menuItems.map(({ label, value, title }, index) => {
          return (
            <li
              className={cn({
                [styles.menuItem]: true,
                [styles.menuItemSelected]: index === selectedMenuIndex,
              })}
              key={index}
              onClick={() => {
                setSelectedMenuIndex(index);
              }}
            >
              <Icon className={styles.icon} />
              <span className={styles.menuText}>{label}</span>
            </li>
          );
        })}
      </ul>
    );
  }, [setSelectedMenuIndex, selectedMenuIndex]);

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
        <Table projectId={selectedProjectId} menuValue={value as MenuValues} />
      </div>
    </div>
  );
};
