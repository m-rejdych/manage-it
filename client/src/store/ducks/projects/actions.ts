import createActionCreator from '../../util/createActionCreator';
import { CreateProjectPayload } from '../../../types/project/payloads';
import Project from '../../../types/project';

export const CREATE_PROJECT = 'PROJECT_CREATE_PROJECT';
export const ADD_PROJECT = 'PROJECT_ADD_PROJECT';
export const SET_ERROR = 'PROJECT_SET_ERROR';

export const createProject = createActionCreator<typeof CREATE_PROJECT, CreateProjectPayload>(
  CREATE_PROJECT
);

export const addProject = createActionCreator<typeof ADD_PROJECT, Project>(ADD_PROJECT);

export const setError = createActionCreator<typeof SET_ERROR, string | null>(SET_ERROR);
