import { useSelector } from 'react-redux';
import { createTheme, Theme } from '@material-ui/core';
import { blue, yellow } from '@material-ui/core/colors';

import { RootState } from '../store/types/state';

const useCustomTheme = (): Theme => {
  const mode = useSelector((state: RootState) => state.theme.paletteType);

  const theme: Theme = createTheme({
    palette: {
      primary: blue,
      secondary: yellow,
      mode,
    },
  });

  return theme;
};

export default useCustomTheme;
