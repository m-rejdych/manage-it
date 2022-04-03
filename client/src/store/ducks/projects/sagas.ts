import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import type Project from '../../../types/project';
import type User from '../../../types/user';
import type MemberRequest from '../../../types/memberRequest';
import type { PayloadAction } from '../../types/actions';
import type {
  CreateProjectPayload,
  GetMemberRequestsPayload,
  RemoveMemberPayload,
} from '../../../types/project/payloads';
import {
  acceptMemberRequest,
  createProject,
  getMembers,
  getMyProjects,
  getProjectById,
  validateMembership,
  validateAdmin,
  requestMembership,
  rejectMemberRequest,
  removeMemberRequest,
  removeMember,
  getMemberRequest,
  getMembershipRequests,
} from '../../../services/projectServices';
import {
  ADMIN_ACCEPT_MEMBER_REQUEST,
  ADMIN_GET_MEMBER_REQUESTS,
  ADMIN_REJECT_MEMBER_REQUEST,
  ADMIN_REMOVE_MEMBER,
  CREATE_PROJECT,
  GET_MEMBERS,
  GET_MY_PROJECTS,
  GET_PROJECT_BY_ID,
  VALIDATE_MEMBERSHIP,
  REQUEST_MEMBERSHIP,
  REMOVE_MEMBER_REQUEST,
  addProject,
  filterAdminMemberRequests,
  setAdminMemberRequests,
  setMembers,
  setMembereRequest,
  setProjects,
  setOpenedProject,
  setIsMember,
  setIsAdmin,
  setError,
  updateProject,
} from './actions';

function* handleCreateProject({
  payload,
}: PayloadAction<never, CreateProjectPayload>) {
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

function* handleGetProjectById({ payload }: PayloadAction<never, number>) {
  try {
    const response: AxiosResponse<Project> = yield call(
      getProjectById,
      payload,
    );

    yield put(setOpenedProject(response.data || null));
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}

function* handleGetMembers({ payload }: PayloadAction<never, number>) {
  try {
    const response: AxiosResponse<User[]> = yield call(getMembers, payload);

    yield put(setMembers(response.data));
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}

function* handleGetAdminMemberRequests({
  payload,
}: PayloadAction<never, GetMemberRequestsPayload>) {
  try {
    const response: AxiosResponse<MemberRequest[]> = yield call(
      getMembershipRequests,
      payload,
    );

    yield put(setAdminMemberRequests(response.data));
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}

function* handleValidateMembership({ payload }: PayloadAction<never, number>) {
  try {
    const response: AxiosResponse<boolean> = yield call(
      validateMembership,
      payload,
    );

    if (!response.data) {
      const memberRequest: AxiosResponse<MemberRequest> = yield call(
        getMemberRequest,
        payload,
        false,
      );

      yield put(setMembereRequest(memberRequest.data || null));
    } else {
      const isAdmin: AxiosResponse<boolean> = yield call(
        validateAdmin,
        payload,
      );

      yield put(setIsAdmin(isAdmin.data));
    }

    yield put(setIsMember(response.data));
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}

function* handleRequestMembership({ payload }: PayloadAction<never, number>) {
  try {
    const response: AxiosResponse<MemberRequest> = yield call(
      requestMembership,
      payload,
    );

    yield put(setMembereRequest(response.data));
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}

function* handleRemoveMembershipRequest({ payload }: PayloadAction<never, number>) {
  try {
    const response: AxiosResponse<boolean> = yield call(
      removeMemberRequest,
      payload,
    );

    if (response.data) yield put(setMembereRequest(null));
  } catch (error) {
    yield setError(error.response.data.message);
  }
}

function* handleRejectMemberRequest({ payload }: PayloadAction<never, number>) {
  try {
    const response: AxiosResponse<boolean> = yield call(
      rejectMemberRequest,
      payload,
    );

    if (response.data) {
      yield put(filterAdminMemberRequests(payload));
    }
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}

function* handleAcceptMemberRequest({ payload }: PayloadAction<never, number>) {
  try {
    const response: AxiosResponse<MemberRequest> = yield call(
      acceptMemberRequest,
      payload,
    );

    if (response.data.isAccepted) {
      yield put(filterAdminMemberRequests(payload));
    }
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}

function* handleRemoveAdminMember({
  payload,
}: PayloadAction<never, RemoveMemberPayload>) {
  try {
    const response: AxiosResponse<Project> = yield call(removeMember, payload);

    yield put(updateProject(response.data));
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}

function* acceptMemberRequestSaga() {
  yield takeEvery(ADMIN_ACCEPT_MEMBER_REQUEST, handleAcceptMemberRequest);
}

function* createProjectSaga() {
  yield takeEvery(CREATE_PROJECT, handleCreateProject);
}

function* getMembersSaga() {
  yield takeEvery(GET_MEMBERS, handleGetMembers);
}

function* getMyProjectsSaga() {
  yield takeEvery(GET_MY_PROJECTS, handleGetMyProjects);
}

function* getAdminMemberRequestsSaga() {
  yield takeEvery(ADMIN_GET_MEMBER_REQUESTS, handleGetAdminMemberRequests);
}

function* getProjectByIdSaga() {
  yield takeEvery(GET_PROJECT_BY_ID, handleGetProjectById);
}

function* validateMembershipSaga() {
  yield takeLatest(VALIDATE_MEMBERSHIP, handleValidateMembership);
}

function* requestMembershipSaga() {
  yield takeEvery(REQUEST_MEMBERSHIP, handleRequestMembership);
}

function* removeMembershipRequestSaga() {
  yield takeEvery(REMOVE_MEMBER_REQUEST, handleRemoveMembershipRequest);
}

function* rejectAdminMembershipRequestSaga() {
  yield takeEvery(ADMIN_REJECT_MEMBER_REQUEST, handleRejectMemberRequest);
}

function* removeAdminMemberSaga() {
  yield takeEvery(ADMIN_REMOVE_MEMBER, handleRemoveAdminMember);
}

const sagas = [
  acceptMemberRequestSaga(),
  createProjectSaga(),
  getMembersSaga(),
  getMyProjectsSaga(),
  getProjectByIdSaga(),
  getAdminMemberRequestsSaga(),
  validateMembershipSaga(),
  requestMembershipSaga(),
  removeMembershipRequestSaga(),
  rejectAdminMembershipRequestSaga(),
  removeAdminMemberSaga(),
];

export default sagas;
