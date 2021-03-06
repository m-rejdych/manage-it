import axios, { AxiosResponse } from 'axios';

import type Project from '../types/project/Project';
import type MemberRequest from '../types/memberRequest';
import type {
  CreateProjectPayload,
  GetMemberRequestsPayload,
  ProjectMemberPayload,
} from '../types/project/payloads';

const PROJECT_API = `${process.env.NEXT_PUBLIC_API_URL}/project`;

export const acceptMemberRequest = async (
  requestId: number,
): Promise<AxiosResponse<MemberRequest>> =>
  axios.put(
    `${PROJECT_API}/admin/accept-member-request`,
    { requestId },
    { withCredentials: true },
  );

export const createProject = async (
  data: CreateProjectPayload,
): Promise<AxiosResponse<Project>> =>
  axios.post(`${PROJECT_API}/create-project`, data, { withCredentials: true });

export const getMyProjects = async (): Promise<AxiosResponse<Project[]>> =>
  axios.get(`${PROJECT_API}/get-my-projects`, { withCredentials: true });

export const getProjectById = (id: number): Promise<AxiosResponse<Project>> =>
  axios.get(`${PROJECT_API}/get-by-id/${id}`, { withCredentials: true });

export const getMemberRequest = (
  projectId: number,
  isAccepted?: boolean,
): Promise<AxiosResponse<MemberRequest>> =>
  axios.get(
    `${PROJECT_API}/get-member-request?projectId=${projectId}${
      isAccepted === undefined ? '' : `&isAccepted=${isAccepted}`
    }`,
    {
      withCredentials: true,
    },
  );

export const getMembershipRequests = async ({
  projectId,
  isAccepted,
}: GetMemberRequestsPayload) =>
  axios.get(
    `${PROJECT_API}/admin/get-member-requests?projectId=${projectId}${
      isAccepted !== undefined ? `&isAccepted=${isAccepted}` : ''
    }`,
    { withCredentials: true },
  );

export const getMembers = async (projectId: number) =>
  axios.get(`${PROJECT_API}/get-members?projectId=${projectId}`, {
    withCredentials: true,
  });

export const searchProjects = (
  value: string,
): Promise<AxiosResponse<Project[]>> =>
  axios.get(`${PROJECT_API}/search-projects?value=${value}`, {
    withCredentials: true,
  });

export const validateMembership = (
  projectId: number,
): Promise<AxiosResponse<boolean>> =>
  axios.get(`${PROJECT_API}/validate-membership?projectId=${projectId}`, {
    withCredentials: true,
  });

export const validateAdmin = async (
  projectId: number,
): Promise<AxiosResponse<boolean>> =>
  axios.get(`${PROJECT_API}/validate-admin?projectId=${projectId}`, {
    withCredentials: true,
  });

export const requestMembership = async (
  projectId: number,
): Promise<AxiosResponse<MemberRequest>> =>
  axios.post(
    `${PROJECT_API}/member-request`,
    { projectId },
    { withCredentials: true },
  );

export const removeMemberRequest = async (
  id: number,
): Promise<AxiosResponse<boolean>> =>
  axios.delete(`${PROJECT_API}/remove-member-request?id=${id}`, {
    withCredentials: true,
  });

export const rejectMemberRequest = async (
  requestId: number,
): Promise<AxiosResponse<boolean>> =>
  axios.delete(`${PROJECT_API}/admin/reject-member-request?id=${requestId}`, {
    withCredentials: true,
  });

export const removeMember = async ({
  memberId,
  projectId,
}: ProjectMemberPayload): Promise<AxiosResponse<Project>> =>
  axios.delete(
    `${PROJECT_API}/admin/remove-member?memberId=${memberId}&projectId=${projectId}`,
    { withCredentials: true },
  );

export const makeAdmin = async (
  data: ProjectMemberPayload,
): Promise<AxiosResponse<Project>> =>
  axios.put(`${PROJECT_API}/admin/make-admin`, data, { withCredentials: true });

export const degrade = ({
  memberId,
  projectId,
}: ProjectMemberPayload): Promise<AxiosResponse<Project>> =>
  axios.delete(
    `${PROJECT_API}/admin/degrade?memberId=${memberId}&projectId=${projectId}`,
    { withCredentials: true },
  );
