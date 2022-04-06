import { call, put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import {
  CREATE_TASK,
  GET_TASK_BY_ID,
  GET_TASKS_BY_PROJECT_ID,
  addTask,
  setTasks,
  setOpenedTask,
  setError,
} from './actions';
import {
  createTask,
  getTaskById,
  getTasksByProjectId,
} from '../../../services/taskServices';
import type { PayloadAction } from '../../types/actions';
import type {
  CreateTaskPayload,
  GetTaskByIdPayload,
} from '../../../types/task/payloads';
import type Task from '../../../types/task';

function* handleCreateTask({
  payload,
}: PayloadAction<never, CreateTaskPayload>) {
  try {
    const response: AxiosResponse<Task> = yield call(createTask, payload);

    yield put(addTask(response.data));
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}

function* handleGetTaskById({
  payload,
}: PayloadAction<never, GetTaskByIdPayload>) {
  try {
    const response: AxiosResponse<Task> = yield call(getTaskById, payload);

    yield put(setOpenedTask(response.data));
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}

function* handleGetTasksByProjectId({ payload }: PayloadAction<never, number>) {
  try {
    const response: AxiosResponse<Task[]> = yield call(
      getTasksByProjectId,
      payload,
    );

    yield put(setTasks(response.data));
  } catch (error) {
    yield put(setError(error.resopnse.data.message));
  }
}

function* createTaskSaga() {
  yield takeEvery(CREATE_TASK, handleCreateTask);
}

function* getTaskByIdSaga() {
  yield takeEvery(GET_TASK_BY_ID, handleGetTaskById);
}

function* getTasksByIdSaga() {
  yield takeEvery(GET_TASKS_BY_PROJECT_ID, handleGetTasksByProjectId);
}

const sagas = [createTaskSaga(), getTasksByIdSaga(), getTaskByIdSaga()];

export default sagas;
