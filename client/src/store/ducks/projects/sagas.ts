import { put, call, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import Project from '../../../types/project';
import { PayloadAction } from '../../types/actions';
import { createProject } from '../../../services/projectServices';
import { CREATE_PROJECT, addProject, setError } from './actions';

function* handleCreateProject({ payload }: PayloadAction<Project>) {
  try {
    const response: AxiosResponse<Project> = yield call(createProject, payload);

    yield put(addProject(response.data));
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}

function* createProjectSaga() {
  yield takeEvery(CREATE_PROJECT, handleCreateProject);
}

const sagas = [createProjectSaga()];

export default sagas;
