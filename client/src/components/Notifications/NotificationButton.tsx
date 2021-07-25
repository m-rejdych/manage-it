import { IconButton, useTheme } from '@material-ui/core';
import { Notifications } from '@material-ui/icons';

const NotificationButton: React.FC = () => {
  const theme = useTheme();

  return (
    <IconButton sx={{ marginRight: theme.spacing(1) }}>
      <Notifications />
    </IconButton>
  );
};

export default NotificationButton;
