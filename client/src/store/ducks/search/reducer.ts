import { State } from './types';
import { PayloadAction } from '../../types/actions';
import { USERS, SET_USERS, SET_ERROR } from './actions';

const initialState: State = {
  users: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, { type, payload }: PayloadAction): State => {
  switch (type) {
    case USERS:
      return { ...state, loading: true };
    case SET_USERS:
      return { ...state, loading: false, error: null, users: payload };
    case SET_ERROR:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export default reducer;
