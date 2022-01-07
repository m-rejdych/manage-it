import axios, { AxiosResponse } from 'axios';

import { CreateTaskPayload } from '../types/task/payloads';
import Task from '../types/task';

const TASK_API = `${process.env.NEXT_PUBLIC_API_URL}/task`;

export const createTask = async (
  data: CreateTaskPayload,
): Promise<AxiosResponse<Task>> =>
  axios.post(`${TASK_API}/create-task`, data, { withCredentials: true });

export const getTasksByProjectId = async (
  projectId: number,
): Promise<AxiosResponse<Task[]>> =>
  axios.get(`${TASK_API}/get-by-project-id?projectId=${projectId}`, {
    withCredentials: true,
  });
