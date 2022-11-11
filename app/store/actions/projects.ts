import { normalizeCIW } from './../../utils/helpers';
import { CIWData, CIWCreateRequest, CIWToRender, RequestStatus } from './../../types';
import { getProjectById, createCIWRow, deleteCIWRow, updateCIWRow } from '../../api/projects';
import { rowTemplate } from '../../constants/templates';
import { Actions } from '../types/projects';
import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StateType } from '..';

type GetCIWAction = {
  type: Actions.GET_CIW;
  payload: {
    [id: number]: {
      ciw: CIWData[];
    };
  };
};

type GetCIWRequestAction = {
  type: Actions.GET_CIW_REQUEST | Actions.GET_CIW_SUCCESS | Actions.GET_CIW_FAILURE;
  payload: {
    // [id: number]: {
    //   requestStatus: RequestStatus;
    // };
    id: number;
    requestStatus: RequestStatus
  };
};

// type GetCIWRequestAction = {
//   type: Actions.GET_CIW_REQUEST;
//   payload: {
//     [id: number]: {
//       requestStatus: RequestStatus.REQUEST;
//     };
//   };
// };

// type GetCIWFailureAction = {
//   type: Actions.GET_CIW_FAILURE;
//   payload: {
//     [id: number]: {
//       requestStatus: RequestStatus.FAILURE;
//     };
//   };
// };

// type GetCIWSuccessAction = {
//   type: Actions.GET_CIW_SUCCESS;
//   payload: {
//     [id: number]: {
//       requestStatus: RequestStatus.SUCCESS;
//     };
//   };
// };

type CreateTemplateAction = {
  type: Actions.CREATE_TEMPLATE;
  payload: {
    projectId: number;
    rowTemplate: CIWData;
  };
};

type DeleteTemplateAction = {
  type: Actions.DELETE_TEMPLATE;
  payload: number;
};

type CreateCIWAction = {
  type: Actions.CREATE_CIW;
  payload: { projectId: number; row: CIWData };
};

type DeleteCIWAction = {
  type: Actions.DELETE_CIW;
  payload: {
    projectId: number;
    rowId: number;
  };
};

type UpdateCIWAction = {
  type: Actions.UPDATE_CIW;
  payload: {
    projectId: number;
    rowId: number;
    rowFields: any;
  };
};

export type ProjectsActions =
  | GetCIWAction
  | CreateTemplateAction
  | DeleteTemplateAction
  | CreateCIWAction
  | DeleteCIWAction
  | UpdateCIWAction
  | GetCIWRequestAction;
// | GetCIWFailureAction
// | GetCIWSuccessAction;

export const getProjectsAction: ActionCreator<
  ThunkAction<Promise<void>, StateType, undefined, GetCIWAction | GetCIWRequestAction>
> = (id: number) => async (dispatch, getState) => {
  try {
    if (getState().projects[id]) return;

    dispatch({
      type: Actions.GET_CIW_REQUEST,
      payload: { id, requestStatus: RequestStatus.REQUEST },
    });

    const projectData = await getProjectById(id);

    const normalizeProjectData = normalizeCIW(projectData);

    dispatch({
      type: Actions.GET_CIW,
      payload: { [id]: { ciw: normalizeProjectData } },
    });

    dispatch({
      type: Actions.GET_CIW_REQUEST,
      payload: { id, requestStatus: RequestStatus.SUCCESS },
    });
  } catch (error) {
    dispatch({
      type: Actions.GET_CIW_REQUEST,
      payload: { id, requestStatus: RequestStatus.FAILURE },
    });
    console.log(error);
  }
};

export const createTemplateAction: ActionCreator<CreateTemplateAction> = (
  projectId: number,
  rowTemplate: CIWData
) => {
  return { type: Actions.CREATE_TEMPLATE, payload: { projectId, rowTemplate } };
};

export const deleteTemplateAction: ActionCreator<DeleteTemplateAction> = (projectId: number) => {
  return { type: Actions.DELETE_TEMPLATE, payload: projectId };
};

export const createCIWAction: ActionCreator<
  ThunkAction<Promise<void>, StateType, undefined, CreateCIWAction>
> = (projectId: number, body: CIWCreateRequest) => async (dispatch, getState) => {
  try {
    const { id, total, parentId, grandParentId, ...rest } =
      getState().projects[projectId].ciw.find((row) => row.id === -1) || rowTemplate;

    const response = await createCIWRow({ ...rest, ...body, parentId });

    dispatch({
      type: Actions.CREATE_CIW,
      payload: { projectId, row: { ...response.current, parentId, grandParentId } },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCIWAction: ActionCreator<
  ThunkAction<Promise<void>, StateType, undefined, DeleteCIWAction>
> = (projectId: number, rowId: number) => async (dispatch) => {
  try {
    await deleteCIWRow(rowId);

    dispatch({
      type: Actions.DELETE_CIW,
      payload: { projectId, rowId },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCIWAction =
  (
    projectId: number,
    rowId: number,
    body: CIWToRender
  ): ThunkAction<Promise<void>, StateType, undefined, UpdateCIWAction> =>
  async (dispatch, getState) => {
    try {
      const rowToUpdate = getState().projects[projectId].ciw.find((row) => row.id === rowId)!;

      const { machineOperatorSalary, mainCosts, materials, mimExploitation, supportCosts } =
        rowToUpdate;

      const response = await updateCIWRow(rowId, {
        ...body,
        machineOperatorSalary,
        mainCosts,
        materials,
        mimExploitation,
        supportCosts,
      });

      dispatch({
        type: Actions.UPDATE_CIW,
        payload: { projectId, rowId, rowFields: response.current },
      });
    } catch (error) {
      console.log(error);
    }
  };
