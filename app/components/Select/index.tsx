import React, { FC, ReactNode, useMemo, useState } from 'react';
import cn from 'classnames';
import styles from './select.modules.scss';
import { ReactComponent as Icon } from '../../assets/svg/keyboard_arrow_down.svg';

type Option = {
  name: string;
  value: string | number;
};

type SelectProps = {
  label?: ReactNode;
  options?: Option[];
  onChange?: (value: number | string) => void;
};

export const Select: FC<SelectProps> = ({ label = 'None', options = [], onChange }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isOpened, setIsOpened] = useState(false);

  const mappedOptions = useMemo(() => {
    return options.map((option) => {
      return (
        <div
          className={styles.option}
          key={option.value}
          onClick={() => {
            setSelectedOption(option);
            onChange && onChange(option.value);
            setIsOpened(false);
          }}
        >
          {option.name}
        </div>
      );
    });
  }, [options, selectedOption, onChange]);

  return (
    <div
      className={cn(`${styles.select}`, {[styles.selectIsOpened]: isOpened})}
      onClick={() => {
        setIsOpened((prev) => !prev);
      }}
    >
      <div className={styles.selectedOption}>{selectedOption?.name || label}</div>
      <div className={`${styles.button}`}>
        <Icon />
      </div>
      <div className={styles.options}>{mappedOptions}</div>
    </div>
  );
};
