import { IconButton, useTheme } from '@mui/material';
import { Notifications } from '@mui/icons-material';

const NotificationButton: React.FC = () => {
  const theme = useTheme();

  return (
    <IconButton sx={{ marginRight: theme.spacing(1) }}>
      <Notifications />
    </IconButton>
  );
};

export default NotificationButton;
