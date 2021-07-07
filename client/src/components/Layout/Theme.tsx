import { useState } from 'react';
import { createTheme, PaletteType, ThemeProvider, CssBaseline } from '@material-ui/core';
import { cyan, yellow } from '@material-ui/core/colors';

interface ChildrenProps {
  toggleTheme: () => void;
}

interface Props {
  children: (props: ChildrenProps) => JSX.Element;
}

const Theme: React.FC<Props> = ({ children }) => {
  const [type, setType] = useState<PaletteType>('light');

  const theme = createTheme({
    palette: {
      primary: cyan,
      secondary: yellow,
      type,
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          body: {
            transition: 'background 0.25s ease-out, color 0.25s ease-out',
          },
        },
      },
    },
  });

  const toggleTheme = (): void => {
    setType((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children({ toggleTheme })}
    </ThemeProvider>
  );
};

export default Theme;
