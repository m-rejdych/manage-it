import { GetServerSidePropsContext, GetServerSidePropsResult, GetServerSideProps } from 'next';
import axios, { AxiosResponse } from 'axios';
import { END } from 'redux-saga';

import User from '../types/user';
import ROUTES from '../constants/routes';
import ValueOf from '../types/ValueOf';
import { PayloadAction } from '../store/types/actions';
import { authSuccess } from '../store/ducks/auth/actions';
import { SagaStore } from '../store';

interface AutologinArgs {
  ctx: GetServerSidePropsContext;
  store: SagaStore;
  authRoute: boolean;
  redirectRoute: ValueOf<typeof ROUTES>;
}

type GetServerSidePropsWithAutologin = (
  authRoute: boolean,
  redirectRoute: ValueOf<typeof ROUTES>
) => (
  store: SagaStore
) => (ctx: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<{}>>;

const autologin = async ({
  ctx,
  store,
  authRoute,
  redirectRoute,
}: AutologinArgs): Promise<GetServerSidePropsResult<{}>> => {
  const state = store.getState();
  let isAutoLoggedIn = state.auth.isAuth;

  if (!isAutoLoggedIn) {
    const response: AxiosResponse<User | null> = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/autologin`,
      {},
      {
        headers: {
          cookie: ctx.req?.headers.cookie || '',
        },
      }
    );

    if (response.data) {
      store.dispatch(authSuccess(response.data));
      isAutoLoggedIn = true;
    }
  }

  store.dispatch(END as PayloadAction);
  await store.sagaTask?.toPromise();

  if ((!isAutoLoggedIn && authRoute) || (isAutoLoggedIn && !authRoute)) {
    return { redirect: { destination: redirectRoute, permanent: false } };
  }

  return { props: {} };
};

export const getServerSidePropsWithAutologin: GetServerSidePropsWithAutologin =
  (authRoute, redirectRoute) => (store) => async (ctx) =>
    await autologin({ ctx, store, authRoute, redirectRoute });

export default autologin;
