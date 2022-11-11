import React, {
  FC,
  ReactNode,
  useEffect,
  useMemo,
  useState,
  useCallback,
  KeyboardEvent,
  FocusEvent,
} from 'react';
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

  useEffect(() => {
    onChange && selectedOption && onChange(selectedOption.value);
  }, [selectedOption, onChange]);

  const handleSpaceDown = (e: KeyboardEvent) => {
    if (e.code !== 'Space') return;

    setIsOpened((prev) => !prev);
  };

  const handleEnterPress = useCallback(
    (option: Option) => (e: KeyboardEvent) => {
      if (e.code !== 'Enter') return;

      setSelectedOption(option);
      setIsOpened(false);
    },
    [setIsOpened, setSelectedOption]
  );

  const mappedOptions = useMemo(() => {
    return options.map((option) => {
      return (
        <div
          className={styles.option}
          key={option.value}
          onClick={() => {
            setSelectedOption(option);
          }}
          onKeyPress={handleEnterPress(option)}
          tabIndex={isOpened ? 0 : -1}
        >
          {option.name}
        </div>
      );
    });
  }, [options, isOpened, handleEnterPress]);

  return (
    <div
      className={cn(`${styles.select}`, { [styles.selectIsOpened]: isOpened })}
      onClick={() => {
        setIsOpened((prev) => !prev);
      }}
      onKeyDown={handleSpaceDown}
      tabIndex={0}
      onBlur={(e: FocusEvent) => {
        if (e.currentTarget.contains(e.relatedTarget)) return;

        setIsOpened(false);
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
