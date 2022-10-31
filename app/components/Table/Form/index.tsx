import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
  FC,
  ChangeEvent,
  FormEventHandler,
  ChangeEventHandler,
} from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside';

// import { CIWData } from '../../../types';

// type Fields = Omit<CIWData, 'folderId' | 'subFolderId' | 'id'>;

type FormProps = {
  //   fields: Fields;
  // id: number;
  fields: Record<string, string | number>;
  isTemplate: boolean;
  onBlur: () => void;
  onSubmit: () => void;
};

export const Form: FC<FormProps> = ({ fields, onBlur, onSubmit, isTemplate }) => {
  const [formData, setFormData] = useState<typeof fields>(fields);
  const [isEditing, setIsEditing] = useState(isTemplate);

  useEffect(() => {
    isEditing && refInput.current && refInput.current.focus();
  }, [isEditing]);

  const refForm = useClickOutside(() => {
    isEditing && onBlur();
    setIsEditing(false);
  });

  const refInput = useRef<HTMLInputElement>(null);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((fields) => ({ ...fields, [e.target.name]: e.target.value }));
    },
    [setFormData]
  );

  const handleDoubleClick: FormEventHandler<HTMLFormElement> = useCallback(() => {
    setIsEditing(true);
  }, [isEditing, setIsEditing]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault();

    onSubmit();
  }, []);

  const renderInputs = useMemo(() => {
    return Object.entries(fields).map(([name, value], index) => {
      return (
        <input
          key={name}
          type="text"
          name={name}
          value={formData[name]}
          required
          pattern={typeof value === 'string' ? undefined : '[+-]?([0-9]*[.])?[0-9]+'}
          onChange={handleInputChange}
          {...(!index && { ref: refInput })}
        />
      );
    });
  }, [fields, formData, isEditing]);

  return (
    <form
      ref={refForm}
      onDoubleClick={handleDoubleClick}
      onSubmit={handleSubmit}
      style={{
        border: '1px solid ',
        borderColor: 'black',
        ...(isEditing && { borderColor: 'red' }),
      }}
    >
      {renderInputs}
      <button type="submit">Submit</button>
    </form>
  );
};
