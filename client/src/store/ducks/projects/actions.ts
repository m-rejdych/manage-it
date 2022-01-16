import createActionCreator from '../../util/createActionCreator';
import type {
  CreateProjectPayload,
  GetMemberRequestsPayload,
} from '../../../types/project/payloads';
import type Project from '../../../types/project';
import type User from '../../../types/user';
import type MemberRequest from '../../../types/memberRequest';

export const ADMIN_ACCEPT_MEMBER_REQUEST =
  'PROJECT_ADMIN_ACCEPT_MEMBER_REQUEST';
export const ADMIN_GET_MEMBER_REQUESTS = 'PROJECT_ADMIN_GET_MEMBER_REQUESTS';
export const ADMIN_SET_MEMBER_REQUESTS = 'PROJECT_ADMIN_SET_MEMBER_REQUESTS';
export const ADMIN_REJECT_MEMBER_REQUEST =
  'PROJECT_ADMIN_REJECT_MEMBER_REQUEST';
export const ADMIN_FILTER_MEMBER_REQUESTS =
  'PROJECT_ADMIN_FILTER_MEMBER_REQUESTS';
export const CREATE_PROJECT = 'PROJECT_CREATE_PROJECT';
export const ADD_PROJECT = 'PROJECT_ADD_PROJECT';
export const GET_MY_PROJECTS = 'PROJECT_GET_MY_PROJECTS';
export const GET_PROJECT_BY_ID = 'PROJECT_GET_PROJECT_BY_ID';
export const GET_MEMBERS = 'PROJECT_GET_MEMBERS';
export const REQUEST_MEMBERSHIP = 'PROJECT_REQUEST_MEMBERSHIP';
export const VALIDATE_MEMBERSHIP = 'PROJECT_VALIDATE_MEMBERSHIP';
export const SET_MEMBERS = 'PROJECT_SET_MEMBERS';
export const SET_PROJECTS = 'PROJECT_SET_PROJECTS';
export const SET_ERROR = 'PROJECT_SET_ERROR';
export const SET_OPENED_PROJECT = 'PROJECT_SET_OPENED_PROJECT';
export const SET_IS_MEMBER = 'PROJECT_SET_IS_MEMBER';
export const SET_IS_ADMIN = 'PROJECT_SET_IS_ADMIN';
export const SET_MEMBER_REQUEST = 'PROJECT_SET_MEMBER_REQUEST';
export const REMOVE_MEMBER_REQUEST = 'PROJECT_REMOVE_MEMBER_REQUEST';
export const RESET = 'PROJECT_RESET';

export const acceptAdminMemberRequest = createActionCreator<
  typeof ADMIN_ACCEPT_MEMBER_REQUEST,
  number
>(ADMIN_ACCEPT_MEMBER_REQUEST);

export const addProject = createActionCreator<typeof ADD_PROJECT, Project>(
  ADD_PROJECT,
);
export const createProject = createActionCreator<
  typeof CREATE_PROJECT,
  CreateProjectPayload
>(CREATE_PROJECT);

export const filterAdminMemberRequests = createActionCreator<
  typeof ADMIN_FILTER_MEMBER_REQUESTS,
  number
>(ADMIN_FILTER_MEMBER_REQUESTS);

export const getMembers = createActionCreator<typeof GET_MEMBERS, number>(
  GET_MEMBERS,
);

export const getMyProjects = createActionCreator<typeof GET_MY_PROJECTS, void>(
  GET_MY_PROJECTS,
);

export const getAdminMemberRequests = createActionCreator<
  typeof ADMIN_GET_MEMBER_REQUESTS,
  GetMemberRequestsPayload
>(ADMIN_GET_MEMBER_REQUESTS);

export const validateMembership = createActionCreator<
  typeof VALIDATE_MEMBERSHIP,
  number
>(VALIDATE_MEMBERSHIP);

export const requestMembership = createActionCreator<
  typeof REQUEST_MEMBERSHIP,
  number
>(REQUEST_MEMBERSHIP);

export const getProjectById = createActionCreator<
  typeof GET_PROJECT_BY_ID,
  number
>(GET_PROJECT_BY_ID);

export const setMembers = createActionCreator<typeof SET_MEMBERS, User[]>(SET_MEMBERS);

export const setProjects = createActionCreator<typeof SET_PROJECTS, Project[]>(
  SET_PROJECTS,
);

export const setOpenedProject = createActionCreator<
  typeof SET_OPENED_PROJECT,
  Project | null
>(SET_OPENED_PROJECT);

export const setIsMember = createActionCreator<typeof SET_IS_MEMBER, boolean>(
  SET_IS_MEMBER,
);

export const setIsAdmin = createActionCreator<typeof SET_IS_ADMIN, boolean>(
  SET_IS_ADMIN,
);

export const setMembereRequest = createActionCreator<
  typeof SET_MEMBER_REQUEST,
  MemberRequest | null
>(SET_MEMBER_REQUEST);

export const setAdminMemberRequests = createActionCreator<
  typeof ADMIN_SET_MEMBER_REQUESTS,
  MemberRequest[]
>(ADMIN_SET_MEMBER_REQUESTS);

export const removeMemberRequest = createActionCreator<
  typeof REMOVE_MEMBER_REQUEST,
  number
>(REMOVE_MEMBER_REQUEST);

export const rejectAdminMemberRequest = createActionCreator<
  typeof ADMIN_REJECT_MEMBER_REQUEST,
  number
>(ADMIN_REJECT_MEMBER_REQUEST);

export const setError = createActionCreator<typeof SET_ERROR, string | null>(
  SET_ERROR,
);

export const reset = createActionCreator<typeof RESET, void>(RESET);
