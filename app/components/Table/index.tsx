import React, { FC, useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { findDescendantsCount } from '../../utils/helpers';
import styles from './table.modules.scss';
import { Row } from './Row';
import { MenuValues, CIWToRender, RequestStatus } from '../../types';
import { ThunkDispatch } from 'redux-thunk';
import { StateType } from '../../store';
import { ProjectsActions } from '../../store/actions/projects';
import { createCIWSelector, requestStatusSelector } from '../../selectors/project';
import {
  createTemplateAction,
  deleteTemplateAction,
  getProjectsAction,
  createCIWAction,
  deleteCIWAction,
  updateCIWAction,
} from '../../store/actions/projects';
import { rowTemplate } from '../../constants/templates';

type TableProps = {
  projectId: number | null;
  menuValue: MenuValues | null;
};

export const Table: FC<TableProps> = ({ projectId, menuValue }) => {
  const dispatch = useDispatch<ThunkDispatch<StateType, unknown, ProjectsActions>>();
  const rowsData = useSelector(createCIWSelector(projectId, menuValue));
  const requestStatus = useSelector(requestStatusSelector(projectId));

  useEffect(() => {
    dispatch(getProjectsAction(projectId));
  }, [projectId, dispatch]);

  const [editingRowId, setEditingRowId] = useState<number | null>(null);

  const createTemplate = useCallback(
    (parentId = null, grandParentId = null) => {
      dispatch(createTemplateAction(projectId, { ...rowTemplate, parentId, grandParentId }));

      setEditingRowId(-1);
    },
    [projectId, setEditingRowId, dispatch]
  );

  useEffect(() => {
    if (!rowsData.length && requestStatus === RequestStatus.SUCCESS) createTemplate();
  }, [rowsData, createTemplate, requestStatus]);

  const stopEditing = useCallback(() => {
    if (editingRowId === null) return;

    if (editingRowId === -1) dispatch(deleteTemplateAction(projectId));

    setEditingRowId(null);
  }, [setEditingRowId, editingRowId, projectId, dispatch]);

  useEffect(() => {
    document.addEventListener('click', stopEditing);

    return () => {
      document.removeEventListener('click', stopEditing);
    };
  }, [stopEditing]);

  const handleSubmit = useCallback(
    (formData: CIWToRender, id: number) => {
      if (id === -1) {
        dispatch(createCIWAction(projectId, formData));
        return;
      }

      dispatch(updateCIWAction(projectId!, id, formData));
    },
    [projectId, dispatch]
  );

  const handleDelete = useCallback(
    (rowId: number) => {
      dispatch(deleteCIWAction(projectId, rowId));
    },
    [projectId, dispatch]
  );

  const changeEditingRowId = useCallback(
    (id: number) => {
      setEditingRowId(id);
    },
    [setEditingRowId]
  );

  const rows = useMemo(() => {
    return rowsData.map(
      (
        {
          id,
          parentId,
          grandParentId,
          rowName,
          salary,
          equipmentCosts,
          overheads,
          estimatedProfit,
        },
        index,
        array
      ) => {
        const descendantsCount = findDescendantsCount(array, id);

        return (
          <Row
            key={id}
            isFolder={!parentId}
            isSubFolder={!grandParentId}
            createFolder={() => createTemplate()}
            createSubFolder={() => createTemplate(parentId || id)}
            createChild={() =>
              createTemplate(grandParentId ? parentId : id, grandParentId || parentId)
            }
            deleteRow={() => handleDelete(id)}
            fields={{ rowName, salary, equipmentCosts, overheads, estimatedProfit }}
            id={id}
            onSubmit={handleSubmit}
            onDoubleClick={changeEditingRowId}
            isEditing={id === editingRowId}
            onClear={stopEditing}
            descendantsCount={descendantsCount}
          />
        );
      }
    );
  }, [
    rowsData,
    createTemplate,
    handleSubmit,
    handleDelete,
    editingRowId,
    stopEditing,
    changeEditingRowId,
  ]);

  return (
    <>
      {menuValue === 'ciw' && (
        <table className={styles.table}>
          <colgroup>
            <col className={styles.colBtns} />
            <col className={styles.colName} />
            <col className={styles.colCommon} />
            <col className={styles.colCommon} />
            <col className={styles.colCommon} />
            <col className={styles.colCommon} />
          </colgroup>
          <thead>
            <tr>
              <th className={styles.cellBtns}>Уровень</th>
              <th>Наименование работ</th>
              <th>Основная з/п</th>
              <th>Оборудование</th>
              <th>Накладные расходы</th>
              <th>Сметная прибыль</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      )}
    </>
  );
};
