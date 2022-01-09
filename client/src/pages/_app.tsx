import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Head from 'next/head';
import createCache from '@emotion/cache';

import { wrapper } from '../store';
import Layout from '../components/Layout';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const cache = createCache({ key: 'css' });
cache.compat = true;

const App: React.FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  const getPageLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={cache}>
      <Head>
        <title>Manage IT</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Layout>{getPageLayout(<Component {...pageProps} />)}</Layout>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default wrapper.withRedux(App);
