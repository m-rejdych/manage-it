import axios, { AxiosResponse } from 'axios';

import Project from '../types/project/Project';
import MemberRequest from '../types/memberRequest';
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

export const requestMembership = async (
  projectId: number,
): Promise<AxiosResponse<MemberRequest>> =>
  axios.post(
    `${API}/project/member-request`,
    { projectId },
    { withCredentials: true },
  );

export const getMemberRequest = (
  projectId: number,
  isAccepted?: boolean,
): Promise<AxiosResponse<MemberRequest>> =>
  axios.get(
    `${API}/project/get-member-request?projectId=${projectId}${
      isAccepted === undefined ? '' : `&isAccepted=${isAccepted}`
    }`,
    {
      withCredentials: true,
    },
  );
