import { useMemo } from 'react';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, EmptyObject, Store, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { PayloadAction } from './types/actions';
import { RootState } from './types/state';
import rootReducer from './reducer';
import rootSaga from './saga';

let store: Store<EmptyObject & RootState, PayloadAction> | undefined;

const initStore = (
  preloadedState?: Partial<RootState>
): Store<EmptyObject & RootState, PayloadAction> => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

const initializeStore = (preloadedState?: Partial<RootState>) => {
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });

    store = undefined;
  }

  if (typeof window === 'undefined') return _store;
  if (!store) store = _store;

  return _store;
};

const useStore = (
  initialState?: Partial<RootState>
): Store<EmptyObject & RootState, PayloadAction> => {
  const store = useMemo(() => initializeStore(initialState), [initialState]);

  return store;
};

export default useStore;
