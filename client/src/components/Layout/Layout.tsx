import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { ThemeProvider, CssBaseline, GlobalStyles, Container } from '@material-ui/core';

import theme from '../../theme';
import Nav from '../Nav';
import { NON_AUTH_ROUTES } from '../../constants/routes';
import { BODY_BACKGROUND } from '../../constants/styleOverrides';
import { RootState } from '../../store/types/state';

const Layout: React.FC = ({ children }) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const { pathname } = useRouter();

  return children ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            background: BODY_BACKGROUND,
          },
        }}
      />
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          paddingTop: isAuth && !NON_AUTH_ROUTES.includes(pathname) ? theme.spacing(10) : 0,
          minHeight: '100vh',
        }}
      >
        {children}
      </Container>
      {isAuth && !NON_AUTH_ROUTES.includes(pathname) && <Nav />}
    </ThemeProvider>
  ) : null;
};

export default Layout;
