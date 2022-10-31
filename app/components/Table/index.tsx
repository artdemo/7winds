import React, { FC, useEffect, useMemo, useState, useCallback } from 'react';
import { Form } from './Form';
import { Button } from '../Button';

import { CIWData } from '../../types';

const mockedRows = [
  {
    id: 1,
    folderId: null,
    subFolderId: null,
    rowName: 'Южная строительная площадка',
    salary: 20348,
    equipmentCosts: 1750,
    overheads: 108.07,
    estimatedProfit: 1209000,
  },
  {
    id: 2,
    folderId: 1,
    subFolderId: null,
    rowName: 'Южная строительная площадка',
    salary: 20348,
    equipmentCosts: 1750,
    overheads: 108.07,
    estimatedProfit: 1209000,
  },
  {
    id: 3,
    folderId: 1,
    subFolderId: 2,
    rowName: 'Южная строительная площадка',
    salary: 20348,
    equipmentCosts: 1750,
    overheads: 108.07,
    estimatedProfit: 1209000,
  },
  {
    id: 4,
    folderId: null,
    subFolderId: null,
    rowName: 'Folder',
    salary: 20348,
    equipmentCosts: 1750,
    overheads: 108.07,
    estimatedProfit: 1209000,
  },
];

const rowTemplate: CIWData = {
  id: -1,
  folderId: null,
  subFolderId: null,
  rowName: '',
  salary: 0,
  equipmentCosts: 0,
  overheads: 0,
  estimatedProfit: 0,
};

type TableProps = {
  rowsData: CIWData[];
};

const headersData = [
  'Уровень',
  'Наименование работ',
  'Основная з/п',
  'Оборудование',
  'Накладные расходы',
  'Сметная прибыль',
];

export const Table: FC = () => {
  const [rows, setRows] = useState<CIWData[]>(mockedRows);

  const createFolder = useCallback(() => {
    setRows((rows) => [...rows, rowTemplate]);
  }, [setRows]);

  const createSubFolder = (id: number, folderId: number | null) => {
    setRows((rows) => {
      if (!folderId) {
        for (let i = rows.length - 1; i >= 0; i--) {
          if (rows[i].folderId === id || rows[i].id === id) {
            const newRows = [...rows];
            newRows.splice(i + 1, 0, rowTemplate);
            return newRows;
          }
        }
      }

      return [...rows];
    });
  };

  const createRow = (id: number, folderId: number | null, subFolderId: number | null) => {
    setRows((rows) => {
      if (!folderId) {
        for (let i = rows.length - 1; i >= 0; i--) {
          if (rows[i].folderId === id || rows[i].id === id) {
            const newRows = [...rows];
            newRows.splice(i + 1, 0, rowTemplate);
            return newRows;
          }
        }
      }

      return [...rows];
    });
  }

  const deleteRow = useCallback(
    (id) => {
      setRows((rows) => rows.filter((row) => row.id !== id));
    },
    [setRows]
  );

  const clearOnBlur = useCallback(() => {
    setRows((rows) => rows.filter((row) => row.id !== -1));
  }, [setRows]);

  const handleSubmit = useCallback(() => {
    setRows((rows) =>
      rows.map((row) => {
        if (row.id !== -1) return row;

        return { ...row, id: Math.trunc(Math.random() * 100) };
      })
    );
  }, [setRows]);

  const forms = useMemo(() => {
    return rows.map(({ id, folderId, subFolderId, ...formFields }) => {
      return (
        <div key={id}>
          <div>
            {!folderId && <Button onClick={createFolder}>1</Button>}
            {!subFolderId && <Button onClick={() => createSubFolder(id, folderId)}>2</Button>}
            <Button onClick={() => {}}>3</Button>
            <Button onClick={() => {}}>Delete</Button>
          </div>
          <Form
            fields={formFields}
            onBlur={clearOnBlur}
            isTemplate={id === -1}
            onSubmit={handleSubmit}
          />
        </div>
      );
    });
  }, [rows]);

  return <div>{forms}</div>;
};
