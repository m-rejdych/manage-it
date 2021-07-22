import { END } from 'redux-saga';
import { AppProps } from 'next/app';
import { CacheProvider } from '@emotion/react';
import Head from 'next/head';
import createCache from '@emotion/cache';

import { wrapper } from '../store';
import { authSuccess } from '../store/ducks/auth/actions';
import { PayloadAction } from '../store/types/actions';
import Layout from '../components/Layout';
import autologin from '../util/autologin';
import AuthProvider from '../components/AuthProvider';

const cache = createCache({ key: 'css' });
cache.compat = true;

interface NextApp extends React.FC<AppProps> {
  getInitialProps: ReturnType<typeof wrapper.getInitialAppProps>;
}

const App: NextApp = ({ Component, pageProps }) => {
  return (
    <CacheProvider value={cache}>
      <Head>
        <title>Manage IT</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </CacheProvider>
  );
};

App.getInitialProps = wrapper.getInitialAppProps((store) => async ({ ctx, Component }) => {
  const pageProps = { ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}) };

  if (typeof window === 'undefined') {
    const data = await autologin(ctx);

    if (data) {
      store.dispatch(authSuccess(data));
    }

    store.dispatch(END as PayloadAction);
    await store.sagaTask?.toPromise();
  }

  return { pageProps };
});

export default wrapper.withRedux(App);
