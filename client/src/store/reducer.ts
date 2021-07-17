import { Reducer, CombinedState, combineReducers } from 'redux';

import { RootState } from './types/state';
import { PayloadAction } from './types/actions';
import themeReducer from './ducks/theme/reducer';
import authReducer from './ducks/auth/reducer';

const rootReducer: Reducer<CombinedState<RootState>, PayloadAction> = combineReducers<RootState>({
  theme: themeReducer,
  auth: authReducer,
});

export default rootReducer;
