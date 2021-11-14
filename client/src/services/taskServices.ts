import axios, { AxiosResponse } from 'axios';

import { CreateTaskPayload } from '../types/task/payloads';
import Task from '../types/task';

const API = process.env.NEXT_PUBLIC_API_URL;

export const createTask = async (
  data: CreateTaskPayload,
): Promise<AxiosResponse<Task>> =>
  axios.post(`${API}/task/create-task`, data, { withCredentials: true });

export const getTasksByProjectId = async (
  projectId: number,
): Promise<AxiosResponse<Task[]>> =>
  axios.get(`${API}/task/get-by-project-id?projectId=${projectId}`, {
    withCredentials: true,
  });
