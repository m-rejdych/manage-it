import { useSelector } from 'react-redux';
import { ThemeProvider, CssBaseline, GlobalStyles } from '@material-ui/core';

import theme from '../../theme';
import Nav from '../Nav';
import { BODY_BACKGROUND } from '../../constants/styleOverrides';
import { RootState } from '../../store/types/state';

const Layout: React.FC = ({ children }) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

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
      {children}
      {isAuth && <Nav />}
    </ThemeProvider>
  ) : null;
};

export default Layout;
