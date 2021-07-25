import { Box, useTheme } from '@material-ui/core';

import SettingsButton from '../Settings';
import NotificationButton from '../Notifications';
import Search from '../Search';

const Nav: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      position="fixed"
      top={theme.spacing(3)}
      right={theme.spacing(3)}
      display="flex"
      alignItems="center"
    >
      <Search />
      <NotificationButton />
      <SettingsButton />
    </Box>
  );
};

export default Nav;
