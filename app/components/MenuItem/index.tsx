import React, { FC } from 'react';

type MenuItemProps = {
  label: string;
  value: string;
  title: string;
  isSelected: boolean;
  onSelect: (value: string, title: string) => void;
};

export const MenuItem: FC<MenuItemProps> = ({ label, value, title, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => {
        onSelect(value, title);
      }}
      style={{ color: isSelected ? 'red' : 'initial' }}
    >
      {label}
    </div>
  );
};
