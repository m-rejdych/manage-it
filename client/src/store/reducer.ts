import { Reducer, CombinedState, combineReducers } from 'redux';

import { RootState } from './types/state';
import { PayloadAction } from './types/actions';
import authReducer from './ducks/auth/reducer';
import projectReducer from './ducks/projects/reducer';

const rootReducer: Reducer<CombinedState<RootState>, PayloadAction> = combineReducers<RootState>({
  auth: authReducer,
  project: projectReducer,
});

export default rootReducer;
