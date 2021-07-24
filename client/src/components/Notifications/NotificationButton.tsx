import { IconButton } from '@material-ui/core';
import { Notifications } from '@material-ui/icons';

const NotificationButton: React.FC = () => {
  return (
    <IconButton>
      <Notifications />
    </IconButton>
  );
};

export default NotificationButton;
