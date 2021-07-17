import axios, { AxiosResponse } from 'axios';

import User from '../types/user';
import { RegisterPayload, LoginPayload } from '../types/auth/payloads';

const API = process.env.NEXT_PUBLIC_API_URL;

export const register = async (data: RegisterPayload): Promise<AxiosResponse<User>> =>
  axios.post(`${API}/auth/register`, data, { withCredentials: true });

export const login = async (data: LoginPayload): Promise<AxiosResponse<User>> =>
  axios.post(`${API}/auth/login`, data, { withCredentials: true });
