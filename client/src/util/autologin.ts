import { GetServerSidePropsContext } from 'next';
import axios, { AxiosResponse } from 'axios';

import { initializeStore } from '../store';
import { authSuccess } from '../store/ducks/auth/actions';
import { RootState } from '../store/types/state';
import User from '../types/user';

const autologin = async (ctx: GetServerSidePropsContext): Promise<RootState | false> => {
  const store = initializeStore();

  const response: AxiosResponse<User | null> = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/autologin`,
    {},
    {
      headers: {
        cookie: ctx.req.headers.cookie || '',
      },
    }
  );

  if (!response.data) {
    return false;
  }

  store.dispatch(authSuccess(response.data));

  return store.getState();
};

export default autologin;
