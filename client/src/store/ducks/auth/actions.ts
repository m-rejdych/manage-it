import createActionCreator from '../../util/createActionCreator';
import { RegisterPayload, LoginPayload } from '../../../types/auth/payloads';
import User from '../../../types/user';

export const REGISTER = 'AUTH_REGISTER';
export const LOGIN = 'AUTH_LOGIN';
export const AUTH_SUCCESS = 'AUTH_AUTH_SUCCESS';
export const SET_ERROR = 'AUTH_SET_ERROR';

export const register = createActionCreator<typeof REGISTER, RegisterPayload>(REGISTER);

export const login = createActionCreator<typeof LOGIN, LoginPayload>(LOGIN);

export const authSuccess = createActionCreator<typeof AUTH_SUCCESS, User>(AUTH_SUCCESS);

export const setError = createActionCreator<typeof SET_ERROR, string | null>(SET_ERROR);
