import { StateType } from '../store';
import { MenuValues } from '../types';

export const createCIWSelector =
  (projectId: number | null, menuValue: MenuValues | null) => (state: StateType) => {
    if (
      projectId === null ||
      menuValue === null ||
      !state.projects[projectId] ||
      !state.projects[projectId][menuValue]
    )
      return [];

    return state.projects[projectId][menuValue];
  };

export const requestStatusSelector = (projectId: number | null) => (state: StateType) => {
  if (projectId === null) return null;

  return state.projects[projectId]?.requestStatus;
};
