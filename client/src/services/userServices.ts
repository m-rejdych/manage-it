import axios, { AxiosResponse } from 'axios';

import { SearchUsersPayload } from '../types/user/payloads';
import User from '../types/user';

const API = process.env.NEXT_PUBLIC_API_URL;

export const searchUsers = async ({
  value,
  projectId,
}: SearchUsersPayload): Promise<AxiosResponse<User[]>> =>
  axios.get(
    `${API}/user/search-users${value ? `?value=${value}` : ''}${
      projectId ? `&projectId=${projectId}` : ''
    }`,
    { withCredentials: true }
  );
