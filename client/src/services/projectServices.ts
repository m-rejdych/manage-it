import axios, { AxiosResponse } from 'axios';

import Project from '../types/project/Project';
import { CreateProjectPayload } from '../types/project/payloads';

const API = process.env.NEXT_PUBLIC_API_URL;

export const createProject = async (data: CreateProjectPayload): Promise<AxiosResponse<Project>> =>
  axios.post(`${API}/project/create-project`, data, { withCredentials: true });

export const getMyProjects = async (): Promise<AxiosResponse<Project[]>> =>
  axios.get(`${API}/project/get-my-projects`, { withCredentials: true });
