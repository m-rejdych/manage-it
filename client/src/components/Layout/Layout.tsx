import { useRouter } from 'next/router';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';

import theme from '../../theme';
import Sidebar from '../Sidebar';
import Topbar from '../Topbar';
import { NON_AUTH_ROUTES } from '../../constants/routes';

const Layout: React.FC = ({ children }) => {
  const { pathname } = useRouter();

  const shouldDisplayAuthContent = !NON_AUTH_ROUTES.includes(pathname);

  return children ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box position="relative" left={72} top={72} width="calc(100vw - 72px)" height="200vh" px={3}>
        {children}
      </Box>
      {shouldDisplayAuthContent && <Sidebar />}
      {shouldDisplayAuthContent && <Topbar />}
    </ThemeProvider>
  ) : null;
};

export default Layout;
