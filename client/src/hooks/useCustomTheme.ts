import { useSelector } from 'react-redux';
import { createTheme } from '@material-ui/core';
import { blue, yellow } from '@material-ui/core/colors';

import { RootState } from '../store/types/state';

const useCustomTheme = () => {
  const type = useSelector((state: RootState) => state.theme.paletteType);

  const theme = createTheme({
    palette: {
      primary: blue,
      secondary: yellow,
      type,
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          body: {
            transition: 'all 0.25s ease-out',
          },
        },
      },
    },
  });

  return theme;
};

export default useCustomTheme;
