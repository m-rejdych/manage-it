import { Reducer } from 'redux';

import { State } from './types';
import { PayloadAction } from '../../types/actions';
import { REGISTER, LOGIN, AUTH_SUCCESS, AUTOLOGIN, AUTOLOGIN_SUCCESS, SET_ERROR } from './actions';

const initialState: State = {
  isAuth: false,
  user: null,
  loading: false,
  error: null,
};

const reducer: Reducer<State, PayloadAction> = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER:
      return { ...state, loading: true };
    case LOGIN:
      return { ...state, loading: true };
    case AUTH_SUCCESS:
      return { ...state, loading: false, isAuth: true, user: payload, error: null };
    case SET_ERROR:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export default reducer;
