import createActionCreator from '../../util/createActionCreator';

import { CreateTaskPayload } from '../../../types/task/payloads';
import Task from '../../../types/task';

export const CREATE_TASK = 'TAST_CREATE_TASK';
export const ADD_TASK = 'TASK_ADD_TASK';
export const SET_OPENED_TASK = 'TASK_SET_OPENED_TASK';
export const SET_ERROR = 'TASK_SET_ERROR';

export const createTask = createActionCreator<typeof CREATE_TASK, CreateTaskPayload>(CREATE_TASK);

export const addTask = createActionCreator<typeof ADD_TASK, Task>(ADD_TASK);

export const setOpenedTask = createActionCreator<typeof SET_OPENED_TASK, Task>(SET_OPENED_TASK);

export const setError = createActionCreator<typeof SET_ERROR, string | null>(SET_ERROR);
