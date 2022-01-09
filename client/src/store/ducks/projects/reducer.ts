import { State } from './types';
import { PayloadAction } from '../../types/actions';
import {
  ADMIN_GET_MEMBER_REQUESTS,
  ADMIN_SET_MEMBER_REQUESTS,
  CREATE_PROJECT,
  VALIDATE_MEMBERSHIP,
  REQUEST_MEMBERSHIP,
  ADD_PROJECT,
  GET_MY_PROJECTS,
  GET_PROJECT_BY_ID,
  SET_PROJECTS,
  SET_OPENED_PROJECT,
  SET_IS_MEMBER,
  SET_MEMBER_REQUEST,
  SET_IS_ADMIN,
  SET_ERROR,
  REMOVE_MEMBER_REQUEST,
  RESET,
} from './actions';

const initialState: State = {
  projects: [],
  openedProject: {
    project: null,
    isMember: false,
    isAdmin: false,
    memberRequest: null,
    admin: null,
  },
  error: null,
  loading: false,
};
const reducer = (
  state = initialState,
  { type, payload }: PayloadAction,
): State => {
  switch (type) {
    case ADMIN_GET_MEMBER_REQUESTS:
    case CREATE_PROJECT:
    case VALIDATE_MEMBERSHIP:
    case REQUEST_MEMBERSHIP:
    case GET_MY_PROJECTS:
    case GET_PROJECT_BY_ID:
    case REMOVE_MEMBER_REQUEST:
      return { ...state, loading: true };
    case ADMIN_SET_MEMBER_REQUESTS:
      return {
        ...state,
        loading: false,
        openedProject: {
          ...state.openedProject,
          admin: { ...state.openedProject.admin, memberRequests: payload },
        },
      };
    case ADD_PROJECT:
      return {
        ...state,
        loading: false,
        error: null,
        projects: [payload, ...state.projects],
      };
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
    case SET_IS_ADMIN:
      return {
        ...state,
        loading: false,
        error: null,
        openedProject: { ...state.openedProject, isAdmin: payload },
      };
    case SET_MEMBER_REQUEST:
      return {
        ...state,
        loading: false,
        error: null,
        openedProject: { ...state.openedProject, memberRequest: payload },
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
