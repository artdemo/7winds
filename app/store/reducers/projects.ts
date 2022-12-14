import { findLastIndex } from './../../utils/helpers';
import { Actions } from './../types/projects';
import { ProjectsActions } from '../actions/projects';
import { CIWData, RequestStatus } from '../../types';

type ProjectsStateType = {
  [id: number]: {
    ciw: CIWData[];
    requestStatus?: RequestStatus;
  };
};

export const projectsReducer = (
  state: ProjectsStateType = {},
  action: ProjectsActions
): ProjectsStateType => {
  switch (action.type) {
    case Actions.GET_CIW:
      return {
        ...state,
        ...action.payload,
      };

    case Actions.GET_CIW_REQUEST:
    case Actions.GET_CIW_FAILURE:
    case Actions.GET_CIW_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          requestStatus: action.payload.requestStatus,
        },
      };

    case Actions.CREATE_TEMPLATE: {
      const newRows = [...state[action.payload.projectId].ciw];

      const oldTemplateIndex = newRows.findIndex((row) => row.id === -1);

      if (oldTemplateIndex !== -1) newRows.splice(oldTemplateIndex, 1);

      const lastIndex = findLastIndex(newRows, action.payload.rowTemplate.parentId);

      newRows.splice(lastIndex + 1, 0, action.payload.rowTemplate);

      return {
        ...state,
        [action.payload.projectId]: {
          ...state[action.payload.projectId],
          ciw: newRows,
        },
      };
    }

    case Actions.DELETE_TEMPLATE:
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          ciw: state[action.payload].ciw.filter((row) => row.id !== -1),
        },
      };

    case Actions.CREATE_CIW:
      return {
        ...state,
        [action.payload.projectId]: {
          ...state[action.payload.projectId],
          ciw: state[action.payload.projectId].ciw.map((row) => {
            if (row.id !== -1) return row;

            return action.payload.row;
          }),
        },
      };

    case Actions.DELETE_CIW:
      return {
        ...state,
        [action.payload.projectId]: {
          ...state[action.payload.projectId],
          ciw: state[action.payload.projectId].ciw.filter((row) => {
            const { rowId } = action.payload;

            return rowId !== row.id && rowId !== row.parentId && rowId !== row.grandParentId;
          }),
        },
      };

    case Actions.UPDATE_CIW:
      return {
        ...state,
        [action.payload.projectId]: {
          ...state[action.payload.projectId],
          ciw: state[action.payload.projectId].ciw.map((row) => {
            if (row.id !== action.payload.rowId) return row;

            return { ...row, ...action.payload.rowFields };
          }),
        },
      };
    default:
      return state;
  }
};
