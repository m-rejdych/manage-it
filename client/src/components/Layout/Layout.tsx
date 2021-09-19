import { useRouter } from 'next/router';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';

import theme from '../../theme';
import TopBar from '../TopBar';
import LeftSidebar from '../Sidebars/LeftSidebar';
import RightSidebar from '../Sidebars/RightSidebar';
import { NON_AUTH_ROUTES } from '../../constants/routes';

const Layout: React.FC = ({ children }) => {
  const { pathname } = useRouter();

  const shouldDisplayAuthContent = !NON_AUTH_ROUTES.includes(pathname);

  return children ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box m="0 auto" width="60vw" height="200vh">
        {children}
      </Box>
      {shouldDisplayAuthContent && <LeftSidebar />}
      {shouldDisplayAuthContent && <RightSidebar />}
      {shouldDisplayAuthContent && <TopBar />}
    </ThemeProvider>
  ) : null;
};

export default Layout;
