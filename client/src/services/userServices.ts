import axios, { AxiosResponse } from 'axios';

import { SearchUsersPayload } from '../types/user/payloads';
import User from '../types/user';

const USER_API = `${process.env.NEXT_PUBLIC_API_URL}/user`;

export const searchUsers = async ({
  value,
  projectId,
}: SearchUsersPayload): Promise<AxiosResponse<User[]>> =>
  axios.get(
    `${USER_API}/search-users${value ? `?value=${value}` : ''}${
      projectId ? `&projectId=${projectId}` : ''
    }`,
    { withCredentials: true }
  );
