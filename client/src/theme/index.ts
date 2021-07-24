import { createTheme } from '@material-ui/core';
import { blue, pink } from '@material-ui/core/colors';

import { TEXT_SECONDARY, DIVIDER, PAPER, BUTTON } from '../constants/styleOverrides';

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: pink,
    mode: 'dark',
    text: {
      secondary: TEXT_SECONDARY,
    },
    action: {
      active: TEXT_SECONDARY,
    },
    divider: DIVIDER,
  },
  components: {
    MuiIcon: {
      defaultProps: {
        color: 'action',
      },
    },
    MuiPaper: {
      styleOverrides: {
        ...PAPER,
      },
      defaultProps: {
        elevation: 3,
      },
    },
    MuiButton: {
      styleOverrides: {
        ...BUTTON,
      },
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;
