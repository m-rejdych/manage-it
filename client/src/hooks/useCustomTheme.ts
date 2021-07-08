import { useState, useRef } from 'react';
import { createTheme, PaletteType } from '@material-ui/core';
import { blue, yellow } from '@material-ui/core/colors';

const useCustomTheme = () => {
  const [type, setType] = useState<PaletteType>('light');

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

  const toggleTheme = (): void => {
    console.log('hjeanć kgunwo');
    setType((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
};

export default useCustomTheme;
