import React, { FC, useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { findLastIndex, findNeighboursCount, checkIsDerrived } from '../../utils/helpers';
import styles from './table.modules.scss';

import { Row } from './Row';
import { createCIWSelector } from '../../selectors/project';
import {
  createTemplateAction,
  deleteTemplateAction,
  getProjectsAction,
  createCIWAction,
  deleteCIWAction,
  updateCIWAction,
} from '../../store/actions/projects';

import { CIWData, MenuValues, CIWToRender } from '../../types';
import { ThunkDispatch } from 'redux-thunk';
import { StateType } from '../../store';
import { ProjectsActions } from '../../store/actions/projects';

type TableProps = {
  projectId: number | null;
  menuValue: MenuValues | null;
};

const rowTemplate: CIWData = {
  id: -1,
  parentId: null,
  grandParentId: null,
  rowName: '',
  salary: 0,
  equipmentCosts: 0,
  overheads: 0,
  estimatedProfit: 0,
  machineOperatorSalary: 0,
  mainCosts: 0,
  materials: 0,
  mimExploitation: 0,
  supportCosts: 0,
  total: 0,
};

export const Table: FC<TableProps> = ({ projectId, menuValue }) => {
  const dispatch = useDispatch<ThunkDispatch<StateType, unknown, ProjectsActions>>();

  useEffect(() => {
    if (projectId === 1) dispatch(getProjectsAction(projectId));
  }, [projectId]);

  const rowsData = useSelector(createCIWSelector(projectId, menuValue));

  const [editingRowId, setEditingRowId] = useState<number | null>(null);

  const clearOnBlur = useCallback(
    (id: number) => {
      if (editingRowId === null || editingRowId !== id) return;

      editingRowId === -1 && dispatch(deleteTemplateAction(projectId));

      setEditingRowId(null);
    },
    [setEditingRowId, editingRowId, projectId]
  );

  const handleSubmit = useCallback(
    (formData: CIWToRender, id: number) => {
      if (id === -1) {
        dispatch(createCIWAction(projectId, formData));
        return;
      }

      dispatch(updateCIWAction(projectId!, id, formData));
    },
    [projectId]
  );

  const handleDelete = useCallback(
    (rowId: number) => {
      dispatch(deleteCIWAction(projectId, rowId));
    },
    [projectId]
  );

  const handleDoubleClick = useCallback(
    (id: number) => {
      setEditingRowId(id);
    },
    [setEditingRowId]
  );

  const createTemplate = useCallback(
    (parentId = null, grandParentId = null) => {
      const lastIndex = findLastIndex(rowsData, parentId);

      dispatch(
        createTemplateAction(projectId, lastIndex, { ...rowTemplate, parentId, grandParentId })
      );

      setEditingRowId(-1);
    },
    [projectId, rowsData]
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
        const neighboursCount = findNeighboursCount(array, index, id, parentId, grandParentId);

        const isDerrived = checkIsDerrived(array, id, parentId);

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
            onDoubleClick={handleDoubleClick}
            onBlur={clearOnBlur}
            isEditing={id === editingRowId}
            neighboursCount={neighboursCount}
            isDerrived={isDerrived}
          />
        );
      }
    );
  }, [rowsData, projectId, clearOnBlur, createTemplate, handleSubmit, handleDelete, editingRowId]);

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
