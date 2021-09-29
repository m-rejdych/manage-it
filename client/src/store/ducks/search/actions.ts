import createActionCreator from '../../util/createActionCreator';
import User from '../../../types/user';
import { SearchUsersPayload } from '../../../types/user/payloads';

export const USERS = 'SEARCH_USERS';
export const SET_USERS = 'SEARCH_SET_USERS';
export const SET_ERROR = 'SEARCH_SET_ERROR';

export const searchUsers = createActionCreator<typeof USERS, SearchUsersPayload>(USERS);

export const setUsers = createActionCreator<typeof SET_USERS, User[]>(SET_USERS);

export const setError = createActionCreator<typeof SET_ERROR, string | null>(SET_ERROR);
