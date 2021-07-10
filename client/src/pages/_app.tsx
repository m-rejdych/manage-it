import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import Head from 'next/head';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

import useStore from '../store';
import Layout from '../components/Layout';

const cache = createCache({ key: 'css' });
cache.compat = true;

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const store = useStore();

  return (
    <CacheProvider value={cache}>
      <Head>
        <title>Manage IT</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </CacheProvider>
  );
};

export default App;
