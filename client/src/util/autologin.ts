import { NextPageContext } from 'next';
import axios, { AxiosResponse } from 'axios';

import User from '../types/user';

const autologin = async (ctx: NextPageContext): Promise<User | null> => {
  const response: AxiosResponse<User | null> = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/autologin`,
    {},
    {
      headers: {
        cookie: ctx.req?.headers.cookie || '',
      },
    }
  );

  return response.data;
};

export default autologin;
