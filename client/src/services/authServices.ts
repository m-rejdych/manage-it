import axios, { AxiosResponse } from 'axios';

import User from '../types/user';
import { RegisterPayload, LoginPayload } from '../types/auth/payloads';

const AUTH_API = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

export const register = async (data: RegisterPayload): Promise<AxiosResponse<User>> =>
  axios.post(`${AUTH_API}/register`, data, { withCredentials: true });

export const login = async (data: LoginPayload): Promise<AxiosResponse<User>> =>
  axios.post(`${AUTH_API}/login`, data, { withCredentials: true });

export const logout = async (): Promise<AxiosResponse<boolean>> =>
  axios.post(`${AUTH_API}/logout`, {}, { withCredentials: true });
