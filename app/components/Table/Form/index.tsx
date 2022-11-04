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
  Fragment,
} from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import styles from './form.modules.scss';

type FormProps = {
  fields: Record<string, string | number>;
  isEditing: boolean;
  onBlur: () => void;
  onSubmit: (formData: Record<string, string | number>) => void;
  onDoubleClick?: () => void;
  id: number;
};

export const Form: FC<FormProps> = ({ fields, onBlur, onSubmit, onDoubleClick, isEditing, id }) => {
  const [formData, setFormData] = useState<typeof fields>(fields);

  useEffect(() => {
    isEditing && refInput.current && refInput.current.focus();
  }, [isEditing]);

  const refRow = useClickOutside(onBlur);

  const refInput = useRef<HTMLInputElement>(null);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const typeOfField = typeof fields[e.target.name];

      if (typeOfField === 'number' && isNaN(Number(e.target.value))) return;

      setFormData((fields) => {
        return {
          ...fields,
          [e.target.name]: typeOfField === 'number' ? Number(e.target.value) : e.target.value,
        };
      });
    },
    [setFormData]
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      onSubmit(formData);
    },
    [onSubmit, formData]
  );

  const renderInputs = useMemo(() => {
    return Object.entries(fields).map(([name, value], index) => {
      return (
        <td key={name}>
          <input
            form={String(id)}
            type="text"
            name={name}
            value={formData[name]}
            required
            onChange={handleInputChange}
            {...(!index && { ref: refInput })}
            style={
              {
                // pointerEvents: isEditing ? 'auto' : 'none',
              }
            }
          />
        </td>
      );
    });
  }, [fields, formData, isEditing, handleInputChange]);

  return (
    <Fragment>
      <td style={{ display: 'none' }}>
        <form
          id={String(id)}
          // ref={refForm}
          onDoubleClick={onDoubleClick}
          onSubmit={handleSubmit}
          style={{
            border: '1px solid ',
            borderColor: 'black',
            ...(isEditing && { borderColor: 'red' }),
            display: 'none',
          }}
        >
          <button type="submit">Submit</button>
        </form>
      </td>
      {renderInputs}
    </Fragment>
  );
};
