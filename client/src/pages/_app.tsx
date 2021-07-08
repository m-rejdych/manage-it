import React from 'react';
import Head from 'next/head';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { AppProps } from 'next/app';

import useCustomTheme from '../hooks/useCustomTheme';
import Layout from '../components/Layout';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { theme } = useCustomTheme();

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Manage IT</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
};

export default App;
