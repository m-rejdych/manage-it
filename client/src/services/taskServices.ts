import axios, { AxiosResponse } from 'axios';

import type {
  CreateTaskPayload,
  GetTaskByIdPayload,
} from '../types/task/payloads';
import type Task from '../types/task';

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

export const getTaskById = async ({
  taskId,
  projectId,
}: GetTaskByIdPayload): Promise<Task> =>
  axios.get(`${TASK_API}/get-by-id?taskId=${taskId}&projectId=${projectId}`, {
    withCredentials: true,
  });
