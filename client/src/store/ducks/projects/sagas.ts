import { put, call, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import Project from '../../../types/project';
import { PayloadAction } from '../../types/actions';
import { createProject, getMyProjects } from '../../../services/projectServices';
import { CREATE_PROJECT, GET_MY_PROJECTS, addProject, setProjects, setError } from './actions';

function* handleCreateProject({ payload }: PayloadAction<Project>) {
  try {
    const response: AxiosResponse<Project> = yield call(createProject, payload);

    yield put(addProject(response.data));
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}

function* handleGetMyProjects() {
  try {
    const response: AxiosResponse<Project[]> = yield call(getMyProjects);

    yield put(setProjects(response.data));
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}

function* createProjectSaga() {
  yield takeEvery(CREATE_PROJECT, handleCreateProject);
}

function* getMyProjectsSaga() {
  yield takeEvery(GET_MY_PROJECTS, handleGetMyProjects);
}

const sagas = [createProjectSaga(), getMyProjectsSaga()];

export default sagas;
