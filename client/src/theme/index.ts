import { createTheme } from '@material-ui/core';
import { blue, pink } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: pink,
    mode: 'dark',
    text: {
      secondary: '#6968A6',
    },
    action: {
      active: '#6968A6',
    },
    divider: '#312F62',
  },
  components: {
    MuiIcon: {
      defaultProps: {
        color: 'action',
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background:
            'linear-gradient(247.99deg, rgba(52, 49, 102, 0.49) 0%, rgba(41, 39, 84, 0.78) 48.89%, rgba(27, 25, 67, 0.71) 98.46%)',
          backdropFilter: 'blur(23px)',
          WebkitBackdropFilter: 'blur(23px)',
        },
        elevation1: {
          boxShadow: '0px 11px 29px rgba(23, 18, 43, 0.585739)',
        },
        elevation2: {
          boxShadow: '0px 21px 44px rgba(23, 18, 43, 0.585739)',
        },
        elevation3: {
          boxShadow: '0px 51px 69px rgba(23, 18, 43, 0.585739)',
        },
      },
      defaultProps: {
        elevation: 3,
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          background: `linear-gradient(135deg, ${blue[300]} 0%, ${blue[400]} 19.24%, ${blue[500]} 68.64%, ${blue[600]} 81.77%, ${blue[700]} 100%)`,
        },
        containedSecondary: {
          background: `linear-gradient(135deg, ${pink[300]} 0%, ${pink[400]} 19.24%, ${pink[500]} 68.64%, ${pink[600]} 81.77%, ${pink[700]} 100%)`,
        },
      },
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;
