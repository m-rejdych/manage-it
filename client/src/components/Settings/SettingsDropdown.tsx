import { useTheme } from '@material-ui/core';

import Dropdown from '../Dropdown';
import useSettingsButtons from './useSettingsButtons';

interface Props {
  open: boolean;
  onClose: () => void;
}

const SettingsDropdown: React.FC<Props> = ({ open, onClose }) => {
  const buttons = useSettingsButtons();
  const theme = useTheme();

  return (
    <Dropdown
      items={buttons}
      open={open}
      onClose={onClose}
      sx={{ position: 'absolute', right: 0, top: `calc(100% + ${theme.spacing(1)})` }}
    />
  );
};

export default SettingsDropdown;
