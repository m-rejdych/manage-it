import createActionCreator from '../../util/createActionCreator';
import { RegisterPayload, LoginPayload } from '../../../types/auth/payloads';
import User from '../../../types/user';

export const REGISTER = 'AUTH_REGISTER';
export const REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS';
export const LOGIN = 'AUTH_LOGIN';
export const LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const SET_ERROR = 'AUTH_SET_ERROR';

export const register = createActionCreator<typeof REGISTER, RegisterPayload>(REGISTER);

export const registerSuccess = createActionCreator<typeof REGISTER_SUCCESS, User>(REGISTER_SUCCESS);

export const login = createActionCreator<typeof LOGIN, LoginPayload>(LOGIN);

export const loginSuccess = createActionCreator<typeof LOGIN_SUCCESS, User>(LOGIN_SUCCESS);

export const setError = createActionCreator<typeof SET_ERROR, string | null>(SET_ERROR);
