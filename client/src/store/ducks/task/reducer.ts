import { State } from './types';
import { PayloadAction } from '../../types/actions';
import {
  CREATE_TASK,
  ADD_TASK,
  SET_OPENED_TASK,
  GET_TASK_BY_ID,
  GET_TASKS_BY_PROJECT_ID,
  SET_TASKS,
  SET_ERROR,
  RESET,
} from './actions';

const initialState: State = {
  tasks: [],
  openedTask: null,
  loading: false,
  error: null,
};

const reducer = (
  state = initialState,
  { type, payload }: PayloadAction,
): State => {
  switch (type) {
    case CREATE_TASK:
    case GET_TASK_BY_ID:
    case GET_TASKS_BY_PROJECT_ID:
      return { ...state, loading: true };
    case ADD_TASK:
      return { ...state, loading: false, tasks: [payload, ...state.tasks] };
    case SET_OPENED_TASK:
      return { ...state, loading: false, error: null, openedTask: payload };
    case SET_TASKS:
      return { ...state, tasks: payload, loading: false, error: null };
    case SET_ERROR:
      return { ...state, loading: false, error: payload };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
