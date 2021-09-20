import { State } from './types';
import { PayloadAction } from '../../types/actions';
import { CREATE_TASK, ADD_TASK, SET_OPENED_TASK, SET_ERROR } from './actions';

const initialState: State = {
  tasks: [],
  openedTask: null,
  loading: false,
  error: null,
};

const reducer = (state = initialState, { type, payload }: PayloadAction): State => {
  switch (type) {
    case CREATE_TASK:
      return { ...state, loading: true };
    case ADD_TASK:
      return { ...state, loading: false, tasks: [payload, ...state.tasks] };
    case SET_OPENED_TASK:
      return { ...state, loading: false, error: null, openedTask: payload };
    case SET_ERROR:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export default reducer;
