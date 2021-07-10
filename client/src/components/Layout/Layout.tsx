import { ThemeProvider, CssBaseline, GlobalStyles } from '@material-ui/core';

import ThemeModeButton from '../ThemeModeButton';
import useCustomTheme from '../../hooks/useCustomTheme';

const Layout: React.FC = ({ children }) => {
  const theme = useCustomTheme();

  return children ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { transition: 'all 0.25s ease-out' } }} />
      <ThemeModeButton />
      {children}
    </ThemeProvider>
  ) : null;
};

export default Layout;
