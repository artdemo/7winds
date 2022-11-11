import { CIWData, CIWResponse } from '../types';

export const normalizeCIW = (
  response: CIWResponse[],
  parentId: null | number = null,
  grandParentId: number | null = null
): CIWData[] => {
  const result: CIWData[] = [];

  response.forEach((obj) => {
    const { child, ...rest } = obj;

    result.push({ ...rest, parentId, grandParentId } as CIWData);

    if (obj.child.length && !grandParentId) {
      result.push(...normalizeCIW(obj.child, obj.id, parentId));
    }
  });

  return result;
};

type Row = {
  id: number;
  parentId: number | null;
  grandParentId: number | null;
};

export const findLastIndex = (arr: Row[], id: number | null) => {
  if (id === null) return arr.length - 1;

  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i].grandParentId === id || arr[i].parentId === id || arr[i].id === id) return i;
  }

  return -1;
};

export const findDescendantsCount = (rows: Row[], id: number) => {
  let isLastDescendant = true;

  return rows.reduceRight((count, row) => {
    if (isLastDescendant && row.parentId === id) isLastDescendant = false;

    if (isLastDescendant) return count;

    if (row.parentId === id || row.grandParentId === id) ++count;

    return count;
  }, 0);
};
