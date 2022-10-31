import React, { FC, ReactNode, useMemo, useState } from 'react';
import { DefaultLabel } from './DefaultLabel';
import { Option } from '../../types';

type SelectProps = {
  label?: ReactNode;
  options?: Option[];
  onChange?: (option?: Option) => void;
};

export const Select: FC<SelectProps> = ({
  label = <DefaultLabel />,
  options = [],
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const mappedOptions = useMemo(() => {
    return options.map((option) => {
      return (
        <div
          key={option.id}
          onClick={() => {
            setSelectedOption(option);
            onChange && onChange(option);
          }}
        >
          {option.name}
        </div>
      );
    });
  }, [options, selectedOption, onChange]);

  return (
    <div>
      <div>{selectedOption?.name || label}</div>
      <div>{mappedOptions}</div>
    </div>
  );
};
