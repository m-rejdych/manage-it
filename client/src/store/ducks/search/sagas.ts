import { put, call, debounce } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { USERS, setUsers, setError } from './actions';
import { searchUsers } from '../../../services/userServices';
import { PayloadAction } from '../../types/actions';
import { SearchUsersPayload } from '../../../types/user/payloads';
import User from '../../../types/user';

function* handleSearchUsers({ payload }: PayloadAction<SearchUsersPayload>) {
  try {
    const response: AxiosResponse<User[]> = yield call(searchUsers, payload);

    yield put(setUsers(response.data));
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}

function* searchUsersSaga() {
  yield debounce(1000, USERS, handleSearchUsers);
}

const sagas = [searchUsersSaga()];

export default sagas;
