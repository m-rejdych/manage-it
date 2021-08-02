import { State } from './types';
import { PayloadAction } from '../../types/actions';
import { CREATE_PROJECT, ADD_PROJECT, SET_ERROR } from './actions';

const initialState: State = {
  projects: [],
  error: null,
  loading: false,
};

const reducer = (state = initialState, { type, payload }: PayloadAction): State => {
  switch (type) {
    case CREATE_PROJECT:
      return { ...state, loading: true };
    case ADD_PROJECT:
      return { ...state, loading: false, error: null, projects: [...state.projects, payload] };
    case SET_ERROR:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export default reducer;
