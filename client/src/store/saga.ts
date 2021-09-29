import { all } from 'redux-saga/effects';

import authSagas from './ducks/auth/sagas';
import projectSagas from './ducks/projects/sagas';
import taskSagas from './ducks/task/sagas';
import searchSagas from './ducks/search/sagas';

export default function* rootSaga() {
  yield all([...authSagas, ...projectSagas, ...taskSagas, ...searchSagas]);
}
