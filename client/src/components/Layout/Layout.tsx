import { ThemeProvider, CssBaseline, GlobalStyles } from '@material-ui/core';

import theme from '../../theme';

const Layout: React.FC = ({ children }) => {
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
    </ThemeProvider>
  ) : null;
};

export default Layout;
