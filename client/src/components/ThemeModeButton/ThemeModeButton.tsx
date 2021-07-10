import { useDispatch, useSelector } from 'react-redux';
import { IconButton, useTheme, Theme } from '@material-ui/core';
import { Brightness6 } from '@material-ui/icons';

import { setPaletteType } from '../../store/ducks/theme/actions';
import { RootState } from '../../store/types/state';

const ThemeColorButton: React.FC = () => {
  const paletteType = useSelector((state: RootState) => state.theme.paletteType);
  const theme = useTheme();
  const dispatch = useDispatch();

  const toggleTheme = (): void => {
    dispatch(setPaletteType(paletteType === 'light' ? 'dark' : 'light'));
  };

  return (
    <IconButton
      css={{
        position: 'absolute',
        top: 0,
        right: 0,
        margin: theme.spacing(1),
      }}
      onClick={toggleTheme}
    >
      <Brightness6 />
    </IconButton>
  );
};

export default ThemeColorButton;
