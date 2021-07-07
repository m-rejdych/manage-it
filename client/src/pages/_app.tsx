import { useEffect } from 'react';
import type { AppProps } from 'next/app';

import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
