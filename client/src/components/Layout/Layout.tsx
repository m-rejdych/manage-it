import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { ThemeProvider, CssBaseline, Grid, Paper } from '@material-ui/core';

import theme from '../../theme';
import TopBar from '../TopBar';
import LeftSidebar from '../Sidebars/LeftSidebar';
import { NON_AUTH_ROUTES } from '../../constants/routes';
import { RootState } from '../../store/types/state';

const Layout: React.FC = ({ children }) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const { pathname } = useRouter();

  const shouldDisplayAuthContent = isAuth && !NON_AUTH_ROUTES.includes(pathname);

  return children ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        container
        spacing={3}
        sx={{
          minHeight: '100vh',
        }}
      >
        {shouldDisplayAuthContent && (
          <Grid item xs={3}>
            <LeftSidebar />
          </Grid>
        )}
        <Grid item xs={shouldDisplayAuthContent ? 6 : 12}>
          {children}
        </Grid>
        {shouldDisplayAuthContent && (
          <Grid item xs={3}>
            <Paper
              sx={{
                minHeight: '100vh',
                borderRadius: '50px 0 0 0',
              }}
            />
          </Grid>
        )}
      </Grid>
      {shouldDisplayAuthContent && <TopBar />}
    </ThemeProvider>
  ) : null;
};

export default Layout;
