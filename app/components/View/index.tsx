import React, { FC, useMemo, useState } from 'react';
import { Select } from '../Select';
import { SideMenu } from '../SideMenu';
import { MenuItem } from '../MenuItem';
import { Header } from '../Header';
import { Content } from '../Content';

const options = [
  { name: 'First name', id: 1 },
  { name: 'Second name', id: 2 },
  { name: 'Third name', id: 3 },
];

const menuItemsData = [
  { label: 'По проекту', value: 'placeholder', title: 'По проекту' },
  { label: 'Объекты', value: 'placeholder', title: 'Объекты' },
  { label: 'РД', value: 'placeholder', title: 'РД' },
  { label: 'МТО', value: 'placeholder', title: 'МТО' },
  { label: 'СМР', value: 'ciw', title: 'Строительно-мотажные работы' },
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

  const { title, value } =
    selectedMenuIndex !== null
      ? menuItemsData[selectedMenuIndex]
      : { title: undefined, value: undefined };

  const menuItems = useMemo(() => {
    return menuItemsData.map(({ label, value, title }, index) => {
      return (
        <li key={index}>
          <MenuItem
            label={label}
            value={value}
            title={title}
            isSelected={index === selectedMenuIndex}
            onSelect={(value, title) => {
              setSelectedMenuIndex(index);
            }}
          />
        </li>
      );
    });
  }, [setSelectedMenuIndex, selectedMenuIndex]);

  return (
    <div>
      <Select label={'custom label'} options={options} />
      <SideMenu>{menuItems}</SideMenu>
      <Header title={title} />
      <Content mode={value} />
    </div>
  );
};
