import { call, put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import {
  CREATE_TASK,
  GET_TASKS_BY_PROJECT_ID,
  addTask,
  setTasks,
  setError,
} from './actions';
import {
  createTask,
  getTasksByProjectId,
} from '../../../services/taskServices';
import { PayloadAction } from '../../types/actions';
import { CreateTaskPayload } from '../../../types/task/payloads';
import Task from '../../../types/task';

function* handleCreateTask({ payload }: PayloadAction<CreateTaskPayload>) {
  try {
    const response: AxiosResponse<Task> = yield call(createTask, payload);

    yield put(addTask(response.data));
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}

function* handleGetTasksByProjectId({ payload }: PayloadAction<number>) {
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

function* getTasksByIdSaga() {
  yield takeEvery(GET_TASKS_BY_PROJECT_ID, handleGetTasksByProjectId);
}

const sagas = [createTaskSaga(), getTasksByIdSaga()];

export default sagas;
