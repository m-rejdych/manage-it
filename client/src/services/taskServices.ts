import axios, { AxiosResponse } from 'axios';

import { CreateTaskPayload } from '../types/task/payloads';
import Task from '../types/task';

const API = process.env.NEXT_PUBLIC_API_URL;

export const createTask = async (data: CreateTaskPayload): Promise<AxiosResponse<Task>> =>
  axios.post(`${API}/task/create-task`, data, { withCredentials: true });
