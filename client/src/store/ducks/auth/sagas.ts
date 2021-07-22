import { call, put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import User from '../../../types/user';
import { REGISTER, LOGIN, LOGOUT, authSuccess, reset, setError } from './actions';
import { register, login, logout } from '../../../services/authServices';
import { RegisterPayload, LoginPayload } from '../../../types/auth/payloads';
import { PayloadAction } from '../../types/actions';

function* handleRegister({ payload }: PayloadAction<typeof REGISTER, RegisterPayload>) {
  try {
    const response: AxiosResponse<User> = yield call(register, payload);
    yield put(authSuccess(response.data));
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}

function* handleLogin({ payload }: PayloadAction<typeof LOGIN, LoginPayload>) {
  try {
    const response: AxiosResponse<User> = yield call(login, payload);
    yield put(authSuccess(response.data));
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}

function* handleLogout() {
  try {
    const response: AxiosResponse<boolean> = yield call(logout);

    yield put(reset(response.data));
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}

function* registerSaga() {
  yield takeEvery(REGISTER, handleRegister);
}

function* loginSaga() {
  yield takeEvery(LOGIN, handleLogin);
}

function* logoutSaga() {
  yield takeEvery(LOGOUT, handleLogout);
}

const sagas = [registerSaga(), loginSaga(), logoutSaga()];

export default sagas;
