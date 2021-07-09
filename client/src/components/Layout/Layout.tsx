import { ThemeProvider, CssBaseline } from '@material-ui/core';

import ThemeColorButton from '../ThemeColorButton';
import useCustomTheme from '../../hooks/useCustomTheme';

const Layout: React.FC = ({ children }) => {
  const theme = useCustomTheme();

  return children ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeColorButton />
      {children}
    </ThemeProvider>
  ) : null;
};

export default Layout;
