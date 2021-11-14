import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import Project from '../../../types/project';
import { PayloadAction } from '../../types/actions';
import { CreateProjectPayload } from '../../../types/project/payloads';
import {
  createProject,
  getMyProjects,
  getProjectById,
  validateMembership,
} from '../../../services/projectServices';
import {
  CREATE_PROJECT,
  GET_MY_PROJECTS,
  GET_PROJECT_BY_ID,
  VALIDATE_MEMBERSHIP,
  addProject,
  setProjects,
  setOpenedProject,
  setIsMember,
  setError,
} from './actions';

function* handleCreateProject({
  payload,
}: PayloadAction<CreateProjectPayload>) {
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
    const response: AxiosResponse<Project> = yield call(
      getProjectById,
      payload,
    );

    yield put(setOpenedProject(response.data));
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}

function* handleValidateMembership({ payload }: PayloadAction<number>) {
  try {
    const response: AxiosResponse<boolean> = yield call(
      validateMembership,
      payload,
    );

    yield put(setIsMember(response.data));
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

function* validateMembershipSaga() {
  yield takeLatest(VALIDATE_MEMBERSHIP, handleValidateMembership);
}

const sagas = [
  createProjectSaga(),
  getMyProjectsSaga(),
  getProjectByIdSaga(),
  validateMembershipSaga(),
];

export default sagas;
