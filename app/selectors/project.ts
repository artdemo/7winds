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
