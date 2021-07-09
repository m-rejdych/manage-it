import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Box } from '@material-ui/core';
import { Brightness6 } from '@material-ui/icons';

import useCustomTheme from '../../hooks/useCustomTheme';
import { setPaletteType } from '../../store/ducks/theme/actions';
import { RootState } from '../../store/types/state';

const ThemeColorButton: React.FC = () => {
  const paletteType = useSelector((state: RootState) => state.theme.paletteType);
  const dispatch = useDispatch();

  const toggleTheme = (): void => {
    dispatch(setPaletteType(paletteType === 'light' ? 'dark' : 'light'));
  };

  return (
    <Box clone m={1}>
      <IconButton onClick={toggleTheme}>
        <Brightness6 />
      </IconButton>
    </Box>
  );
};

export default ThemeColorButton;
