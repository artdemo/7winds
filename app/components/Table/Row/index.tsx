import React, {
  FC,
  useCallback,
  useState,
  useMemo,
  ChangeEventHandler,
  ChangeEvent,
  FormEvent,
  KeyboardEventHandler,
  MouseEventHandler,
  MouseEvent,
} from 'react';
import cn from 'classnames';
import FocusTrap from 'focus-trap-react';

import { ReactComponent as FolderIcon } from '../../../assets/svg/folder.svg';
import { ReactComponent as SubFolderIcon } from '../../../assets/svg/subfolder.svg';
import { ReactComponent as ListIcon } from '../../../assets/svg/list.svg';
import { ReactComponent as TrashIcon } from '../../../assets/svg/trash.svg';
import { Button } from '../../Button';
import styles from './row.modules.scss';

type RowProps = {
  isFolder: boolean;
  isSubFolder: boolean;
  createFolder?: () => void;
  createSubFolder?: () => void;
  createChild?: () => void;
  deleteRow?: () => void;
  fields: Record<string, string | number>;
  id: number;
  onSubmit: (formData: Record<string, string | number>, id: number) => void;
  onDoubleClick?: (id: number) => void;
  isEditing: boolean;
  onClear: () => void;
  descendantsCount: number;
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
  isEditing,
  descendantsCount,
  onClear,
}) => {
  const [formData, setFormData] = useState<typeof fields>(fields);

  const handleEscape: KeyboardEventHandler = (e) => {
    if (e.code === 'Escape' && onClear) onClear();
  };

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
    [setFormData, fields]
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>, id: number) => {
      e.preventDefault();

      onSubmit(formData, id);
    },
    [onSubmit, formData]
  );

  const renderBtns = useMemo(() => {
    return (
      <td>
        <div
          onDoubleClick={(e: MouseEvent) => {
            e.stopPropagation();
          }}
          onClick={(e: MouseEvent) => {
            e.stopPropagation();
          }}
          className={cn({
            [styles.btnsWrapper]: true,
            [styles.btnsWrapperIsDerrived]: !isFolder,
            [styles.btnsWrapperShift]: !isFolder,
            [styles.btnsWrapperDoubleShift]: !isSubFolder,
            [styles.btnsWrapperIsHovered]: !isEditing,
          })}
        >
          {isFolder && (
            <Button
              onClick={createFolder}
              className={`${styles.btn} ${styles.btnFolder}`}
              disabled={isEditing}
            >
              <FolderIcon />
            </Button>
          )}
          {isSubFolder && (
            <Button
              onClick={createSubFolder}
              className={`${styles.btn} ${styles.btnSubFolder}`}
              disabled={isEditing}
            >
              <SubFolderIcon />
            </Button>
          )}
          <Button
            onClick={createChild}
            className={`${styles.btn} ${styles.btnList}`}
            disabled={isEditing}
          >
            <ListIcon />
          </Button>
          <Button
            onClick={deleteRow}
            className={`${styles.btn} ${styles.btnDelete}`}
            disabled={isEditing}
          >
            <TrashIcon />
          </Button>
          <span className={styles.bar} style={{ height: `${descendantsCount * 60}px` }}></span>
        </div>
      </td>
    );
  }, [
    isFolder,
    isSubFolder,
    createFolder,
    createSubFolder,
    createChild,
    descendantsCount,
    isEditing,
    deleteRow,
  ]);

  const handleClick: MouseEventHandler<HTMLTableRowElement> = (e) => {
    if (isEditing) e.stopPropagation();
  };

  const renderInputs = useMemo(() => {
    return Object.entries(fields).map(([name]) => {
      return (
        <td key={name}>
          <input
            form={String(id)}
            type="text"
            name={name}
            value={formData[name]}
            required
            onChange={handleInputChange}
            className={cn({ [styles.input]: true, [styles.inputActive]: isEditing })}
            {...(!isEditing && { tabIndex: -1 })}
          />
        </td>
      );
    });
  }, [fields, formData, handleInputChange, isEditing, id]);

  return (
    <FocusTrap active={isEditing} focusTrapOptions={{ clickOutsideDeactivates: true }}>
      <tr
        onDoubleClick={() => {
          onDoubleClick && onDoubleClick(id);
        }}
        onKeyDown={handleEscape}
        className={cn({ [styles.rowIsEditing]: isEditing })}
        onClick={handleClick}
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
    </FocusTrap>
  );
};
