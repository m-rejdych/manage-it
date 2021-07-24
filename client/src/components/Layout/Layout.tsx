import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { ThemeProvider, CssBaseline, GlobalStyles, Button } from '@material-ui/core';

import theme from '../../theme';
import ROUTES from '../../constants/routes';
import { logout } from '../../store/ducks/auth/actions';
import { RootState } from '../../store/types/state';

const Layout: React.FC = ({ children }) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = (): void => {
    dispatch(logout());
    router.push(ROUTES.LOGIN);
  };

  return children ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            background:
              'radial-gradient(123.22% 129.67% at 100.89% -5.6%, #201D47 0%, #17153A 100%)',
          },
        }}
      />
      {children}
      {isAuth && (
        <Button
          sx={{ position: 'fixed', top: theme.spacing(3), right: theme.spacing(3) }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      )}
    </ThemeProvider>
  ) : null;
};

export default Layout;
