import { put, call, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import Project from '../../../types/project';
import { PayloadAction } from '../../types/actions';
import { createProject, getMyProjects, getProjectById } from '../../../services/projectServices';
import {
  CREATE_PROJECT,
  GET_MY_PROJECTS,
  GET_PROJECT_BY_ID,
  addProject,
  setProjects,
  setOpenedProjec,
  setError,
} from './actions';

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

function* handleGetProjectById({ payload }: PayloadAction<number>) {
  try {
    const response: AxiosResponse<Project> = yield call(getProjectById, payload);

    yield put(setOpenedProjec(response.data));
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

function* getProjectByIdSaga() {
  yield takeEvery(GET_PROJECT_BY_ID, handleGetProjectById);
}

const sagas = [createProjectSaga(), getMyProjectsSaga(), getProjectByIdSaga()];

export default sagas;
