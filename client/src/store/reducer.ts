import { Reducer, CombinedState, combineReducers } from 'redux';

import { RootState } from './types/state';
import { PayloadAction } from './types/actions';
import authReducer from './ducks/auth/reducer';
import projectReducer from './ducks/projects/reducer';
import taskReducer from './ducks/task/reducer';

const rootReducer: Reducer<CombinedState<RootState>, PayloadAction> = combineReducers<RootState>({
  auth: authReducer,
  project: projectReducer,
  task: taskReducer,
});

export default rootReducer;
