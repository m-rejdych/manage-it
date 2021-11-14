import axios, { AxiosResponse } from 'axios';

import Project from '../types/project/Project';
import { CreateProjectPayload } from '../types/project/payloads';

const API = process.env.NEXT_PUBLIC_API_URL;

export const createProject = async (
  data: CreateProjectPayload,
): Promise<AxiosResponse<Project>> =>
  axios.post(`${API}/project/create-project`, data, { withCredentials: true });

export const getMyProjects = async (): Promise<AxiosResponse<Project[]>> =>
  axios.get(`${API}/project/get-my-projects`, { withCredentials: true });

export const getProjectById = (id: number): Promise<AxiosResponse<Project>> =>
  axios.get(`${API}/project/get-by-id/${id}`, { withCredentials: true });

export const searchProjects = (
  value: string,
): Promise<AxiosResponse<Project[]>> =>
  axios.get(`${API}/project/search-projects?value=${value}`, {
    withCredentials: true,
  });

export const validateMembership = (
  projectId: number,
): Promise<AxiosResponse<boolean>> =>
  axios.get(`${API}/project/validate-membership?projectId=${projectId}`, {
    withCredentials: true,
  });
