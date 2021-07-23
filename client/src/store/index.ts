import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, EmptyObject, Store, applyMiddleware } from 'redux';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import createSagaMiddleware, { Task } from 'redux-saga';

import { PayloadAction } from './types/actions';
import { RootState } from './types/state';
import rootReducer from './reducer';
import rootSaga from './saga';

export interface SagaStore extends Store<EmptyObject & RootState, PayloadAction> {
  sagaTask?: Task;
}

const makeStore: MakeStore<SagaStore> = (): SagaStore => {
  const sagaMiddleware = createSagaMiddleware();

  const store: SagaStore = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper<SagaStore>(makeStore);
