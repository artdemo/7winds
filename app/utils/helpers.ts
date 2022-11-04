import { CIWData } from '../types';

export const normalizeCIW = (
  request: { [key: string]: any }[],
  parentId = null,
  grandParentId = null
): CIWData[] => {
  let result: CIWData[] = [];

  request.forEach((obj) => {
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

export const findNeighboursCount = (
  arr: Row[],
  index: number,
  id: number,
  parentId: number | null,
  grandParentId: number | null
) => {
  let neighboursCount = 0;

  if (parentId === null) {
    let hasSibling = false;

    for (let i = index + 1; i < arr.length; i++) {
      const nextNeighbour = arr[i];

      if (nextNeighbour.parentId === id || nextNeighbour.grandParentId === id) {
        neighboursCount++;
        continue;
      }

      if (nextNeighbour.parentId === parentId) {
        neighboursCount++;
        hasSibling = true;
      }
    }

    if (!hasSibling && neighboursCount !== 0) {
      neighboursCount = 1;
    }

    return neighboursCount;
  }

  if (grandParentId === null) {
    let hasSibling = false;

    for (let i = index + 1; i < arr.length; i++) {
      const nextNeighbour = arr[i];

      if (nextNeighbour.grandParentId === parentId) {
        neighboursCount++;
        continue;
      }

      if (nextNeighbour.parentId === parentId) {
        neighboursCount++;
        hasSibling = true;
      }
    }

    if (!hasSibling && neighboursCount !== 0) neighboursCount = 1;

    return neighboursCount;
  }

  if (arr[index + 1]?.grandParentId === grandParentId) neighboursCount += 1;

  return neighboursCount;
};

export const checkIsDerrived = (array: Row[], id: number, parentId: number | null) => {
  if (parentId === null) return false;

  let parentIdOfParent;
  let isParentHasSibling = false;
  let firstSiblingId = null;

  for (let i = 0; i < array.length; i++) {
    if (array[i].id === parentId) {
      parentIdOfParent = array[i].parentId;
      continue;
    }

    if (!firstSiblingId && array[i].parentId === parentId) firstSiblingId = array[i].id;

    if (array[i].parentId === parentIdOfParent) {
      isParentHasSibling = true;
      break;
    }
  }

  return isParentHasSibling || firstSiblingId === id;
};
