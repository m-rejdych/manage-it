import createActionCreator from '../../util/createActionCreator';

import { CreateTaskPayload } from '../../../types/task/payloads';
import Task from '../../../types/task';

export const ADD_TASK = 'TASK_ADD_TASK';
export const CREATE_TASK = 'TAST_CREATE_TASK';
export const GET_TASKS_BY_PROJECT_ID = 'TASK_GET_TASKS_BY_PROJECT_ID';
export const SET_OPENED_TASK = 'TASK_SET_OPENED_TASK';
export const SET_TASKS = 'TASK_SET_TASKS';
export const SET_ERROR = 'TASK_SET_ERROR';
export const RESET = 'TASK_RESET';

export const createTask = createActionCreator<
  typeof CREATE_TASK,
  CreateTaskPayload
>(CREATE_TASK);

export const addTask = createActionCreator<typeof ADD_TASK, Task>(ADD_TASK);

export const setOpenedTask = createActionCreator<typeof SET_OPENED_TASK, Task>(
  SET_OPENED_TASK,
);

export const getTasksByProjectId = createActionCreator<
  typeof GET_TASKS_BY_PROJECT_ID,
  number
>(GET_TASKS_BY_PROJECT_ID);

export const setTasks = createActionCreator<typeof SET_TASKS, Task[]>(
  SET_TASKS,
);

export const setError = createActionCreator<typeof SET_ERROR, string | null>(
  SET_ERROR,
);

export const reset = createActionCreator<typeof RESET, void>(RESET);
