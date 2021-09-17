import { Box, useTheme } from '@material-ui/core';

import SettingsButton from '../Settings';
import NotificationButton from '../Notifications';
import Search from '../Search';

const Nav: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      position="fixed"
      top={0}
      right={0}
      p={3}
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
    >
      {/* <Search /> */}
      <NotificationButton />
      <SettingsButton />
    </Box>
  );
};

export default Nav;
