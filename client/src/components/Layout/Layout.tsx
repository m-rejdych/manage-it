import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { ThemeProvider, CssBaseline, Grid, Paper } from '@material-ui/core';

import theme from '../../theme';
import Nav from '../Nav';
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
          pr: theme.spacing(3),
          mt: isAuth && !NON_AUTH_ROUTES.includes(pathname) ? theme.spacing(11) : 0,
          minHeight: `calc(100vh - ${theme.spacing(11)})`,
        }}
      >
        {shouldDisplayAuthContent && (
          <Grid item xs={3} sx={{ pt: '0 !important' }}>
            <Paper
              elevation={3}
              sx={{
                minHeight: `calc(100vh - ${theme.spacing(11)})`,
                borderRight: `1px solid ${theme.palette.divider}`,
              }}
            />
          </Grid>
        )}
        <Grid item xs={shouldDisplayAuthContent ? 9 : 12} sx={{ pt: '0 !important' }}>
          {children}
        </Grid>
      </Grid>
      {shouldDisplayAuthContent && <Nav />}
    </ThemeProvider>
  ) : null;
};

export default Layout;
