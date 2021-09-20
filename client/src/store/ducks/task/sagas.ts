import { call, put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { CREATE_TASK, addTask, setError } from './actions';
import { createTask } from '../../../services/taskServices';
import { PayloadAction } from '../../types/actions';
import Task from '../../../types/task';

function* handleCreateTask({ payload }: PayloadAction) {
  try {
    const response: AxiosResponse<Task> = yield call(createTask, payload);

    yield put(addTask(response.data));
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}

function* createTaskSaga() {
  yield takeEvery(CREATE_TASK, handleCreateTask);
}

const sagas = [createTaskSaga()];

export default sagas;
