import * as api from './methods';
import { CIWCreateRequest, CIWUpdateRequest } from '../types';

export const getProjectById = async (id: number) => {
  if (id !== 1) return [];

  const projectData = await api.GET(`/v1/outlay-rows/entity/${process.env.EID}/row/list`);

  return projectData;
};

export const createCIWRow = async (body: CIWCreateRequest) => {
  const response = await api.POST(`/v1/outlay-rows/entity/${process.env.EID}/row/create`, body);

  return response;
};

export const deleteCIWRow = async (id: number) => {
  const response = await api.DELETE(`/v1/outlay-rows/entity/${process.env.EID}/row/${id}/delete`);

  return response;
};

export const updateCIWRow = async (id: number, body: CIWUpdateRequest) => {
  const response = await api.POST(
    `/v1/outlay-rows/entity/${process.env.EID}/row/${id}/update`,
    body
  );

  return response;
};
