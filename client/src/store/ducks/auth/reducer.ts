import { Reducer } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import { State } from './types';
import { PayloadAction } from '../../types/actions';
import { REGISTER, LOGIN, AUTH_SUCCESS, RESET, SET_ERROR } from './actions';

const initialState: State = {
  isAuth: false,
  user: null,
  loading: false,
  initialLoad: false,
  error: null,
};

const reducer: Reducer<State, PayloadAction> = (state = initialState, { type, payload }) => {
  switch (type) {
    case HYDRATE:
      return { ...state, ...payload.auth };
    case REGISTER:
    case LOGIN:
      return { ...state, loading: true };
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        initialLoad: true,
        isAuth: true,
        user: payload,
        error: null,
      };
    case RESET:
      return payload ? initialState : state;
    case SET_ERROR:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export default reducer;
