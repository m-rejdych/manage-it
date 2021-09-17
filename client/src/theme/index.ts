import { createTheme } from '@material-ui/core';
import { blue, pink } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: {
      dark: '#abc4ff',
      main: '#ccdbfd',
      light: '#edf2fb',
    },
    secondary: {
      dark: '#f08080',
      main: '#f8ad9d',
      light: '#ffdab9',
    },
    mode: 'dark',
    background: {
      default: '#0d1b2a',
      paper: '#1b263b',
    },
  },
});

export default theme;
