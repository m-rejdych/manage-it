import { call, put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import User from '../../../types/user';
import { REGISTER, LOGIN, AUTOLOGIN, authSuccess, autologinSuccess, setError } from './actions';
import { register, login, autologin } from '../../../services/authServices';
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

function* registerSaga() {
  yield takeEvery(REGISTER, handleRegister);
}

function* loginSaga() {
  yield takeEvery(LOGIN, handleLogin);
}

const sagas = [registerSaga(), loginSaga()];

export default sagas;
