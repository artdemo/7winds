import React, {
  FC,
  useCallback,
  useState,
  useRef,
  useMemo,
  ChangeEventHandler,
  ChangeEvent,
  FormEvent,
} from 'react';
import cn from 'classnames';

import { ReactComponent as FolderIcon } from '../../../assets/svg/folder.svg';
import { ReactComponent as SubFolderIcon } from '../../../assets/svg/subfolder.svg';
import { ReactComponent as ListIcon } from '../../../assets/svg/list.svg';
import { ReactComponent as TrashIcon } from '../../../assets/svg/trash.svg';

import { Button } from '../../Button';
import { useClickOutside } from '../../../hooks/useClickOutside';
import styles from './row.modules.scss';

type RowProps = {
  isFolder: boolean;
  isSubFolder: boolean;
  createFolder: () => void;
  createSubFolder: () => void;
  createChild: () => void;
  deleteRow: () => void;
  fields: Record<string, string | number>;
  id: number;
  onSubmit: (formData: Record<string, string | number>, id: number) => void;
  onDoubleClick: (id: number) => void;
  onBlur: (id: number) => void;
  isEditing: boolean;
  neighboursCount: number;
  isDerrived: boolean;
};

export const Row: FC<RowProps> = ({
  isFolder,
  isSubFolder,
  createFolder,
  createSubFolder,
  createChild,
  deleteRow,
  fields,
  id,
  onSubmit,
  onDoubleClick,
  onBlur,
  isEditing,
  neighboursCount,
  isDerrived,
}) => {
  const [formData, setFormData] = useState<typeof fields>(fields);

  const refInput = useRef<HTMLInputElement>(null);

  const handleClickOutside = useCallback(() => {
    onBlur(id);
  }, [isEditing]);

  const refRow = useClickOutside(handleClickOutside);

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

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>, id: number) => {
      e.preventDefault();

      onSubmit(formData, id);
    },
    [onSubmit, formData, id]
  );

  const renderBtns = useMemo(() => {
    return (
      <td>
        <div
          className={cn({
            [styles.btnsWrapper]: true,
            [styles.btnsWrapperIsDerrived]: isDerrived,
            [styles.btnsWrapperShift]: !isFolder,
            [styles.btnsWrapperDoubleShift]: !isSubFolder,
          })}
        >
          {isFolder && (
            <Button onClick={createFolder} className={`${styles.btn} ${styles.btnFolder}`}>
              <FolderIcon />
            </Button>
          )}
          {isSubFolder && (
            <Button onClick={createSubFolder} className={`${styles.btn} ${styles.btnSubFolder}`}>
              <SubFolderIcon />
            </Button>
          )}
          <Button onClick={createChild} className={`${styles.btn} ${styles.btnList}`}>
            <ListIcon />
          </Button>
          <Button onClick={deleteRow} className={`${styles.btn} ${styles.btnDelete}`}>
            <TrashIcon />
          </Button>
          <span className={styles.bar} style={{ height: `${neighboursCount * 60}px` }}></span>
        </div>
      </td>
    );
  }, [
    isFolder,
    isSubFolder,
    createFolder,
    createSubFolder,
    createChild,
    neighboursCount,
    isDerrived,
    isEditing,
  ]);

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
            className={cn({ [styles.input]: true, [styles.inputIsEditing]: isEditing })}
          />
        </td>
      );
    });
  }, [fields, formData, handleInputChange, isEditing]);

  return (
    <tr
      onDoubleClick={() => onDoubleClick(id)}
      ref={refRow}
      className={cn({ [styles.rowIsEditing]: isEditing })}
    >
      {renderBtns}
      {renderInputs}
      <td style={{ display: 'none' }}>
        <form
          id={String(id)}
          onSubmit={(e) => {
            handleSubmit(e, id);
          }}
          style={{ display: 'none' }}
        >
          <button type="submit">Submit</button>
        </form>
      </td>
    </tr>
  );
};
