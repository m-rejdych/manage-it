import { IconButton } from '@material-ui/core';
import { Brightness6 } from '@material-ui/icons';

import useCustomTheme from '../../hooks/useCustomTheme';

const ThemeColorButton: React.FC = () => {
  const { toggleTheme } = useCustomTheme();

  return (
    <IconButton onClick={toggleTheme}>
      <Brightness6 />
    </IconButton>
  );
};

export default ThemeColorButton;
