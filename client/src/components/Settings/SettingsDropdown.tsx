import { useTheme } from '@mui/material';

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
      paperProps={{ sx: { backgroundColor: theme.palette.background.default } }}
    />
  );
};

export default SettingsDropdown;
