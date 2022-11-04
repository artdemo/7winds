import { normalizeCIW } from './../../utils/helpers';
import { CIWData, CIWCreateRequest, CIW, CIWUpdateRequest, CIWToRender } from './../../types';
import { getProjectById, createCIWRow, deleteCIWRow, updateCIWRow } from '../../api/projects';
import { Actions } from '../types/projects';
import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StateType } from '..';

type SetCIWAction = {
  type: Actions.SET_CIW;
  payload: {
    [id: number]: {
      ciw: CIWData[];
    };
  };
};

type CreateTemplateAction = {
  type: Actions.CREATE_TEMPLATE;
  payload: {
    projectId: number;
    index: number;
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
  | SetCIWAction
  | CreateTemplateAction
  | DeleteTemplateAction
  | CreateCIWAction
  | DeleteCIWAction
  | UpdateCIWAction;

export const getProjectsAction: ActionCreator<
  ThunkAction<Promise<void>, StateType, undefined, SetCIWAction>
> = (id: number) => async (dispatch, getState) => {
  try {
    if (getState().projects[id]) return;

    const projectData = await getProjectById(id);

    const normalizeProjedctData = normalizeCIW(projectData);

    dispatch({ type: Actions.SET_CIW, payload: { [id]: { ciw: normalizeProjedctData } } });
  } catch (error) {
    console.log(error);
  }
};

export const createTemplateAction: ActionCreator<CreateTemplateAction> = (
  projectId: number,
  index: number,
  rowTemplate: CIWData
) => {
  return { type: Actions.CREATE_TEMPLATE, payload: { projectId, index, rowTemplate } };
};

export const deleteTemplateAction: ActionCreator<DeleteTemplateAction> = (projectId: number) => {
  return { type: Actions.DELETE_TEMPLATE, payload: projectId };
};

export const createCIWAction: ActionCreator<
  ThunkAction<Promise<void>, StateType, undefined, CreateCIWAction>
> = (projectId: number, body: CIWCreateRequest) => async (dispatch, getState) => {
  try {
    const { id, parentId, grandParentId, total, ...rest } = getState().projects[projectId].ciw.find(
      (row) => row.id === -1
    ) as CIWData;

    const response = await createCIWRow({ ...rest, ...body });

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
    const response = await deleteCIWRow(rowId);

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
