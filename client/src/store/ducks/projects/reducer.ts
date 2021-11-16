import { State } from './types';
import { PayloadAction } from '../../types/actions';
import {
  CREATE_PROJECT,
  VALIDATE_MEMBERSHIP,
  ADD_PROJECT,
  GET_MY_PROJECTS,
  GET_PROJECT_BY_ID,
  SET_PROJECTS,
  SET_OPENED_PROJECT,
  SET_IS_MEMBER,
  SET_IS_REQUESTED,
  SET_ERROR,
  RESET,
} from './actions';

const initialState: State = {
  projects: [],
  openedProject: {
    project: null,
    isMember: false,
    isMemberRequested: false,
  },
  error: null,
  loading: false,
};

const reducer = (
  state = initialState,
  { type, payload }: PayloadAction,
): State => {
  switch (type) {
    case CREATE_PROJECT:
      return { ...state, loading: true };
    case VALIDATE_MEMBERSHIP:
      return { ...state, loading: true };
    case ADD_PROJECT:
      return {
        ...state,
        loading: false,
        error: null,
        projects: [payload, ...state.projects],
      };
    case GET_MY_PROJECTS:
      return { ...state, loading: true };
    case GET_PROJECT_BY_ID:
      return { ...state, loading: true };
    case SET_PROJECTS:
      return { ...state, loading: false, error: null, projects: payload };
    case SET_OPENED_PROJECT:
      return {
        ...state,
        loading: false,
        error: null,
        openedProject: { ...state.openedProject, project: payload },
      };
    case SET_IS_MEMBER:
      return {
        ...state,
        loading: false,
        error: null,
        openedProject: { ...state.openedProject, isMember: payload },
      };
    case SET_IS_REQUESTED:
      return {
        ...state,
        loading: false,
        error: null,
        openedProject: { ...state.openedProject, isMemberRequested: payload },
      };
    case SET_ERROR:
      return { ...state, loading: false, error: payload };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
